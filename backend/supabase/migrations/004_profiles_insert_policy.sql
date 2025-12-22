-- Add INSERT policy for profiles table
-- Migration: 004_profiles_insert_policy
-- Created: 2025-12-18
-- Description: Allow students to create their own profile

-- Policy: Students can create their own profile
CREATE POLICY "Students can create own profile"
ON profiles
FOR INSERT
WITH CHECK (user_id = auth.uid());

-- Migration complete
-- Version: 004
