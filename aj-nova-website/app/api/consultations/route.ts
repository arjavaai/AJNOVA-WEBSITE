import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getUser } from '@/lib/auth'
import {
  getCounsellors,
  generateAvailableSlots
} from '@/lib/consultation-mock-data'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type') // 'all', 'upcoming', 'history', 'stats', 'counsellors', 'slots'

  // For counsellors and slots, no auth needed
  if (type === 'counsellors') {
    const counsellors = getCounsellors()
    return NextResponse.json({ counsellors })
  }

  if (type === 'slots') {
    const slots = generateAvailableSlots()
    return NextResponse.json({ slots })
  }

  // For user-specific data, get authenticated user
  const user = await getUser()
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  const supabase = await createClient()

  try {
    switch (type) {
      case 'upcoming': {
        const { data: consultations, error } = await supabase
          .from('consultations')
          .select('*')
          .eq('student_id', user.id)
          .gte('scheduled_at', new Date().toISOString())
          .order('scheduled_at', { ascending: true })

        if (error) throw error
        return NextResponse.json({ consultations: consultations || [] })
      }

      case 'history': {
        const { data: consultations, error } = await supabase
          .from('consultations')
          .select('*')
          .eq('student_id', user.id)
          .lt('scheduled_at', new Date().toISOString())
          .order('scheduled_at', { ascending: false })

        if (error) throw error
        return NextResponse.json({ consultations: consultations || [] })
      }

      case 'stats': {
        const { data: consultations, error } = await supabase
          .from('consultations')
          .select('*')
          .eq('student_id', user.id)

        if (error) throw error

        const stats = {
          total: consultations?.length || 0,
          upcoming: consultations?.filter(c => new Date(c.scheduled_at) > new Date()).length || 0,
          completed: consultations?.filter(c => c.status === 'completed').length || 0
        }
        return NextResponse.json({ stats })
      }

      default: {
        const { data: consultations, error } = await supabase
          .from('consultations')
          .select('*')
          .eq('student_id', user.id)
          .order('scheduled_at', { ascending: false })

        if (error) throw error
        return NextResponse.json({ consultations: consultations || [] })
      }
    }
  } catch (error: any) {
    console.error('Error fetching consultations:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch consultations' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const supabase = await createClient()

    const { data: consultation, error } = await supabase
      .from('consultations')
      .insert({
        student_id: user.id,
        counsellor_id: body.counsellorId,
        type: body.type,
        scheduled_at: new Date(body.preferredDate + ' ' + body.preferredTime).toISOString(),
        duration_minutes: body.duration || 30,
        notes: body.topic,
        status: 'scheduled'
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      consultation,
      message: 'Consultation booked successfully'
    })
  } catch (error: any) {
    console.error('Error booking consultation:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to book consultation' },
      { status: 500 }
    )
  }
}
