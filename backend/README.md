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

### Prerequisites

- **Python 3.13+** (or Python 3.10+)
- pip (Python package manager)
- Virtual environment (recommended)

### 1. Set Up Virtual Environment (Recommended)

```bash
cd backend

# Create virtual environment with Python 3.13
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Upgrade pip
pip install --upgrade pip
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Required environment variables:
- `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` - From your Supabase project
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` - From Google Cloud Console
- `GEMINI_API_KEY` - From Google AI Studio
- `SECRET_KEY` - Generate a strong random key

### 4. Run Development Server

**Option 1: Using the Startup Script (Recommended for Windows)**
```bash
# From project root
START_BACKEND.bat
```

**Option 2: Using uvicorn directly**
```bash
# Make sure virtual environment is activated
cd backend
python -m uvicorn app.main_working:app --reload --host 0.0.0.0 --port 8000
```

**Option 3: Using PowerShell script**
```powershell
cd backend
.\start_server.ps1
```

The API will be available at:
- **API**: http://localhost:8000
- **Interactive Docs (Swagger)**: http://localhost:8000/api/docs
- **ReDoc**: http://localhost:8000/api/redoc
- **Health Check**: http://localhost:8000/health

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
# Activate virtual environment (if not activated)
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac

# Install/Update dependencies
pip install -r requirements.txt

# Run server (development)
python -m uvicorn app.main_working:app --reload --host 0.0.0.0 --port 8000

# Check Python version
python --version  # Should be Python 3.13.11

# Check installed packages
pip list

# Update pip
pip install --upgrade pip

# Deactivate virtual environment
deactivate
```

### Python Version Information

This project uses **Python 3.13.11** with a virtual environment. Key points:
- ✅ Upgraded from Python 3.9 (December 2025)
- ✅ Full compatibility with Pydantic 2.12.5 and FastAPI
- ✅ Latest features and performance improvements
- ✅ Isolated dependencies via virtual environment

If you encounter issues, see: `PYTHON_313_UPGRADE_SUCCESS.md` in project root.

## Production Deployment

### Using Gunicorn + Uvicorn Workers

```bash
gunicorn app.main:app -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Docker Deployment

The project includes a production-ready Dockerfile using Python 3.13:

```dockerfile
FROM python:3.13-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY ./app ./app
CMD ["gunicorn", "app.main:app", "-k", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8000"]
```

Build and run with Docker:
```bash
# Build image
docker build -t ajnova-backend .

# Run container
docker run -p 8000:8000 --env-file .env ajnova-backend

# Or use docker-compose
docker-compose up -d
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
























