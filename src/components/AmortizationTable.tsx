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
} from '@mui/material'
import { RootState } from '@/store/store'
import { calculateAmortization } from '@/utils/calculations'

interface AmortizationRow {
  beginningBalance: number
  payment: number
  principal: number
  interest: number
  endingBalance: number
}

const formatCurrency = (value: number): string => {
  return value.toLocaleString(undefined, { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })
}

export default function AmortizationTable() {
  const investment = useSelector((state: RootState) => state.investment)
  const amortization = calculateAmortization(
    investment.propertyValue - investment.downPayment,
    investment.interestRate,
    investment.loanTerm
  )

  return (
    <TableContainer 
      component={Paper} 
      sx={{ 
        maxHeight: 440,
        '& .MuiTableHead-root': {
          position: 'sticky',
          top: 0,
          zIndex: 1,
          backgroundColor: 'background.paper',
        },
        '& .MuiTableCell-stickyHeader': {
          backgroundColor: 'background.paper',
          borderBottom: '2px solid',
          borderColor: 'divider',
          fontWeight: 'bold',
        }
      }}
    >
      <Table stickyHeader aria-label="amortization table">
        <TableHead>
          <TableRow>
            <TableCell>Year</TableCell>
            <TableCell align="right">Beginning Balance</TableCell>
            <TableCell align="right">Payment</TableCell>
            <TableCell align="right">Principal</TableCell>
            <TableCell align="right">Interest</TableCell>
            <TableCell align="right">Ending Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {amortization.map((row: AmortizationRow, index: number) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {index + 1}
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
} 