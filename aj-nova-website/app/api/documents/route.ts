import { NextRequest, NextResponse } from 'next/server'
import { getDocumentsByStudentId, createDocument } from '@/lib/mock-data'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const studentId = searchParams.get('studentId')
  
  if (!studentId) {
    return NextResponse.json(
      { error: 'Student ID is required' },
      { status: 400 }
    )
  }
  
  const documents = getDocumentsByStudentId(studentId)
  return NextResponse.json({ documents })
}
