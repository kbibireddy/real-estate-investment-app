'use client'

import { useDispatch, useSelector } from 'react-redux'
import { Box, Paper, Typography, Divider, Grid } from '@mui/material'
import { RootState } from '@/store/store'
import { fieldConfig } from '@/config/fieldConfig'
import NumberInput from '@/components/common/NumberInput'
import {
  updatePropertyValue,
  updateDownPayment,
  updateInterestRate,
  updateLoanTerm,
  updateMonthlyRent,
  updatePropertyTax,
  updateInsurance,
  updateMaintenance,
  updateAppreciation,
  updateRentIncrease,
  updateHOA,
  updateClosingCosts,
} from '@/store/slices/investmentSlice'

const sections = [
  {
    title: 'Property',
    fields: ['propertyValue', 'downPayment', 'interestRate', 'loanTerm', 'closingCosts']
  },
  {
    title: 'Income & Growth',
    fields: ['monthlyRent', 'rentIncrease', 'appreciation']
  },
  {
    title: 'Expenses',
    fields: ['propertyTax', 'insurance', 'maintenance', 'hoa']
  }
]

export default function ControlPanel() {
  const dispatch = useDispatch()
  const investment = useSelector((state: RootState) => state.investment)

  const getDispatchFunction = (fieldName: string) => {
    const dispatchMap: { [key: string]: (value: number) => void } = {
      propertyValue: (value) => dispatch(updatePropertyValue(value)),
      downPayment: (value) => dispatch(updateDownPayment(value)),
      interestRate: (value) => dispatch(updateInterestRate(value)),
      loanTerm: (value) => dispatch(updateLoanTerm(value)),
      monthlyRent: (value) => dispatch(updateMonthlyRent(value)),
      propertyTax: (value) => dispatch(updatePropertyTax(value)),
      insurance: (value) => dispatch(updateInsurance(value)),
      maintenance: (value) => dispatch(updateMaintenance(value)),
      appreciation: (value) => dispatch(updateAppreciation(value)),
      rentIncrease: (value) => dispatch(updateRentIncrease(value)),
      hoa: (value) => dispatch(updateHOA(value)),
      closingCosts: (value) => dispatch(updateClosingCosts(value))
    }
    return dispatchMap[fieldName]
  }

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={4}>
        {sections.map((section, index) => (
          <Grid item xs={12} md={4} key={section.title}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
                {section.title}
              </Typography>
              <Grid container spacing={2}>
                {section.fields.map((fieldName) => {
                  const config = fieldConfig[fieldName]
                  const value = investment[fieldName as keyof typeof investment]
                  
                  // Determine grid size based on field type
                  let gridSize = 12
                  if (section.title === 'Property') {
                    // Property Value and Down Payment take full width
                    if (fieldName === 'propertyValue' || fieldName === 'downPayment') {
                      gridSize = 12
                    } else {
                      // Interest Rate, Loan Term, and Closing Costs take half width
                      gridSize = 6
                    }
                  } else {
                    // All other fields take full width in their sections
                    gridSize = 12
                  }

                  return (
                    <Grid item xs={gridSize} key={fieldName}>
                      <NumberInput
                        id={fieldName}
                        value={value}
                        onChange={getDispatchFunction(fieldName)}
                        {...config}
                        compact={true}
                      />
                    </Grid>
                  )
                })}
              </Grid>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
} 