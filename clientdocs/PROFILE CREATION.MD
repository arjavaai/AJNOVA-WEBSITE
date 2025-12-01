# AjNova — Section 4: Profile Creation (UI Specification)

## Purpose
To collect and organize key student information in a simple, progressive form that supports all later steps (APS, AI SOPs, LORs, Resume, etc.).
The profile should feel like a "student identity card" — lightweight yet powerful enough for personalization.

## UI Layout

### 1 Header
Consistent AjNova header with logo, navigation, and Free Consultation button.

### 2 Intro Section
**Title**: Create Your Student Profile
**Subtext**: This helps us personalize your admissions process and document preparation.
**Optional note**: "You can update your details later anytime through your dashboard."

### 3 Profile Form (Compact & Structured)
Organized into four short sections that expand/collapse (accordion style):

#### A. Personal Information
• Full Name
• Date of Birth
• Gender (dropdown)
• Nationality
• Country of Residence

#### B. Academic Background
• Highest Qualification Completed (dropdown)
• Field of Study
• Institution Name
• Graduation Year
• CGPA / Percentage

#### C. Language & Tests
• English Proficiency (IELTS / TOEFL / None / Pending)
• German Language Level (None / A1 / A2 / B1 / B2 / C1)
• Other Relevant Exams (GRE, GMAT, etc. — optional field)

#### D. Contact & Preferences
• Email Address
• Mobile Number
• Preferred Intake (Winter / Summer + Year dropdown)
• Interested Country (default: Germany)
• Study Level (Bachelor / Master)

### 4 Upload Documents (Optional at this Stage)
A simple upload section for:
• Passport (PDF or JPG)
• Academic Transcripts
• Language Certificates

Each field shows: "No file chosen" → "File Uploaded" with a checkmark.

### 5 Save and Continue
Two buttons at the end:
• Save Profile → Saves current progress.
• Continue to APS Form → Moves to next section (APS Verification).

**Confirmation text after saving**:
"Your profile has been successfully created. You can edit it anytime from your dashboard."

### 6 Profile Completion Indicator
A small horizontal bar or percentage (e.g., "Profile 60% Complete").
Encourages users to fill all sections without pressure.

### 7 Footer
Consistent with other pages — quick links, social icons, tagline.

## Profile Logic Overview (for Developers)
• Each section saves independently to prevent data loss.
• "Save Profile" button should trigger validation but not require all fields.
• Profile completion % = (Number of filled fields ÷ Total required fields) × 100.
• Once 80% complete, show a subtle banner: "Your profile is ready for document creation."
• Profiles are stored in a unified student database for use in SOP, LOR, and Resume generation.

## UX Guidelines
• Never ask for data twice — every field should serve a downstream purpose.
• Keep optional uploads clearly marked "optional."
• Make success feedback instant (no dead-end "Saved" messages).
• Use collapsible sections to avoid scroll fatigue.
• Always show next-step guidance (APS Form / Consultation).

End of Section 4 Document
Prepared for AjNova — Profile Creation Page Design Review