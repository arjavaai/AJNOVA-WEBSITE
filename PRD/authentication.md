# Authentication & Security

## Document Overview
This document details the authentication system, security measures, and user access control for the AJ NOVA platform.

---

## 1. Authentication Methods

### 1.1 Student Authentication

**Primary Method: Google OAuth**
- **Provider:** Google OAuth 2.0
- **Flow:** Authorization Code Flow
- **Scopes:** 
  - Email
  - Profile
  - Basic user information
- **Benefits:**
  - Quick sign-up
  - No password management
  - Secure authentication
  - Trusted provider

**Authentication Flow:**
1. Student clicks "Login with Google"
2. Redirected to Google OAuth consent screen
3. Student grants permissions
4. Google returns authorization code
5. Backend exchanges code for tokens
6. User profile created/retrieved
7. Session established
8. Redirected to Student Dashboard

**Alternative Method: Email/Password (Optional)**
- Traditional email/password authentication
- Password requirements:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - At least one special character
- Password reset functionality
- Email verification

### 1.2 Admin/Counsellor Authentication

**Method: Email/Password**
- Secure login form
- Strong password requirements
- Multi-factor authentication (optional, recommended for admins)
- Session management

**Admin Login Flow:**
1. Admin enters email/password
2. Credentials verified
3. MFA challenge (if enabled)
4. Session created
5. Redirected to Admin Dashboard

---

## 2. User Registration

### 2.1 Student Registration

**Google OAuth Registration:**
- Automatic account creation on first login
- Profile information extracted from Google account
- Email pre-filled
- Name pre-filled
- Profile picture (optional)

**Registration Steps:**
1. Student clicks "Get Started" or "Sign Up"
2. Redirected to Google OAuth
3. Grants permissions
4. Account created automatically
5. Onboarding flow initiated
6. Profile completion encouraged

**Post-Registration:**
- Welcome email sent
- Onboarding tour (optional)
- Profile completion prompt
- First consultation offer

### 2.2 Admin/Counsellor Registration

**Manual Registration:**
- Admin creates accounts manually
- Invitation email sent
- User sets password
- Account activated
- Role assigned

**Registration Process:**
1. Admin creates user account
2. Invitation email sent
3. User clicks invitation link
4. User sets password
5. Account activated
6. Access granted based on role

---

## 3. Session Management

### 3.1 Session Creation
- Secure session token generated
- Stored in HTTP-only cookie
- Expires after inactivity
- Refresh token mechanism (optional)

### 3.2 Session Duration
**Student Sessions:**
- Active session: 24 hours
- Inactivity timeout: 30 minutes
- Remember me option: 7 days (optional)

**Admin Sessions:**
- Active session: 8 hours
- Inactivity timeout: 15 minutes
- No remember me option (security)

### 3.3 Session Security
- HTTPS only
- Secure cookie flags
- CSRF protection
- Session rotation
- Concurrent session limits

---

## 4. Role-Based Access Control (RBAC)

### 4.1 User Roles

**Student:**
- Access to own dashboard
- View own profile
- Upload own documents
- Generate own documents
- View own applications
- Message assigned counsellor

**Counsellor:**
- View assigned students
- Review documents
- Verify APS submissions
- Schedule consultations
- Update application status
- Message students
- View analytics (limited)

**Admin/Super Admin:**
- All counsellor permissions
- User management
- System settings
- Full analytics access
- Lead management
- Service tracking
- University management

### 4.2 Permission System
- Granular permissions
- Role-based permissions
- Resource-level access control
- API endpoint protection

---

## 5. Password Management

### 5.1 Password Requirements
**Minimum Requirements:**
- 8 characters minimum
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

**Password Policies:**
- Cannot reuse last 3 passwords
- Must change every 90 days (admins)
- Password strength indicator
- Common password prevention

### 5.2 Password Reset
**Reset Flow:**
1. User clicks "Forgot Password"
2. Enters email address
3. Reset link sent to email
4. Link expires in 1 hour
5. User sets new password
6. Password updated
7. All sessions invalidated

**Security Measures:**
- Rate limiting (5 attempts per hour)
- Secure reset tokens
- Email verification
- Password history check

---

## 6. Multi-Factor Authentication (MFA)

### 6.1 MFA for Admins
**Methods:**
- Time-based One-Time Password (TOTP)
- SMS verification (optional)
- Email verification
- Authenticator apps (Google Authenticator, Authy)

**MFA Flow:**
1. Admin enters credentials
2. Credentials verified
3. MFA challenge presented
4. Admin enters code
5. Code verified
6. Session created

**MFA Settings:**
- Enable/disable MFA
- Backup codes
- Recovery options
- Device management

---

## 7. Security Measures

### 7.1 Data Encryption
**Data in Transit:**
- TLS 1.3 encryption
- HTTPS only
- Secure WebSocket (WSS)

**Data at Rest:**
- AES-256 encryption
- Encrypted database fields
- Encrypted file storage
- Key management

### 7.2 API Security
- API key authentication
- Rate limiting
- Request validation
- Input sanitization
- SQL injection prevention
- XSS protection

### 7.3 File Upload Security
- File type validation
- File size limits (10MB)
- Virus scanning (optional)
- Secure storage
- Access control
- Time-limited access tokens

---

## 8. Access Control

### 8.1 Resource Access
- Students can only access own data
- Counsellors can access assigned students
- Admins can access all data
- API endpoints protected by role

### 8.2 Data Privacy
- GDPR compliance
- Data minimization
- Consent management
- Right to deletion
- Data export

---

## 9. Audit & Logging

### 9.1 Authentication Logs
**Logged Events:**
- Login attempts (success/failure)
- Logout events
- Password changes
- MFA challenges
- Session creation/destruction
- Failed authentication attempts

**Log Information:**
- User ID
- Timestamp
- IP address
- User agent
- Event type
- Success/failure status

### 9.2 Security Events
**Monitored Events:**
- Multiple failed login attempts
- Unusual login locations
- Account lockouts
- Permission changes
- Data access violations
- Suspicious activity

### 9.3 Log Retention
- Authentication logs: 6 months
- Security events: 12 months
- Audit trails: 24 months
- Compliance logs: As required

---

## 10. Account Security

### 10.1 Account Lockout
**Lockout Triggers:**
- 5 failed login attempts
- Suspicious activity detected
- Manual lockout by admin

**Lockout Duration:**
- Automatic: 30 minutes
- Manual: Until admin unlocks
- Progressive lockout (optional)

### 10.2 Account Recovery
**Recovery Options:**
- Email verification
- Security questions (optional)
- Admin assistance
- Account recovery flow

### 10.3 Account Deletion
**Deletion Process:**
- User-initiated deletion
- Admin-initiated deletion
- Data retention policy
- Permanent deletion
- Confirmation required

---

## 11. Security Best Practices

### 11.1 Development Practices
- Secure coding standards
- Regular security audits
- Dependency updates
- Vulnerability scanning
- Penetration testing

### 11.2 Infrastructure Security
- Firewall configuration
- DDoS protection
- Intrusion detection
- Regular backups
- Disaster recovery plan

### 11.3 Compliance
- GDPR compliance
- DSGVO compliance (Germany)
- Data protection officer
- Privacy policy
- Terms of service

---

## 12. User Experience

### 12.1 Login Experience
- Quick Google OAuth flow
- Clear error messages
- Helpful guidance
- Remember me option (students)
- Smooth transitions

### 12.2 Security Transparency
- Clear privacy policy
- Security information
- Trust indicators
- SSL certificate display
- Security best practices guide

---

## 13. Technical Implementation

### 13.1 Authentication Service
- JWT tokens (optional)
- Session-based authentication
- OAuth 2.0 implementation
- Token refresh mechanism

### 13.2 Backend Security
- Input validation
- Output encoding
- SQL injection prevention
- XSS protection
- CSRF tokens
- Rate limiting

### 13.3 Frontend Security
- Secure cookie handling
- XSS prevention
- Content Security Policy
- Secure storage (localStorage/sessionStorage)

---

## 14. Monitoring & Alerts

### 14.1 Security Monitoring
- Failed login attempts
- Unusual access patterns
- Account lockouts
- Permission changes
- Data breaches

### 14.2 Alert System
- Real-time alerts
- Email notifications
- Dashboard notifications
- Escalation procedures

---

**End of Authentication & Security Documentation**

