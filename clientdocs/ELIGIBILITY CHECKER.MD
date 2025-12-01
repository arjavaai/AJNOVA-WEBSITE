# AjNova — Section 3: Eligibility Checker (UI Specification + Logic Flow)

## Purpose
To help students quickly discover whether they qualify for German public or private universities, based on academic and language background.
The design must feel like a quick self-assessment rather than a formal test — simple, empowering, and judgment-free.

## UI Layout

### 1 Header
Same layout as other pages (logo + navigation + Free Consultation button).

### 2 Intro Block
**Heading**: Check Your Eligibility for German Universities
**Subtext**: Answer a few questions and learn your admission possibilities in under 2 minutes.
**Optional note below**: "This is a preliminary tool; final decisions depend on APS verification and individual university criteria."

### 3 Eligibility Form (Vertical Layout)
1. **Highest Qualification Completed** (drop-down)
   ◦ High School / Diploma / Bachelor's / Master's
2. **Field of Study** (drop-down)
   ◦ Engineering / Business / IT / Health Sciences / Arts / Other
3. **CGPA or Percentage** (input)
4. **English Proficiency** (drop-down)
   ◦ IELTS / TOEFL / None / Pending
5. **German Language Level** (drop-down)
   ◦ None / A1 / A2 / B1 / B2 / C1
6. **Work Experience** (drop-down)
   ◦ None / <1 year / 1–3 years / 3+ years
7. **Preferred Intake** (drop-down)
   ◦ Winter 2025 / Summer 2026
8. **Country of Education** (drop-down)
   ◦ India / Nepal / Bangladesh / Sri Lanka / Other
9. **Button**: Check My Eligibility

### 4 Result Display (Inline Panel)
After clicking Check My Eligibility, show a large, friendly message with one of three outcomes:
• ✅ Eligible for Public Universities
• ⚠ Eligible for Private Universities
• ❌ Currently Not Eligible

Below the headline, a short explanation appears (e.g., "Your CGPA and language scores match private-university requirements.")
Then show two buttons:
• Book a Free Consultation
• Get Profile Improvement Tips

### 5 Readiness Meter
A horizontal bar labeled "Readiness Score."
• 70 – 100 → Public Eligible (Green)
• 50 – 69 → Private Eligible (Amber)
• Below 50 → Needs Improvement (Red)

### 6 Guidance Block
If "Not Eligible," display supportive text:
"No worries — our team can help you improve your profile through language courses, document refinement, and counselling."
CTA: Get Expert Help.

### 7 Footer
Consistent AjNova footer (quick links + social links + tagline).

## Eligibility Logic Overview (for UI Team)
The system calculates a readiness score (0 – 100) using four main inputs:

| Criterion | Weight | Logic Summary |
|-----------|--------|---------------|
| Academic Score | 40% | CGPA ≥ 7.0 or ≥ 70 % = 40 points; 6.0–6.9 = 30 points; below 6.0 = 10 points. |
| English Proficiency | 20% | IELTS ≥ 6.0 or TOEFL ≥ 80 = 20 points; Pending = 10 points; None = 0. |
| German Level | 25% | A2 = 20 points; B1 or above = 25 points; None = 0. |
| Work Experience | 15% | 1 – 3 years = 10 points; 3 + years = 15 points; None = 0. |

**Readiness Score Interpretation**
• 70 – 100: Eligible for Public Universities
• 50 – 69: Eligible for Private Universities
• Below 50: Not Eligible (Recommend Profile Improvement / Consultation)

### Additional Notes for UI Representation
• Show the numeric score next to the bar (e.g., "Readiness 78 %").
• Always offer a next step, even for low scores.
• Wording should encourage, not discourage (avoid "fail," "rejected").
• The logic table should be invisible to students — only the outcome appears.

## UX Principles
• Keep it under 8 fields visible.
• Avoid page reloads; show results inline.
• Ensure each result links to a helpful action (Book Consultation / Improve Profile).
• Always use friendly, motivational language.

End of Section 3 Document
Prepared for AjNova — Eligibility Checker Design & Logic Review