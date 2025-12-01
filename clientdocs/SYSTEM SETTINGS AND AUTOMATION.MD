# AjNova — Section 10: System Settings & Automation Framework

## 🎯 Purpose
To give AjNova administrators full control over configurations, automated workflows, and communication templates — ensuring consistency, accuracy, and minimal manual work.
Automation should make counsellors more human, not less: freeing them from repetitive tasks so they can focus on guidance and empathy.

## 1 Core Objectives
1. Centralize platform-wide settings and defaults.
2. Automate repetitive or time-sensitive tasks (reminders, approvals, follow-ups).
3. Maintain consistent branding and communication across every message.
4. Provide granular control — admins decide what is automated and how often.

## 2 System Settings Overview
The System Settings Panel appears under the Super Admin account.
It includes the following configuration groups:

### General Settings
• Organization name, logo, and contact info
• Default timezone and currency
• Date/time formats
• Language defaults (English / German / Hindi)

### Branding Settings
• Header and footer text for PDFs and emails
• Logo placement rules
• Legal disclaimers
• Email signature templates

### Access Settings
• Role definitions (Admin, Counsellor, Reviewer, Support, Student)
• Password rules and authentication requirements
• Two-factor authentication toggle
• Session timeout duration

### Notification Preferences
• Choose which alerts are sent via email vs. in-dashboard
• Set thresholds for reminders (e.g., 3 days without counsellor response)
• Turn daily summary emails on/off

## 3 Automation Framework
Automation within AjNova functions through "Event Triggers" that listen for specific actions or conditions and then execute defined responses.

### Example Event Triggers

| Trigger | Automated Action | Target |
|---------|------------------|--------|
| New student registers | Send welcome email + onboarding steps | Student |
| APS submitted | Notify assigned counsellor | Counsellor |
| APS verified | Email student confirmation | Student |
| Document approved | Unlock next step | Student |
| Inactivity for 7 days | Send re-engagement reminder | Student |
| Counsellor workload > X students | Alert supervisor | Admin |

Each automation can be toggled ON/OFF or edited.

## 4 Email & Notification Templates
A library of pre-approved templates ensures professional consistency.

### Welcome Email
**Subject**: Welcome to AjNova — Let's Start Your Journey!
2
3

### Reminder Email
**Subject**: You're halfway there!
Hi [Name],

We noticed you haven't completed your APS form yet. Let's finish this step together — it takes just a few minutes.


Line Wrapping

Collapse
Copy
1
2
3

### Approval Email
**Subject**: Congratulations — Your [SOP/LOR] Has Been Approved
Great work, [Name]! Your document is ready for download in your dashboard.


Line Wrapping

Collapse
Copy
1
2
3

### Counsellor Alert
**Subject**: New APS Submission from [Student Name]

## 5 Task Scheduling System
Admins can set up recurring automated tasks:
• Daily email summaries for counsellors (pending students, reviews due).
• Weekly performance report for management.
• Monthly data backup and analytics export.
• Quarterly satisfaction survey for students.

Schedules configurable by day, time, and recipient group.

## 6 Document Version Control
Automation also ensures data integrity through:
• Automatic version saving every time a counsellor edits a document.
• "Compare Versions" option to see differences between drafts.
• Auto-locking approved versions to prevent accidental overwrites.
• Scheduled deletion of archived versions after X months (configurable).

## 7 Reminders & Escalations
Smart reminders appear when deadlines approach:
"3 days left to review SOP for Ajay Kumar."

If ignored, the system escalates automatically:
• Level 1: Reminder to counsellor
• Level 2: Notification to senior counsellor
• Level 3: Alert to admin

All reminders can be customized for tone and frequency.

## 8 Data Backup & Recovery
• Automated daily backups stored on secure cloud servers.
• Weekly redundancy check.
• One-click restore option for Admins.
• Backup history log for the past 90 days.

Admins receive an email confirmation for every successful backup.

## 9 Security Automations
• Auto-logout inactive sessions after set time.
• Password expiration reminders every 90 days.
• Two-factor authentication prompts for sensitive actions.
• Automatic locking of suspicious accounts (after 5 failed logins).
• Audit logs created automatically for every admin action.

## 10 Compliance Management
Automation supports regulatory compliance:
• Auto-archive GDPR consent forms.
• Send annual "Data Retention Notice" to users.
• Automatically anonymize inactive accounts after 12 months.

A compliance dashboard displays:
• Total users with consent ✅
• Pending consent requests ⚠
• Archived accounts 🗂

## 11 Custom Workflow Builder (Advanced)
For larger institutions, admins can create custom automations by chaining triggers and actions, such as:

**Example Workflow**:
If a student's APS is verified and AI documents are approved → automatically send enrollment packet → notify counsellor → create "Enrolled" tag.

Every workflow saved with a friendly name and description for clarity.

## 12 Logging & Audit Trails
Every automation logs:
• Who created or edited it
• When it ran last
• Which students or records it affected
• Whether it succeeded or failed

This transparency allows easy troubleshooting and compliance validation.

## 13 UX Principles
• All settings displayed in collapsible groups — minimal visual clutter.
• Explanatory text under every toggle ("This will automatically send an email when...").
• Undo option available for recent automation changes.
• "Test Automation" button to simulate before enabling.
• Real-time status indicators (green = active, grey = inactive).

## 14 Outcomes
AjNova's automation system transforms a complex workflow into a self-sustaining, well-tuned process.
Emails, approvals, backups, and reviews happen on schedule.
Counsellors get more time for meaningful work; admins get peace of mind; students get faster, more reliable service.

The result: an admissions ecosystem that runs itself — quietly, accurately, and always on brand.

End of Section 10 — System Settings & Automation Framework
Prepared for AjNova — Operations Optimization & Platform Administration Design Review.