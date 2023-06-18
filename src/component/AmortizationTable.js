import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { connect } from 'react-redux';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#acceef",
    color: theme.palette.common.white,
    fontWeight: 700
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function AmortizationTable({ data }) {
  return (
    <TableContainer component={Paper} sx={{ height: 'auto', maxHeight: 700, minWidth: 650, width: '60%', margin: 'auto' }}>
      <Table stickyHeader aria-label="a dense sticky table" sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">Month</StyledTableCell>
            <StyledTableCell align="right">Year</StyledTableCell>
            <StyledTableCell align="right">Outstanding Loan Amount</StyledTableCell>
            <StyledTableCell align="right">Cumulative Principal Paid</StyledTableCell>
            <StyledTableCell align="right">Monthly Principal Paid</StyledTableCell>
            <StyledTableCell align="right">Cumulative Interest Paid</StyledTableCell>
            <StyledTableCell align="right">Monthly Interest Paid</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.month_number}>
              <TableCell align="right">{row.month_number}</TableCell>
              <TableCell align="right">{row.year}</TableCell>
              <TableCell align="right">{row.outstanding_loan_amount}</TableCell>
              <TableCell align="right">{row.cumulative_principal_paid}</TableCell>
              <TableCell align="right">{row.monthly_principal_paid}</TableCell>
              <TableCell align="right">{row.cumulative_interest_paid}</TableCell>
              <TableCell align="right">{row.monthly_interest_paid}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// MapStateToProps
const mstp = (state) => ({ data: state.appState.amortizationData })
export default connect(mstp)(AmortizationTable);