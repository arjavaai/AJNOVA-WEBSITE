import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getUser } from '@/lib/auth'

function calculateCompletionPercentage(form: any): number {
  const requiredFields = [
    'full_name', 'date_of_birth', 'place_of_birth', 'nationality', 'passport_number',
    'highest_degree', 'institution_name', 'graduation_date', 'field_of_study',
    'grading_system', 'grade_obtained', 'english_test', 'english_score'
  ]

  const completedFields = requiredFields.filter(field => {
    const value = form[field]
    return value !== null && value !== undefined && value !== ''
  }).length

  return Math.round((completedFields / requiredFields.length) * 100)
}

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
    const { data: form, error } = await supabase
      .from('aps_forms')
      .select('*')
      .eq('student_id', user.id)
      .single()

    if (error && error.code !== 'PGRST116') {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    // If no form exists, create one
    if (!form) {
      const { data: newForm, error: createError } = await supabase
        .from('aps_forms')
        .insert({
          student_id: user.id,
          status: 'draft',
          completion_percentage: 0
        })
        .select()
        .single()

      if (createError) {
        return NextResponse.json(
          { error: createError.message },
          { status: 500 }
        )
      }

      return NextResponse.json({ form: newForm })
    }

    return NextResponse.json({ form })
  } catch (error) {
    console.error('Error fetching APS form:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const updates = await request.json()
    const supabase = await createClient()

    // Get current form to calculate completion
    const { data: currentForm } = await supabase
      .from('aps_forms')
      .select('*')
      .eq('student_id', user.id)
      .single()

    const updatedForm = { ...currentForm, ...updates }
    const completionPercentage = calculateCompletionPercentage(updatedForm)

    const { data: form, error } = await supabase
      .from('aps_forms')
      .update({
        ...updates,
        completion_percentage: completionPercentage,
        updated_at: new Date().toISOString()
      })
      .eq('student_id', user.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ form })
  } catch (error: any) {
    console.error('Error updating APS form:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update APS form' },
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

    const updates = await request.json()
    const supabase = await createClient()

    // Get current form
    const { data: currentForm } = await supabase
      .from('aps_forms')
      .select('*')
      .eq('student_id', user.id)
      .single()

    const updatedForm = { ...currentForm, ...updates }
    const completionPercentage = calculateCompletionPercentage(updatedForm)

    // Mark as submitted
    const { data: form, error } = await supabase
      .from('aps_forms')
      .update({
        ...updates,
        status: 'submitted',
        completion_percentage: completionPercentage,
        submitted_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('student_id', user.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      form,
      message: 'APS form submitted successfully'
    })
  } catch (error: any) {
    console.error('Error submitting APS form:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to submit APS form' },
      { status: 500 }
    )
  }
}
