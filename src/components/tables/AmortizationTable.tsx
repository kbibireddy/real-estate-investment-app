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
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
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
    investment.appreciation,
    investment.maintenance
  )

  // Create initial costs row
  const initialRow = {
    date: new Date(),
    beginningBalance: investment.propertyValue - investment.downPayment,
    payment: 0,
    principal: investment.downPayment,
    interest: 0,
    endingBalance: investment.propertyValue - investment.downPayment,
    cumulativePayment: investment.downPayment,
    cumulativeInterest: 0,
    cumulativePrincipal: investment.downPayment,
    cumulativeExpenses: investment.closingCosts || 0,
    totalInvestmentCost: investment.downPayment + (investment.closingCosts || 0),
    appreciatedValue: investment.downPayment + (investment.closingCosts || 0)
  }

  const columns: ColumnHeader[] = [
    {
      label: 'Year (Date)',
      tooltip: 'Year of investment and payment date',
      align: 'left'
    },
    {
      label: 'Beginning Balance',
      tooltip: 'Loan balance at start of period',
      align: 'right'
    },
    {
      label: 'Payment',
      tooltip: 'Monthly payment amount',
      align: 'right'
    },
    {
      label: 'Principal',
      tooltip: 'Amount of payment going to principal',
      align: 'right'
    },
    {
      label: 'Interest',
      tooltip: 'Amount of payment going to interest',
      align: 'right'
    },
    {
      label: 'Ending Balance',
      tooltip: 'Remaining loan balance',
      align: 'right'
    },
    {
      label: 'Interest Paid to Date',
      tooltip: 'Total interest paid to date',
      align: 'right'
    },
    {
      label: 'Additional Expenses to Date',
      tooltip: 'Total additional expenses to date (tax, insurance, HOA, etc.)',
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
    },
    {
      label: 'Investment Advantage',
      tooltip: 'Difference between appreciated investment value and total cost of ownership',
      align: 'right'
    }
  ]

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Amortization Schedule Analysis
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, px: 1 }}>
        Track your loan payments, property costs, and investment growth over time. Green highlighting shows years where 
        your appreciated investment value exceeds the cumulative cost of ownership. The Investment Advantage column 
        helps you identify when your property investment begins to outperform its costs.
      </Typography>
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
                whiteSpace: 'nowrap'
              }}
            >
              <TableCell>0 ({formatDate(initialRow.date)})</TableCell>
              <TableCell align="right">{formatCurrency(initialRow.beginningBalance)}</TableCell>
              <TableCell align="right">{formatCurrency(initialRow.payment)}</TableCell>
              <TableCell align="right">{formatCurrency(initialRow.principal)}</TableCell>
              <TableCell align="right">{formatCurrency(initialRow.interest)}</TableCell>
              <TableCell align="right">{formatCurrency(initialRow.endingBalance)}</TableCell>
              <TableCell align="right">{formatCurrency(initialRow.cumulativeInterest)}</TableCell>
              <TableCell align="right">{formatCurrency(initialRow.cumulativeExpenses)}</TableCell>
              <TableCell align="right">{formatCurrency(initialRow.cumulativeInterest + initialRow.cumulativeExpenses)}</TableCell>
              <TableCell align="right">{formatCurrency(initialRow.totalInvestmentCost)}</TableCell>
              <TableCell align="right">{formatCurrency(initialRow.appreciatedValue)}</TableCell>
              <TableCell align="right">{formatCurrency(initialRow.appreciatedValue - (initialRow.cumulativeInterest + initialRow.cumulativeExpenses))}</TableCell>
            </TableRow>
            {amortization.map((row: AmortizationRow, index: number) => {
              const costOfOwnership = row.cumulativeInterest + row.cumulativeExpenses
              const investmentAdvantage = row.appreciatedValue - costOfOwnership

              return (
                <TableRow 
                  key={index}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    backgroundColor: investmentAdvantage > 0 ? 'rgba(100, 255, 218, 0.1)' : 'inherit',
                    '&:hover': {
                      backgroundColor: investmentAdvantage > 0 ? 'rgba(100, 255, 218, 0.2)' : 'rgba(0, 0, 0, 0.04)',
                    },
                    whiteSpace: 'nowrap'
                  }}
                >
                  <TableCell>{index + 1} ({formatDate(row.date)})</TableCell>
                  <TableCell align="right">{formatCurrency(row.beginningBalance)}</TableCell>
                  <TableCell align="right">{formatCurrency(row.payment)}</TableCell>
                  <TableCell align="right">{formatCurrency(row.principal)}</TableCell>
                  <TableCell align="right">{formatCurrency(row.interest)}</TableCell>
                  <TableCell align="right">{formatCurrency(row.endingBalance)}</TableCell>
                  <TableCell align="right">{formatCurrency(row.cumulativeInterest)}</TableCell>
                  <TableCell align="right">{formatCurrency(row.cumulativeExpenses)}</TableCell>
                  <TableCell align="right">{formatCurrency(costOfOwnership)}</TableCell>
                  <TableCell align="right">{formatCurrency(row.totalInvestmentCost)}</TableCell>
                  <TableCell align="right">{formatCurrency(row.appreciatedValue)}</TableCell>
                  <TableCell 
                    align="right"
                    sx={{
                      color: investmentAdvantage > 0 ? 'success.main' : 'error.main',
                      fontWeight: 'bold'
                    }}
                  >
                    {formatCurrency(investmentAdvantage)}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
} 