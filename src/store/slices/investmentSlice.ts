import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InvestmentState {
  propertyValue: number
  downPayment: number
  interestRate: number
  loanTerm: number
  monthlyRent: number
  propertyTax: number
  insurance: number
  maintenance: number
  appreciation: number
  rentIncrease: number
  hoa: number
  closingCosts: number
}

const initialState: InvestmentState = {
  propertyValue: 1000000,
  downPayment: 200000,
  interestRate: 6.5,
  loanTerm: 30,
  monthlyRent: 3700,
  propertyTax: 9000,
  insurance: 3000,
  maintenance: 2400,
  appreciation: 3,
  rentIncrease: 2,
  hoa: 0,
  closingCosts: 10000
}

export const investmentSlice = createSlice({
  name: 'investment',
  initialState,
  reducers: {
    updatePropertyValue: (state, action: PayloadAction<number>) => {
      state.propertyValue = action.payload
    },
    updateDownPayment: (state, action: PayloadAction<number>) => {
      state.downPayment = action.payload
    },
    updateInterestRate: (state, action: PayloadAction<number>) => {
      state.interestRate = action.payload
    },
    updateLoanTerm: (state, action: PayloadAction<number>) => {
      state.loanTerm = action.payload
    },
    updateMonthlyRent: (state, action: PayloadAction<number>) => {
      state.monthlyRent = action.payload
    },
    updatePropertyTax: (state, action: PayloadAction<number>) => {
      state.propertyTax = action.payload
    },
    updateInsurance: (state, action: PayloadAction<number>) => {
      state.insurance = action.payload
    },
    updateMaintenance: (state, action: PayloadAction<number>) => {
      state.maintenance = action.payload
    },
    updateAppreciation: (state, action: PayloadAction<number>) => {
      state.appreciation = action.payload
    },
    updateRentIncrease: (state, action: PayloadAction<number>) => {
      state.rentIncrease = action.payload
    },
    updateHOA: (state, action: PayloadAction<number>) => {
      state.hoa = action.payload
    },
    updateClosingCosts: (state, action: PayloadAction<number>) => {
      state.closingCosts = action.payload
    }
  }
})

export const {
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
  updateHOA,
  updateClosingCosts
} = investmentSlice.actions

export default investmentSlice.reducer 