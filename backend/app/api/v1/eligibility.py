"""
Eligibility checker endpoints
"""

from fastapi import APIRouter, Depends, HTTPException
from supabase import Client

from app.dependencies import get_supabase, get_current_user
from app.models.eligibility import EligibilityCheckRequest, EligibilityResponse, EligibilityResult

router = APIRouter()


def calculate_eligibility(request: EligibilityCheckRequest) -> EligibilityResult:
    """Calculate eligibility score and recommendations"""
    score = 0
    recommendations = []
    warnings = []
    eligible_programs = []
    improvement_areas = []
    
    # CGPA evaluation
    if request.cgpa_percentage >= 70:
        score += 25
        eligible_programs.append("Most Master's programs")
    elif request.cgpa_percentage >= 60:
        score += 15
        eligible_programs.append("Many Master's programs")
        warnings.append("Some top universities require 70%+ CGPA")
    else:
        score += 5
        warnings.append("Low CGPA may limit program options")
        improvement_areas.append("Consider programs with flexible CGPA requirements")
    
    # English test evaluation
    english_score_map = {
        "IELTS": (6.5, 7.0),
        "TOEFL": (85, 100),
        "PTE": (58, 65)
    }
    
    if request.english_test_type in english_score_map:
        min_score, good_score = english_score_map[request.english_test_type]
        if request.english_score >= good_score:
            score += 25
        elif request.english_score >= min_score:
            score += 15
            recommendations.append("Consider retaking English test for better scores")
        else:
            score += 5
            warnings.append(f"English score below minimum for most programs ({min_score})")
            improvement_areas.append("Improve English language proficiency")
    
    # Work experience
    if request.work_experience_years in ["2-5 years", "5+ years"]:
        score += 20
        recommendations.append("Strong work experience enhances application")
    elif request.work_experience_years == "1-2 years":
        score += 10
    else:
        score += 5
        recommendations.append("Internships or projects can strengthen application")
    
    # German language
    if request.german_level and request.german_level in ["B1", "B2", "C1", "C2"]:
        score += 15
        recommendations.append("Good German skills increase program options")
    else:
        score += 5
        recommendations.append("Learning German (at least A2/B1) is highly recommended")
        improvement_areas.append("Start learning German language")
    
    # Field relevance
    if request.field_of_study.lower() in request.preferred_program.lower():
        score += 15
        recommendations.append("Strong academic background for chosen program")
    else:
        score += 5
        warnings.append("Different academic background may require additional qualifications")
    
    # Determine eligibility
    eligible = score >= 60
    
    if eligible:
        recommendations.append("You have good chances for German university admission")
        recommendations.append("Focus on preparing strong SOP and LORs")
    else:
        recommendations.append("Consider strengthening your profile before applying")
        improvement_areas.append("Focus on improving weak areas identified above")
    
    return EligibilityResult(
        eligible=eligible,
        score=score,
        recommendations=recommendations,
        warnings=warnings,
        eligible_programs=eligible_programs,
        improvement_areas=improvement_areas
    )


@router.post("/check", response_model=EligibilityResponse)
async def check_eligibility(
    request: EligibilityCheckRequest,
    current_user = Depends(get_current_user),
    supabase: Client = Depends(get_supabase)
):
    """Check student eligibility for German universities"""
    # Calculate eligibility
    result = calculate_eligibility(request)
    
    # Save to database
    eligibility_data = {
        "student_id": str(current_user.id),
        "request_data": request.dict(),
        **result.dict()
    }
    
    response = supabase.table("eligibility_checks").insert(eligibility_data).execute()
    
    return EligibilityResponse(**response.data[0])


@router.get("/me", response_model=EligibilityResponse)
async def get_my_eligibility(
    current_user = Depends(get_current_user),
    supabase: Client = Depends(get_supabase)
):
    """Get latest eligibility check result"""
    response = supabase.table("eligibility_checks").select("*").eq(
        "student_id", str(current_user.id)
    ).order("created_at", desc=True).limit(1).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="No eligibility check found")
    
    return EligibilityResponse(**response.data[0])


















