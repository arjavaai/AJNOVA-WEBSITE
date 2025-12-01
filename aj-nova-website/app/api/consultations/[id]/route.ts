import { NextRequest, NextResponse } from 'next/server'
import { 
  getConsultationById,
  rescheduleConsultation,
  cancelConsultation
} from '@/lib/consultation-mock-data'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const consultation = getConsultationById(params.id)
    
    if (!consultation) {
      return NextResponse.json(
        { error: 'Consultation not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ consultation })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch consultation' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    if (body.action === 'reschedule') {
      const consultation = rescheduleConsultation({
        consultationId: params.id,
        newDate: new Date(body.newDate),
        newTime: body.newTime,
        reason: body.reason
      })
      
      return NextResponse.json({ 
        consultation,
        message: 'Consultation rescheduled successfully' 
      })
    }
    
    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update consultation' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const reason = searchParams.get('reason') || undefined
    
    const consultation = cancelConsultation({
      consultationId: params.id,
      reason
    })
    
    return NextResponse.json({ 
      consultation,
      message: 'Consultation cancelled successfully' 
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to cancel consultation' },
      { status: 500 }
    )
  }
}
