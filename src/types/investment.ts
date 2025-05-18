export interface InvestmentState {
  propertyValue: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  monthlyRent: number;
  propertyTax: number;
  insurance: number;
  maintenance: number;
  appreciation: number;
  rentIncrease: number;
  hoa: number;
  closingCosts: number;
}

export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  totalInterest: number;
  totalPrincipal: number;
}

export interface RentVsBuyRow {
  year: number;
  rentPayment: number;
  mortgagePayment: number;
  propertyValue: number;
  equity: number;
  rentSavings: number;
  buySavings: number;
}

export interface RentingOutRow {
  year: number;
  rentalIncome: number;
  expenses: number;
  cashFlow: number;
  roi: number;
  propertyValue: number;
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: string | number;
} 