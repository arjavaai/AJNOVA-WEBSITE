import { NextRequest, NextResponse } from 'next/server'
import { getUser } from '@/lib/auth'
import { sendEmail, EmailTemplate } from '@/lib/email'

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
    const { template, data } = body as { template: EmailTemplate; data: any }

    if (!template || !data) {
      return NextResponse.json(
        { error: 'Template and data are required' },
        { status: 400 }
      )
    }

    const result = await sendEmail(template, data)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data: result.data })
  } catch (error) {
    console.error('Error in send-email route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
