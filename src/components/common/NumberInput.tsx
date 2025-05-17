'use client'

import { Slider, Typography, Box, Tooltip } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { FieldConfig } from '@/config/fieldConfig'

interface NumberInputProps extends FieldConfig {
  value: number
  onChange: (value: number) => void
  id: string
  compact?: boolean
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
  id,
  compact = false
}: NumberInputProps) {
  const formatValue = (value: number) => {
    return `${prefix || ''}${value.toLocaleString(undefined, {
      minimumFractionDigits: step < 1 ? 1 : 0,
      maximumFractionDigits: step < 1 ? 1 : 0
    })}${suffix || ''}`
  }

  return (
    <Box sx={{ width: '100%', mb: compact ? 0 : 3 }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 0.5,
        justifyContent: 'space-between'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography 
            variant={compact ? "body2" : "subtitle1"} 
            sx={{ mr: 1 }}
          >
            {label}
          </Typography>
          {description && (
            <Tooltip title={description} placement="top">
              <InfoOutlinedIcon
                sx={{ 
                  fontSize: compact ? 14 : 16, 
                  cursor: 'pointer', 
                  color: 'primary.main' 
                }}
              />
            </Tooltip>
          )}
        </Box>
        <Typography 
          variant={compact ? "body2" : "body1"}
          sx={{ color: 'text.secondary' }}
        >
          {formatValue(value)}
        </Typography>
      </Box>
      <Box sx={{ px: 1 }}>
        <Slider
          value={value}
          onChange={(_event, newValue) => onChange(newValue as number)}
          min={min}
          max={max}
          step={step}
          aria-labelledby={id}
          valueLabelDisplay="auto"
          valueLabelFormat={formatValue}
          marks={[
            { value: min, label: formatValue(min) },
            { value: max, label: formatValue(max) }
          ]}
          sx={{
            '& .MuiSlider-markLabel': {
              color: 'text.secondary',
              fontSize: compact ? '0.75rem' : '0.875rem',
            },
            '& .MuiSlider-valueLabel': {
              backgroundColor: 'primary.main',
              color: 'background.paper',
              fontSize: compact ? '0.75rem' : '0.875rem',
              padding: '0.5rem',
              borderRadius: '4px',
            },
            '& .MuiSlider-thumb': {
              width: compact ? 16 : 20,
              height: compact ? 16 : 20,
            },
            '& .MuiSlider-track': {
              height: compact ? 4 : 6,
            },
            '& .MuiSlider-rail': {
              height: compact ? 4 : 6,
            },
          }}
        />
      </Box>
    </Box>
  )
} 