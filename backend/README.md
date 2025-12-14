# AJ NOVA Backend API

FastAPI backend for the AJ NOVA German University Admissions Platform.

## Features

- 🔐 **Google OAuth Authentication** - Secure login with Google accounts
- 🤖 **AI Document Generation** - Generate SOP, LOR, Resume using Google Gemini
- 📊 **Profile Management** - Student profile with completion tracking
- 📝 **Document Management** - Upload, review, and manage documents
- 🎓 **Application Tracking** - Track university applications
- ✅ **Eligibility Checker** - Assess student eligibility
- 📋 **APS Form Submission** - Handle APS verification forms
- 💬 **Messaging System** - Communication between students and counsellors
- 📅 **Consultation Scheduler** - Book and manage consultations
- 🔔 **Real-time Notifications** - Via Supabase Realtime
- 👨‍💼 **Admin Dashboard** - Comprehensive admin features

## Quick Start

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Required environment variables:
- `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` - From your Supabase project
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` - From Google Cloud Console
- `GEMINI_API_KEY` - From Google AI Studio
- `SECRET_KEY` - Generate a strong random key

### 3. Run Development Server

```bash
# Using uvicorn directly
uvicorn app.main:app --reload --port 8000

# Or using Python
python -m app.main
```

The API will be available at:
- API: http://localhost:8000
- Docs: http://localhost:8000/api/docs
- ReDoc: http://localhost:8000/api/redoc

## Project Structure

```
backend/
├── app/
│   ├── main.py                 # FastAPI application
│   ├── config.py               # Configuration settings
│   ├── dependencies.py         # Dependency injection
│   │
│   ├── api/v1/                 # API endpoints
│   │   ├── auth.py            # Authentication
│   │   ├── users.py           # User management
│   │   ├── profiles.py        # Profile CRUD
│   │   ├── documents.py       # Documents & AI
│   │   ├── eligibility.py     # Eligibility checker
│   │   ├── aps.py             # APS forms
│   │   ├── applications.py    # Applications
│   │   ├── messages.py        # Messaging
│   │   ├── consultations.py   # Consultations
│   │   └── admin.py           # Admin endpoints
│   │
│   ├── models/                 # Pydantic models
│   │   ├── user.py
│   │   ├── profile.py
│   │   ├── document.py
│   │   └── ...
│   │
│   ├── services/               # Business logic
│   │   ├── auth_service.py
│   │   ├── ai_service.py
│   │   ├── email_service.py
│   │   ├── storage_service.py
│   │   └── notification_service.py
│   │
│   └── middleware/             # Custom middleware
│       ├── logging.py
│       └── rate_limit.py
│
├── requirements.txt
├── .env.example
└── README.md
```

## API Endpoints

### Authentication
- `GET /api/v1/auth/google` - Initiate Google OAuth
- `GET /api/v1/auth/google/callback` - OAuth callback
- `GET /api/v1/auth/me` - Get current user

### Profiles
- `GET /api/v1/profiles/me` - Get profile
- `PUT /api/v1/profiles/me` - Update profile
- `GET /api/v1/profiles/me/completion` - Get completion status

### Documents (AI Generation)
- `GET /api/v1/documents` - List documents
- `POST /api/v1/documents/generate` - Generate AI document
- `GET /api/v1/documents/{id}` - Get document
- `PUT /api/v1/documents/{id}` - Update document
- `POST /api/v1/documents/{id}/submit` - Submit for review
- `POST /api/v1/documents/{id}/review` - Review document (counsellor)
- `DELETE /api/v1/documents/{id}` - Delete document

### Eligibility
- `POST /api/v1/eligibility/check` - Check eligibility
- `GET /api/v1/eligibility/me` - Get last result

### APS Forms
- `GET /api/v1/aps/me` - Get APS submission
- `POST /api/v1/aps/me` - Submit APS form
- `PUT /api/v1/aps/me` - Update APS submission

### Applications
- `GET /api/v1/applications` - List applications
- `POST /api/v1/applications` - Create application
- `GET /api/v1/applications/{id}` - Get application
- `PUT /api/v1/applications/{id}` - Update application

### Messages
- `GET /api/v1/messages` - Get messages
- `POST /api/v1/messages` - Send message
- `PUT /api/v1/messages/{id}/read` - Mark as read

### Consultations
- `GET /api/v1/consultations` - List consultations
- `POST /api/v1/consultations` - Book consultation
- `GET /api/v1/consultations/{id}` - Get consultation
- `PUT /api/v1/consultations/{id}` - Update consultation

### Admin
- `GET /api/v1/admin/users` - Get all users
- `GET /api/v1/admin/students` - Get all students
- `GET /api/v1/admin/reviews` - Get review queue
- `GET /api/v1/admin/analytics` - Get analytics

## Development

### Running with Auto-reload

```bash
uvicorn app.main:app --reload --port 8000
```

### Testing the API

Use the interactive docs at http://localhost:8000/api/docs

### Common Commands

```bash
# Install dependencies
pip install -r requirements.txt

# Run server
python -m app.main

# Or with uvicorn
uvicorn app.main:app --reload

# Check Python version
python --version  # Should be 3.11+
```

## Production Deployment

### Using Gunicorn + Uvicorn Workers

```bash
gunicorn app.main:app -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Docker Deployment

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY ./app ./app
CMD ["gunicorn", "app.main:app", "-k", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8000"]
```

### Environment Variables

Ensure all production environment variables are set:
- Set `ENVIRONMENT=production`
- Set `DEBUG=False`
- Use strong `SECRET_KEY`
- Update `CORS_ORIGINS` with your frontend URL
- Configure production database and services

## Security

- JWT-based authentication
- Role-based access control (student, counsellor, admin)
- Rate limiting middleware
- HTTPS/TLS in production
- Environment variable protection
- Input validation with Pydantic

## Support

For issues or questions, contact the development team.














