/**
 * Motivational Messages System
 * Professional & Encouraging tone for student dashboard
 */

export const motivationalMessages = {
  // Welcome messages
  welcome: {
    morning: (name: string) => `Good morning, ${name}! Ready to take the next step in your journey?`,
    afternoon: (name: string) => `Good afternoon, ${name}! Keep up the great progress.`,
    evening: (name: string) => `Good evening, ${name}! You're doing excellent work.`,
    default: (name: string) => `Welcome back, ${name}!`,
  },

  // Profile completion
  profile: {
    incomplete: (name: string, percentage: number) =>
      `${name}, you're ${percentage}% there! Complete your profile to unlock all features.`,
    almostComplete: (name: string) =>
      `Almost there, ${name}! Just a few more fields to complete your profile.`,
    complete: (name: string) =>
      `Fantastic work, ${name}! Your profile is 100% complete.`,
    verified: (name: string) =>
      `Great news, ${name}! Your profile has been verified by our counsellors.`,
  },

  // APS Form
  aps: {
    notStarted: 'Begin your APS verification to take the first step toward German universities.',
    draft: (percentage: number) =>
      `You're ${percentage}% through your APS form. Keep going!`,
    submitted: 'Your APS form has been submitted successfully. Our team is reviewing it.',
    underReview: 'Your APS documents are under review. We'll notify you once complete.',
    verified: (name: string) =>
      `Great progress, ${name}! Your APS verification is complete.`,
    needsCorrection: (name: string) =>
      `${name}, please check your APS form. Small corrections are needed.`,
  },

  // Documents
  documents: {
    notStarted: 'Use our AI to generate professional admission documents.',
    draft: (docType: string) =>
      `Your ${docType} draft is ready for review. Edit and refine as needed.`,
    submitted: (docType: string) =>
      `Your ${docType} has been submitted for counsellor review.`,
    approved: (name: string, docType: string) =>
      `Well done, ${name}! Your ${docType} has been approved.`,
    needsRevision: (docType: string) =>
      `Your ${docType} needs minor revisions. Check counsellor comments for guidance.`,
    allApproved: (name: string) =>
      `Excellent, ${name}! All your documents have been approved.`,
  },

  // Applications
  applications: {
    noApplications: 'Ready to apply? Start your first university application today.',
    submitted: (university: string) =>
      `Application to ${university} submitted successfully!`,
    accepted: (name: string, university: string) =>
      `Congratulations, ${name}! You've been accepted to ${university}!`,
    inProgress: (count: number) =>
      `You have ${count} application${count > 1 ? 's' : ''} in progress. Keep going!`,
  },

  // Consultations
  consultations: {
    booked: (counsellor: string, date: string) =>
      `Your consultation with ${counsellor} is confirmed for ${date}.`,
    upcoming: (hours: number) =>
      `Reminder: Your consultation is in ${hours} ${hours > 1 ? 'hours' : 'hour'}.`,
    completed: 'Thank you for your consultation. We hope it was helpful!',
    feedback: 'How was your consultation? Your feedback helps us improve.',
  },

  // Messages
  messages: {
    newMessage: (counsellor: string) =>
      `New message from ${counsellor}. Check your inbox.`,
    replied: 'Your message has been sent successfully.',
    resolved: 'Great! Your question has been answered.',
  },

  // Eligibility
  eligibility: {
    eligible: (name: string) =>
      `Great news, ${name}! You're eligible for public universities in Germany.`,
    conditional: (name: string) =>
      `${name}, you're eligible for private universities. Improve your profile for public university access.`,
    needsImprovement: (name: string) =>
      `${name}, let's work on improving your profile. Book a consultation for guidance.`,
    highScore: (score: number) =>
      `Excellent! Your readiness score is ${score}%. You're well-prepared.`,
  },

  // General encouragement
  encouragement: [
    'Every step brings you closer to your German education dream.',
    'Progress is built one step at a time — keep going!',
    'Your dedication is impressive. Stay focused on your goals.',
    'You're on the right path. Trust the process.',
    'Great things take time. You're making excellent progress.',
  ],

  // Milestones
  milestones: {
    firstLogin: (name: string) =>
      `Welcome to AJ NOVA, ${name}! We're excited to help you achieve your German education goals.`,
    profileComplete: (name: string) =>
      `Milestone achieved, ${name}! Your complete profile opens new opportunities.`,
    firstDocument: 'You've generated your first document! You're making real progress.',
    allDocuments: (name: string) =>
      `Amazing, ${name}! You've completed all required documents.`,
    firstApplication: 'Your first application is submitted. The journey begins!',
    apsVerified: (name: string) =>
      `Congratulations, ${name}! APS verification complete — a major milestone.`,
  },

  // Errors & Guidance (Calm, not harsh)
  guidance: {
    missingInfo: 'Please provide all required information to continue.',
    fileUploadError: 'Please check your file format and try uploading again.',
    formError: 'Please review the form and correct any highlighted fields.',
    saveSuccess: 'Your changes have been saved successfully.',
    updateSuccess: 'Update complete! Your information is current.',
  },
}

/**
 * Get time-based welcome message
 */
export function getWelcomeMessage(name: string): string {
  const hour = new Date().getHours()

  if (hour < 12) {
    return motivationalMessages.welcome.morning(name)
  } else if (hour < 17) {
    return motivationalMessages.welcome.afternoon(name)
  } else if (hour < 21) {
    return motivationalMessages.welcome.evening(name)
  } else {
    return motivationalMessages.welcome.default(name)
  }
}

/**
 * Get random encouragement quote
 */
export function getRandomEncouragement(): string {
  const quotes = motivationalMessages.encouragement
  return quotes[Math.floor(Math.random() * quotes.length)]
}

/**
 * Get profile completion message based on percentage
 */
export function getProfileMessage(name: string, percentage: number): string {
  if (percentage === 100) {
    return motivationalMessages.profile.complete(name)
  } else if (percentage >= 80) {
    return motivationalMessages.profile.almostComplete(name)
  } else {
    return motivationalMessages.profile.incomplete(name, percentage)
  }
}

/**
 * Get document status message
 */
export function getDocumentMessage(
  name: string,
  docType: string,
  status: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'NEEDS_REVISION'
): string {
  switch (status) {
    case 'DRAFT':
      return motivationalMessages.documents.draft(docType)
    case 'SUBMITTED':
      return motivationalMessages.documents.submitted(docType)
    case 'APPROVED':
      return motivationalMessages.documents.approved(name, docType)
    case 'NEEDS_REVISION':
      return motivationalMessages.documents.needsRevision(docType)
  }
}

/**
 * Get APS status message
 */
export function getAPSMessage(
  name: string,
  status: 'NOT_STARTED' | 'DRAFT' | 'SUBMITTED' | 'UNDER_REVIEW' | 'VERIFIED' | 'NEEDS_CORRECTION',
  percentage?: number
): string {
  switch (status) {
    case 'NOT_STARTED':
      return motivationalMessages.aps.notStarted
    case 'DRAFT':
      return motivationalMessages.aps.draft(percentage || 0)
    case 'SUBMITTED':
      return motivationalMessages.aps.submitted
    case 'UNDER_REVIEW':
      return motivationalMessages.aps.underReview
    case 'VERIFIED':
      return motivationalMessages.aps.verified(name)
    case 'NEEDS_CORRECTION':
      return motivationalMessages.aps.needsCorrection(name)
  }
}

/**
 * Format document type for display
 */
export function formatDocumentType(type: string): string {
  const types: Record<string, string> = {
    SOP: 'Statement of Purpose',
    LOR: 'Letter of Recommendation',
    RESUME: 'Resume',
    COVER_LETTER: 'Cover Letter',
  }
  return types[type] || type
}
