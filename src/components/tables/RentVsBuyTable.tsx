'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography
} from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { calculateAmortization } from '@/utils/calculations'

export default function RentVsBuyTable() {
  const investment = useSelector((state: RootState) => state.investment)

  const generateTableData = () => {
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

    const startDate = new Date()
    return amortization.map((row, index) => {
      const year = index + 1
      const yearDate = new Date(startDate)
      yearDate.setFullYear(startDate.getFullYear() + (year - 1))
      const costOfOwnership = row.cumulativeInterest + row.cumulativeExpenses
      const appreciatedValue = row.appreciatedValue
      const rentCost = investment.monthlyRent * 12 * 
        (Math.pow(1 + investment.rentIncrease / 100, year) - 1) / 
        (investment.rentIncrease / 100)

      return {
        year,
        yearDate,
        costOfOwnership,
        appreciatedValue,
        rentCost
      }
    })
  }

  const formatCurrency = (value: number) => {
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

  const data = generateTableData()

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Rent vs Buy Comparison
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, px: 1 }}>
        Compare the financial impact of renting versus buying over time. Green highlighting indicates years where 
        renting would cost more than owning, suggesting a financial advantage to buying. The Buy Advantage column 
        shows your potential savings from buying instead of renting, accounting for property appreciation and rent increases.
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Year</TableCell>
              <TableCell align="right">Cost of Ownership</TableCell>
              <TableCell align="right">Investment Value with Appreciation</TableCell>
              <TableCell align="right">Cost of Renting</TableCell>
              <TableCell align="right">Buy Advantage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.year}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  backgroundColor: row.rentCost > row.costOfOwnership ? 'rgba(100, 255, 218, 0.1)' : 'inherit',
                  '&:hover': {
                    backgroundColor: row.rentCost > row.costOfOwnership ? 'rgba(100, 255, 218, 0.2)' : 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <TableCell>{row.year} ({formatDate(row.yearDate)})</TableCell>
                <TableCell align="right">{formatCurrency(row.costOfOwnership)}</TableCell>
                <TableCell align="right">{formatCurrency(row.appreciatedValue)}</TableCell>
                <TableCell align="right">{formatCurrency(row.rentCost)}</TableCell>
                <TableCell 
                  align="right"
                  sx={{
                    color: row.rentCost > row.costOfOwnership ? 'success.main' : 'error.main',
                    fontWeight: 'bold'
                  }}
                >
                  {formatCurrency(row.rentCost - row.costOfOwnership)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
} 