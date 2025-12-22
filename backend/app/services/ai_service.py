"""
AI service using Google Gemini
Handles document generation with AI
"""

import google.generativeai as genai
from typing import Dict, Any, Optional

from app.config import settings
from app.models.profile import ProfileInDB


class AIService:
    """AI service for document generation"""
    
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel(settings.GEMINI_MODEL)
    
    def generate_sop(
        self,
        profile: ProfileInDB,
        university: str,
        program: str,
        additional_info: Optional[str] = None
    ) -> str:
        """Generate Statement of Purpose"""
        prompt = f"""
Generate a professional Statement of Purpose for a Master's program in {program} at {university}.

Student Profile:
- Name: {profile.first_name} {profile.last_name}
- Academic Background: {profile.highest_qualification} in {profile.field_of_study}
- Institution: {profile.institution_name}
- Country: {profile.country_of_education}
- CGPA: {profile.cgpa_percentage} {profile.cgpa_type or ''}
- Graduation Year: {profile.graduation_year}
- Work Experience: {profile.work_experience_years or 'None'}
- English Score: {profile.english_test_type} - {profile.english_score}
- German Level: {profile.german_level or 'Not specified'}

Additional Context: {additional_info or 'None provided'}

Requirements:
- Length: 800-1200 words
- Format: Academic style with clear paragraphs
- Structure: Introduction → Academic Background → Work Experience → Why This Program → Career Goals → Conclusion
- Tone: Professional, enthusiastic, genuine
- Focus: Connect past experiences to future goals and explain why this specific program at this university

Generate a compelling SOP that showcases the student's unique qualifications and passion for the program:
"""
        
        response = self.model.generate_content(prompt)
        return response.text
    
    def generate_resume(
        self,
        profile: ProfileInDB,
        additional_info: Optional[str] = None
    ) -> str:
        """Generate professional resume"""
        prompt = f"""
Generate a professional academic resume/CV for a student applying to German universities.

Student Information:
- Name: {profile.first_name} {profile.middle_name or ''} {profile.last_name}
- Email: Available in profile
- Phone: {profile.mobile_number}
- Nationality: {profile.nationality}

Education:
- Degree: {profile.highest_qualification}
- Field: {profile.field_of_study}
- Institution: {profile.institution_name}
- Country: {profile.country_of_education}
- CGPA: {profile.cgpa_percentage} {profile.cgpa_type or ''}
- Year: {profile.graduation_year}

Language Skills:
- English: {profile.english_test_type} - {profile.english_score}
- German: {profile.german_level or 'Beginner'}

Work Experience: {profile.work_experience_years or 'None'}

Additional Information: {additional_info or 'None'}

Generate a well-formatted resume with sections: Personal Information, Education, Work Experience (if any), Skills, Language Proficiency, Certifications (if mentioned), and Interests.

Use a clean, professional format suitable for German university applications.
"""
        
        response = self.model.generate_content(prompt)
        return response.text
    
    def generate_lor(
        self,
        profile: ProfileInDB,
        recommender_name: str,
        recommender_title: str,
        relationship: str,
        additional_info: Optional[str] = None
    ) -> str:
        """Generate Letter of Recommendation"""
        prompt = f"""
Generate a professional Letter of Recommendation for a student applying to German universities.

Student: {profile.first_name} {profile.last_name}
Recommender: {recommender_name}, {recommender_title}
Relationship: {relationship}

Student Background:
- Academic: {profile.highest_qualification} in {profile.field_of_study}
- Institution: {profile.institution_name}
- CGPA: {profile.cgpa_percentage}
- Work Experience: {profile.work_experience_years or 'None'}

Additional Context: {additional_info or 'None'}

Generate a strong letter that:
1. Establishes recommender's credentials and relationship with student
2. Highlights specific examples of student's abilities and achievements
3. Discusses academic performance, research potential, and personal qualities
4. Provides enthusiastic endorsement for graduate studies
5. Maintains professional tone throughout

Format as a formal business letter with proper structure.
"""
        
        response = self.model.generate_content(prompt)
        return response.text
    
    def generate_cover_letter(
        self,
        profile: ProfileInDB,
        university: str,
        program: str,
        additional_info: Optional[str] = None
    ) -> str:
        """Generate cover letter"""
        prompt = f"""
Generate a professional cover letter for a university application to {program} at {university}.

Student: {profile.first_name} {profile.last_name}
Background: {profile.highest_qualification} in {profile.field_of_study}
From: {profile.country_of_residence}

Academic Credentials:
- Institution: {profile.institution_name}
- CGPA: {profile.cgpa_percentage}
- English: {profile.english_test_type} - {profile.english_score}
- German: {profile.german_level or 'Learning'}

Additional Information: {additional_info or 'None'}

Generate a concise, professional cover letter (300-400 words) that:
1. Introduces the student and their application
2. Briefly highlights key qualifications
3. Expresses genuine interest in the program
4. Mentions why Germany/this university
5. Closes with appropriate call to action

Format as a formal business letter.
"""
        
        response = self.model.generate_content(prompt)
        return response.text
    
    async def generate_document(
        self,
        document_type: str,
        profile: ProfileInDB,
        university: str,
        program: str,
        additional_info: Optional[str] = None,
        **kwargs
    ) -> str:
        """
        Generate document based on type
        
        Args:
            document_type: One of 'sop', 'resume', 'lor', 'cover_letter'
            profile: Student profile
            university: University name
            program: Program name
            additional_info: Additional context
            **kwargs: Additional arguments for specific document types
        
        Returns:
            Generated document text
        """
        if document_type == "sop":
            return self.generate_sop(profile, university, program, additional_info)
        elif document_type == "resume":
            return self.generate_resume(profile, additional_info)
        elif document_type == "lor":
            recommender_name = kwargs.get("recommender_name", "Professor")
            recommender_title = kwargs.get("recommender_title", "Associate Professor")
            relationship = kwargs.get("relationship", "Academic Supervisor")
            return self.generate_lor(
                profile, recommender_name, recommender_title, relationship, additional_info
            )
        elif document_type == "cover_letter":
            return self.generate_cover_letter(profile, university, program, additional_info)
        else:
            raise ValueError(f"Unsupported document type: {document_type}")
























