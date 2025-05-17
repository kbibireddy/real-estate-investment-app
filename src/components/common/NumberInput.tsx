'use client'

import { useState, useEffect } from 'react'
import { Slider, TextField, Typography, Box, Tooltip } from '@mui/material'
import { FieldConfig } from '@/config/fieldConfig'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

interface NumberInputProps extends FieldConfig {
  value: number
  onChange: (value: number) => void
  id: string
}

export default function NumberInput({
  value,
  onChange,
  min,
  max,
  step,
  label,
  prefix,
  suffix,
  description,
  id
}: NumberInputProps) {
  const [localValue, setLocalValue] = useState(value.toString())
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    setLocalValue(value.toString())
  }, [value])

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    const value = typeof newValue === 'number' ? newValue : newValue[0]
    onChange(value)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setLocalValue(newValue)
    const numValue = Number(newValue)
    if (!isNaN(numValue) && numValue >= min && numValue <= max) {
      onChange(numValue)
    }
  }

  const handleBlur = () => {
    const numValue = Number(localValue)
    if (isNaN(numValue)) {
      setLocalValue(value.toString())
    } else {
      const boundedValue = Math.min(Math.max(numValue, min), max)
      setLocalValue(boundedValue.toString())
      onChange(boundedValue)
    }
  }

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Typography variant="subtitle1" gutterBottom sx={{ mr: 1 }}>
          {label}
        </Typography>
        {description && (
          <Tooltip title={description} placement="top">
            <InfoOutlinedIcon
              sx={{ fontSize: 16, cursor: 'pointer', color: 'action.active' }}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            />
          </Tooltip>
        )}
      </Box>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          value={localValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          InputProps={{
            startAdornment: prefix ? <span>{prefix}</span> : null,
            endAdornment: suffix ? <span>{suffix}</span> : null,
          }}
          sx={{ width: 150 }}
        />
        <Box sx={{ flex: 1 }}>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            min={min}
            max={max}
            step={step}
            aria-labelledby={id}
            marks={[
              { value: min, label: `${prefix || ''}${min}${suffix || ''}` },
              { value: max, label: `${prefix || ''}${max}${suffix || ''}` },
            ]}
          />
        </Box>
      </Box>
    </Box>
  )
} 