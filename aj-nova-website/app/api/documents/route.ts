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
    const type = searchParams.get('type')
    const status = searchParams.get('status')

    // Check if user is admin/counsellor
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    const isAdmin = userData?.role === 'admin' || userData?.role === 'counsellor'

    // Build query
    let query = supabase
      .from('documents')
      .select('*')

    // If not admin, filter by student_id
    if (!isAdmin) {
      query = query.eq('student_id', user.id)
    }

    query = query.order('created_at', { ascending: false })

    // Filter by type if provided
    if (type) {
      query = query.eq('type', type)
    }

    // Filter by status if provided (for admin)
    if (status) {
      if (status === 'pending') {
        query = query.in('status', ['SUBMITTED', 'UNDER_REVIEW'])
      } else {
        query = query.eq('status', status.toUpperCase())
      }
    }

    const { data: documents, error } = await query

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ documents })
  } catch (error) {
    console.error('Error fetching documents:', error)
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

    const supabase = await createClient()
    const body = await request.json()

    const { data: document, error } = await supabase
      .from('documents')
      .insert({
        student_id: user.id,
        ...body
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ document })
  } catch (error) {
    console.error('Error creating document:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
