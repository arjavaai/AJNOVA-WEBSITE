# Deploying AJ NOVA Backend to Replit

This guide will walk you through deploying the AJ NOVA backend API to Replit.

## Prerequisites

- A Replit account (free or paid)
- Your Supabase credentials
- Google Gemini API key
- (Optional) Google OAuth credentials
- (Optional) SendGrid API key for emails

## Quick Deploy to Replit

### Option 1: Import from GitHub

1. **Go to Replit** and click "Create Repl"
2. **Select "Import from GitHub"**
3. **Enter repository URL**: Your backend repository URL
4. **Configure the Repl**:
   - Language: Python
   - Run command: `uvicorn main:app --host 0.0.0.0 --port 8000`

### Option 2: Upload Backend Folder

1. **Create a new Python Repl** on Replit
2. **Upload the backend folder** contents
3. **Ensure these files are present**:
   - `main.py` (main entry point)
   - `requirements.txt`
   - `.replit`
   - `replit.nix`
   - `app/` folder with all API code

## Configuration

### 1. Set Environment Variables (Secrets)

In Replit, go to the "Tools" panel → "Secrets" and add:

```bash
# Environment
ENVIRONMENT=production
DEBUG=False

# API Configuration
BACKEND_URL=https://your-repl-name.your-username.repl.co
FRONTEND_URL=https://your-vercel-app.vercel.app

# Security
SECRET_KEY=generate-a-strong-random-key-here-use-openssl-rand-hex-32
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080

# CORS Origins (add your Vercel URL)
CORS_ORIGINS_STR=https://your-vercel-app.vercel.app,https://your-repl-name.your-username.repl.co

# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key-here
SUPABASE_SERVICE_KEY=your-service-role-key-here
SUPABASE_JWT_SECRET=your-jwt-secret-here

# Google Gemini AI
GEMINI_API_KEY=your-gemini-api-key-here
GEMINI_MODEL=gemini-1.5-pro

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=https://your-repl-name.your-username.repl.co/api/v1/auth/google/callback

# Email Service (Optional)
SENDGRID_API_KEY=your-sendgrid-api-key-here
FROM_EMAIL=noreply@ajnova.com

# Rate Limiting
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_PERIOD=60

# File Upload
MAX_FILE_SIZE=10485760
```

### 2. Verify `.replit` Configuration

The `.replit` file should contain:

```toml
run = "uvicorn main:app --host 0.0.0.0 --port 8000"
language = "python3"
modules = ["python-3.11"]

[nix]
channel = "stable-24_05"

[deployment]
run = ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port 8000"]
deploymentTarget = "cloudrun"

[[ports]]
localPort = 8000
externalPort = 80
```

### 3. Verify `replit.nix` Dependencies

```nix
{ pkgs }: {
  deps = [
    pkgs.python311
    pkgs.python311Packages.pip
    pkgs.postgresql
  ];
}
```

## Deployment Steps

### 1. Install Dependencies

Replit should automatically install dependencies from `requirements.txt`. If not:

```bash
pip install -r requirements.txt
```

### 2. Test Locally in Replit

Click the "Run" button. The API should start on port 8000.

Test endpoints:
- Root: `https://your-repl-name.your-username.repl.co/`
- Health: `https://your-repl-name.your-username.repl.co/health`
- API Docs: `https://your-repl-name.your-username.repl.co/api/docs`

### 3. Deploy to Production

1. **Click "Deploy"** in Replit
2. **Select deployment type**:
   - Reserved VM (recommended for production)
   - Autoscale (for high traffic)
3. **Configure settings**:
   - Enable "Always On" to keep your API running
   - Set environment to production
4. **Click "Deploy"**

## Post-Deployment

### 1. Update Frontend Configuration

In your Next.js frontend (Vercel), update the environment variables:

```bash
NEXT_PUBLIC_API_URL=https://your-repl-name.your-username.repl.co
```

### 2. Test API Endpoints

Use the included `backend-test.html` file to test your deployed API:

1. Open `backend-test.html` in a browser
2. Update the API URL to your Replit URL
3. Test all endpoints

### 3. Monitor Logs

In Replit, check the "Console" tab to monitor:
- API requests
- Errors
- Performance metrics

## Troubleshooting

### Port Issues

If the default port doesn't work:

```python
# In main.py
if __name__ == "__main__":
    import uvicorn
    import os
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
```

### CORS Errors

Make sure your frontend URL is in `CORS_ORIGINS_STR`:

```bash
CORS_ORIGINS_STR=https://your-vercel-app.vercel.app,https://your-custom-domain.com
```

### Database Connection Issues

Verify Supabase credentials and check if Supabase allows connections from Replit IPs.

### Module Import Errors

If you get import errors, ensure the Python version matches:

```bash
python --version  # Should be 3.11+
```

### Dependencies Not Installing

Manually install in the Shell:

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

## Production Checklist

- [ ] All environment variables configured
- [ ] `DEBUG=False` in production
- [ ] Strong `SECRET_KEY` generated
- [ ] CORS origins include your frontend URL
- [ ] Supabase credentials verified
- [ ] Google Gemini API key working
- [ ] Health check endpoint returns 200
- [ ] API documentation accessible
- [ ] Frontend can connect to backend
- [ ] Always On enabled in Replit
- [ ] Logs monitored for errors

## Cost Optimization

### Free Tier
- Limited to 1 GB storage
- Sleeps after inactivity
- Suitable for development/testing

### Reserved VM (Recommended)
- Always on
- Predictable pricing
- Better performance

### Autoscale
- Scales based on traffic
- Best for production
- Higher cost but better reliability

## Security Best Practices

1. **Never commit `.env` file** to version control
2. **Use strong SECRET_KEY** (generate with `openssl rand -hex 32`)
3. **Enable HTTPS** (Replit provides this automatically)
4. **Limit CORS origins** to only your frontend domains
5. **Use service role key** only for admin operations
6. **Rotate API keys** regularly
7. **Monitor logs** for suspicious activity

## Need Help?

- [Replit Documentation](https://docs.replit.com/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Supabase Documentation](https://supabase.com/docs)

## Next Steps

After deployment:
1. Test all API endpoints
2. Update frontend to use production API URL
3. Set up monitoring and alerts
4. Configure automated backups
5. Implement rate limiting for public endpoints

---

**Deployment Date**: $(date)
**Backend Version**: 1.0.0
**Python Version**: 3.11+
