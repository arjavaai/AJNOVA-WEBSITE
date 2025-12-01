import { NextRequest, NextResponse } from 'next/server'
import { getApplicationById, updateApplication } from '@/lib/application-mock-data'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const application = getApplicationById(params.id)
  
  if (!application) {
    return NextResponse.json(
      { error: 'Application not found' },
      { status: 404 }
    )
  }
  
  return NextResponse.json({ application })
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await request.json()
    const application = updateApplication(params.id, updates)
    
    return NextResponse.json({ application })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update application' },
      { status: 500 }
    )
  }
}
