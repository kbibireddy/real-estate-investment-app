'use client'

import { useSelector } from 'react-redux'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Tooltip,
  IconButton
} from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { useState, useEffect } from 'react'
import { RootState } from '@/store/store'
import { calculateAmortization } from '@/utils/calculations'

interface AmortizationRow {
  date: Date
  beginningBalance: number
  payment: number
  principal: number
  interest: number
  endingBalance: number
  cumulativePayment: number
  cumulativeInterest: number
  cumulativePrincipal: number
  cumulativeExpenses: number
  totalInvestmentCost: number
  appreciatedValue: number
}

interface ColumnHeader {
  label: string
  tooltip: string
  align?: 'left' | 'right'
}

const formatCurrency = (value: number): string => {
  if (value === null || value === undefined || isNaN(value)) {
    return '0.00'
  }
  try {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      style: 'decimal'
    })
  } catch {
    return Number(value).toFixed(2)
  }
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short'
  })
}

export default function AmortizationTable() {
  const investment = useSelector((state: RootState) => state.investment)
  
  const amortization = calculateAmortization(
    investment.propertyValue - investment.downPayment,
    investment.interestRate,
    investment.loanTerm,
    investment.propertyTax,
    investment.insurance,
    investment.hoa || 0,
    investment.closingCosts || 0,
    investment.propertyValue,
    investment.appreciation
  )

  // Find the last break-even point where cost of ownership becomes less than appreciated investment
  const lastBreakEvenIndex = [...amortization].reverse().findIndex((row, idx, arr) => {
    const currentCostOfOwnership = row.cumulativeInterest + row.cumulativeExpenses
    const currentAppreciatedValue = row.appreciatedValue
    
    // If this is the first row or if the previous row had higher cost than appreciation
    const prevRow = idx < arr.length - 1 ? arr[idx + 1] : null
    const prevCostOfOwnership = prevRow ? prevRow.cumulativeInterest + prevRow.cumulativeExpenses : 0
    const prevAppreciatedValue = prevRow ? prevRow.appreciatedValue : 0

    return currentCostOfOwnership < currentAppreciatedValue && 
           (!prevRow || prevCostOfOwnership >= prevAppreciatedValue)
  })
  const breakEvenIndex = lastBreakEvenIndex === -1 ? -1 : amortization.length - 1 - lastBreakEvenIndex

  // Create initial costs row
  const initialDate = new Date()
  const initialRow = {
    date: initialDate,
    beginningBalance: investment.propertyValue - investment.downPayment,
    payment: investment.downPayment + (investment.closingCosts || 0),
    principal: 0,
    interest: 0,
    endingBalance: investment.propertyValue - investment.downPayment,
    cumulativePayment: investment.downPayment + (investment.closingCosts || 0),
    cumulativeInterest: 0,
    cumulativePrincipal: investment.downPayment,
    cumulativeExpenses: (investment.closingCosts || 0),
    totalInvestmentCost: investment.downPayment,
    appreciatedValue: investment.downPayment * (1 + investment.appreciation / 100)
  }

  const columns: ColumnHeader[] = [
    {
      label: 'Year',
      tooltip: 'Year number in the schedule',
      align: 'left'
    },
    {
      label: 'Payment Date',
      tooltip: 'The date when each payment is due, starting from today'
    },
    {
      label: 'Loan Balance (Start)',
      tooltip: 'Remaining loan amount at the start of the period',
      align: 'right'
    },
    {
      label: 'Period Payment',
      tooltip: 'Amount paid during this period (Principal + Interest)',
      align: 'right'
    },
    {
      label: 'Principal',
      tooltip: 'Amount of payment that reduces the loan balance',
      align: 'right'
    },
    {
      label: 'Interest',
      tooltip: 'Cost of borrowing for this period (Rate × Starting Balance)',
      align: 'right'
    },
    {
      label: 'Loan Balance (End)',
      tooltip: 'Remaining loan amount after this payment',
      align: 'right'
    },
    {
      label: 'Interest Paid to Date',
      tooltip: 'Total interest paid since the start of the loan',
      align: 'right'
    },
    {
      label: 'Additional Expenses to Date',
      tooltip: 'Cumulative closing costs, property taxes, insurance, HOA fees, and maintenance costs',
      align: 'right'
    },
    {
      label: 'Cost of Ownership to Date',
      tooltip: 'Total cost of interest and additional expenses (not contributing to equity)',
      align: 'right'
    },
    {
      label: 'Total Investment to Date',
      tooltip: 'Total equity in the property (down payment + principal payments)',
      align: 'right'
    },
    {
      label: 'Investment with Appreciation',
      tooltip: 'Total investment adjusted for property appreciation over time',
      align: 'right'
    }
  ]

  return (
    <Box sx={{ position: 'relative' }}>
      {breakEvenIndex !== -1 && (
        <Paper
          elevation={2}
          sx={{
            position: 'absolute',
            right: -120,
            top: `${(breakEvenIndex + 2) * 37}px`,
            padding: '4px 12px',
            backgroundColor: 'rgba(100, 255, 218, 0.9)',
            color: '#0A192F',
            borderRadius: '12px',
            fontSize: '0.75rem',
            letterSpacing: '0.03em',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            zIndex: 1000,
            backdropFilter: 'blur(4px)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            '&::before': {
              content: '""',
              position: 'absolute',
              left: -6,
              top: '50%',
              transform: 'translateY(-50%)',
              borderTop: '6px solid transparent',
              borderBottom: '6px solid transparent',
              borderRight: '6px solid rgba(100, 255, 218, 0.9)',
            }
          }}
        >
          Investment Exceeds Cost
        </Paper>
      )}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2,
        px: 1
      }}>
        <Typography variant="subtitle1">
          Amortization Schedule
        </Typography>
      </Box>
      <TableContainer 
        component={Paper} 
        sx={{ 
          '& .MuiTableHead-root': {
            backgroundColor: 'background.paper',
          },
          '& .MuiTableCell-head': {
            backgroundColor: 'background.paper',
            fontWeight: 'bold',
            borderBottom: '2px solid',
            borderColor: 'divider',
          }
        }}
      >
        <Table aria-label="amortization table" size="small">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell 
                  key={index} 
                  align={column.align || 'left'}
                  sx={{
                    whiteSpace: 'nowrap',
                    '& .MuiIconButton-root': {
                      padding: 0.5,
                      marginLeft: 0.5,
                    }
                  }}
                >
                  {column.label}
                  <Tooltip 
                    title={column.tooltip}
                    placement="top"
                    arrow
                  >
                    <IconButton size="small" sx={{ color: 'primary.main' }}>
                      <InfoOutlinedIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{
                backgroundColor: 'rgba(100, 255, 218, 0.1)',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: 'rgba(100, 255, 218, 0.2)',
                },
              }}
            >
              <TableCell>0</TableCell>
              <TableCell>{formatDate(initialRow.date)}</TableCell>
              <TableCell align="right">${formatCurrency(initialRow.beginningBalance)}</TableCell>
              <TableCell align="right">${formatCurrency(initialRow.payment)}</TableCell>
              <TableCell align="right">${formatCurrency(initialRow.principal)}</TableCell>
              <TableCell align="right">${formatCurrency(initialRow.interest)}</TableCell>
              <TableCell align="right">${formatCurrency(initialRow.endingBalance)}</TableCell>
              <TableCell align="right">${formatCurrency(initialRow.cumulativeInterest)}</TableCell>
              <TableCell align="right">${formatCurrency(initialRow.cumulativeExpenses)}</TableCell>
              <TableCell align="right">${formatCurrency(initialRow.cumulativeInterest + initialRow.cumulativeExpenses)}</TableCell>
              <TableCell align="right">${formatCurrency(initialRow.totalInvestmentCost)}</TableCell>
              <TableCell align="right">${formatCurrency(initialRow.appreciatedValue)}</TableCell>
            </TableRow>
            {amortization.map((row: AmortizationRow, index: number) => {
              const costOfOwnership = row.cumulativeInterest + row.cumulativeExpenses
              const isBreakEvenRow = index === breakEvenIndex

              return (
                <TableRow 
                  key={index}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': {
                      backgroundColor: 'rgba(100, 255, 218, 0.1)',
                    },
                    ...(isBreakEvenRow && {
                      backgroundColor: 'rgba(100, 255, 218, 0.15)',
                      '&:hover': {
                        backgroundColor: 'rgba(100, 255, 218, 0.25)',
                      }
                    })
                  }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <Tooltip 
                    title={isBreakEvenRow ? "Investment value begins to exceed cost of ownership" : ""}
                    placement="top"
                    arrow
                  >
                    <TableCell>{formatDate(row.date)}</TableCell>
                  </Tooltip>
                  <TableCell align="right">${formatCurrency(row.beginningBalance)}</TableCell>
                  <TableCell align="right">${formatCurrency(row.payment)}</TableCell>
                  <TableCell align="right">${formatCurrency(row.principal)}</TableCell>
                  <TableCell align="right">${formatCurrency(row.interest)}</TableCell>
                  <TableCell align="right">${formatCurrency(row.endingBalance)}</TableCell>
                  <TableCell align="right">${formatCurrency(row.cumulativeInterest)}</TableCell>
                  <TableCell align="right">${formatCurrency(row.cumulativeExpenses)}</TableCell>
                  <TableCell align="right">${formatCurrency(costOfOwnership)}</TableCell>
                  <TableCell align="right">${formatCurrency(row.totalInvestmentCost)}</TableCell>
                  <TableCell align="right">${formatCurrency(row.appreciatedValue)}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
} 