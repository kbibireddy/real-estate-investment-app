'use client'

import { useDispatch, useSelector } from 'react-redux'
import { Box, Paper, Typography, Divider } from '@mui/material'
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
} from '@/store/slices/investmentSlice'

const sections = [
  {
    title: 'Property Details',
    fields: ['propertyValue', 'downPayment']
  },
  {
    title: 'Loan Details',
    fields: ['interestRate', 'loanTerm']
  },
  {
    title: 'Rental Income',
    fields: ['monthlyRent', 'rentIncrease']
  },
  {
    title: 'Expenses',
    fields: ['propertyTax', 'insurance', 'maintenance']
  },
  {
    title: 'Appreciation',
    fields: ['appreciation']
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
      rentIncrease: (value) => dispatch(updateRentIncrease(value))
    }
    return dispatchMap[fieldName]
  }

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      {sections.map((section, index) => (
        <Box key={section.title} sx={{ mb: index < sections.length - 1 ? 3 : 0 }}>
          <Typography variant="h6" gutterBottom>
            {section.title}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {section.fields.map((fieldName) => {
            const config = fieldConfig[fieldName]
            const value = investment[fieldName as keyof typeof investment]
            return (
              <NumberInput
                key={fieldName}
                id={fieldName}
                value={value}
                onChange={getDispatchFunction(fieldName)}
                {...config}
              />
            )
          })}
        </Box>
      ))}
    </Paper>
  )
} 