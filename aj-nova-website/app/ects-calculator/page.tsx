'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Calculator, Loader2 } from 'lucide-react'

type CalculationMethod = 'ects' | 'south-asia' | 'usa-canada' | 'uk' | 'other'

// Get calculation method based on country
function getMethodForCountry(countryName: string): CalculationMethod {
  const ectsCountries = [
    'Germany', 'Austria', 'Netherlands', 'Belgium', 'Norway', 
    'Sweden', 'Finland', 'Denmark'
  ]
  
  const southAsiaCountries = ['India', 'Pakistan', 'Bangladesh', 'Sri Lanka', 'Nepal']
  const usaCanadaCountries = ['United States', 'Canada']
  const ukCountries = ['United Kingdom']

  if (ectsCountries.includes(countryName)) return 'ects'
  if (southAsiaCountries.includes(countryName)) return 'south-asia'
  if (usaCanadaCountries.includes(countryName)) return 'usa-canada'
  if (ukCountries.includes(countryName)) return 'uk'
  return 'other'
}

export default function ECTSCalculatorPage() {
  // Form state
  const [studentName, setStudentName] = useState('')
  const [studentEmail, setStudentEmail] = useState('')
  const [country, setCountry] = useState('India')
  const [degreeType, setDegreeType] = useState('Bachelor')
  const [degreeYears, setDegreeYears] = useState('3')
  const [totalCredits, setTotalCredits] = useState('')
  const [usCredits, setUsCredits] = useState('')
  const [ukCredits, setUkCredits] = useState('')

  // Result state
  const [ectsResult, setEctsResult] = useState<string | null>(null)
  const [methodUsed, setMethodUsed] = useState<string | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const method = getMethodForCountry(country)

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    setIsCalculating(true)

    setTimeout(() => {
      let ects = 0
      let methodLabel = ''
      const years = parseFloat(degreeYears || '0')

      if (method === 'ects') {
        const total = parseFloat(totalCredits || '0')
        if (!years || !total) {
          setEctsResult('Please provide degree duration and total credits.')
          setMethodUsed(null)
          setIsCalculating(false)
          return
        }
        ects = total // 1 CP = 1 ECTS (direct mapping)
        methodLabel = 'ECTS-compatible (Direct: 1 CP = 1 ECTS)'
      } else if (method === 'south-asia') {
        if (!years) {
          setEctsResult('Please provide degree duration.')
          setMethodUsed(null)
          setIsCalculating(false)
          return
        }
        if (years === 3) ects = 180
        else if (years === 4) ects = 240
        else if (years === 2 && degreeType.toLowerCase().includes('master')) ects = 120
        else ects = years * 60
        methodLabel = 'South Asia duration-based mapping'
      } else if (method === 'usa-canada') {
        const us = parseFloat(usCredits || '0')
        if (!us) {
          setEctsResult('Please provide total US credits.')
          setMethodUsed(null)
          setIsCalculating(false)
          return
        }
        ects = us * 2
        methodLabel = 'USA/Canada conversion (1 US credit = 2 ECTS)'
      } else if (method === 'uk') {
        const uk = parseFloat(ukCredits || '0')
        if (!uk) {
          setEctsResult('Please provide total UK credits.')
          setMethodUsed(null)
          setIsCalculating(false)
          return
        }
        ects = uk * 0.5
        methodLabel = 'UK conversion (1 UK credit = 0.5 ECTS)'
      } else {
        if (!years) {
          setEctsResult('Please provide degree duration.')
          setMethodUsed(null)
          setIsCalculating(false)
          return
        }
        ects = years * 60
        methodLabel = 'Global fallback: 60 ECTS per year'
      }

      setEctsResult(ects.toFixed(0) + ' ECTS (estimated)')
      setMethodUsed(methodLabel)
      setIsCalculating(false)
    }, 300)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Main Content */}
      <section className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                AjNova ECTS Estimator
              </h1>
              <p className="text-muted-foreground">
                Internal tool for counsellors to estimate ECTS for international degrees
              </p>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Input Form */}
            <div className="bg-card border border-border rounded-xl p-6">
              <form onSubmit={handleCalculate} className="space-y-6">

                {/* Student Information Section */}
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-4">
                    Student Information
                  </h2>
                  <div className="space-y-4">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="student-name"
                        className="block text-sm font-medium text-foreground mb-1.5"
                      >
                        Name (optional)
                      </label>
                      <input
                        type="text"
                        id="student-name"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="Student name"
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="student-email"
                        className="block text-sm font-medium text-foreground mb-1.5"
                      >
                        Email (optional)
                      </label>
                      <input
                        type="email"
                        id="student-email"
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        placeholder="student@email.com"
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                      />
                    </div>

                    {/* Country */}
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-foreground mb-1.5"
                      >
                        Country of Education
                      </label>
                      <select
                        id="country"
                        value={country}
                        onChange={(e) => {
                          setCountry(e.target.value)
                          // Reset method-specific fields when country changes
                          setTotalCredits('')
                          setUsCredits('')
                          setUkCredits('')
                          setEctsResult(null)
                          setMethodUsed(null)
                        }}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                        required
                      >
                        <optgroup label="ECTS-Compatible (Europe)">
                          <option>Germany</option>
                          <option>Austria</option>
                          <option>Netherlands</option>
                          <option>Belgium</option>
                          <option>Norway</option>
                          <option>Sweden</option>
                          <option>Finland</option>
                          <option>Denmark</option>
                        </optgroup>
                        <optgroup label="South Asia (Duration-Based)">
                          <option>India</option>
                          <option>Pakistan</option>
                          <option>Bangladesh</option>
                          <option>Sri Lanka</option>
                          <option>Nepal</option>
                        </optgroup>
                        <optgroup label="North America">
                          <option>United States</option>
                          <option>Canada</option>
                        </optgroup>
                        <optgroup label="UK">
                          <option>United Kingdom</option>
                        </optgroup>
                        <optgroup label="Other">
                          <option>Other</option>
                        </optgroup>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Degree Information Section */}
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-4">
                    Degree Information
                  </h2>
                  
                  <div className="space-y-4">
                    {/* Degree Type and Duration - Always visible */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="degree-type"
                          className="block text-sm font-medium text-foreground mb-1.5"
                        >
                          Degree type
                        </label>
                        <select
                          id="degree-type"
                          value={degreeType}
                          onChange={(e) => setDegreeType(e.target.value)}
                          className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                        >
                          <option>Bachelor</option>
                          <option>Master</option>
                          <option>Integrated</option>
                          <option>Other</option>
                        </select>
                      </div>
                      
                      <div>
                        <label
                          htmlFor="degree-duration"
                          className="block text-sm font-medium text-foreground mb-1.5"
                        >
                          Degree duration (years)
                        </label>
                        <input
                          type="number"
                          id="degree-duration"
                          min={1}
                          max={6}
                          value={degreeYears}
                          onChange={(e) => setDegreeYears(e.target.value)}
                          className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                        />
                      </div>
                    </div>

                    {/* Conditional fields based on method */}
                    {method === 'ects' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="total-credits"
                            className="block text-sm font-medium text-foreground mb-1.5"
                          >
                            Total credits of degree (CP)
                          </label>
                          <input
                            type="number"
                            id="total-credits"
                            value={totalCredits}
                            onChange={(e) => setTotalCredits(e.target.value)}
                            placeholder="e.g. 180 or 240"
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                          />
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          For ECTS-based systems we estimate 60 ECTS per academic year.
                        </div>
                      </div>
                    )}

                    {method === 'south-asia' && (
                      <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg">
                        <p className="text-xs text-amber-900 dark:text-amber-100">
                          For South Asian systems (India, Pakistan, Bangladesh, etc.), we ignore local
                          credit numbers and use a standard duration-based mapping (e.g. 3-year = 180
                          ECTS, 4-year = 240 ECTS).
                        </p>
                      </div>
                    )}

                    {method === 'usa-canada' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="us-credits"
                            className="block text-sm font-medium text-foreground mb-1.5"
                          >
                            Total US credits
                          </label>
                          <input
                            type="number"
                            id="us-credits"
                            value={usCredits}
                            onChange={(e) => setUsCredits(e.target.value)}
                            placeholder="e.g. 120"
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                          />
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          Conversion rule: <span className="ml-1 font-mono">1 US credit = 2 ECTS</span>.
                        </div>
                      </div>
                    )}

                    {method === 'uk' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="uk-credits"
                            className="block text-sm font-medium text-foreground mb-1.5"
                          >
                            Total UK credits
                          </label>
                          <input
                            type="number"
                            id="uk-credits"
                            value={ukCredits}
                            onChange={(e) => setUkCredits(e.target.value)}
                            placeholder="e.g. 360"
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                          />
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          Conversion rule: <span className="ml-1 font-mono">1 UK credit = 0.5 ECTS</span>.
                        </div>
                      </div>
                    )}

                    {method === 'other' && (
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-xs text-muted-foreground">
                          For other systems we use a conservative global estimate of 60 ECTS per
                          full-time academic year.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Calculate Button */}
                <div className="pt-3 flex justify-end">
                  <button
                    type="submit"
                    onClick={handleCalculate}
                    disabled={isCalculating}
                    className="inline-flex items-center justify-center rounded-lg bg-coral px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-coral/30 hover:bg-coral/90 disabled:bg-muted disabled:cursor-not-allowed transition"
                  >
                    {isCalculating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Calculating...
                      </>
                    ) : (
                      <>
                        <Calculator className="w-4 h-4 mr-2" />
                        Calculate ECTS
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column - Result Panel */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Estimated Result
              </h2>

              {ectsResult ? (
                <div className="flex-1 flex flex-col justify-center items-start gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      ESTIMATED ECTS
                    </p>
                    <p className="text-4xl font-bold text-coral">
                      {ectsResult}
                    </p>
                  </div>
                  
                  {methodUsed && (
                    <p className="text-xs text-muted-foreground">
                      Method: <span className="text-foreground">{methodUsed}</span>
                    </p>
                  )}
                  
                  <div className="w-full h-px bg-border my-2" />
                  
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    This is an <span className="font-semibold">informational estimate</span> based on
                    AjNova&apos;s internal mapping rules. Final ECTS recognition is always performed
                    by <span className="font-semibold">uni-assist</span> or the admitting
                    university and may differ from this estimation.
                  </p>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center min-h-[300px]">
                  <p className="text-sm text-muted-foreground">
                    Fill in the student and degree details on the left, then click
                    <span className="font-semibold text-foreground"> Calculate ECTS</span> to see an
                    estimated equivalence.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
