'use client'

import { Typography, Box, Tooltip, TextField, InputAdornment, IconButton, Button } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { FieldConfig } from '@/config/fieldConfig'
import { useState, useEffect } from 'react'

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
  increment,
  label,
  prefix,
  suffix,
  description,
  id,
  compact = false
}: NumberInputProps) {
  const [inputValue, setInputValue] = useState(value.toString())
  const [error, setError] = useState(false)

  useEffect(() => {
    setInputValue(value.toString())
  }, [value])

  const formatValue = (value: number) => {
    return `${prefix || ''}${value.toLocaleString(undefined, {
      minimumFractionDigits: step < 1 ? 1 : 0,
      maximumFractionDigits: step < 1 ? 1 : 0
    })}${suffix || ''}`
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setInputValue(newValue)
    
    const numericValue = parseFloat(newValue.replace(/,/g, ''))
    if (!isNaN(numericValue) && numericValue >= min && numericValue <= max) {
      setError(false)
      onChange(numericValue)
    } else {
      setError(true)
    }
  }

  const handleBlur = () => {
    const numericValue = parseFloat(inputValue.replace(/,/g, ''))
    if (isNaN(numericValue) || numericValue < min || numericValue > max) {
      setInputValue(value.toString())
      setError(false)
    }
  }

  const handleIncrement = () => {
    const newValue = Math.min(value + increment, max)
    onChange(newValue)
  }

  const handleDecrement = () => {
    const newValue = Math.max(value - increment, min)
    onChange(newValue)
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
              <IconButton size="small" sx={{ color: 'primary.main' }}>
                <InfoOutlinedIcon sx={{ fontSize: compact ? 14 : 16 }} />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>
      
      <Box sx={{ 
        px: 1, 
        display: 'flex',
        alignItems: 'stretch',
      }}>
        <Tooltip title={`Decrease by ${formatValue(increment)}`}>
          <Button
            onClick={handleDecrement}
            disabled={value <= min}
            sx={{
              minWidth: 'auto',
              px: 1,
              borderRadius: '4px 0 0 4px',
              backgroundColor: 'rgba(100, 255, 218, 0.1)',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'rgba(100, 255, 218, 0.2)',
              borderRight: 'none',
              color: 'text.primary',
              '&:hover': {
                backgroundColor: 'rgba(100, 255, 218, 0.2)',
              },
              '&.Mui-disabled': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: 'rgba(255, 255, 255, 0.3)',
              }
            }}
          >
            <RemoveIcon fontSize={compact ? "small" : "medium"} />
          </Button>
        </Tooltip>
        <TextField
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={error}
          helperText={error ? `Value must be between ${formatValue(min)} and ${formatValue(max)}` : ''}
          size={compact ? "small" : "medium"}
          fullWidth
          InputProps={{
            startAdornment: prefix ? <InputAdornment position="start">{prefix}</InputAdornment> : null,
            endAdornment: suffix ? <InputAdornment position="end">{suffix}</InputAdornment> : null,
            sx: {
              borderRadius: 0,
            }
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              color: 'text.primary',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              '& fieldset': {
                borderColor: 'rgba(100, 255, 218, 0.2)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(100, 255, 218, 0.4)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
              },
            },
            '& .MuiFormHelperText-root': {
              color: 'error.main',
              position: 'absolute',
              bottom: '-20px',
            },
          }}
        />
        <Tooltip title={`Increase by ${formatValue(increment)}`}>
          <Button
            onClick={handleIncrement}
            disabled={value >= max}
            sx={{
              minWidth: 'auto',
              px: 1,
              borderRadius: '0 4px 4px 0',
              backgroundColor: 'rgba(100, 255, 218, 0.1)',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'rgba(100, 255, 218, 0.2)',
              borderLeft: 'none',
              color: 'text.primary',
              '&:hover': {
                backgroundColor: 'rgba(100, 255, 218, 0.2)',
              },
              '&.Mui-disabled': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: 'rgba(255, 255, 255, 0.3)',
              }
            }}
          >
            <AddIcon fontSize={compact ? "small" : "medium"} />
          </Button>
        </Tooltip>
      </Box>
    </Box>
  )
} 