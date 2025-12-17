# AJ NOVA Backend - Deployment Guide

**Updated for Python 3.13.11 (December 2025)**

## 🚀 Deployment Options

### Option 1: Docker Deployment (Recommended)

#### Prerequisites
- Docker & Docker Compose installed
- Python 3.13+ (for local development)
- Environment variables configured

#### Steps

1. **Build the Docker image (Python 3.13):**
   ```bash
   docker build -t ajnova-backend .
   ```

2. **Run with Docker Compose:**
   ```bash
   docker-compose up -d
   ```

3. **Check logs:**
   ```bash
   docker-compose logs -f backend
   ```

4. **Stop the service:**
   ```bash
   docker-compose down
   ```

### Option 2: Railway Deployment

#### Steps

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway:**
   ```bash
   railway login
   ```

3. **Initialize project:**
   ```bash
   railway init
   ```

4. **Set environment variables:**
   ```bash
   railway variables set SUPABASE_URL=your-url
   railway variables set SUPABASE_SERVICE_KEY=your-key
   # ... set all other variables from env.example
   ```

5. **Deploy:**
   ```bash
   railway up
   ```

### Option 3: Render Deployment

1. **Connect your GitHub repository** to Render
2. **Create a new Web Service**
3. **Configure:**
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn app.main:app -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT`
   - **Environment:** Python 3.13 (or latest Python 3.x available)
   - **Python Version:** 3.13.11 (specify in Render settings)
4. **Add environment variables** from `.env.example`
5. **Deploy!**

### Option 4: AWS ECS/Fargate

1. **Push Docker image to ECR:**
   ```bash
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account>.dkr.ecr.us-east-1.amazonaws.com
   docker tag ajnova-backend:latest <account>.dkr.ecr.us-east-1.amazonaws.com/ajnova-backend:latest
   docker push <account>.dkr.ecr.us-east-1.amazonaws.com/ajnova-backend:latest
   ```

2. **Create ECS Task Definition** with environment variables
3. **Create ECS Service** with load balancer
4. **Configure auto-scaling** as needed

### Option 5: Vercel (Serverless)

While FastAPI is typically deployed on traditional servers, you can deploy on Vercel using:

1. **Create `vercel.json`:**
   ```json
   {
     "builds": [{"src": "app/main.py", "use": "@vercel/python"}],
     "routes": [{"src": "/(.*)", "dest": "app/main.py"}]
   }
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

## 📋 Pre-Deployment Checklist

- [ ] All environment variables are set
- [ ] `SECRET_KEY` is a strong, random string
- [ ] `DEBUG=False` in production
- [ ] Supabase project is created and configured
- [ ] Google OAuth credentials are configured
- [ ] Gemini API key is valid
- [ ] CORS origins include production frontend URL
- [ ] Database migrations are applied
- [ ] SSL/TLS is enabled (handled by hosting provider usually)

## 🔒 Security Checklist

- [ ] Use HTTPS only in production
- [ ] Rotate `SECRET_KEY` regularly
- [ ] Use service accounts for API keys
- [ ] Enable rate limiting
- [ ] Set up monitoring and alerts
- [ ] Configure firewall rules
- [ ] Use strong passwords for all services
- [ ] Enable 2FA where possible
- [ ] Regular security audits

## 🗄️ Database Setup

### Apply Migrations to Supabase

1. **Via Supabase Dashboard:**
   - Go to SQL Editor
   - Copy contents of `supabase/migrations/001_initial_schema.sql`
   - Run the migration

2. **Via Supabase CLI:**
   ```bash
   supabase migration new initial_schema
   # Copy migration content to the generated file
   supabase db push
   ```

### Configure Storage Buckets

In Supabase Dashboard:

1. Go to **Storage**
2. Create bucket: `documents`
3. Set policies:
   - Allow authenticated users to upload
   - Allow users to read their own files
   - Allow counsellors/admins to read all files

## 🔍 Monitoring

### Health Check Endpoint
```
GET /health
```

Response:
```json
{
  "status": "healthy",
  "environment": "production",
  "version": "1.0.0"
}
```

### Logging

- Application logs are sent to stdout/stderr
- Configure log aggregation service (e.g., LogRocket, Datadog)
- Monitor error rates and response times

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Docker image
        run: docker build -t ajnova-backend .
      
      - name: Push to Registry
        run: |
          # Push to your container registry
          
      - name: Deploy to Production
        run: |
          # Deploy to your hosting provider
```

## 📊 Performance Optimization

1. **Use connection pooling** (already configured in Supabase client)
2. **Enable compression** (already enabled via GZipMiddleware)
3. **Cache frequently accessed data**
4. **Use CDN** for static assets
5. **Monitor and optimize slow queries**
6. **Scale horizontally** by adding more workers

## 🆘 Troubleshooting

### Server won't start
- Check environment variables are set correctly
- Verify Python version (3.13+ recommended, 3.10+ minimum)
- Check port 8000 is available
- Review error logs
- Ensure virtual environment is activated (local development)
- Check if all dependencies are installed

### Database connection issues
- Verify Supabase credentials
- Check network connectivity
- Ensure IP is whitelisted in Supabase

### Authentication errors
- Verify Google OAuth credentials
- Check redirect URIs match
- Ensure JWT secret is set correctly

## 📞 Support

For deployment issues, contact the development team or check the documentation.


















