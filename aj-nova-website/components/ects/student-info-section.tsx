'use client'

/**
 * Student Information Section Component
 * Collects student name, email, and country of education
 */

import { Country } from '@/lib/ects-types'
import { COUNTRY_OPTIONS } from '@/lib/ects-config'
import { COUNTRY_MAPPINGS } from '@/lib/ects-config'

interface StudentInfoSectionProps {
  studentName: string
  studentEmail: string
  selectedCountry: Country | null
  onStudentNameChange: (name: string) => void
  onStudentEmailChange: (email: string) => void
  onCountryChange: (country: Country) => void
}

export function StudentInfoSection({
  studentName,
  studentEmail,
  selectedCountry,
  onStudentNameChange,
  onStudentEmailChange,
  onCountryChange,
}: StudentInfoSectionProps) {
  const handleCountrySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = e.target.value
    const country = COUNTRY_MAPPINGS[countryCode]
    if (country) {
      onCountryChange(country)
    }
  }

  return (
    <div className="space-y-6">
      {/* Name Input */}
      <div>
        <label
          htmlFor="student-name"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Full Name *
        </label>
        <input
          type="text"
          id="student-name"
          value={studentName}
          onChange={(e) => onStudentNameChange(e.target.value)}
          placeholder="Enter your full name"
          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
          required
        />
        <p className="text-xs text-muted-foreground mt-1">
          As it appears on your degree certificate
        </p>
      </div>

      {/* Email Input */}
      <div>
        <label
          htmlFor="student-email"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Email Address (Optional)
        </label>
        <input
          type="email"
          id="student-email"
          value={studentEmail}
          onChange={(e) => onStudentEmailChange(e.target.value)}
          placeholder="your.email@example.com"
          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
        />
        <p className="text-xs text-muted-foreground mt-1">
          For receiving your ECTS report via email
        </p>
      </div>

      {/* Country Dropdown */}
      <div>
        <label
          htmlFor="country"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Country of Education *
        </label>
        <select
          id="country"
          value={selectedCountry?.code || ''}
          onChange={handleCountrySelect}
          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
          required
        >
          <option value="">Select your country of education</option>

          {/* Group by region */}
          <optgroup label="Europe (EU/ECTS)">
            {COUNTRY_OPTIONS.filter(c => c.region === 'Europe' && c.type === 'EU_ECTS').map(country => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </optgroup>

          <optgroup label="United Kingdom">
            {COUNTRY_OPTIONS.filter(c => c.type === 'UK').map(country => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </optgroup>

          <optgroup label="South Asia">
            {COUNTRY_OPTIONS.filter(c => c.type === 'INDIA_SUBCONTINENT').map(country => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </optgroup>

          <optgroup label="North America">
            {COUNTRY_OPTIONS.filter(c => c.type === 'USA_CANADA').map(country => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </optgroup>

          <optgroup label="Other Countries">
            {COUNTRY_OPTIONS.filter(c => c.type === 'OTHER').map(country => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </optgroup>
        </select>
        <p className="text-xs text-muted-foreground mt-1">
          Where you completed your degree
        </p>

        {/* Country Type Badge */}
        {selectedCountry && (
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs">
            <span>System: {selectedCountry.type.replace(/_/g, ' ')}</span>
          </div>
        )}
      </div>
    </div>
  )
}
