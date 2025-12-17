/**
 * Profile PDF Export Utility
 * Generate professional PDF export of student profile
 */

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

interface ProfileData {
  personalInfo?: {
    firstName?: string
    middleName?: string
    lastName?: string
    gender?: string
    dateOfBirth?: Date
    nationality?: string
    countryOfResidence?: string
    passportNumber?: string
    passportExpiry?: Date
  }
  contactPreferences?: {
    email?: string
    mobileNumber?: string
    preferredIntake?: string
    studyLevel?: string
    preferredProgram?: string
  }
  education?: Array<{
    level?: string
    fieldOfStudy: string
    institution: string
    country?: string
    graduationYear?: number
    scoreType: 'CGPA' | 'PERCENTAGE'
    score?: number
    mediumOfInstruction?: string
  }>
  workExperience?: Array<{
    company: string
    position: string
    startDate?: Date | null
    endDate?: Date | null
    isCurrent: boolean
    description?: string
  }>
  languageTests?: {
    englishTest?: string
    englishScore?: number
    germanLevel?: string
  }
}

/**
 * Export student profile to PDF
 */
export async function exportProfileToPDF(profile: ProfileData, filename?: string) {
  const doc = new jsPDF()
  let yPosition = 20

  // Colors
  const primaryColor: [number, number, number] = [37, 99, 235] // Blue
  const secondaryColor: [number, number, number] = [100, 116, 139] // Gray

  // Helper function to add a section header
  const addSectionHeader = (title: string) => {
    doc.setFontSize(14)
    doc.setTextColor(...primaryColor)
    doc.setFont('helvetica', 'bold')
    doc.text(title, 20, yPosition)
    yPosition += 2

    // Underline
    doc.setDrawColor(...primaryColor)
    doc.setLineWidth(0.5)
    doc.line(20, yPosition, 190, yPosition)
    yPosition += 8
  }

  // Add logo/header
  doc.setFontSize(20)
  doc.setTextColor(...primaryColor)
  doc.setFont('helvetica', 'bold')
  doc.text('AJ NOVA', 20, yPosition)

  doc.setFontSize(10)
  doc.setTextColor(...secondaryColor)
  doc.setFont('helvetica', 'normal')
  doc.text('Student Profile', 20, yPosition + 6)

  yPosition += 20

  // Generated date
  doc.setFontSize(9)
  doc.setTextColor(150, 150, 150)
  const generatedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  doc.text(`Generated on ${generatedDate}`, 20, yPosition)
  yPosition += 15

  // 1. Personal Information
  if (profile.personalInfo) {
    addSectionHeader('Personal Information')

    const personalData = [
      ['Full Name', `${profile.personalInfo.firstName || ''} ${profile.personalInfo.middleName || ''} ${profile.personalInfo.lastName || ''}`.trim() || 'Not provided'],
      ['Gender', profile.personalInfo.gender || 'Not provided'],
      ['Date of Birth', profile.personalInfo.dateOfBirth?.toLocaleDateString() || 'Not provided'],
      ['Nationality', profile.personalInfo.nationality || 'Not provided'],
      ['Country of Residence', profile.personalInfo.countryOfResidence || 'Not provided'],
      ['Passport Number', profile.personalInfo.passportNumber || 'Not provided'],
      ['Passport Expiry', profile.personalInfo.passportExpiry?.toLocaleDateString() || 'Not provided'],
    ]

    autoTable(doc, {
      startY: yPosition,
      head: [],
      body: personalData,
      theme: 'plain',
      styles: { fontSize: 10, cellPadding: 3 },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 60 },
        1: { cellWidth: 110 },
      },
    })

    yPosition = (doc as any).lastAutoTable.finalY + 10
  }

  // 2. Contact & Preferences
  if (profile.contactPreferences) {
    if (yPosition > 250) {
      doc.addPage()
      yPosition = 20
    }

    addSectionHeader('Contact & Study Preferences')

    const contactData = [
      ['Email', profile.contactPreferences.email || 'Not provided'],
      ['Mobile Number', profile.contactPreferences.mobileNumber || 'Not provided'],
      ['Preferred Intake', profile.contactPreferences.preferredIntake || 'Not provided'],
      ['Study Level', profile.contactPreferences.studyLevel || 'Not provided'],
      ['Preferred Program', profile.contactPreferences.preferredProgram || 'Not provided'],
    ]

    autoTable(doc, {
      startY: yPosition,
      head: [],
      body: contactData,
      theme: 'plain',
      styles: { fontSize: 10, cellPadding: 3 },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 60 },
        1: { cellWidth: 110 },
      },
    })

    yPosition = (doc as any).lastAutoTable.finalY + 10
  }

  // 3. Academic Background
  if (profile.education && profile.education.length > 0) {
    if (yPosition > 220) {
      doc.addPage()
      yPosition = 20
    }

    addSectionHeader('Academic Background')

    profile.education.forEach((edu, index) => {
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 20
      }

      const eduData = [
        ['Qualification', edu.level || 'Not specified'],
        ['Field of Study', edu.fieldOfStudy],
        ['Institution', edu.institution],
        ['Country', edu.country || 'Not specified'],
        ['Graduation Year', edu.graduationYear?.toString() || 'Not specified'],
        ['Score', edu.score ? `${edu.score} (${edu.scoreType})` : 'Not specified'],
        ['Medium', edu.mediumOfInstruction || 'Not specified'],
      ]

      if (index > 0) yPosition += 5

      doc.setFontSize(11)
      doc.setTextColor(...primaryColor)
      doc.setFont('helvetica', 'bold')
      doc.text(`Education #${index + 1}`, 20, yPosition)
      yPosition += 6

      autoTable(doc, {
        startY: yPosition,
        head: [],
        body: eduData,
        theme: 'plain',
        styles: { fontSize: 9, cellPadding: 2 },
        columnStyles: {
          0: { fontStyle: 'bold', cellWidth: 50 },
          1: { cellWidth: 120 },
        },
      })

      yPosition = (doc as any).lastAutoTable.finalY + 5
    })

    yPosition += 5
  }

  // 4. Work Experience
  if (profile.workExperience && profile.workExperience.length > 0) {
    if (yPosition > 220) {
      doc.addPage()
      yPosition = 20
    }

    addSectionHeader('Work Experience')

    profile.workExperience.forEach((work, index) => {
      if (yPosition > 240) {
        doc.addPage()
        yPosition = 20
      }

      const duration = work.isCurrent
        ? `${work.startDate?.toLocaleDateString() || 'N/A'} - Present`
        : `${work.startDate?.toLocaleDateString() || 'N/A'} - ${work.endDate?.toLocaleDateString() || 'N/A'}`

      doc.setFontSize(11)
      doc.setTextColor(...primaryColor)
      doc.setFont('helvetica', 'bold')
      doc.text(work.position, 20, yPosition)
      yPosition += 5

      doc.setFontSize(10)
      doc.setTextColor(...secondaryColor)
      doc.setFont('helvetica', 'normal')
      doc.text(work.company, 20, yPosition)
      yPosition += 5

      doc.setFontSize(9)
      doc.setTextColor(100, 100, 100)
      doc.text(duration, 20, yPosition)
      yPosition += 5

      if (work.description) {
        doc.setFontSize(9)
        doc.setTextColor(60, 60, 60)
        const splitDescription = doc.splitTextToSize(work.description, 170)
        doc.text(splitDescription, 20, yPosition)
        yPosition += splitDescription.length * 4 + 8
      } else {
        yPosition += 5
      }
    })
  }

  // Footer on all pages
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(150, 150, 150)
    doc.text(
      `AJ NOVA - Student Profile | Page ${i} of ${pageCount}`,
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    )
  }

  // Save the PDF
  const fullName = `${profile.personalInfo?.firstName || ''} ${profile.personalInfo?.lastName || ''}`.trim()
  const pdfFilename = filename || `${fullName || 'Profile'}_AJNova.pdf`
  doc.save(pdfFilename)
}

/**
 * Get profile completion percentage
 */
export function calculateProfileCompletion(profile: ProfileData): number {
  let completed = 0
  let total = 0

  // Personal Info (7 fields)
  total += 7
  if (profile.personalInfo) {
    if (profile.personalInfo.firstName) completed++
    if (profile.personalInfo.lastName) completed++
    if (profile.personalInfo.gender) completed++
    if (profile.personalInfo.dateOfBirth) completed++
    if (profile.personalInfo.nationality) completed++
    if (profile.personalInfo.passportNumber) completed++
    if (profile.personalInfo.passportExpiry) completed++
  }

  // Contact (2 essential fields)
  total += 2
  if (profile.contactPreferences?.email) completed++
  if (profile.contactPreferences?.mobileNumber) completed++

  // Education (at least 1 entry)
  total += 1
  if (profile.education && profile.education.length > 0) completed++

  // Study preferences (2 fields)
  total += 2
  if (profile.contactPreferences?.preferredIntake) completed++
  if (profile.contactPreferences?.studyLevel) completed++

  return Math.round((completed / total) * 100)
}
