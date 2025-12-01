import { NextRequest, NextResponse } from 'next/server'
import { getAPSForm, updateAPSForm, calculateCompletionPercentage } from '@/lib/aps-mock-data'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const studentId = searchParams.get('studentId')
  
  if (!studentId) {
    return NextResponse.json(
      { error: 'Student ID is required' },
      { status: 400 }
    )
  }
  
  const form = getAPSForm(studentId)
  
  if (!form) {
    return NextResponse.json(
      { error: 'APS form not found' },
      { status: 404 }
    )
  }
  
  return NextResponse.json({ form })
}

export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const studentId = searchParams.get('studentId')
    
    if (!studentId) {
      return NextResponse.json(
        { error: 'Student ID is required' },
        { status: 400 }
      )
    }
    
    const updates = await request.json()
    let form = updateAPSForm(studentId, updates)
    
    // Recalculate completion percentage
    const completionPercentage = calculateCompletionPercentage(form)
    form = updateAPSForm(studentId, { completionPercentage })
    
    return NextResponse.json({ form })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update APS form' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const studentId = searchParams.get('studentId')
    
    if (!studentId) {
      return NextResponse.json(
        { error: 'Student ID is required' },
        { status: 400 }
      )
    }
    
    const updates = await request.json()
    
    // Mark as submitted
    let form = updateAPSForm(studentId, {
      ...updates,
      status: 'SUBMITTED',
      submittedAt: new Date()
    })
    
    // Recalculate completion
    const completionPercentage = calculateCompletionPercentage(form)
    form = updateAPSForm(studentId, { completionPercentage })
    
    return NextResponse.json({ 
      form,
      message: 'APS form submitted successfully' 
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to submit APS form' },
      { status: 500 }
    )
  }
}
