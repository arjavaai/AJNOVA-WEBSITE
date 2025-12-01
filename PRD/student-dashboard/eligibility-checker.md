# Student Dashboard - Eligibility Checker

## Document Overview
This document details the Eligibility Checker feature, an intelligent tool that helps students assess their qualification for German public or private universities.

---

## 1. Purpose

The Eligibility Checker enables students to:
- Quickly assess their eligibility for German universities
- Understand their readiness score
- Receive personalized recommendations
- Identify areas for improvement
- Make informed decisions about their application journey

---

## 2. Eligibility Assessment Logic

### 2.1 Input Parameters

**Academic Score (40% weight):**
- CGPA or Percentage
- Scoring:
  - CGPA ≥ 7.0 or Percentage ≥ 70% = 40 points
  - CGPA 6.0-6.9 or Percentage 60-69% = 30 points
  - CGPA 5.0-5.9 or Percentage 50-59% = 20 points
  - CGPA < 5.0 or Percentage < 50% = 10 points

**English Proficiency (20% weight):**
- Test Type: IELTS, TOEFL, None, Pending
- Scoring:
  - IELTS ≥ 6.0 or TOEFL ≥ 80 = 20 points
  - IELTS 5.5-5.9 or TOEFL 70-79 = 15 points
  - Pending = 10 points
  - None = 0 points

**German Language Level (25% weight):**
- Level: None, A1, A2, B1, B2, C1, C2
- Scoring:
  - B1 or above = 25 points
  - A2 = 20 points
  - A1 = 10 points
  - None = 0 points

**Work Experience (15% weight):**
- Experience: None, <1 year, 1-3 years, 3+ years
- Scoring:
  - 3+ years = 15 points
  - 1-3 years = 10 points
  - <1 year = 5 points
  - None = 0 points

### 2.2 Readiness Score Calculation

**Formula:**
```
Readiness Score = Academic Score + English Score + German Score + Work Experience Score
```

**Score Range:** 0-100

### 2.3 Eligibility Interpretation

**70-100 Points: Eligible for Public Universities**
- Green badge
- Positive messaging
- Next steps: Proceed with APS and applications

**50-69 Points: Eligible for Private Universities**
- Amber/yellow badge
- Supportive messaging
- Next steps: Consider private universities or improve profile

**Below 50 Points: Needs Improvement**
- Red badge
- Encouraging messaging
- Next steps: Profile improvement recommendations, consultation

---

## 3. UI Layout

### 3.1 Page Header
- **Title:** "Check Your Eligibility for German Universities"
- **Subtitle:** "Answer a few questions and learn your admission possibilities in under 2 minutes"
- **Note:** "This is a preliminary tool; final decisions depend on APS verification and individual university criteria."

### 3.2 Eligibility Form

**Form Fields:**

1. **Highest Qualification Completed** (required)
   - Dropdown: High School, Diploma, Bachelor's, Master's, PhD

2. **Field of Study** (required)
   - Dropdown: Engineering, Business, IT, Health Sciences, Arts, Other
   - Text input if "Other"

3. **CGPA or Percentage** (required)
   - Number input
   - Toggle: CGPA / Percentage
   - Range validation

4. **English Proficiency** (required)
   - Dropdown: IELTS, TOEFL, None, Pending
   - Conditional: If IELTS/TOEFL selected, show score input
   - Score input with validation

5. **German Language Level** (required)
   - Dropdown: None, A1, A2, B1, B2, C1, C2

6. **Work Experience** (required)
   - Dropdown: None, <1 year, 1-3 years, 3+ years

7. **Preferred Intake** (optional)
   - Dropdown: Winter 2025, Summer 2026, etc.

8. **Country of Education** (optional)
   - Dropdown: India, Nepal, Bangladesh, Sri Lanka, Other

**Action Button:**
- "Check My Eligibility" (primary button)
- Loading state during calculation

### 3.3 Result Display

**Result Panel (shown after submission):**

**Eligibility Badge:**
- Large, prominent badge
- Color-coded (Green/Amber/Red)
- Text: "Eligible for Public Universities" / "Eligible for Private Universities" / "Needs Improvement"

**Readiness Score Meter:**
- Horizontal progress bar
- Percentage display: "Readiness Score: 78%"
- Color-coded segments
- Visual indicator

**Explanation Text:**
- Personalized message based on score
- Highlights strengths
- Mentions areas for improvement

**Recommendations:**
- Specific next steps
- Improvement suggestions
- Resource links

**Action Buttons:**
- "Book a Free Consultation" (primary)
- "Improve My Profile" (secondary)
- "View Detailed Report" (optional)

### 3.4 Detailed Breakdown (Optional)

**Score Breakdown:**
- Academic Score: XX/40
- English Score: XX/20
- German Score: XX/25
- Work Experience: XX/15
- Total: XX/100

**Visual representation:**
- Bar charts for each component
- Comparison with ideal scores

---

## 4. User Experience Flow

### 4.1 First-Time User
1. Student clicks "Check Eligibility"
2. Sees form (or pre-filled from profile)
3. Fills required fields
4. Clicks "Check My Eligibility"
5. Sees results with explanation
6. Receives recommendations
7. Can book consultation or improve profile

### 4.2 Returning User
1. Student revisits eligibility checker
2. Sees previous result (if exists)
3. Can update information
4. Recalculate eligibility
5. Compare with previous result

### 4.3 Profile Integration
- Auto-fill form from student profile
- Allow manual override
- Save result to profile
- Update when profile changes

---

## 5. Result Messages

### 5.1 Public University Eligible (70-100)
**Message:**
"Congratulations! Based on your academic background and language proficiency, you're eligible for public universities in Germany. Your strong profile positions you well for competitive programs."

**Next Steps:**
- Complete your profile
- Submit APS verification
- Generate admission documents
- Start university applications

### 5.2 Private University Eligible (50-69)
**Message:**
"Good news! You're eligible for private universities in Germany. While public universities may be competitive, private institutions offer excellent programs and may be a great fit for your goals."

**Next Steps:**
- Consider private university options
- Improve language scores (if applicable)
- Book consultation for guidance
- Explore scholarship opportunities

### 5.3 Needs Improvement (<50)
**Message:**
"Don't worry — every journey starts with a single step. Your current profile shows potential, and with some improvements, you can achieve your study abroad goals."

**Improvement Recommendations:**
- Improve academic scores (if possible)
- Take English proficiency test (IELTS/TOEFL)
- Start German language courses
- Gain relevant work experience
- Book consultation for personalized plan

---

## 6. Integration Points

### 6.1 Profile Integration
- Use profile data to pre-fill form
- Save result to profile
- Update eligibility status
- Track eligibility history

### 6.2 Dashboard Integration
- Display eligibility result on dashboard
- Show readiness score
- Link to detailed report
- Quick access to improvement tips

### 6.3 Consultation Integration
- Book consultation from results page
- Share eligibility result with counsellor
- Get personalized guidance

### 6.4 Admin Dashboard
- Counsellors can view eligibility results
- Use for lead qualification
- Track eligibility trends

---

## 7. Technical Implementation

### 7.1 Calculation Logic
- Client-side calculation for instant results
- Server-side validation
- Store results in database
- History tracking

### 7.2 Data Storage
- Store eligibility result
- Save calculation inputs
- Track result changes
- Analytics data

### 7.3 Performance
- Instant calculation (< 1 second)
- No page reload
- Smooth animations
- Mobile-optimized

---

## 8. Mobile Responsiveness

### 8.1 Mobile Layout
- Single column form
- Stacked fields
- Touch-friendly inputs
- Full-width buttons
- Optimized result display

### 8.2 Tablet Layout
- Two-column form (where appropriate)
- Maintained functionality
- Responsive result panel

---

## 9. Accessibility

### 9.1 Keyboard Navigation
- Tab through all fields
- Enter to submit
- Clear focus indicators

### 9.2 Screen Readers
- ARIA labels
- Result announcements
- Form instructions

### 9.3 Visual
- High contrast
- Color + text indicators
- Clear typography

---

## 10. Analytics & Tracking

### 10.1 Metrics to Track
- Eligibility checker usage
- Average readiness scores
- Result distribution
- Conversion to consultation
- Profile improvement actions

### 10.2 Insights
- Most common eligibility levels
- Improvement areas needed
- Conversion rates
- User drop-off points

---

**End of Eligibility Checker Documentation**

