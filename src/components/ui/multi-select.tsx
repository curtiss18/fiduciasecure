import * as React from "react"
import { Label } from "./label"
import { Checkbox } from "./checkbox"

interface MultiSelectProps {
  options: { value: string; label: string }[]
  value: string[]
  onChange: (value: string[]) => void
  label?: string
  maxHeight?: string
}

export function MultiSelect({ options, value, onChange, label, maxHeight = "200px" }: MultiSelectProps) {
  const handleToggle = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter(v => v !== optionValue))
    } else {
      onChange([...value, optionValue])
    }
  }

  const handleSelectAll = () => {
    if (value.length === options.length) {
      onChange([])
    } else {
      onChange(options.map(opt => opt.value))
    }
  }

  return (
    <div>
      {label && <Label className="mb-2 block">{label}</Label>}
      
      {/* Select All / Clear All */}
      <div className="mb-2 border-b pb-2">
        <button
          type="button"
          onClick={handleSelectAll}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          {value.length === options.length ? 'Clear All' : 'Select All'}
        </button>
        <span className="ml-2 text-sm text-gray-500">
          ({value.length} selected)
        </span>
      </div>
      
      {/* Options List */}
      <div 
        className="border rounded-md p-2 space-y-2 overflow-y-auto"
        style={{ maxHeight }}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={`multi-${option.value}`}
              checked={value.includes(option.value)}
              onChange={() => handleToggle(option.value)}
            />
            <Label 
              htmlFor={`multi-${option.value}`}
              className="cursor-pointer text-sm font-normal"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}