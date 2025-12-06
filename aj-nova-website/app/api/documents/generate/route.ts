import { NextRequest, NextResponse } from 'next/server'
import { generateDocument } from '@/lib/gemini'
import { createClient } from '@/lib/supabase/server'
import { getUser } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const supabase = await createClient()
    const body = await request.json()
    const { documentType, profileData, targetUniversity, targetProgram, additionalNotes } = body

    // Validate profile completeness (minimum 80%)
    if ((profileData?.completionPercentage || 0) < 80) {
      return NextResponse.json(
        { error: 'Profile must be at least 80% complete to generate documents' },
        { status: 400 }
      )
    }

    // Generate document using Gemini API
    const content = await generateDocument(
      documentType,
      profileData,
      { targetUniversity, targetProgram, additionalNotes }
    )

    // Check for existing document
    const { data: existingDocs } = await supabase
      .from('documents')
      .select('*')
      .eq('student_id', user.id)
      .eq('type', documentType.toLowerCase())

    const existingDoc = existingDocs?.[0]

    let document
    if (existingDoc) {
      // Update existing document
      const { data, error } = await supabase
        .from('documents')
        .update({
          content,
          status: 'draft',
          version: existingDoc.version + 1,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingDoc.id)
        .select()
        .single()

      if (error) throw error
      document = data
    } else {
      // Create new document
      const { data, error } = await supabase
        .from('documents')
        .insert({
          student_id: user.id,
          type: documentType.toLowerCase(),
          title: getDocumentTitle(documentType),
          content,
          status: 'draft',
          version: 1
        })
        .select()
        .single()

      if (error) throw error
      document = data
    }

    return NextResponse.json({ document, content })
  } catch (error: any) {
    console.error('Error generating document:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate document' },
      { status: 500 }
    )
  }
}

function getDocumentTitle(type: string): string {
  switch (type) {
    case 'SOP':
      return 'Statement of Purpose'
    case 'LOR':
      return 'Letter of Recommendation'
    case 'RESUME':
      return 'Resume/CV'
    case 'COVER_LETTER':
      return 'Cover Letter'
    default:
      return 'Document'
  }
}
