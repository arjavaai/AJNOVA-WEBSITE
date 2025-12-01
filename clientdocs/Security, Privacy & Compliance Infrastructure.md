# AjNova — Section 11: Security, Privacy & Compliance Infrastructure

## 🎯 Purpose
To guarantee the confidentiality, integrity, and availability of all data stored and processed within AjNova.
This section defines how the system complies with international regulations such as GDPR, DSGVO (Germany), and ISO/IEC 27001 principles for data security.
Security in AjNova is not an add-on; it is a silent design philosophy that touches every feature — from login to analytics.

## 1 Core Security Objectives
1. Protect all personal, academic, and document data from unauthorized access.
2. Maintain full transparency over how data is collected, stored, and processed.
3. Provide fine-grained user permissions to ensure least privilege access.
4. Comply with European and German data protection laws.
5. Build trust through visible security cues and policies.

## 2 Data Classification
Every piece of information within AjNova is classified as:

| Data Type | Examples | Sensitivity Level |
|-----------|----------|------------------|
| Personal Identifiable Data (PID) | Name, email, phone, address, passport number | High |
| Academic Data | Transcripts, APS forms, certificates | High |
| System Data | Logs, analytics summaries, metadata | Medium |
| Public Data | Blog posts, help articles | Low |

Each level determines storage encryption strength and access permissions.

## 3 Encryption Standards
### Data in Transit
All network communication secured with TLS 1.3.
No plaintext credentials or documents ever travel through the network.

### Data at Rest
All sensitive data stored using AES-256 encryption.
Encryption keys rotated periodically and never stored in the same location as data.

### File Storage
Documents stored in encrypted cloud repositories (Germany-based data centers).
Each upload assigned a unique, time-limited access token for viewing or download.

## 4 Authentication & Access Control
• Role-Based Access Control (RBAC): defines what each user can view or modify.
• Multi-Factor Authentication (MFA): optional for counsellors and required for admins.
• Single Sign-On (SSO): compatible with institutional login for partner universities.
• Session Security: automatic logout after defined inactivity period.
• IP Logging: monitor suspicious login attempts and block malicious sources.

Principle of Least Privilege: every account can access only what is essential to its task.

## 5 Data Retention & Deletion Policy
### Retention
• Student data retained for a maximum of 24 months after last activity unless reauthorized.
• Counsellor and admin logs retained for compliance (also 24 months).
• Analytics data stored in anonymized form indefinitely.

### Deletion
When a student requests account deletion or legal retention expires:
• All personal identifiers are permanently erased.
• Uploaded files and backups referencing that ID are destroyed.
• AI-generated drafts anonymized but statistical data preserved.
Confirmation email sent upon completion of deletion.

## 6 GDPR / DSGVO Compliance
AjNova adheres to EU data protection laws.
Key rights guaranteed to every student and counsellor include:
1. Right to Access: view all personal data stored in the system.
2. Right to Rectification: correct incorrect or outdated information.
3. Right to Erasure: delete account and data permanently ("Right to be Forgotten").
4. Right to Portability: download profile data in structured JSON/CSV format.
5. Right to Restriction of Processing: temporarily pause data use during disputes.
6. Right to Transparency: clear privacy policy and consent tracking for every user.

A dedicated Data Protection Officer (DPO) oversees compliance and handles requests.

## 7 Consent Management
• Every new user must accept Terms of Use and Privacy Policy during registration.
• Explicit checkbox for data processing consent.
• Consent stored with timestamp and IP address.
• Users can revoke consent anytime from the Account Settings page.

If consent is withdrawn → account immediately frozen and flagged for deletion review.

## 8 Monitoring, Logging & Auditing
Every sensitive event generates a secure log entry:

| Event | Data Captured | Retention |
|-------|---------------|-----------|
| Login / Logout | User ID, time, IP | 6 months |
| File Upload / Download | File ID, user, action | 12 months |
| Profile Update | Field changed, old vs. new | 12 months |
| Document Approval | Reviewer, time, outcome | 24 months |

All logs encrypted and tamper-proof.
Periodic audits (quarterly) verify compliance and detect anomalies.

## 9 Backup & Disaster Recovery
### Backup Frequency
• Incremental backups every 6 hours.
• Full encrypted backups daily at midnight.

### Storage
Backups kept in two separate European data centers (geo-redundant).

### Recovery
• System can be restored within 4 hours of failure.
• Disaster Recovery Plan (DRP) tested quarterly.
• Emergency contacts and escalation procedures documented.

## 10 AI & Data Ethics Framework
AjNova's AI systems follow ethical transparency and fairness principles:
• AI outputs (SOPs, LORs, Resumes) always editable — human judgment remains final.
• Training data anonymized and never sourced from real student submissions.
• No biometric or sensitive profiling.
• AI audit trail maintained to review prompt usage and results.
• Transparency notice displayed wherever AI assists user actions.

## 11 Compliance Certifications & Audits
AjNova aims for:
• GDPR / DSGVO certification (DE)
• ISO/IEC 27001 (Information Security Management)
• ISO 27701 (Privacy Information Management)

Annual third-party audits verify adherence to policies and generate reports for management.

## 12 Incident Response Plan
1. Detection – automated alerts for suspicious activity (login spikes, data anomalies).
2. Containment – temporary account freeze and session invalidation.
3. Assessment – DPO reviews affected users and data scope.
4. Notification – mandatory user and authority notification within 72 hours (per GDPR).
5. Remediation – restore system integrity, rotate credentials, update firewalls.
6. Documentation – full report logged and stored for 5 years.

## 13 Privacy-by-Design Principles
Every new feature must follow these rules:
• Collect only essential information.
• Ask for consent before collecting or storing data.
• Provide transparent explanations in plain language.
• Allow full deletion of user data at any stage.
• Default privacy settings always "maximum protection."

## 14 User Education & Awareness
• Students: simple guide explaining how their data is protected.
• Counsellors: annual online training on data handling and GDPR rules.
• Admins: incident response and compliance refresh every 6 months.
• Partners: sign Data Processing Agreement (DPA) before gaining access.

## 15 Outcomes
AjNova becomes a model of responsible technology — a secure digital bridge between students and institutions.
Students trust the platform with their documents and identities because they can see how privacy is protected.
Admins sleep peacefully knowing every byte is encrypted, logged, and compliant with European standards.

End of Section 11 — Security, Privacy & Compliance Infrastructure
Prepared for AjNova – Information Security & Data Governance Design Review.