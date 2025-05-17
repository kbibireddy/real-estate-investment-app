'use client'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
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

export default function ControlPanel() {
  const dispatch = useDispatch()
  const investment = useSelector((state: RootState) => state.investment)

  return (
    <form className="ui form">
      <h3 className="ui dividing header">Property Details</h3>
      <div className="field">
        <label>Property Value ($)</label>
        <input
          type="number"
          value={investment.propertyValue}
          onChange={(e) => dispatch(updatePropertyValue(Number(e.target.value)))}
        />
      </div>
      <div className="field">
        <label>Down Payment ($)</label>
        <input
          type="number"
          value={investment.downPayment}
          onChange={(e) => dispatch(updateDownPayment(Number(e.target.value)))}
        />
      </div>

      <h3 className="ui dividing header">Loan Details</h3>
      <div className="field">
        <label>Interest Rate (%)</label>
        <input
          type="number"
          step="0.1"
          value={investment.interestRate}
          onChange={(e) => dispatch(updateInterestRate(Number(e.target.value)))}
        />
      </div>
      <div className="field">
        <label>Loan Term (years)</label>
        <input
          type="number"
          value={investment.loanTerm}
          onChange={(e) => dispatch(updateLoanTerm(Number(e.target.value)))}
        />
      </div>

      <h3 className="ui dividing header">Rental Income</h3>
      <div className="field">
        <label>Monthly Rent ($)</label>
        <input
          type="number"
          value={investment.monthlyRent}
          onChange={(e) => dispatch(updateMonthlyRent(Number(e.target.value)))}
        />
      </div>
      <div className="field">
        <label>Rent Increase (%/year)</label>
        <input
          type="number"
          step="0.1"
          value={investment.rentIncrease}
          onChange={(e) => dispatch(updateRentIncrease(Number(e.target.value)))}
        />
      </div>

      <h3 className="ui dividing header">Expenses</h3>
      <div className="field">
        <label>Property Tax ($/year)</label>
        <input
          type="number"
          value={investment.propertyTax}
          onChange={(e) => dispatch(updatePropertyTax(Number(e.target.value)))}
        />
      </div>
      <div className="field">
        <label>Insurance ($/year)</label>
        <input
          type="number"
          value={investment.insurance}
          onChange={(e) => dispatch(updateInsurance(Number(e.target.value)))}
        />
      </div>
      <div className="field">
        <label>Maintenance ($/year)</label>
        <input
          type="number"
          value={investment.maintenance}
          onChange={(e) => dispatch(updateMaintenance(Number(e.target.value)))}
        />
      </div>

      <h3 className="ui dividing header">Appreciation</h3>
      <div className="field">
        <label>Property Appreciation (%/year)</label>
        <input
          type="number"
          step="0.1"
          value={investment.appreciation}
          onChange={(e) => dispatch(updateAppreciation(Number(e.target.value)))}
        />
      </div>
    </form>
  )
} 