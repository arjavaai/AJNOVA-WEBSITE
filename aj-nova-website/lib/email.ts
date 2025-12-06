import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@ajnova.com'

export type EmailTemplate =
  | 'welcome'
  | 'consultation-confirmed'
  | 'document-ready'
  | 'application-status'
  | 'aps-reminder'

interface EmailData {
  to: string
  subject: string
  html: string
}

export async function sendEmail(template: EmailTemplate, data: any) {
  try {
    const emailData = getEmailTemplate(template, data)

    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html,
    })

    return { success: true, data: response }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error }
  }
}

function getEmailTemplate(template: EmailTemplate, data: any): EmailData {
  switch (template) {
    case 'welcome':
      return {
        to: data.email,
        subject: 'Welcome to AJ NOVA!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2563eb;">Welcome to AJ NOVA, ${data.name}!</h1>
            <p>Thank you for joining AJ NOVA. We're excited to help you achieve your study abroad dreams.</p>
            <p>You can now:</p>
            <ul>
              <li>Complete your profile</li>
              <li>Book consultations</li>
              <li>Upload documents</li>
              <li>Track your applications</li>
            </ul>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard"
               style="display: inline-block; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0;">
              Go to Dashboard
            </a>
            <p>If you have any questions, feel free to reach out to our support team.</p>
            <p>Best regards,<br>The AJ NOVA Team</p>
          </div>
        `,
      }

    case 'consultation-confirmed':
      return {
        to: data.email,
        subject: 'Consultation Confirmed',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2563eb;">Consultation Confirmed</h1>
            <p>Hi ${data.name},</p>
            <p>Your consultation has been confirmed for:</p>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Date:</strong> ${data.date}</p>
              <p><strong>Time:</strong> ${data.time}</p>
              <p><strong>Type:</strong> ${data.type}</p>
              ${data.meetingLink ? `<p><strong>Meeting Link:</strong> <a href="${data.meetingLink}">${data.meetingLink}</a></p>` : ''}
            </div>
            <p>Our counsellor will discuss your study abroad plans and answer any questions you may have.</p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/consultations"
               style="display: inline-block; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0;">
              View Consultation
            </a>
            <p>Best regards,<br>The AJ NOVA Team</p>
          </div>
        `,
      }

    case 'document-ready':
      return {
        to: data.email,
        subject: 'Your Document is Ready',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2563eb;">Your Document is Ready!</h1>
            <p>Hi ${data.name},</p>
            <p>Great news! Your ${data.documentType} has been generated and is ready for download.</p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/documents"
               style="display: inline-block; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0;">
              View Document
            </a>
            <p>Please review the document and let us know if you need any changes.</p>
            <p>Best regards,<br>The AJ NOVA Team</p>
          </div>
        `,
      }

    case 'application-status':
      return {
        to: data.email,
        subject: `Application Status Update: ${data.status}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2563eb;">Application Status Update</h1>
            <p>Hi ${data.name},</p>
            <p>Your application to <strong>${data.university}</strong> for <strong>${data.program}</strong> has been updated.</p>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>New Status:</strong> ${data.status}</p>
              ${data.note ? `<p><strong>Note:</strong> ${data.note}</p>` : ''}
            </div>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/applications/${data.applicationId}"
               style="display: inline-block; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0;">
              View Application
            </a>
            <p>Best regards,<br>The AJ NOVA Team</p>
          </div>
        `,
      }

    case 'aps-reminder':
      return {
        to: data.email,
        subject: 'APS Appointment Reminder',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2563eb;">APS Appointment Reminder</h1>
            <p>Hi ${data.name},</p>
            <p>This is a reminder about your upcoming APS appointment:</p>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Date:</strong> ${data.date}</p>
              <p><strong>Time:</strong> ${data.time}</p>
              <p><strong>Location:</strong> ${data.location}</p>
            </div>
            <p>Make sure to bring all required documents.</p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/aps"
               style="display: inline-block; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0;">
              View Details
            </a>
            <p>Best regards,<br>The AJ NOVA Team</p>
          </div>
        `,
      }

    default:
      throw new Error(`Unknown email template: ${template}`)
  }
}
