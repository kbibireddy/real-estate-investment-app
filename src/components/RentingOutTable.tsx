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

export default function RentingOutTable() {
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
      const cumulativeRentalIncome = investment.monthlyRent * 12 * 
        (Math.pow(1 + investment.rentIncrease / 100, year) - 1) / 
        (investment.rentIncrease / 100)
      const effectiveCostOfOwnership = costOfOwnership - cumulativeRentalIncome

      return {
        year,
        yearDate,
        costOfOwnership,
        appreciatedValue,
        cumulativeRentalIncome,
        effectiveCostOfOwnership
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
        Rental Property Investment Analysis
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, px: 1 }}>
        Evaluate the potential of your property as a rental investment. Green highlighting shows years where your net 
        position is positive, considering appreciation and rental income. The Net Position column indicates your total 
        financial benefit, combining property value growth with rental income offset by ownership costs.
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Year</TableCell>
              <TableCell align="right">Cost of Ownership</TableCell>
              <TableCell align="right">Investment Value with Appreciation</TableCell>
              <TableCell align="right">Cumulative Rental Income</TableCell>
              <TableCell align="right">Effective Cost of Ownership</TableCell>
              <TableCell align="right">Net Position</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => {
              const netPosition = row.appreciatedValue - row.effectiveCostOfOwnership
              return (
                <TableRow
                  key={row.year}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    backgroundColor: netPosition > 0 ? 'rgba(100, 255, 218, 0.1)' : 'inherit',
                    '&:hover': {
                      backgroundColor: netPosition > 0 ? 'rgba(100, 255, 218, 0.2)' : 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  <TableCell>{row.year} ({formatDate(row.yearDate)})</TableCell>
                  <TableCell align="right">{formatCurrency(row.costOfOwnership)}</TableCell>
                  <TableCell align="right">{formatCurrency(row.appreciatedValue)}</TableCell>
                  <TableCell align="right">{formatCurrency(row.cumulativeRentalIncome)}</TableCell>
                  <TableCell align="right">{formatCurrency(row.effectiveCostOfOwnership)}</TableCell>
                  <TableCell 
                    align="right"
                    sx={{
                      color: netPosition > 0 ? 'success.main' : 'error.main',
                      fontWeight: 'bold'
                    }}
                  >
                    {formatCurrency(netPosition)}
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