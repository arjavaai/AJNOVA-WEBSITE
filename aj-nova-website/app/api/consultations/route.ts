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

  // Check if user is admin/counsellor
  const { data: userData } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  const isAdmin = userData?.role === 'admin' || userData?.role === 'counsellor'

  try {
    switch (type) {
      case 'upcoming': {
        let query = supabase
          .from('consultations')
          .select('*')
          .gte('scheduled_at', new Date().toISOString())
          .order('scheduled_at', { ascending: true })

        if (!isAdmin) {
          query = query.eq('student_id', user.id)
        }

        const { data: consultations, error } = await query

        if (error) throw error
        return NextResponse.json({ consultations: consultations || [] })
      }

      case 'history': {
        let query = supabase
          .from('consultations')
          .select('*')
          .lt('scheduled_at', new Date().toISOString())
          .order('scheduled_at', { ascending: false })

        if (!isAdmin) {
          query = query.eq('student_id', user.id)
        }

        const { data: consultations, error } = await query

        if (error) throw error
        return NextResponse.json({ consultations: consultations || [] })
      }

      case 'stats': {
        let query = supabase
          .from('consultations')
          .select('*')

        if (!isAdmin) {
          query = query.eq('student_id', user.id)
        }

        const { data: consultations, error } = await query

        if (error) throw error

        const stats = {
          total: consultations?.length || 0,
          upcoming: consultations?.filter(c => new Date(c.scheduled_at) > new Date()).length || 0,
          completed: consultations?.filter(c => c.status === 'completed').length || 0
        }
        return NextResponse.json({ stats })
      }

      default: {
        let query = supabase
          .from('consultations')
          .select('*')

        if (!isAdmin) {
          query = query.eq('student_id', user.id)
        }

        const { data: consultations, error } = await query
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
