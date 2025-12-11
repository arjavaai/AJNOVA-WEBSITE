# Architecture Plan for AJ NOVA Platform

## Executive Summary

This plan outlines the complete technical architecture for the **AJ NOVA** platform - a comprehensive digital admissions platform designed to streamline the German university application process for international students. The system will be built using **Next.js** (frontend), **Python FastAPI** (backend), and **Supabase** (database + storage + auth), with AI-powered document generation via Google Gemini API.

**Current Status**: Project is in documentation/planning phase with comprehensive PRD completed. No code implementation exists yet.

---

## 1. System Architecture Overview

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                            │
│  Next.js 14+ with App Router + TypeScript                   │
│  - Public Pages (Landing, Services, Contact)                 │
│  - Student Dashboard (8 sections)                            │
│  - Admin Dashboard (8+ sections)                             │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTPS/TLS 1.3
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                         │
│  Python FastAPI Backend                                      │
│  - RESTful API Endpoints                                     │
│  - Google OAuth Service                                      │
│  - Gemini AI Integration Service                            │
│  - Email Notification Service                               │
│  - File Upload/Storage Service                              │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                      DATA LAYER                              │
│  Supabase Platform                                           │
│  - PostgreSQL Database (structured data)                     │
│  - Supabase Storage (files)                                  │
│  - Supabase Auth (Google OAuth)                             │
│  - Supabase Realtime (notifications)                        │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                   EXTERNAL SERVICES                          │
│  - Google OAuth (Authentication)                            │
│  - Google Gemini API (AI Document Generation)               │
│  - SendGrid/AWS SES (Email)                                 │
│  - Calendly (Consultation Scheduling)                       │
│  - Google Analytics (Tracking)                              │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Core Design Principles

- **Separation of Concerns**: Frontend, backend, and data layers are independent
- **API-First**: All frontend-backend communication through RESTful APIs
- **Security-First**: End-to-end encryption, RBAC, audit logging
- **Scalable**: Stateless design, horizontal scaling capability
- **Real-time**: WebSocket support for notifications and updates

---

## 2. Technology Stack

### 2.1 Frontend Stack

**Framework**: Next.js 14+ with App Router
- **TypeScript**: Full type safety
- **Styling**: Tailwind CSS for utility-first styling
- **UI Components**: shadcn/ui (built on Radix UI primitives)
- **State Management**:
  - TanStack Query (React Query) for server state
  - React Context API for global UI state
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: Axios with interceptors
- **File Upload**: react-dropzone
- **Rich Text Editor**: TipTap or similar (for document editing)
- **Charts**: Recharts or Chart.js (for analytics)

**Key Libraries**:
```json
{
  "next": "^14.0.0",
  "react": "^18.2.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^3.4.0",
  "@tanstack/react-query": "^5.0.0",
  "react-hook-form": "^7.48.0",
  "zod": "^3.22.0",
  "axios": "^1.6.0",
  "@radix-ui/react-*": "latest",
  "lucide-react": "^0.300.0"
}
```

### 2.2 Backend Stack

**Framework**: Python FastAPI
- **Python Version**: 3.11+
- **Web Framework**: FastAPI 0.104+
- **ASGI Server**: Uvicorn with Gunicorn
- **Database Client**: Supabase Python SDK
- **Authentication**: OAuth2 with Google + JWT tokens
- **Validation**: Pydantic v2
- **AI Integration**: Google Generative AI SDK (Gemini)
- **Email**: SendGrid or AWS SES
- **File Processing**: python-multipart

**Key Dependencies**:
```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
supabase==2.0.3
google-auth==2.23.4
google-auth-oauthlib==1.1.0
google-generativeai==0.3.0
pydantic==2.4.2
python-multipart==0.0.6
python-jose[cryptography]==3.3.0
sendgrid==6.10.0
```

### 2.3 Database & Storage

**Platform**: Supabase (comprehensive BaaS)
- **Database**: PostgreSQL 15+
- **Storage**: Supabase Storage for file management
- **Authentication**: Supabase Auth with Google OAuth provider
- **Realtime**: Supabase Realtime for live updates
- **Row Level Security (RLS)**: Database-level access control

### 2.4 Hosting & Deployment

- **Frontend**: Vercel (automatic deployments, edge network, SSL)
- **Backend**: Railway, Render, or AWS ECS (containerized FastAPI)
- **Database**: Supabase Cloud (managed PostgreSQL)
- **CDN**: Vercel Edge Network
- **CI/CD**: GitHub Actions

---

## 3. Database Schema Design

### 3.1 Core Tables

#### `users` - Authentication & User Management
```sql
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
```

#### `profiles` - Student Profile Data
```sql
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,

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
```

#### `documents` - All Document Metadata
```sql
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
```

#### `aps_submissions` - APS Verification Forms
```sql
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
```

#### `applications` - University Applications
```sql
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
```

#### `messages` - Communication System
```sql
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
```

#### `consultations` - Meeting Scheduling
```sql
CREATE TABLE consultations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    counsellor_id UUID REFERENCES users(id),
    consultation_type VARCHAR(50),
    scheduled_date TIMESTAMPTZ NOT NULL,
    duration_minutes INTEGER DEFAULT 30,
    status VARCHAR(50) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'rescheduled')),
    meeting_link TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_consultations_student_id ON consultations(student_id);
CREATE INDEX idx_consultations_counsellor_id ON consultations(counsellor_id);
```

#### `leads` - Lead Management (CRM)
```sql
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
    last_contact TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_assigned_to ON leads(assigned_to);
```

#### `notifications` - In-App Notifications
```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255),
    message TEXT,
    link TEXT,
    priority VARCHAR(20) DEFAULT 'normal',
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
```

### 3.2 Row Level Security (RLS) Policies

**Students can only access their own data**:
```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students view own profile" ON profiles
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Students update own profile" ON profiles
FOR UPDATE USING (auth.uid() = user_id);
```

**Counsellors can access assigned students**:
```sql
CREATE POLICY "Counsellors view assigned students" ON profiles
FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM users
        WHERE id = auth.uid() AND role IN ('counsellor', 'admin')
    )
);
```

---

## 4. Backend API Architecture

### 4.1 Project Structure
```
backend/
├── app/
│   ├── main.py                     # FastAPI app entry point
│   ├── config.py                   # Environment configuration
│   ├── dependencies.py             # Shared dependencies
│   │
│   ├── api/
│   │   └── v1/
│   │       ├── __init__.py
│   │       ├── auth.py             # Authentication endpoints
│   │       ├── users.py            # User management
│   │       ├── profiles.py         # Profile CRUD
│   │       ├── eligibility.py      # Eligibility checker
│   │       ├── aps.py              # APS form endpoints
│   │       ├── documents.py        # Document & AI generation
│   │       ├── applications.py     # University applications
│   │       ├── messages.py         # Messaging system
│   │       ├── consultations.py    # Consultation scheduling
│   │       ├── admin.py            # Admin dashboard
│   │       └── webhooks.py         # External webhooks
│   │
│   ├── models/                     # Pydantic models
│   │   ├── user.py
│   │   ├── profile.py
│   │   ├── document.py
│   │   └── ...
│   │
│   ├── services/
│   │   ├── auth_service.py         # Google OAuth logic
│   │   ├── ai_service.py           # Gemini API integration
│   │   ├── email_service.py        # Email notifications
│   │   ├── storage_service.py      # Supabase Storage
│   │   └── notification_service.py # Notification delivery
│   │
│   ├── middleware/
│   │   ├── auth.py                 # JWT validation
│   │   ├── rate_limit.py           # Rate limiting
│   │   └── logging.py              # Request logging
│   │
│   └── utils/
│       ├── security.py             # Encryption utilities
│       ├── validators.py           # Input validation
│       └── helpers.py              # Helper functions
│
├── tests/
├── .env.example
├── requirements.txt
├── Dockerfile
└── README.md
```

### 4.2 Core API Endpoints

**Authentication**
- `POST /api/v1/auth/google` - Google OAuth login
- `POST /api/v1/auth/logout` - Logout
- `GET /api/v1/auth/me` - Get current user

**Profiles**
- `GET /api/v1/profiles/me` - Get own profile
- `PUT /api/v1/profiles/me` - Update profile
- `GET /api/v1/profiles/me/completion` - Get completion %

**Eligibility**
- `POST /api/v1/eligibility/check` - Check eligibility
- `GET /api/v1/eligibility/me` - Get result

**APS**
- `GET /api/v1/aps/me` - Get APS form
- `POST /api/v1/aps/me` - Submit APS
- `PUT /api/v1/aps/me` - Update APS

**Documents (AI Generation)**
- `GET /api/v1/documents` - List documents
- `POST /api/v1/documents/generate` - Generate AI document
- `PUT /api/v1/documents/{id}` - Update document
- `POST /api/v1/documents/{id}/review` - Submit for review
- `GET /api/v1/documents/{id}` - Get document
- `DELETE /api/v1/documents/{id}` - Delete document

**Applications**
- `GET /api/v1/applications` - List applications
- `POST /api/v1/applications` - Create application (admin)
- `PUT /api/v1/applications/{id}` - Update status
- `GET /api/v1/applications/{id}` - Get details

**Messages**
- `GET /api/v1/messages` - Get messages
- `POST /api/v1/messages` - Send message
- `PUT /api/v1/messages/{id}/read` - Mark as read

**Consultations**
- `GET /api/v1/consultations` - Get consultations
- `POST /api/v1/consultations` - Book consultation
- `PUT /api/v1/consultations/{id}` - Update

**Admin**
- `GET /api/v1/admin/students` - Get all students
- `GET /api/v1/admin/leads` - Get leads
- `GET /api/v1/admin/reviews` - Get review queue
- `POST /api/v1/admin/reviews/{id}/approve` - Approve document
- `GET /api/v1/admin/analytics` - Get analytics

### 4.3 AI Document Generation Flow

```
1. Student clicks "Generate Document"
   ↓
2. Frontend validates profile completion (80%+)
   ↓
3. POST /api/v1/documents/generate
   Body: { type: 'sop', university: '...', program: '...', additional_info: '...' }
   ↓
4. Backend validates request
   ↓
5. Backend prepares Gemini API prompt:
   - Pulls student profile data
   - Includes document type requirements
   - Adds university/program context
   ↓
6. Call Gemini API:
   model.generate_content(prompt)
   ↓
7. Process AI response:
   - Extract generated text
   - Format document structure
   - Validate content length
   ↓
8. Save to database:
   - document.content = generated_text
   - document.status = 'draft'
   - document.version = 1
   ↓
9. Return to frontend
   ↓
10. Display in editor for student review
```

**Gemini Prompt Template (SOP)**:
```python
prompt = f"""
Generate a professional Statement of Purpose for a Master's program in {program} at {university}.

Student Profile:
- Name: {profile.first_name} {profile.last_name}
- Academic Background: {profile.highest_qualification} in {profile.field_of_study}
- Institution: {profile.institution_name}
- CGPA: {profile.cgpa_percentage}
- Work Experience: {profile.work_experience_years}
- English Score: {profile.english_test_type} - {profile.english_score}
- German Level: {profile.german_level}

Additional Context: {additional_info}

Requirements:
- Length: 800-1200 words
- Format: Academic style with clear paragraphs
- Structure: Introduction → Academic Background → Work Experience → Why This Program → Career Goals → Conclusion
- Tone: Professional, enthusiastic, genuine
- Focus: Connect past experiences to future goals

Generate the SOP now:
"""
```

---

## 5. Frontend Architecture

### 5.1 Next.js Project Structure
```
frontend/
├── app/
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Landing page
│   ├── globals.css                 # Global styles
│   │
│   ├── (public)/
│   │   ├── services/page.tsx       # Services page
│   │   └── contact/page.tsx        # Contact page
│   │
│   ├── (student)/
│   │   ├── layout.tsx              # Student dashboard layout
│   │   ├── dashboard/page.tsx      # Dashboard home
│   │   ├── profile/page.tsx        # Profile management
│   │   ├── eligibility/page.tsx    # Eligibility checker
│   │   ├── aps/page.tsx            # APS form
│   │   ├── documents/page.tsx      # AI documents
│   │   ├── applications/page.tsx   # Application tracking
│   │   ├── messages/page.tsx       # Messaging
│   │   └── consultations/page.tsx  # Consultations
│   │
│   └── (admin)/
│       ├── layout.tsx              # Admin dashboard layout
│       ├── dashboard/page.tsx      # Admin home
│       ├── students/page.tsx       # Student management
│       ├── leads/page.tsx          # Lead management
│       ├── reviews/page.tsx        # Document review queue
│       ├── aps-verification/page.tsx # APS verification
│       └── analytics/page.tsx      # Analytics
│
├── components/
│   ├── ui/                         # shadcn/ui components
│   ├── forms/                      # Form components
│   ├── layouts/                    # Layout components
│   └── features/                   # Feature components
│
├── lib/
│   ├── api.ts                      # API client
│   ├── auth.ts                     # Auth utilities
│   └── utils.ts                    # Helper functions
│
├── hooks/
│   ├── useAuth.ts                  # Auth hook
│   ├── useProfile.ts               # Profile data hook
│   └── useDocuments.ts             # Documents hook
│
├── contexts/
│   ├── AuthContext.tsx             # Auth context
│   └── NotificationContext.tsx     # Notification context
│
├── types/
│   └── index.ts                    # TypeScript types
│
└── public/
    ├── images/
    └── icons/
```

### 5.2 Component Architecture

**Shared UI Components** (using shadcn/ui):
- Button, Input, Select, Textarea
- Card, Modal, Dialog, Sheet
- Toast, Alert, Badge
- Progress, Tabs, Accordion
- Table, Pagination
- FileUpload, DocumentViewer

**Feature Components**:
- `<ProfileForm />` - Multi-step profile creation
- `<EligibilityChecker />` - Eligibility assessment tool
- `<APSForm />` - APS submission form
- `<DocumentGenerator />` - AI document generation interface
- `<DocumentEditor />` - Rich text editor for documents
- `<ApplicationTracker />` - Application status timeline
- `<MessageThread />` - Messaging interface
- `<ProgressTracker />` - Visual progress indicator

### 5.3 State Management Pattern

**TanStack Query for Server State**:
```typescript
// hooks/useProfile.ts
export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => apiClient.get('/profiles/me'),
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => apiClient.put('/profiles/me', data),
    onSuccess: () => {
      queryClient.invalidateQueries(['profile']);
      toast.success('Profile updated');
    },
  });
};
```

**Context API for Global UI State**:
```typescript
// contexts/AuthContext.tsx
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  // ... auth logic
  return <AuthContext.Provider value={{ user, ... }}>{children}</AuthContext.Provider>;
};
```

---

## 6. Authentication & Authorization

### 6.1 Google OAuth Flow

**Frontend (Next.js)**:
```typescript
// app/(public)/login/page.tsx
const handleGoogleLogin = () => {
  window.location.href = `${API_URL}/api/v1/auth/google`;
};
```

**Backend (FastAPI)**:
```python
@router.get("/auth/google")
async def google_auth():
    redirect_uri = f"{settings.BACKEND_URL}/api/v1/auth/google/callback"
    google_oauth_url = (
        f"https://accounts.google.com/o/oauth2/v2/auth?"
        f"client_id={settings.GOOGLE_CLIENT_ID}&"
        f"redirect_uri={redirect_uri}&"
        f"response_type=code&"
        f"scope=email profile"
    )
    return RedirectResponse(google_oauth_url)

@router.get("/auth/google/callback")
async def google_callback(code: str):
    # Exchange code for tokens
    token_response = requests.post(
        "https://oauth2.googleapis.com/token",
        data={
            "code": code,
            "client_id": settings.GOOGLE_CLIENT_ID,
            "client_secret": settings.GOOGLE_CLIENT_SECRET,
            "redirect_uri": redirect_uri,
            "grant_type": "authorization_code"
        }
    )

    # Get user info
    user_info = requests.get(
        "https://www.googleapis.com/oauth2/v1/userinfo",
        headers={"Authorization": f"Bearer {access_token}"}
    ).json()

    # Create or update user in Supabase
    # Create session token (JWT)
    # Redirect to frontend dashboard
    return RedirectResponse(f"{settings.FRONTEND_URL}/dashboard?token={jwt_token}")
```

### 6.2 Role-Based Access Control

**Middleware**:
```python
# middleware/auth.py
async def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = jwt.decode(token, settings.SECRET_KEY)
    user = await get_user_from_db(payload['user_id'])
    return user

async def require_role(required_role: str):
    def role_checker(user = Depends(get_current_user)):
        if user.role != required_role:
            raise HTTPException(403, "Insufficient permissions")
        return user
    return role_checker

# Usage in routes
@router.get("/admin/students")
async def get_students(user = Depends(require_role("admin"))):
    # Only admins can access
    return await fetch_students()
```

---

## 7. File Storage Architecture

### 7.1 Supabase Storage Structure
```
buckets/
├── documents/
│   ├── {user_id}/
│   │   ├── passport/
│   │   │   └── passport.pdf
│   │   ├── transcripts/
│   │   │   ├── bachelor_transcript.pdf
│   │   │   └── master_transcript.pdf
│   │   ├── certificates/
│   │   │   └── degree_certificate.pdf
│   │   └── generated/
│   │       ├── sop_v1.pdf
│   │       ├── resume_v1.pdf
│   │       └── lor_v1.pdf
│   │
├── profile-pictures/
│   └── {user_id}.jpg
│
└── temp-uploads/
    └── {upload_id}.tmp
```

### 7.2 File Upload Flow

**Frontend**:
```typescript
const handleFileUpload = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('category', 'passport');

  const response = await apiClient.post('/profiles/me/documents', formData);
  return response.data;
};
```

**Backend**:
```python
@router.post("/profiles/me/documents")
async def upload_document(
    file: UploadFile,
    category: str,
    current_user = Depends(get_current_user)
):
    # Validate file type and size
    if file.size > 10 * 1024 * 1024:  # 10MB limit
        raise HTTPException(400, "File too large")

    # Upload to Supabase Storage
    file_path = f"{current_user.id}/{category}/{file.filename}"
    storage_response = supabase.storage.from_('documents').upload(file_path, file.file)

    # Save metadata to database
    document = await create_document_record({
        'student_id': current_user.id,
        'type': category,
        'file_url': storage_response.url,
        'file_name': file.filename,
        'file_size': file.size,
        'mime_type': file.content_type
    })

    return document
```

---
## 8. Real-time Features

### 8.1 Supabase Realtime for Notifications

**Backend** (creating notification):
```python
# When document is approved
notification = await supabase.table('notifications').insert({
    'user_id': student_id,
    'type': 'document_approved',
    'title': 'Document Approved',
    'message': f'Your {document.type} has been approved',
    'link': f'/documents/{document.id}'
}).execute()

# Supabase Realtime broadcasts this automatically to subscribed clients
```

**Frontend** (listening for notifications):
```typescript
// components/NotificationListener.tsx
useEffect(() => {
  const channel = supabase
    .channel('notifications')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${user.id}`
      },
      (payload) => {
        toast.info(payload.new.title);
        queryClient.invalidateQueries(['notifications']);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, [user.id]);
```

---

## 9. Security Architecture

### 9.1 Security Layers

**Transport Layer**:
- TLS 1.3 for all connections
- HTTPS only (enforced)
- Secure WebSocket (WSS)

**Application Layer**:
- JWT tokens with short expiration (1 hour)
- Refresh tokens (7 days)
- CSRF protection
- XSS prevention (CSP headers)
- Rate limiting (100 requests/minute per IP)
- Input validation (Pydantic + Zod)

**Database Layer**:
- Row Level Security (RLS) policies
- Encrypted connections
- AES-256 encryption at rest
- Automated backups (daily)

**File Storage**:
- Signed URLs (time-limited access)
- File type validation
- Size limits (10MB per file)
- Virus scanning (optional)

### 9.2 GDPR Compliance

**Data Protection Measures**:
- Explicit user consent for data processing
- Right to access (data export)
- Right to deletion (account deletion + data purge)
- Data minimization (collect only necessary data)
- Privacy by design
- Audit logging of all data access

**Implementation**:
```python
# Account deletion endpoint
@router.delete("/users/me")
async def delete_account(current_user = Depends(get_current_user)):
    # Delete from Supabase Storage
    await supabase.storage.from_('documents').remove(f"{current_user.id}/")

    # Cascade delete will handle related records
    await supabase.table('users').delete().eq('id', current_user.id).execute()

    # Log deletion for compliance
    await audit_log.log('account_deleted', current_user.id)

    return {"message": "Account permanently deleted"}
```

---

## 10. Design System Implementation

### 10.1 Tailwind Configuration

**tailwind.config.js**:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'ajnova-navy': '#0A2342',
        'ajnova-coral': '#F25C45',
        'warm-white': '#F8F8F6',
        'slate-blue': '#1B3A57',
        'soft-gray': '#E2E2E2',
        'light-gray': '#F1F1F1',
        'peach-tint': '#F3D6CB',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
```

### 10.2 Component Styling Examples

**Primary Button**:
```tsx
<Button className="bg-ajnova-coral hover:bg-ajnova-coral/90 text-white font-poppins font-semibold rounded-lg">
  Get Started
</Button>
```

**Card Component**:
```tsx
<Card className="bg-white border border-soft-gray p-6 rounded-lg shadow-sm">
  <CardHeader className="text-ajnova-navy font-poppins font-bold text-2xl">
    Profile Completion
  </CardHeader>
  <CardContent className="text-ajnova-navy font-inter">
    {/* Content */}
  </CardContent>
</Card>
```

---

## 11. Performance Optimization

### 11.1 Frontend Optimization

**Code Splitting**:
```typescript
// app/(student)/documents/page.tsx
import dynamic from 'next/dynamic';

const DocumentEditor = dynamic(() => import('@/components/DocumentEditor'), {
  loading: () => <Skeleton />,
  ssr: false
});
```

**Image Optimization**:
```tsx
import Image from 'next/image';

<Image
  src="/hero-image.jpg"
  alt="AJ Nova"
  width={1200}
  height={600}
  priority
  placeholder="blur"
/>
```

**API Caching**:
```typescript
export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};
```

### 11.2 Backend Optimization

**Database Indexing** (already included in schema)
**Connection Pooling**:
```python
# config.py
supabase = create_client(
    settings.SUPABASE_URL,
    settings.SUPABASE_KEY,
    options=ClientOptions(
        postgrest_client_timeout=10,
        max_connections=20
    )
)
```

**Response Compression**:
```python
from fastapi.middleware.gzip import GZipMiddleware

app.add_middleware(GZipMiddleware, minimum_size=1000)
```

---

## 12. Deployment Architecture

### 12.1 Development Environment

**Frontend**:
```bash
npm run dev  # Next.js dev server on localhost:3000
```

**Backend**:
```bash
uvicorn app.main:app --reload --port 8000
```

**Environment Variables**:
```
# .env.local (Frontend)
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# .env (Backend)
SUPABASE_URL=...
SUPABASE_SERVICE_KEY=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GEMINI_API_KEY=...
SECRET_KEY=...
```

### 12.2 Production Deployment

**Frontend** (Vercel):
- Automatic deployments from `main` branch
- Edge network CDN
- Automatic SSL
- Environment variables in Vercel dashboard

**Backend** (Railway/Render):
```dockerfile
# Dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ./app ./app

CMD ["gunicorn", "app.main:app", "-k", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8000"]
```

**Database** (Supabase Cloud):
- Managed PostgreSQL
- Automatic backups
- Connection pooling
- Built-in CDN for storage

### 12.3 CI/CD Pipeline

**GitHub Actions**:
```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Railway
        run: railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

---

## 13. Testing Strategy

### 13.1 Frontend Testing

**Unit Tests** (Vitest + React Testing Library):
```typescript
// __tests__/components/ProfileForm.test.tsx
describe('ProfileForm', () => {
  it('validates required fields', async () => {
    render(<ProfileForm />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/first name is required/i)).toBeInTheDocument();
  });
});
```

**Integration Tests**:
```typescript
// Test API integration
it('submits profile successfully', async () => {
  const { result } = renderHook(() => useUpdateProfile());

  await act(async () => {
    await result.current.mutate(mockProfileData);
  });

  expect(result.current.isSuccess).toBe(true);
});
```

### 13.2 Backend Testing

**Unit Tests** (pytest):
```python
# tests/test_documents.py
def test_generate_document():
    response = client.post(
        "/api/v1/documents/generate",
        json={"type": "sop", "university": "TUM"},
        headers={"Authorization": f"Bearer {student_token}"}
    )
    assert response.status_code == 200
    assert "content" in response.json()
```

**Integration Tests**:
```python
def test_document_approval_workflow():
    # Student generates document
    doc = generate_document(student_token)

    # Student submits for review
    submit_document(student_token, doc['id'])

    # Counsellor approves
    approve_document(counsellor_token, doc['id'])

    # Check status
    doc = get_document(student_token, doc['id'])
    assert doc['status'] == 'approved'
```

---

## 14. Monitoring & Analytics

### 14.1 Application Monitoring

**Backend Monitoring** (Sentry):
```python
import sentry_sdk

sentry_sdk.init(
    dsn=settings.SENTRY_DSN,
    traces_sample_rate=1.0,
)
```

**Frontend Monitoring**:
```typescript
// app/layout.tsx
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

### 14.2 User Analytics

**Google Analytics 4**:
```typescript
// lib/analytics.ts
export const trackEvent = (eventName: string, params: any) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
};

// Usage
trackEvent('document_generated', {
  document_type: 'sop',
  user_id: user.id
});
```

---

## 15. Implementation Roadmap

### Phase 1: Foundation (Weeks 1-2)
- [ ] Set up Next.js project with TypeScript + Tailwind
- [ ] Set up FastAPI project structure
- [ ] Configure Supabase (database + auth + storage)
- [ ] Implement authentication (Google OAuth)
- [ ] Create base layouts and navigation

### Phase 2: Student Core Features (Weeks 3-4)
- [ ] Profile creation and management
- [ ] Eligibility checker
- [ ] APS form submission
- [ ] Document upload functionality
- [ ] Student dashboard home

### Phase 3: AI Integration (Weeks 5-6)
- [ ] Integrate Gemini API
- [ ] Build AI document generation (SOP, LOR, Resume, Cover Letter)
- [ ] Create document editor
- [ ] Implement version control

### Phase 4: Review Workflow (Week 7)
- [ ] Document submission workflow
- [ ] Counsellor review interface
- [ ] APS verification system
- [ ] Approval/rejection flow
- [ ] Notification system

### Phase 5: Admin Features (Week 8)
- [ ] Lead management (CRM)
- [ ] Student management
- [ ] Application creation and tracking
- [ ] Analytics dashboard
- [ ] Messaging system

### Phase 6: Polish & Testing (Week 9)
- [ ] Responsive design refinement
- [ ] Performance optimization
- [ ] Security audit
- [ ] Integration testing
- [ ] Bug fixes

### Phase 7: Deployment (Week 10)
- [ ] Production environment setup
- [ ] Deployment to Vercel + Railway
- [ ] SSL configuration
- [ ] Monitoring setup
- [ ] User acceptance testing

---

## 16. Key Architectural Decisions & Rationale

### Why Next.js?
- SEO-friendly (critical for public pages)
- Server-side rendering capability
- Built-in image optimization
- Excellent TypeScript support
- Vercel deployment simplicity
- Large ecosystem and community

### Why FastAPI?
- Modern Python framework with automatic API documentation
- Excellent async support for AI operations
- Type safety with Pydantic
- Fast performance
- Easy integration with Python AI libraries (Gemini SDK)
- RESTful API patterns

### Why Supabase?
- All-in-one solution (DB + Auth + Storage + Realtime)
- PostgreSQL (powerful relational database)
- Built-in Row Level Security
- Generous free tier
- Automatic API generation
- Real-time subscriptions out of the box
- Reduces infrastructure complexity

### Why Gemini API?
- State-of-the-art language model
- Cost-effective compared to GPT-4
- Fast inference times
- Google ecosystem integration
- Multilingual support (English, German)
- Good at academic writing

---

## 17. Missing Pieces & Recommendations

### Immediate Additions Needed
1. **Email Templates**: Design HTML email templates for notifications
2. **Error Handling**: Global error boundary and error tracking
3. **Loading States**: Consistent skeleton screens and spinners
4. **Form Validation**: Comprehensive Zod schemas for all forms
5. **API Documentation**: OpenAPI/Swagger documentation
6. **User Onboarding**: Interactive tutorial for first-time users

### Future Enhancements
1. **Mobile Apps**: React Native or Flutter mobile applications
2. **Payment Integration**: Stripe/Razorpay for service payments
3. **Video Calls**: Zoom/Google Meet integration for consultations
4. **Advanced Analytics**: Predictive analytics for application success
5. **Multi-language**: German and Hindi language support
6. **Chatbot**: 24/7 AI chatbot for basic queries
7. **Document OCR**: Automatic data extraction from uploaded documents
8. **Batch Operations**: Bulk application submissions for counsellors

### Scalability Considerations
- **Caching Layer**: Redis for session management and API caching
- **Queue System**: BullMQ or Celery for background jobs (email sending, document generation)
- **CDN**: Cloudflare for additional performance and security
- **Database**: Read replicas if query load increases
- **Microservices**: Split AI service into separate microservice if needed

---

## 18. Success Metrics & KPIs

### Technical Metrics
- **Page Load Time**: < 2 seconds
- **API Response Time**: < 500ms (p95)
- **Uptime**: 99.5%
- **Error Rate**: < 1%
- **Document Generation Time**: < 30 seconds

### Business Metrics
- **Profile Completion Rate**: > 70%
- **Document Generation Usage**: > 80% of students
- **Consultation Booking Rate**: > 60%
- **Application Submission Rate**: > 50%
- **Student Satisfaction**: > 4.5/5

### Operational Metrics
- **Average APS Verification Time**: < 48 hours
- **Document Approval Time**: < 24 hours
- **Counsellor Response Time**: < 4 hours
- **Lead Conversion Rate**: > 30%

---

## Conclusion

This architecture provides a **comprehensive, secure, and scalable foundation** for the AJ NOVA platform. The stack choices (Next.js + FastAPI + Supabase) offer:

1. **Rapid Development**: Modern frameworks with excellent DX
2. **Type Safety**: TypeScript + Pydantic ensure reliability
3. **Cost Efficiency**: Generous free tiers during development
4. **Scalability**: Can handle 10,000+ students without major changes
5. **Security**: Built-in security features (RLS, encryption, OAuth)
6. **AI-Ready**: Native integration with Gemini API
7. **Real-time**: WebSocket support for live updates

The platform is designed to be **maintainable, extensible, and production-ready** from day one.

**Next Steps**: Review this architecture, clarify any ambiguities, and proceed to implementation Phase 1.
