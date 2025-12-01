import { NextRequest, NextResponse } from 'next/server'
import { 
  getConsultations, 
  getUpcomingConsultations,
  getConsultationHistory,
  bookConsultation,
  getConsultationStats,
  getCounsellors,
  generateAvailableSlots
} from '@/lib/consultation-mock-data'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const studentId = searchParams.get('studentId')
  const type = searchParams.get('type') // 'all', 'upcoming', 'history', 'stats', 'counsellors', 'slots'
  
  if (!studentId && type !== 'counsellors' && type !== 'slots') {
    return NextResponse.json(
      { error: 'Student ID is required' },
      { status: 400 }
    )
  }
  
  try {
    switch (type) {
      case 'upcoming':
        const upcoming = getUpcomingConsultations(studentId!)
        return NextResponse.json({ consultations: upcoming })
      
      case 'history':
        const history = getConsultationHistory(studentId!)
        return NextResponse.json({ consultations: history })
      
      case 'stats':
        const stats = getConsultationStats(studentId!)
        return NextResponse.json({ stats })
      
      case 'counsellors':
        const counsellors = getCounsellors()
        return NextResponse.json({ counsellors })
      
      case 'slots':
        const slots = generateAvailableSlots()
        return NextResponse.json({ slots })
      
      default:
        const all = getConsultations(studentId!)
        return NextResponse.json({ consultations: all })
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch consultations' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { searchParams } = new URL(request.url)
    const studentId = searchParams.get('studentId')
    
    if (!studentId) {
      return NextResponse.json(
        { error: 'Student ID is required' },
        { status: 400 }
      )
    }
    
    const bookingRequest = {
      studentId,
      preferredDate: new Date(body.preferredDate),
      preferredTime: body.preferredTime,
      duration: body.duration,
      type: body.type,
      topic: body.topic,
      counsellorId: body.counsellorId
    }
    
    const consultation = bookConsultation(bookingRequest)
    
    return NextResponse.json({ 
      consultation,
      message: 'Consultation booked successfully' 
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to book consultation' },
      { status: 500 }
    )
  }
}
