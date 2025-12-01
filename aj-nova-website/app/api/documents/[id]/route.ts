import { NextRequest, NextResponse } from 'next/server'
import { getDocumentById, updateDocument } from '@/lib/mock-data'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const document = getDocumentById(params.id)
  
  if (!document) {
    return NextResponse.json(
      { error: 'Document not found' },
      { status: 404 }
    )
  }
  
  return NextResponse.json({ document })
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await request.json()
    const document = updateDocument(params.id, updates)
    
    return NextResponse.json({ document })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update document' },
      { status: 500 }
    )
  }
}
