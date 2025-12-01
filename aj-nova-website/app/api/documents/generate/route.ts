import { NextRequest, NextResponse } from 'next/server'
import { generateDocument } from '@/lib/gemini'
import { updateDocument, getDocumentById, createDocument } from '@/lib/mock-data'
import { DocumentGenerationRequest } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body: DocumentGenerationRequest = await request.json()
    const { documentType, profileData, targetUniversity, targetProgram, additionalNotes } = body
    
    // Validate profile completeness (minimum 80%)
    if ((profileData.completionPercentage || 0) < 80) {
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
    
    // Find existing document or create new one
    const existingDocs = await fetch(`${request.nextUrl.origin}/api/documents?studentId=${profileData.id}`)
    const { documents } = await existingDocs.json()
    const existingDoc = documents.find((d: any) => d.type === documentType)
    
    let document
    if (existingDoc) {
      // Update existing document
      document = updateDocument(existingDoc.id, {
        content,
        status: 'DRAFT',
        version: existingDoc.version + 1
      })
    } else {
      // Create new document
      document = createDocument({
        studentId: profileData.id,
        type: documentType,
        title: getDocumentTitle(documentType),
        content,
        status: 'DRAFT',
        version: 1
      })
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
