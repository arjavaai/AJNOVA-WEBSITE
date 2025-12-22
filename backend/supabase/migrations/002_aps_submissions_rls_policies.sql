-- AJ NOVA Platform - APS Submissions RLS Policies
-- Migration: 002_aps_submissions_rls_policies
-- Created: 2025-12-18
-- Description: Add Row Level Security policies for aps_submissions table

-- ===================================
-- RLS POLICIES FOR APS SUBMISSIONS
-- ===================================

-- Policy: Students can view their own APS submissions
CREATE POLICY "Students can view own APS submissions"
ON aps_submissions
FOR SELECT
USING (student_id = auth.uid());

-- Policy: Students can insert their own APS submissions
CREATE POLICY "Students can create own APS submissions"
ON aps_submissions
FOR INSERT
WITH CHECK (student_id = auth.uid());

-- Policy: Students can update their own APS submissions
CREATE POLICY "Students can update own APS submissions"
ON aps_submissions
FOR UPDATE
USING (student_id = auth.uid());

-- Policy: Counsellors and admins can view all APS submissions
CREATE POLICY "Counsellors can view all APS submissions"
ON aps_submissions
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM users
        WHERE id = auth.uid()
        AND role IN ('counsellor', 'admin')
    )
);

-- Policy: Counsellors and admins can update all APS submissions
CREATE POLICY "Counsellors can update all APS submissions"
ON aps_submissions
FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM users
        WHERE id = auth.uid()
        AND role IN ('counsellor', 'admin')
    )
);

-- Policy: Applications table - Students can view own applications
CREATE POLICY "Students can view own applications"
ON applications
FOR SELECT
USING (student_id = auth.uid());

-- Policy: Applications table - Students can create own applications
CREATE POLICY "Students can create own applications"
ON applications
FOR INSERT
WITH CHECK (student_id = auth.uid());

-- Policy: Applications table - Students can update own applications
CREATE POLICY "Students can update own applications"
ON applications
FOR UPDATE
USING (student_id = auth.uid());

-- Policy: Applications table - Counsellors can view and update all applications
CREATE POLICY "Counsellors can manage all applications"
ON applications
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM users
        WHERE id = auth.uid()
        AND role IN ('counsellor', 'admin')
    )
);

-- Policy: Consultations table - Students can view own consultations
CREATE POLICY "Students can view own consultations"
ON consultations
FOR SELECT
USING (student_id = auth.uid());

-- Policy: Consultations table - Students can create own consultations
CREATE POLICY "Students can create own consultations"
ON consultations
FOR INSERT
WITH CHECK (student_id = auth.uid());

-- Policy: Consultations table - Students can update own consultations
CREATE POLICY "Students can update own consultations"
ON consultations
FOR UPDATE
USING (student_id = auth.uid());

-- Policy: Consultations table - Counsellors can manage all consultations
CREATE POLICY "Counsellors can manage all consultations"
ON consultations
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM users
        WHERE id = auth.uid()
        AND role IN ('counsellor', 'admin')
    )
);

-- Policy: Eligibility checks - Students can view own checks
CREATE POLICY "Students can view own eligibility checks"
ON eligibility_checks
FOR SELECT
USING (student_id = auth.uid());

-- Policy: Eligibility checks - Students can create own checks
CREATE POLICY "Students can create own eligibility checks"
ON eligibility_checks
FOR INSERT
WITH CHECK (student_id = auth.uid());

-- Policy: Eligibility checks - Counsellors can view all checks
CREATE POLICY "Counsellors can view all eligibility checks"
ON eligibility_checks
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM users
        WHERE id = auth.uid()
        AND role IN ('counsellor', 'admin')
    )
);

-- Policy: Leads table - Counsellors and admins can manage all leads
CREATE POLICY "Counsellors can manage leads"
ON leads
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM users
        WHERE id = auth.uid()
        AND role IN ('counsellor', 'admin')
    )
);

-- Migration complete
-- Version: 002
