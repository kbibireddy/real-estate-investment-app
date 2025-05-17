'use client'

import { useSelector } from 'react-redux'
import { Container } from 'semantic-ui-react'
import { RootState } from '@/store/store'
import { calculateAmortization } from '@/utils/calculations'

interface TableProps {
  children: React.ReactNode
  className?: string
}

const Table = ({ children, className = '' }: TableProps) => (
  <table className={`ui celled table ${className}`}>{children}</table>
)

const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <thead>{children}</thead>
)

const TableBody = ({ children }: { children: React.ReactNode }) => (
  <tbody>{children}</tbody>
)

const TableRow = ({ children }: { children: React.ReactNode }) => (
  <tr>{children}</tr>
)

const TableCell = ({ children }: { children: React.ReactNode }) => (
  <td>{children}</td>
)

const TableHeaderCell = ({ children }: { children: React.ReactNode }) => (
  <th>{children}</th>
)

export default function AmortizationTable() {
  const investment = useSelector((state: RootState) => state.investment)
  const amortization = calculateAmortization(
    investment.propertyValue - investment.downPayment,
    investment.interestRate,
    investment.loanTerm
  )

  return (
    <Container>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Year</TableHeaderCell>
              <TableHeaderCell>Beginning Balance</TableHeaderCell>
              <TableHeaderCell>Payment</TableHeaderCell>
              <TableHeaderCell>Principal</TableHeaderCell>
              <TableHeaderCell>Interest</TableHeaderCell>
              <TableHeaderCell>Ending Balance</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {amortization.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>${row.beginningBalance.toFixed(2)}</TableCell>
                <TableCell>${row.payment.toFixed(2)}</TableCell>
                <TableCell>${row.principal.toFixed(2)}</TableCell>
                <TableCell>${row.interest.toFixed(2)}</TableCell>
                <TableCell>${row.endingBalance.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Container>
  )
} 