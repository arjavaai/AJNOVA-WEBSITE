"""
Admin dashboard endpoints
"""

from fastapi import APIRouter, Depends, HTTPException
from supabase import Client
from typing import List, Dict, Any

from app.dependencies import get_supabase, get_supabase_admin, require_admin, require_counsellor

router = APIRouter()


@router.get("/users")
async def get_all_users(
    role: str = None,
    current_user = Depends(require_admin),
    supabase: Client = Depends(get_supabase_admin)
):
    """Get all users (admin only)"""
    query = supabase.table("users").select("*")

    if role:
        query = query.eq("role", role)

    response = query.order("created_at", desc=True).execute()

    # Return raw data - frontend will handle formatting
    return {"users": response.data, "total": len(response.data)}


@router.get("/students")
async def get_all_students(
    current_user = Depends(require_counsellor),
    supabase: Client = Depends(get_supabase_admin)
):
    """Get all students with profiles (counsellor/admin)"""
    # Get students using admin client to bypass RLS
    users_response = supabase.table("users").select("*").eq("role", "student").execute()
    print(f"[DEBUG] Found {len(users_response.data)} students in database")
    
    students = []
    for user in users_response.data:
        # Get profile for each student
        profile_response = supabase.table("profiles").select("*").eq("user_id", user["id"]).execute()
        
        student_data = {
            **user,
            "profile": profile_response.data[0] if profile_response.data else None
        }
        students.append(student_data)
    
    print(f"[DEBUG] Returning {len(students)} students with profiles")
    return {"students": students}


@router.get("/reviews")
async def get_review_queue(
    current_user = Depends(require_counsellor),
    supabase: Client = Depends(get_supabase_admin)
):
    """Get documents awaiting review (counsellor/admin)"""
    response = supabase.table("documents").select("*").eq(
        "status", "submitted"
    ).order("submitted_at", desc=False).execute()

    return {"documents": response.data, "total": len(response.data)}


@router.get("/leads")
async def get_leads(
    current_user = Depends(require_admin),
    supabase: Client = Depends(get_supabase_admin)
):
    """Get leads/contacts"""
    response = supabase.table("leads").select("*").order("created_at", desc=True).execute()
    
    return {"leads": response.data, "total": len(response.data)}


@router.get("/aps-submissions")
async def get_aps_submissions(
    current_user = Depends(require_admin),
    supabase: Client = Depends(get_supabase_admin)
):
    """Get all APS submissions (admin only)"""
    response = supabase.table("aps_submissions").select("*").order("created_at", desc=True).execute()
    
    return {"submissions": response.data, "total": len(response.data)}


@router.get("/documents")
async def get_all_documents(
    current_user = Depends(require_admin),
    supabase: Client = Depends(get_supabase_admin)
):
    """Get all documents (admin only)"""
    response = supabase.table("documents").select("*").order("created_at", desc=True).execute()
    
    return {"documents": response.data, "total": len(response.data)}


@router.get("/consultations")
async def get_all_consultations(
    current_user = Depends(require_admin),
    supabase: Client = Depends(get_supabase_admin)
):
    """Get all consultations (admin only)"""
    response = supabase.table("consultations").select("*").order("scheduled_at", desc=True).execute()
    
    return {"consultations": response.data, "total": len(response.data)}


@router.get("/applications")
async def get_all_applications(
    current_user = Depends(require_admin),
    supabase: Client = Depends(get_supabase_admin)
):
    """Get all applications (admin only)"""
    response = supabase.table("applications").select("*").order("created_at", desc=True).execute()
    
    return {"applications": response.data, "total": len(response.data)}


@router.get("/analytics")
async def get_analytics(
    days: int = 30,
    current_user = Depends(require_admin),
    supabase: Client = Depends(get_supabase_admin)
):
    """Get comprehensive platform analytics with real data"""
    from datetime import datetime, timedelta, timezone
    from collections import defaultdict

    # Calculate date range (use UTC timezone)
    now = datetime.now(timezone.utc)
    start_date = now - timedelta(days=days)
    start_date_str = start_date.isoformat()

    # Helper function to check if date is in range
    def in_date_range(date_str):
        if not date_str:
            return False
        try:
            date = datetime.fromisoformat(date_str.replace('Z', '+00:00'))
            return date >= start_date
        except:
            return False

    # ============================================
    # 1. BASIC COUNTS (with date filtering)
    # ============================================
    # Get all users and filter by date
    all_users_response = supabase.table("users").select("*").execute()
    users_in_range = [u for u in all_users_response.data if in_date_range(u.get("created_at"))]

    users_count_total = len(all_users_response.data)
    students_count_total = len([u for u in all_users_response.data if u.get("role") == "student"])

    # For time-filtered counts
    users_count = len(users_in_range) if days < 365 else users_count_total
    students_count = len([u for u in users_in_range if u.get("role") == "student"]) if days < 365 else students_count_total

    # Consultations in date range
    all_consultations_response = supabase.table("consultations").select("*").execute()
    consultations_in_range = [c for c in all_consultations_response.data if in_date_range(c.get("created_at"))]
    consultations_count = len(consultations_in_range)

    # ============================================
    # 2. DOCUMENT STATISTICS (with date filtering)
    # ============================================
    all_documents = supabase.table("documents").select("*").execute()
    documents_in_range = [d for d in all_documents.data if in_date_range(d.get("created_at"))]

    doc_stats = {}
    doc_by_type = defaultdict(int)
    total_revisions = 0

    for doc in documents_in_range:
        status = doc.get("status", "unknown")
        doc_stats[status] = doc_stats.get(status, 0) + 1

        doc_type = doc.get("type", "unknown")
        doc_by_type[doc_type] += 1

        # Count revisions if field exists
        if "revision_count" in doc and doc["revision_count"]:
            total_revisions += doc["revision_count"]

    avg_revisions = total_revisions / len(documents_in_range) if len(documents_in_range) > 0 else 0

    # ============================================
    # 3. APPLICATION STATISTICS (with date filtering)
    # ============================================
    all_applications = supabase.table("applications").select("*").execute()
    applications_in_range = [a for a in all_applications.data if in_date_range(a.get("created_at"))]

    app_stats = {}
    for app in applications_in_range:
        status = app.get("status", "unknown")
        app_stats[status] = app_stats.get(status, 0) + 1

    # ============================================
    # 4. APS SUBMISSIONS STATISTICS
    # ============================================
    aps_submissions = supabase.table("aps_submissions").select("*").execute()
    aps_stats = {
        "total": len(aps_submissions.data),
        "verified": 0,
        "pending": 0,
        "draft": 0
    }

    for aps in aps_submissions.data:
        status = aps.get("status", "draft")
        if status == "verified":
            aps_stats["verified"] += 1
        elif status == "submitted" or status == "in_review":
            aps_stats["pending"] += 1
        else:
            aps_stats["draft"] += 1

    # ============================================
    # 5. TIME-SERIES DATA (Dynamic based on time range)
    # ============================================
    # Determine number of periods based on time range
    if days <= 7:
        num_periods = 7  # Daily
        period_type = "day"
    elif days <= 30:
        num_periods = int(days / 7)  # Weekly
        period_type = "week"
    elif days <= 90:
        num_periods = 3  # Monthly
        period_type = "month"
    else:
        num_periods = 6  # 6 months
        period_type = "month"

    # Generate time periods
    monthly_data = []

    for i in range(num_periods - 1, -1, -1):
        if period_type == "day":
            period_date = now - timedelta(days=i)
            period_start = period_date.replace(hour=0, minute=0, second=0, microsecond=0)
            period_end = period_date.replace(hour=23, minute=59, second=59, microsecond=999999)
            label = period_date.strftime("%m/%d")
        elif period_type == "week":
            period_date = now - timedelta(weeks=i)
            # Keep timezone-aware by using replace() carefully
            period_start = (period_date - timedelta(days=period_date.weekday())).replace(hour=0, minute=0, second=0, microsecond=0)
            period_end = period_start + timedelta(days=6, hours=23, minutes=59, seconds=59)
            label = period_start.strftime("W%W")
        else:  # month
            period_date = now - timedelta(days=30*i)
            period_start = period_date.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
            if i == 0:
                period_end = now
            else:
                next_month = period_start + timedelta(days=32)
                period_end = next_month.replace(day=1) - timedelta(seconds=1)
            label = period_date.strftime("%b")

        # Count students registered in this period
        students_in_period = sum(1 for u in all_users_response.data
                               if u.get("role") == "student" and
                               u.get("created_at") and
                               period_start <= datetime.fromisoformat(u["created_at"].replace('Z', '+00:00')) <= period_end)

        # Count applications
        applications_in_period = sum(1 for app in all_applications.data
                                   if app.get("created_at") and
                                   period_start <= datetime.fromisoformat(app["created_at"].replace('Z', '+00:00')) <= period_end)

        # Count consultations
        consultations_in_period = sum(1 for c in all_consultations_response.data
                                    if c.get("created_at") and
                                    period_start <= datetime.fromisoformat(c["created_at"].replace('Z', '+00:00')) <= period_end)

        monthly_data.append({
            "month": label,
            "students": students_in_period,
            "applications": applications_in_period,
            "consultations": consultations_in_period
        })

    # ============================================
    # 6. CONVERSION FUNNEL (Real Data)
    # ============================================
    profiles = supabase.table("profiles").select("*").execute()

    # Try to get eligibility results, handle if table doesn't exist
    try:
        eligibility_checks = supabase.table("eligibility_results").select("user_id").execute()
        eligibility_data = eligibility_checks.data
    except:
        eligibility_data = []

    # Calculate funnel stages (use total counts for funnel)
    total_students = students_count_total or 0
    profiles_completed = sum(1 for p in profiles.data if p.get("first_name") and p.get("last_name") and p.get("email"))
    eligibility_checked = len(set(e.get("user_id") for e in eligibility_data if e.get("user_id")))
    aps_verified = aps_stats["verified"]
    docs_approved = doc_stats.get("approved", 0)
    apps_submitted = app_stats.get("submitted", 0) + app_stats.get("in_review", 0) + app_stats.get("approved", 0)
    enrolled = app_stats.get("enrolled", 0)

    conversion_funnel = [
        {"stage": "Total Students", "count": total_students},
        {"stage": "Profile Completed", "count": profiles_completed},
        {"stage": "Eligibility Checked", "count": eligibility_checked},
        {"stage": "APS Verified", "count": aps_verified},
        {"stage": "Docs Approved", "count": docs_approved},
        {"stage": "Application Submitted", "count": apps_submitted},
        {"stage": "Enrolled", "count": enrolled}
    ]

    # ============================================
    # 7. CONVERSION METRICS
    # ============================================
    conversion_rate = (enrolled / total_students * 100) if total_students > 0 else 0
    profile_completion_rate = (profiles_completed / total_students * 100) if total_students > 0 else 0

    # ============================================
    # 8. MESSAGES & ENGAGEMENT (with date filtering)
    # ============================================
    all_messages = supabase.table("messages").select("*").execute()
    messages_in_range = [m for m in all_messages.data if in_date_range(m.get("created_at"))]

    total_messages = len(messages_in_range)
    student_messages = sum(1 for m in messages_in_range if m.get("sender_role") == "student")
    counsellor_messages = sum(1 for m in messages_in_range if m.get("sender_role") in ["counsellor", "admin"])

    # Calculate average response time (simplified - in real system would be more complex)
    avg_response_time_hours = 0
    if len(messages_in_range) > 1:
        response_times = []
        sorted_messages = sorted(messages_in_range, key=lambda m: m.get("created_at", ""))

        for i in range(1, min(len(sorted_messages), 50)):  # Sample first 50 for performance
            prev_msg = sorted_messages[i-1]
            curr_msg = sorted_messages[i]

            if (prev_msg.get("sender_role") == "student" and
                curr_msg.get("sender_role") in ["counsellor", "admin"]):
                try:
                    prev_time = datetime.fromisoformat(prev_msg["created_at"].replace('Z', '+00:00'))
                    curr_time = datetime.fromisoformat(curr_msg["created_at"].replace('Z', '+00:00'))
                    diff_hours = (curr_time - prev_time).total_seconds() / 3600
                    if diff_hours < 72:  # Only count responses within 72 hours
                        response_times.append(diff_hours)
                except:
                    pass

        avg_response_time_hours = sum(response_times) / len(response_times) if response_times else 0

    # ============================================
    # 9. STUDENT DEMOGRAPHICS
    # ============================================
    countries = defaultdict(int)
    for profile in profiles.data:
        country = profile.get("country") or profile.get("nationality") or "Unknown"
        countries[country] += 1

    # Top 5 countries
    top_countries = sorted(countries.items(), key=lambda x: x[1], reverse=True)[:5]

    # ============================================
    # 10. GROWTH METRICS
    # ============================================
    # Calculate month-over-month growth
    current_month_students = monthly_data[-1]["students"] if monthly_data else 0
    prev_month_students = monthly_data[-2]["students"] if len(monthly_data) > 1 else 0
    student_growth_rate = ((current_month_students - prev_month_students) / prev_month_students * 100) if prev_month_students > 0 else 0

    current_month_apps = monthly_data[-1]["applications"] if monthly_data else 0
    prev_month_apps = monthly_data[-2]["applications"] if len(monthly_data) > 1 else 0
    app_growth_rate = ((current_month_apps - prev_month_apps) / prev_month_apps * 100) if prev_month_apps > 0 else 0

    current_month_consults = monthly_data[-1]["consultations"] if monthly_data else 0
    prev_month_consults = monthly_data[-2]["consultations"] if len(monthly_data) > 1 else 0
    consult_growth_rate = ((current_month_consults - prev_month_consults) / prev_month_consults * 100) if prev_month_consults > 0 else 0

    # ============================================
    # RETURN COMPREHENSIVE ANALYTICS
    # ============================================
    return {
        # Basic counts (filtered by time range)
        "total_users": users_count or 0,
        "total_students": students_count or 0,
        "total_consultations": consultations_count or 0,

        # Document statistics (filtered)
        "document_stats": doc_stats,
        "document_by_type": dict(doc_by_type),
        "total_documents": len(documents_in_range),
        "average_revisions_per_document": round(avg_revisions, 2),

        # Application statistics (filtered)
        "application_stats": app_stats,
        "total_applications": len(applications_in_range),

        # APS statistics
        "aps_stats": aps_stats,

        # Time-series data
        "monthly_trends": monthly_data,

        # Conversion funnel
        "conversion_funnel": conversion_funnel,

        # Conversion metrics
        "conversion_rate": round(conversion_rate, 2),
        "profile_completion_rate": round(profile_completion_rate, 2),

        # Engagement metrics
        "total_messages": total_messages,
        "student_messages": student_messages,
        "counsellor_messages": counsellor_messages,
        "avg_response_time_hours": round(avg_response_time_hours, 2),

        # Demographics
        "top_countries": [{"country": c[0], "count": c[1]} for c in top_countries],

        # Growth rates (month-over-month)
        "growth_rates": {
            "students": round(student_growth_rate, 1),
            "applications": round(app_growth_rate, 1),
            "documents": round(app_growth_rate, 1),  # Using app growth as proxy
            "consultations": round(consult_growth_rate, 1)
        }
    }


# Lead Management Endpoints

@router.post("/leads")
async def create_lead(
    lead_data: Dict[str, Any],
    current_user = Depends(require_admin),
    supabase: Client = Depends(get_supabase_admin)
):
    """Create a new lead"""
    response = supabase.table("leads").insert(lead_data).execute()
    return {"lead": response.data[0]}


@router.put("/leads/{lead_id}")
async def update_lead(
    lead_id: str,
    lead_data: Dict[str, Any],
    current_user = Depends(require_admin),
    supabase: Client = Depends(get_supabase_admin)
):
    """Update a lead"""
    response = supabase.table("leads").update(lead_data).eq("id", lead_id).execute()
    return {"lead": response.data[0] if response.data else None}


@router.patch("/leads/{lead_id}/status")
async def update_lead_status(
    lead_id: str,
    status: str,
    current_user = Depends(require_admin),
    supabase: Client = Depends(get_supabase_admin)
):
    """Update lead status"""
    response = supabase.table("leads").update({"status": status}).eq("id", lead_id).execute()
    return {"lead": response.data[0] if response.data else None}


@router.patch("/leads/{lead_id}/assign")
async def assign_lead(
    lead_id: str,
    counsellor_id: str,
    current_user = Depends(require_admin),
    supabase: Client = Depends(get_supabase_admin)
):
    """Assign lead to counsellor"""
    response = supabase.table("leads").update({"assigned_to": counsellor_id}).eq("id", lead_id).execute()
    return {"lead": response.data[0] if response.data else None}


@router.get("/counsellor-performance")
async def get_counsellor_performance(
    current_user = Depends(require_admin),
    supabase: Client = Depends(get_supabase_admin)
):
    """Get counsellor performance metrics"""
    from datetime import datetime, timedelta
    from collections import defaultdict

    # Get all counsellors and admins
    counsellors_response = supabase.table("users").select("*").in_("role", ["counsellor", "admin"]).execute()
    counsellors = counsellors_response.data

    # Get all data needed for calculations
    profiles = supabase.table("profiles").select("*").execute()
    aps_submissions = supabase.table("aps_submissions").select("*").execute()
    documents = supabase.table("documents").select("*").execute()
    messages = supabase.table("messages").select("*").execute()

    counsellor_metrics = []

    for counsellor in counsellors:
        counsellor_id = counsellor["id"]
        counsellor_name = counsellor.get("full_name") or counsellor.get("email", "Unknown")

        # Students assigned (profiles with this counsellor)
        assigned_students = [p for p in profiles.data if p.get("assigned_counsellor_id") == counsellor_id]
        students_assigned = len(assigned_students)

        # APS verified by this counsellor
        aps_verified = sum(1 for aps in aps_submissions.data
                          if aps.get("reviewed_by") == counsellor_id and aps.get("status") == "verified")

        # Documents approved by this counsellor
        docs_approved = sum(1 for doc in documents.data
                           if doc.get("reviewed_by") == counsellor_id and doc.get("status") == "approved")

        # Documents pending review
        docs_pending = sum(1 for doc in documents.data
                          if doc.get("assigned_to") == counsellor_id and doc.get("status") in ["submitted", "in_review"])

        # Calculate average response time for this counsellor
        counsellor_messages = [m for m in messages.data if m.get("sender_id") == counsellor_id]
        student_messages_to_counsellor = []

        # Get messages from students that this counsellor responded to
        for i in range(len(messages.data) - 1):
            msg = messages.data[i]
            next_msg = messages.data[i + 1]

            if (msg.get("sender_role") == "student" and
                next_msg.get("sender_id") == counsellor_id and
                msg.get("conversation_id") == next_msg.get("conversation_id")):
                try:
                    msg_time = datetime.fromisoformat(msg["created_at"].replace('Z', '+00:00'))
                    resp_time = datetime.fromisoformat(next_msg["created_at"].replace('Z', '+00:00'))
                    diff_hours = (resp_time - msg_time).total_seconds() / 3600
                    if diff_hours < 72:  # Only count responses within 72 hours
                        student_messages_to_counsellor.append(diff_hours)
                except:
                    pass

        avg_response_time = sum(student_messages_to_counsellor) / len(student_messages_to_counsellor) if student_messages_to_counsellor else 0

        # Message count
        total_messages = len(counsellor_messages)

        # Calculate workload score (simple metric)
        workload_score = students_assigned + (docs_pending * 2) + (aps_verified * 1.5)

        counsellor_metrics.append({
            "counsellor_id": counsellor_id,
            "counsellor_name": counsellor_name,
            "counsellor_email": counsellor.get("email"),
            "students_assigned": students_assigned,
            "aps_verified": aps_verified,
            "docs_approved": docs_approved,
            "docs_pending": docs_pending,
            "total_messages": total_messages,
            "avg_response_time_hours": round(avg_response_time, 2),
            "workload_score": round(workload_score, 1),
            "student_rating": 0  # Placeholder - would come from feedback system
        })

    # Sort by workload score descending
    counsellor_metrics.sort(key=lambda x: x["workload_score"], reverse=True)

    return {
        "counsellors": counsellor_metrics,
        "total_counsellors": len(counsellor_metrics),
        "summary": {
            "total_students_assigned": sum(c["students_assigned"] for c in counsellor_metrics),
            "total_aps_verified": sum(c["aps_verified"] for c in counsellor_metrics),
            "total_docs_approved": sum(c["docs_approved"] for c in counsellor_metrics),
            "avg_workload": round(sum(c["workload_score"] for c in counsellor_metrics) / len(counsellor_metrics), 1) if counsellor_metrics else 0
        }
    }























