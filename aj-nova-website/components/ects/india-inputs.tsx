'use client'

/**
 * India/Pakistan/Bangladesh Inputs Component
 * Duration-based ECTS calculation (NO credit points)
 */

import { IndiaDegreeDetails } from '@/lib/ects-types'
import { DEGREE_TYPE_MAPPINGS } from '@/lib/ects-config'

interface IndiaInputsProps {
  details: Partial<IndiaDegreeDetails>
  onChange: (details: Partial<IndiaDegreeDetails>) => void
}

const degreeTypeOptions = [
  { value: 'BACHELOR_3YR', label: '3-Year Bachelor', ects: DEGREE_TYPE_MAPPINGS.BACHELOR_3YR },
  { value: 'BACHELOR_4YR', label: '4-Year Bachelor', ects: DEGREE_TYPE_MAPPINGS.BACHELOR_4YR },
  { value: 'MASTER_2YR', label: '2-Year Master', ects: DEGREE_TYPE_MAPPINGS.MASTER_2YR },
  { value: 'MASTER_1YR', label: '1-Year Master', ects: DEGREE_TYPE_MAPPINGS.MASTER_1YR },
]

export function IndiaInputs({ details, onChange }: IndiaInputsProps) {
  const selectedDegree = degreeTypeOptions.find(d => d.value === details.degreeType)
  
  // Extract duration from degree type
  const getDurationFromDegreeType = (degreeType?: string): number => {
    if (!degreeType) return 4 // default
    if (degreeType.includes('3YR')) return 3
    if (degreeType.includes('4YR')) return 4
    if (degreeType.includes('2YR')) return 2
    if (degreeType.includes('1YR')) return 1
    return 4
  }
  
  const getDegreeLevel = (degreeType?: string): 'BACHELOR' | 'MASTER' => {
    if (!degreeType) return 'BACHELOR'
    return degreeType.includes('MASTER') ? 'MASTER' : 'BACHELOR'
  }
  
  const currentDuration = getDurationFromDegreeType(details.degreeType)
  const currentLevel = getDegreeLevel(details.degreeType)
  
  const handleDurationChange = (years: number) => {
    const level = currentLevel
    let degreeType: IndiaDegreeDetails['degreeType']
    
    if (level === 'BACHELOR') {
      degreeType = years === 3 ? 'BACHELOR_3YR' : 'BACHELOR_4YR'
    } else {
      degreeType = years === 1 ? 'MASTER_1YR' : 'MASTER_2YR'
    }
    
    onChange({
      ...details,
      degreeType,
    })
  }
  
  const handleLevelChange = (level: 'BACHELOR' | 'MASTER') => {
    const duration = currentDuration
    let degreeType: IndiaDegreeDetails['degreeType']
    
    if (level === 'BACHELOR') {
      degreeType = duration === 3 ? 'BACHELOR_3YR' : 'BACHELOR_4YR'
    } else {
      degreeType = duration === 1 ? 'MASTER_1YR' : 'MASTER_2YR'
    }
    
    onChange({
      ...details,
      degreeType,
    })
  }

  return (
    <div className="space-y-4">
      {/* Info Box */}
      <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg">
        <p className="text-xs text-amber-900 dark:text-amber-100">
          For South Asian systems (India, Pakistan, Bangladesh, etc.), we ignore local credit numbers and use a standard duration-based mapping (e.g. 3-year = 180 ECTS, 4-year = 240 ECTS).
        </p>
      </div>

      {/* Degree Type Selection */}
      <div>
        <label
          htmlFor="degree-type"
          className="block text-sm font-medium text-foreground mb-1.5"
        >
          Degree type
        </label>
        <select
          id="degree-type"
          value={currentLevel}
          onChange={(e) => handleLevelChange(e.target.value as 'BACHELOR' | 'MASTER')}
          className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
          required
        >
          <option value="BACHELOR">Bachelor</option>
          <option value="MASTER">Master</option>
        </select>
      </div>
      
      {/* Degree Duration */}
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
          min={currentLevel === 'BACHELOR' ? 3 : 1}
          max={currentLevel === 'BACHELOR' ? 4 : 2}
          value={currentDuration}
          onChange={(e) => {
            const years = parseInt(e.target.value) || (currentLevel === 'BACHELOR' ? 4 : 2)
            handleDurationChange(years)
          }}
          className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
          required
        />
      </div>

    </div>
  )
}
