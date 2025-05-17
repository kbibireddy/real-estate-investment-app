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
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  Button,
  Fade,
  Tooltip,
  IconButton
} from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { useState, useEffect } from 'react'
import { RootState } from '@/store/store'
import { calculateAmortization, calculateMonthlyAmortization } from '@/utils/calculations'

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
}

interface ColumnHeader {
  label: string
  tooltip: string
  align?: 'left' | 'right'
}

const COLUMNS: ColumnHeader[] = [
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
    label: 'Mortgage Paid to Date',
    tooltip: 'Sum of all mortgage payments made up to this point',
    align: 'right'
  },
  {
    label: 'Interest Paid to Date',
    tooltip: 'Total interest paid since the start of the loan',
    align: 'right'
  },
  {
    label: 'Principal Paid to Date',
    tooltip: 'Total amount paid towards reducing the loan balance',
    align: 'right'
  },
  {
    label: 'Operating Costs to Date',
    tooltip: 'Cumulative property taxes, insurance, HOA fees, and maintenance costs',
    align: 'right'
  },
  {
    label: 'Total Investment to Date',
    tooltip: 'Total cost including down payment, closing costs, mortgage payments, and operating costs',
    align: 'right'
  }
]

const formatCurrency = (value: number): string => {
  return value.toLocaleString(undefined, { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short'
  })
}

export default function AmortizationTable() {
  const [viewType, setViewType] = useState<'yearly' | 'monthly'>('yearly')
  const [showScrollTop, setShowScrollTop] = useState(false)
  const investment = useSelector((state: RootState) => state.investment)
  
  const amortization = viewType === 'yearly' 
    ? calculateAmortization(
        investment.propertyValue - investment.downPayment,
        investment.interestRate,
        investment.loanTerm,
        investment.propertyTax,
        investment.insurance,
        investment.hoa || 0,
        investment.closingCosts || 0
      )
    : calculateMonthlyAmortization(
        investment.propertyValue - investment.downPayment,
        investment.interestRate,
        investment.loanTerm,
        investment.propertyTax,
        investment.insurance,
        investment.hoa || 0,
        investment.closingCosts || 0
      )

  // Create initial costs row
  const initialDate = new Date()
  const initialRow = {
    date: initialDate,
    beginningBalance: investment.propertyValue - investment.downPayment,
    payment: investment.downPayment + (investment.closingCosts || 0),
    principal: investment.downPayment,
    interest: 0,
    endingBalance: investment.propertyValue - investment.downPayment,
    cumulativePayment: investment.downPayment + (investment.closingCosts || 0),
    cumulativeInterest: 0,
    cumulativePrincipal: investment.downPayment,
    cumulativeExpenses: 0,
    totalInvestmentCost: investment.downPayment + (investment.closingCosts || 0)
  }

  const handleViewChange = (_event: React.MouseEvent<HTMLElement>, newView: 'yearly' | 'monthly') => {
    if (newView !== null) {
      setViewType(newView)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
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
        <ToggleButtonGroup
          value={viewType}
          exclusive
          onChange={handleViewChange}
          size="small"
          aria-label="amortization view type"
        >
          <ToggleButton value="yearly" aria-label="yearly view">
            Yearly
          </ToggleButton>
          <ToggleButton value="monthly" aria-label="monthly view">
            Monthly
          </ToggleButton>
        </ToggleButtonGroup>
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
              {COLUMNS.map((column, index) => (
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
              <TableCell>
                {formatDate(initialRow.date)}
              </TableCell>
              <TableCell align="right">
                ${formatCurrency(initialRow.beginningBalance)}
              </TableCell>
              <TableCell align="right">
                ${formatCurrency(initialRow.payment)}
              </TableCell>
              <TableCell align="right">
                ${formatCurrency(initialRow.principal)}
              </TableCell>
              <TableCell align="right">
                ${formatCurrency(initialRow.interest)}
              </TableCell>
              <TableCell align="right">
                ${formatCurrency(initialRow.endingBalance)}
              </TableCell>
              <TableCell align="right">
                ${formatCurrency(initialRow.cumulativePayment)}
              </TableCell>
              <TableCell align="right">
                ${formatCurrency(initialRow.cumulativeInterest)}
              </TableCell>
              <TableCell align="right">
                ${formatCurrency(initialRow.cumulativePrincipal)}
              </TableCell>
              <TableCell align="right">
                ${formatCurrency(initialRow.cumulativeExpenses)}
              </TableCell>
              <TableCell align="right">
                ${formatCurrency(initialRow.totalInvestmentCost)}
              </TableCell>
            </TableRow>
            {amortization.map((row: AmortizationRow, index: number) => (
              <TableRow 
                key={index}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': {
                    backgroundColor: 'rgba(100, 255, 218, 0.1)',
                  },
                }}
              >
                <TableCell>
                  {formatDate(row.date)}
                </TableCell>
                <TableCell align="right">
                  ${formatCurrency(row.beginningBalance)}
                </TableCell>
                <TableCell align="right">
                  ${formatCurrency(row.payment)}
                </TableCell>
                <TableCell align="right">
                  ${formatCurrency(row.principal)}
                </TableCell>
                <TableCell align="right">
                  ${formatCurrency(row.interest)}
                </TableCell>
                <TableCell align="right">
                  ${formatCurrency(row.endingBalance)}
                </TableCell>
                <TableCell align="right">
                  ${formatCurrency(row.cumulativePayment)}
                </TableCell>
                <TableCell align="right">
                  ${formatCurrency(row.cumulativeInterest)}
                </TableCell>
                <TableCell align="right">
                  ${formatCurrency(row.cumulativePrincipal)}
                </TableCell>
                <TableCell align="right">
                  ${formatCurrency(row.cumulativeExpenses)}
                </TableCell>
                <TableCell align="right">
                  ${formatCurrency(row.totalInvestmentCost)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Fade in={showScrollTop && viewType === 'monthly'}>
        <Box
          role="presentation"
          sx={{
            position: 'fixed',
            left: '50%',
            bottom: 32,
            transform: 'translateX(-50%)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Button
            variant="contained"
            onClick={handleScrollToTop}
            startIcon={<KeyboardArrowUpIcon />}
            sx={{
              bgcolor: 'rgba(100, 255, 218, 0.2)',
              backdropFilter: 'blur(8px)',
              color: '#e6edf7',
              '&:hover': {
                bgcolor: 'rgba(100, 255, 218, 0.3)',
              },
              px: 3,
              py: 1,
              borderRadius: 2,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease'
            }}
          >
            Back to Top
          </Button>
        </Box>
      </Fade>
    </>
  )
} 