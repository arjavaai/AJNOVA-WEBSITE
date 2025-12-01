import { GoogleGenerativeAI } from '@google/generative-ai'

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not set in environment variables')
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export const geminiModel = genAI.getGenerativeModel({ model: 'gemini-pro' })

export async function generateDocument(
  documentType: 'SOP' | 'LOR' | 'RESUME' | 'COVER_LETTER',
  profileData: any,
  additionalInfo?: any
): Promise<string> {
  const prompt = buildPrompt(documentType, profileData, additionalInfo)
  
  try {
    const result = await geminiModel.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Error generating document:', error)
    throw new Error('Failed to generate document')
  }
}

function buildPrompt(
  documentType: string,
  profileData: any,
  additionalInfo?: any
): string {
  const baseInfo = `
Student Profile:
- Name: ${profileData.name || 'Not provided'}
- Email: ${profileData.email || 'Not provided'}
- Phone: ${profileData.phone || 'Not provided'}
- Education: ${profileData.education || 'Not provided'}
- Work Experience: ${profileData.workExperience || 'Not provided'}
- Skills: ${profileData.skills?.join(', ') || 'Not provided'}
- Language Proficiency: ${profileData.languageScores || 'Not provided'}
${additionalInfo?.targetUniversity ? `- Target University: ${additionalInfo.targetUniversity}` : ''}
${additionalInfo?.targetProgram ? `- Target Program: ${additionalInfo.targetProgram}` : ''}
${additionalInfo?.additionalNotes ? `- Additional Notes: ${additionalInfo.additionalNotes}` : ''}
`

  switch (documentType) {
    case 'SOP':
      return `Generate a professional Statement of Purpose (SOP) for university admission based on the following information:

${baseInfo}

Requirements:
- Length: 800-1200 words
- Structure: Introduction, Academic Background, Professional Experience, Why This Program, Career Goals, Conclusion
- Tone: Professional, enthusiastic, and genuine
- Focus on: Motivation, background, career goals, and program fit
- Make it personal and compelling

Please write a complete, well-structured SOP that stands out.`

    case 'LOR':
      return `Generate a professional Letter of Recommendation (LOR) based on the following information:

${baseInfo}

Requirements:
- Length: 400-600 words
- Structure: Introduction, Student's Qualities, Academic/Professional Performance, Specific Examples, Strong Recommendation
- Tone: Formal, professional, and highly positive
- Perspective: Write as if from a professor or employer
- Include specific examples and achievements

Please write a compelling LOR that strongly recommends the student.`

    case 'RESUME':
      return `Generate a professional academic resume/CV based on the following information:

${baseInfo}

Requirements:
- Format: Academic CV style
- Sections: Education, Work Experience, Skills, Projects, Certifications, Language Proficiency, Achievements
- Tone: Professional and concise
- Use bullet points for clarity
- Highlight achievements and impact

Please write a well-formatted, professional resume. Use clear section headers and bullet points.`

    case 'COVER_LETTER':
      return `Generate a professional Cover Letter for university admission based on the following information:

${baseInfo}

Requirements:
- Length: 300-500 words
- Structure: Opening, Why This Program, Qualifications, Closing
- Tone: Professional and enthusiastic
- Focus on: Program fit and unique qualifications
- Make it specific to the target university/program

Please write a compelling cover letter that demonstrates strong interest and fit.`

    default:
      throw new Error('Invalid document type')
  }
}
