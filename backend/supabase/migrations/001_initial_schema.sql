-- AJ NOVA Platform - Initial Database Schema
-- Migration: 001_initial_schema
-- Created: 2025-12-07

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===================================
-- USERS TABLE
-- ===================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    role VARCHAR(50) NOT NULL CHECK (role IN ('student', 'counsellor', 'admin')),
    auth_provider VARCHAR(50) DEFAULT 'google',
    google_id VARCHAR(255) UNIQUE,
    profile_picture_url TEXT,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_login TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_google_id ON users(google_id);
CREATE INDEX idx_users_role ON users(role);

-- ===================================
-- PROFILES TABLE
-- ===================================
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,

    -- Personal Information
    first_name VARCHAR(100),
    middle_name VARCHAR(100),
    last_name VARCHAR(100),
    date_of_birth DATE,
    gender VARCHAR(50),
    nationality VARCHAR(100),
    country_of_residence VARCHAR(100),
    passport_number VARCHAR(50),
    passport_expiry DATE,
    mobile_number VARCHAR(20),
    address JSONB,

    -- Academic Background
    highest_qualification VARCHAR(100),
    field_of_study VARCHAR(255),
    institution_name VARCHAR(255),
    country_of_education VARCHAR(100),
    graduation_year INTEGER,
    cgpa_percentage DECIMAL(5,2),
    cgpa_type VARCHAR(20),
    backlogs INTEGER,
    medium_of_instruction VARCHAR(50),

    -- Language Scores
    english_test_type VARCHAR(50),
    english_score DECIMAL(5,2),
    english_test_date DATE,
    german_level VARCHAR(10),
    german_test_date DATE,

    -- Work Experience
    work_experience_years VARCHAR(50),

    -- Preferences
    preferred_intake VARCHAR(50),
    interested_country VARCHAR(100) DEFAULT 'Germany',
    study_level VARCHAR(50),
    preferred_program TEXT,

    -- Metadata
    completion_percentage INTEGER DEFAULT 0,
    counsellor_id UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_profiles_counsellor_id ON profiles(counsellor_id);

-- ===================================
-- DOCUMENTS TABLE
-- ===================================
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('sop', 'lor', 'resume', 'cover_letter', 'aps', 'passport', 'transcript', 'certificate', 'other')),
    title VARCHAR(255),
    content TEXT,
    file_url TEXT,
    file_name VARCHAR(255),
    file_size INTEGER,
    mime_type VARCHAR(100),
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'under_review', 'approved', 'rejected', 'needs_revision')),
    version INTEGER DEFAULT 1,
    counsellor_id UUID REFERENCES users(id),
    review_comments TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    submitted_at TIMESTAMPTZ,
    reviewed_at TIMESTAMPTZ
);

CREATE INDEX idx_documents_student_id ON documents(student_id);
CREATE INDEX idx_documents_status ON documents(status);
CREATE INDEX idx_documents_type ON documents(type);
CREATE INDEX idx_documents_counsellor_id ON documents(counsellor_id);

-- ===================================
-- APS SUBMISSIONS TABLE
-- ===================================
CREATE TABLE aps_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    form_data JSONB NOT NULL,
    status VARCHAR(50) DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'verified', 'needs_correction')),
    counsellor_id UUID REFERENCES users(id),
    verification_comments TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    verified_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_aps_student_id ON aps_submissions(student_id);
CREATE INDEX idx_aps_status ON aps_submissions(status);
CREATE INDEX idx_aps_counsellor_id ON aps_submissions(counsellor_id);

-- ===================================
-- APPLICATIONS TABLE
-- ===================================
CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    university_name VARCHAR(255) NOT NULL,
    program_name VARCHAR(255) NOT NULL,
    intake VARCHAR(50),
    status VARCHAR(50) DEFAULT 'applied' CHECK (status IN ('applied', 'documents_sent', 'under_review', 'accepted', 'rejected', 'withdrawn')),
    counsellor_id UUID REFERENCES users(id),
    applied_date DATE,
    decision_date DATE,
    notes TEXT,
    timeline JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_applications_student_id ON applications(student_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_counsellor_id ON applications(counsellor_id);

-- ===================================
-- MESSAGES TABLE
-- ===================================
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID,
    sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
    receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    attachments JSONB,
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_receiver_id ON messages(receiver_id);
CREATE INDEX idx_messages_is_read ON messages(is_read);

-- ===================================
-- CONSULTATIONS TABLE
-- ===================================
CREATE TABLE consultations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    counsellor_id UUID REFERENCES users(id),
    consultation_type VARCHAR(50),
    scheduled_at TIMESTAMPTZ NOT NULL,
    duration_minutes INTEGER DEFAULT 30,
    status VARCHAR(50) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'rescheduled')),
    meeting_link TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_consultations_student_id ON consultations(student_id);
CREATE INDEX idx_consultations_counsellor_id ON consultations(counsellor_id);
CREATE INDEX idx_consultations_status ON consultations(status);
CREATE INDEX idx_consultations_scheduled_at ON consultations(scheduled_at);

-- ===================================
-- LEADS TABLE (CRM)
-- ===================================
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    source VARCHAR(100),
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
    assigned_to UUID REFERENCES users(id),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_assigned_to ON leads(assigned_to);
CREATE INDEX idx_leads_email ON leads(email);

-- ===================================
-- NOTIFICATIONS TABLE
-- ===================================
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    link TEXT,
    metadata JSONB,
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);

-- ===================================
-- ELIGIBILITY CHECKS TABLE
-- ===================================
CREATE TABLE eligibility_checks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    request_data JSONB NOT NULL,
    eligible BOOLEAN NOT NULL,
    score INTEGER NOT NULL,
    recommendations TEXT[],
    warnings TEXT[],
    eligible_programs TEXT[],
    improvement_areas TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_eligibility_student_id ON eligibility_checks(student_id);
CREATE INDEX idx_eligibility_created_at ON eligibility_checks(created_at);

-- ===================================
-- ACTIVITY LOGS TABLE (Audit Trail)
-- ===================================
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id UUID,
    details JSONB,
    ip_address VARCHAR(50),
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_entity_type ON activity_logs(entity_type);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at);

-- ===================================
-- SYSTEM SETTINGS TABLE
-- ===================================
CREATE TABLE system_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key VARCHAR(100) UNIQUE NOT NULL,
    value JSONB NOT NULL,
    description TEXT,
    updated_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_system_settings_key ON system_settings(key);

-- ===================================
-- AUTOMATIC UPDATED_AT TRIGGER
-- ===================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_aps_submissions_updated_at BEFORE UPDATE ON aps_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_consultations_updated_at BEFORE UPDATE ON consultations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON system_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ===================================
-- ROW LEVEL SECURITY (RLS)
-- ===================================

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE aps_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE eligibility_checks ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins can view all users" ON users FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- RLS Policies for profiles table
CREATE POLICY "Students can view own profile" ON profiles FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Students can update own profile" ON profiles FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Counsellors can view assigned students" ON profiles FOR SELECT USING (
    counsellor_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('counsellor', 'admin'))
);

-- RLS Policies for documents table
CREATE POLICY "Students can view own documents" ON documents FOR SELECT USING (student_id = auth.uid());
CREATE POLICY "Students can create own documents" ON documents FOR INSERT WITH CHECK (student_id = auth.uid());
CREATE POLICY "Students can update own documents" ON documents FOR UPDATE USING (student_id = auth.uid());
CREATE POLICY "Counsellors can view and review documents" ON documents FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('counsellor', 'admin'))
);

-- RLS Policies for messages table
CREATE POLICY "Users can view own messages" ON messages FOR SELECT USING (
    sender_id = auth.uid() OR receiver_id = auth.uid()
);
CREATE POLICY "Users can send messages" ON messages FOR INSERT WITH CHECK (sender_id = auth.uid());

-- RLS Policies for notifications table
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (user_id = auth.uid());

-- ===================================
-- SEED DATA (Optional)
-- ===================================

-- Insert default admin user (update with real credentials)
-- INSERT INTO users (email, name, role, status) VALUES 
-- ('admin@ajnova.com', 'Admin User', 'admin', 'active');

-- Insert default system settings
INSERT INTO system_settings (key, value, description) VALUES
('platform_name', '"AJ NOVA"', 'Platform name'),
('platform_email', '"support@ajnova.com"', 'Platform support email'),
('consultation_duration_default', '30', 'Default consultation duration in minutes'),
('max_file_upload_size_mb', '10', 'Maximum file upload size in MB');

-- ===================================
-- COMMENTS
-- ===================================

COMMENT ON TABLE users IS 'User authentication and management table';
COMMENT ON TABLE profiles IS 'Student profile information';
COMMENT ON TABLE documents IS 'Document management for SOPs, LORs, resumes, etc.';
COMMENT ON TABLE aps_submissions IS 'APS verification form submissions';
COMMENT ON TABLE applications IS 'University application tracking';
COMMENT ON TABLE messages IS 'Student-counsellor messaging system';
COMMENT ON TABLE consultations IS 'Consultation scheduling and management';
COMMENT ON TABLE leads IS 'Lead management and CRM';
COMMENT ON TABLE notifications IS 'Real-time notifications for users';
COMMENT ON TABLE eligibility_checks IS 'Eligibility assessment results';
COMMENT ON TABLE activity_logs IS 'Audit trail for user actions';
COMMENT ON TABLE system_settings IS 'System-wide configuration settings';

-- Migration complete
-- Version: 001



























