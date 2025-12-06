import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getUser } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const stats = searchParams.get('stats')

    // Get user role to check permissions
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    const isStudent = userData?.role === 'student'
    const isStaff = userData?.role === 'admin' || userData?.role === 'counsellor'

    if (stats === 'true') {
      // Get application statistics
      const query = supabase
        .from('applications')
        .select('status')

      if (isStudent) {
        query.eq('student_id', user.id)
      }

      const { data: applications, error } = await query

      if (error) {
        return NextResponse.json(
          { error: error.message },
          { status: 500 }
        )
      }

      const statistics = {
        total: applications.length,
        draft: applications.filter(a => a.status === 'draft').length,
        applied: applications.filter(a => a.status === 'applied').length,
        under_review: applications.filter(a => a.status === 'under_review').length,
        accepted: applications.filter(a => a.status === 'accepted').length,
        rejected: applications.filter(a => a.status === 'rejected').length
      }

      return NextResponse.json({ stats: statistics })
    }

    // Get applications
    let query = supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false })

    if (isStudent) {
      query = query.eq('student_id', user.id)
    }

    const { data: applications, error } = await query

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ applications })
  } catch (error) {
    console.error('Error fetching applications:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
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

    // Check if user is admin or counsellor
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    const isStaff = userData?.role === 'admin' || userData?.role === 'counsellor'
    const isStudent = userData?.role === 'student'

    // Students can create applications for themselves
    // Staff can create applications for any student
    const studentId = isStudent ? user.id : body.student_id

    if (!studentId) {
      return NextResponse.json(
        { error: 'Student ID is required' },
        { status: 400 }
      )
    }

    const { data: application, error } = await supabase
      .from('applications')
      .insert({
        student_id: studentId,
        counsellor_id: isStaff ? user.id : null,
        ...body,
        timeline: [
          {
            status: body.status || 'draft',
            date: new Date().toISOString(),
            note: 'Application created'
          }
        ]
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ application })
  } catch (error) {
    console.error('Error creating application:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
