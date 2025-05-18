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
import sp500Data from '@/constants/sp500-historical.json'

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

    // Calculate initial investment amount (down payment + closing costs)
    const totalInvestmentCost = investment.downPayment + (investment.closingCosts || 0)

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

      // Calculate S&P 500 investment value using historical returns
      let sp500Value = totalInvestmentCost
      for (let i = 0; i < year; i++) {
        // Use modulo to cycle through historical returns if we run out of years
        const returnIndex = i % sp500Data.historicalReturns.length
        const yearReturn = sp500Data.historicalReturns[returnIndex].return
        sp500Value *= (1 + yearReturn / 100)
      }

      return {
        year,
        yearDate,
        costOfOwnership,
        appreciatedValue,
        rentCost,
        sp500Value,
        buyAdvantage: appreciatedValue - sp500Value + (rentCost - costOfOwnership)
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
        Rent vs Buy vs S&P 500 Comparison
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, px: 1 }}>
        Compare the financial impact of renting, buying, and investing in the S&P 500. The Buy Advantage column shows the 
        total benefit of buying versus both renting and investing in the S&P 500, accounting for property appreciation, 
        rental costs saved, and the opportunity cost of not investing in the stock market.
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Year</TableCell>
              <TableCell align="right">Cost of Ownership</TableCell>
              <TableCell align="right">Investment Value with Appreciation</TableCell>
              <TableCell align="right">Cost of Renting</TableCell>
              <TableCell 
                align="right"
                sx={{ borderLeft: '2px solid rgba(224, 224, 224, 1)' }}
              >
                S&P 500 Investment Value
              </TableCell>
              <TableCell 
                align="right"
                sx={{ borderLeft: '2px solid rgba(224, 224, 224, 1)' }}
              >
                Buy Advantage
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.year}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  backgroundColor: row.buyAdvantage > 0 ? 'rgba(100, 255, 218, 0.1)' : 'inherit',
                  '&:hover': {
                    backgroundColor: row.buyAdvantage > 0 ? 'rgba(100, 255, 218, 0.2)' : 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <TableCell>{row.year} ({formatDate(row.yearDate)})</TableCell>
                <TableCell align="right">{formatCurrency(row.costOfOwnership)}</TableCell>
                <TableCell align="right">{formatCurrency(row.appreciatedValue)}</TableCell>
                <TableCell align="right">{formatCurrency(row.rentCost)}</TableCell>
                <TableCell 
                  align="right"
                  sx={{ borderLeft: '2px solid rgba(224, 224, 224, 1)' }}
                >
                  {formatCurrency(row.sp500Value)}
                </TableCell>
                <TableCell 
                  align="right"
                  sx={{
                    borderLeft: '2px solid rgba(224, 224, 224, 1)',
                    color: row.buyAdvantage > 0 ? 'success.main' : 'error.main',
                    fontWeight: 'bold'
                  }}
                >
                  {formatCurrency(row.buyAdvantage)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
} 