import { NextRequest, NextResponse } from 'next/server'
import { getApplicationsByStudentId, getApplicationStats } from '@/lib/application-mock-data'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const studentId = searchParams.get('studentId')
  const stats = searchParams.get('stats')
  
  if (!studentId) {
    return NextResponse.json(
      { error: 'Student ID is required' },
      { status: 400 }
    )
  }
  
  if (stats === 'true') {
    const statistics = getApplicationStats(studentId)
    return NextResponse.json({ stats: statistics })
  }
  
  const applications = getApplicationsByStudentId(studentId)
  return NextResponse.json({ applications })
}
