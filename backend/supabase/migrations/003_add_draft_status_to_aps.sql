-- AJ NOVA Platform - Add draft status to APS submissions
-- Migration: 003_add_draft_status_to_aps
-- Created: 2025-12-18
-- Description: Allow 'draft' status for APS submissions to enable save progress functionality

-- Drop the existing CHECK constraint on aps_submissions status
ALTER TABLE aps_submissions DROP CONSTRAINT IF EXISTS aps_submissions_status_check;

-- Add the new CHECK constraint with 'draft' included
ALTER TABLE aps_submissions ADD CONSTRAINT aps_submissions_status_check
CHECK (status IN ('draft', 'submitted', 'under_review', 'verified', 'needs_correction'));

-- Update the default status to 'draft' for new submissions
ALTER TABLE aps_submissions ALTER COLUMN status SET DEFAULT 'draft';

-- Migration complete
-- Version: 003
