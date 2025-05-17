'use client'

import { Slider, Typography, Box, Tooltip } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { FieldConfig } from '@/config/fieldConfig'

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
  const formatValue = (value: number) => {
    return `${prefix || ''}${value.toLocaleString(undefined, {
      minimumFractionDigits: step < 1 ? 1 : 0,
      maximumFractionDigits: step < 1 ? 1 : 0
    })}${suffix || ''}`
  }

  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Typography variant="subtitle1" sx={{ mr: 1 }}>
          {label}
        </Typography>
        {description && (
          <Tooltip title={description} placement="top">
            <InfoOutlinedIcon
              sx={{ fontSize: 16, cursor: 'pointer', color: 'primary.main' }}
            />
          </Tooltip>
        )}
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
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
            },
            '& .MuiSlider-valueLabel': {
              backgroundColor: 'primary.main',
              color: 'background.paper',
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              padding: '0.5rem',
              borderRadius: '4px',
            },
          }}
        />
      </Box>
      <Typography 
        variant="body2" 
        align="center" 
        sx={{ 
          mt: 1,
          color: 'text.secondary',
          fontSize: { xs: '0.875rem', sm: '1rem' }
        }}
      >
        Current: {formatValue(value)}
      </Typography>
    </Box>
  )
} 