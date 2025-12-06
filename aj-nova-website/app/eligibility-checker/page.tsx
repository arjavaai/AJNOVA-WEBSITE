"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BackgroundGrid } from "@/components/background-grid";
import { BeamButton } from "@/components/beam-button";
import { FlashlightCard } from "@/components/flashlight-card";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Calendar,
  Lightbulb,
  AlertCircle,
} from "lucide-react";
import {
  EligibilityFormData,
  EligibilityResult,
  ScoreType,
  QualificationLevel,
  FieldOfStudy,
  EnglishTest,
  GermanLevel,
  WorkExperience,
} from "@/lib/eligibility-types";
import {
  calculateEligibility,
  validateEligibilityForm,
} from "@/lib/eligibility-calculator";

const qualificationOptions = [
  { value: "HIGH_SCHOOL", label: "High School" },
  { value: "DIPLOMA", label: "Diploma" },
  { value: "BACHELORS", label: "Bachelor's" },
  { value: "MASTERS", label: "Master's" },
];

const fieldOptions = [
  { value: "ENGINEERING", label: "Engineering" },
  { value: "BUSINESS", label: "Business" },
  { value: "IT", label: "IT" },
  { value: "HEALTH_SCIENCES", label: "Health Sciences" },
  { value: "ARTS", label: "Arts" },
  { value: "OTHER", label: "Other" },
];

const englishOptions = [
  { value: "IELTS", label: "IELTS" },
  { value: "TOEFL", label: "TOEFL" },
  { value: "PENDING", label: "Pending" },
  { value: "NONE", label: "None" },
];

const germanOptions = [
  { value: "NONE", label: "None" },
  { value: "A1", label: "A1" },
  { value: "A2", label: "A2" },
  { value: "B1", label: "B1" },
  { value: "B2", label: "B2" },
  { value: "C1", label: "C1" },
];

const workOptions = [
  { value: "NONE", label: "None" },
  { value: "LESS_THAN_1", label: "< 1 year" },
  { value: "ONE_TO_THREE", label: "1–3 years" },
  { value: "THREE_PLUS", label: "3+ years" },
];

const intakeOptions = [
  { value: "WINTER_2025", label: "Winter 2025" },
  { value: "SUMMER_2026", label: "Summer 2026" },
];

const countryOptions = [
  { value: "INDIA", label: "India" },
  { value: "NEPAL", label: "Nepal" },
  { value: "BANGLADESH", label: "Bangladesh" },
  { value: "SRI_LANKA", label: "Sri Lanka" },
  { value: "OTHER", label: "Other" },
];

export default function EligibilityCheckerPage() {
  const [formData, setFormData] = useState<Partial<EligibilityFormData>>({
    scoreType: "CGPA",
    englishTest: "NONE",
    germanLevel: "NONE",
    workExperience: "NONE",
    preferredIntake: "WINTER_2025",
    countryOfEducation: "INDIA",
  });
  const [result, setResult] = useState<EligibilityResult | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validationErrors = validateEligibilityForm(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);
    setIsCalculating(true);

    // Simulate calculation delay for better UX
    setTimeout(() => {
      const eligibilityResult = calculateEligibility(
        formData as EligibilityFormData
      );
      setResult(eligibilityResult);
      setIsCalculating(false);

      // Scroll to results
      setTimeout(() => {
        document
          .getElementById("results")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }, 800);
  }

  function handleReset() {
    setFormData({
      scoreType: "CGPA",
      englishTest: "NONE",
      germanLevel: "NONE",
      workExperience: "NONE",
      preferredIntake: "WINTER_2025",
      countryOfEducation: "INDIA",
    });
    setResult(null);
    setErrors([]);
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "score" || name === "englishScore" ? parseFloat(value) || undefined : value,
    }));
  };

  // Get result icon and colors
  const getResultStyles = () => {
    if (!result) return null;

    switch (result.level) {
      case "PUBLIC_ELIGIBLE":
        return {
          icon: CheckCircle,
          bgColor: "bg-green-500/10",
          borderColor: "border-green-500/30",
          textColor: "text-green-500",
          barColor: "bg-green-500",
          emoji: "✅",
          headline: "Eligible for Public Universities",
        };
      case "PRIVATE_ELIGIBLE":
        return {
          icon: AlertTriangle,
          bgColor: "bg-amber-500/10",
          borderColor: "border-amber-500/30",
          textColor: "text-amber-500",
          barColor: "bg-amber-500",
          emoji: "⚠️",
          headline: "Eligible for Private Universities",
        };
      case "NEEDS_IMPROVEMENT":
        return {
          icon: XCircle,
          bgColor: "bg-red-500/10",
          borderColor: "border-red-500/30",
          textColor: "text-red-500",
          barColor: "bg-red-500",
          emoji: "❌",
          headline: "Currently Not Eligible",
        };
    }
  };

  const resultStyles = getResultStyles();

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-coral/20">
      <BackgroundGrid />
      <Navbar />

      {/* Intro Block */}
      <section className="relative z-10 pt-40 pb-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-coral/20 bg-coral/5 text-coral text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3 h-3" />
            Quick Assessment
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-foreground">
            Check Your Eligibility for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral to-navy">
              German Universities
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            Answer a few questions and learn your admission possibilities in under 2 minutes.
          </p>
          <p className="text-sm text-muted-foreground inline-flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            This is a preliminary tool; final decisions depend on APS verification and individual university criteria.
          </p>
        </div>
      </section>

      {/* Eligibility Form */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Errors */}
              {errors.length > 0 && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                  <p className="font-semibold text-red-500 mb-2">
                    Please fix the following:
                  </p>
                  <ul className="list-disc list-inside text-sm text-red-400 space-y-1">
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 1. Highest Qualification */}
              <div>
                <label
                  htmlFor="qualificationLevel"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  1. Highest Qualification Completed *
                </label>
                <select
                  id="qualificationLevel"
                  name="qualificationLevel"
                  value={formData.qualificationLevel || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                >
                  <option value="">Select qualification</option>
                  {qualificationOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. Field of Study */}
              <div>
                <label
                  htmlFor="fieldOfStudy"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  2. Field of Study *
                </label>
                <select
                  id="fieldOfStudy"
                  name="fieldOfStudy"
                  value={formData.fieldOfStudy || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                >
                  <option value="">Select field</option>
                  {fieldOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. CGPA or Percentage */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  3. CGPA or Percentage *
                </label>
                <div className="flex gap-4 mb-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="scoreType"
                      value="CGPA"
                      checked={formData.scoreType === "CGPA"}
                      onChange={handleChange}
                      className="w-4 h-4 text-coral focus:ring-coral"
                    />
                    <span className="text-sm text-foreground">CGPA</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="scoreType"
                      value="PERCENTAGE"
                      checked={formData.scoreType === "PERCENTAGE"}
                      onChange={handleChange}
                      className="w-4 h-4 text-coral focus:ring-coral"
                    />
                    <span className="text-sm text-foreground">Percentage</span>
                  </label>
                </div>
                <input
                  type="number"
                  name="score"
                  step="0.01"
                  value={formData.score || ""}
                  onChange={handleChange}
                  placeholder={
                    formData.scoreType === "CGPA" ? "e.g., 7.5" : "e.g., 75"
                  }
                  max={formData.scoreType === "CGPA" ? 10 : 100}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.scoreType === "CGPA"
                    ? "Enter on a scale of 10"
                    : "Enter out of 100"}
                </p>
              </div>

              {/* 4. English Proficiency */}
              <div>
                <label
                  htmlFor="englishTest"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  4. English Proficiency *
                </label>
                <select
                  id="englishTest"
                  name="englishTest"
                  value={formData.englishTest || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                >
                  {englishOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {(formData.englishTest === "IELTS" ||
                  formData.englishTest === "TOEFL") && (
                  <input
                    type="number"
                    name="englishScore"
                    step="0.5"
                    value={formData.englishScore || ""}
                    onChange={handleChange}
                    placeholder={
                      formData.englishTest === "IELTS"
                        ? "IELTS Score (e.g., 6.5)"
                        : "TOEFL Score (e.g., 85)"
                    }
                    className="w-full mt-3 px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                  />
                )}
              </div>

              {/* 5. German Language Level */}
              <div>
                <label
                  htmlFor="germanLevel"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  5. German Language Level *
                </label>
                <select
                  id="germanLevel"
                  name="germanLevel"
                  value={formData.germanLevel || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                >
                  {germanOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 6. Work Experience */}
              <div>
                <label
                  htmlFor="workExperience"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  6. Work Experience *
                </label>
                <select
                  id="workExperience"
                  name="workExperience"
                  value={formData.workExperience || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                >
                  {workOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 7. Preferred Intake */}
              <div>
                <label
                  htmlFor="preferredIntake"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  7. Preferred Intake
                </label>
                <select
                  id="preferredIntake"
                  name="preferredIntake"
                  value={formData.preferredIntake || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                >
                  {intakeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 8. Country of Education */}
              <div>
                <label
                  htmlFor="countryOfEducation"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  8. Country of Education
                </label>
                <select
                  id="countryOfEducation"
                  name="countryOfEducation"
                  value={formData.countryOfEducation || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                >
                  {countryOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isCalculating}
                className="w-full px-8 py-4 bg-coral hover:bg-coral/90 disabled:bg-muted disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all inline-flex items-center justify-center gap-2 shadow-[0_4px_14px_0_rgba(242,92,69,0.39)]"
              >
                {isCalculating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <GraduationCap className="w-5 h-5" />
                    Check My Eligibility
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Result Display */}
          {result && resultStyles && (
            <div id="results" className="mt-10 space-y-6">
              {/* Main Result Panel */}
              <div
                className={`${resultStyles.bgColor} ${resultStyles.borderColor} border rounded-2xl p-8 text-center`}
              >
                <div className="text-5xl mb-4">{resultStyles.emoji}</div>
                <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${resultStyles.textColor}`}>
                  {resultStyles.headline}
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  {result.message}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <Link href="/dashboard/consultations">
                    <BeamButton primary>
                      <Calendar className="w-4 h-4" />
                      Book a Free Consultation
                    </BeamButton>
                  </Link>
                  <Link href="/contact">
                    <BeamButton>
                      <Lightbulb className="w-4 h-4" />
                      Get Profile Improvement Tips
                    </BeamButton>
                  </Link>
                </div>
              </div>

              {/* Readiness Meter */}
              <FlashlightCard className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-foreground">Readiness Score</h3>
                  <span className={`text-2xl font-bold ${resultStyles.textColor}`}>
                    {result.readinessScore}%
                  </span>
                </div>
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${resultStyles.barColor} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${result.readinessScore}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>0</span>
                  <span className="text-red-500">50 (Needs Improvement)</span>
                  <span className="text-amber-500">70 (Private)</span>
                  <span className="text-green-500">100 (Public)</span>
                </div>
              </FlashlightCard>

              {/* Score Breakdown */}
              <FlashlightCard className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Score Breakdown</h3>
                <div className="space-y-4">
                  {/* Academic Score */}
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="text-muted-foreground">Academic Score</span>
                      <span className="font-medium text-foreground">
                        {result.breakdown.academicScore}/{result.breakdown.academicMax}
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-coral rounded-full"
                        style={{
                          width: `${(result.breakdown.academicScore / result.breakdown.academicMax) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* English Proficiency */}
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="text-muted-foreground">English Proficiency</span>
                      <span className="font-medium text-foreground">
                        {result.breakdown.englishScore}/{result.breakdown.englishMax}
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-coral rounded-full"
                        style={{
                          width: `${(result.breakdown.englishScore / result.breakdown.englishMax) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* German Level */}
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="text-muted-foreground">German Language</span>
                      <span className="font-medium text-foreground">
                        {result.breakdown.germanScore}/{result.breakdown.germanMax}
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-coral rounded-full"
                        style={{
                          width: `${(result.breakdown.germanScore / result.breakdown.germanMax) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Work Experience */}
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="text-muted-foreground">Work Experience</span>
                      <span className="font-medium text-foreground">
                        {result.breakdown.workExperienceScore}/{result.breakdown.workExperienceMax}
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-coral rounded-full"
                        style={{
                          width: `${(result.breakdown.workExperienceScore / result.breakdown.workExperienceMax) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </FlashlightCard>

              {/* Guidance Block for Not Eligible */}
              {result.level === "NEEDS_IMPROVEMENT" && (
                <div className="bg-gradient-to-r from-coral/10 via-peach/5 to-coral/10 border border-coral/30 rounded-2xl p-8 text-center">
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    Don't Worry — We're Here to Help!
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                    Our team can help you improve your profile through language courses, 
                    document refinement, and personalized counselling. Every journey starts 
                    with a single step.
                  </p>
                  <Link href="/contact">
                    <BeamButton primary>
                      Get Expert Help <ArrowRight className="w-4 h-4" />
                    </BeamButton>
                  </Link>
                </div>
              )}

              {/* Recommendations */}
              {result.recommendations.length > 0 && (
                <FlashlightCard className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    Recommendations
                  </h3>
                  <ul className="space-y-3">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex gap-3">
                        <CheckCircle className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </FlashlightCard>
              )}

              {/* Reset Button */}
              <div className="text-center">
                <button
                  onClick={handleReset}
                  className="text-sm text-muted-foreground hover:text-coral transition-colors underline"
                >
                  Check Another Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

