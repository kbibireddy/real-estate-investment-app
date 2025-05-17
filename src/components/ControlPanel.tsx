'use client'

import { useDispatch, useSelector } from 'react-redux'
import { Box, Paper, Typography, Divider, Grid } from '@mui/material'
import { RootState } from '@/store/store'
import { fieldConfig } from '@/config/fieldConfig'
import NumberInput from './common/NumberInput'
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
    <Box sx={{ p: 2 }}>
      {sections.map((section, index) => (
        <Box key={section.title} sx={{ mb: index < sections.length - 1 ? 2 : 0 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
            {section.title}
          </Typography>
          <Grid container spacing={2}>
            {section.fields.map((fieldName) => {
              const config = fieldConfig[fieldName]
              const value = investment[fieldName as keyof typeof investment]
              return (
                <Grid item xs={12} key={fieldName}>
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
          {index < sections.length - 1 && <Divider sx={{ mt: 2 }} />}
        </Box>
      ))}
    </Box>
  )
} 