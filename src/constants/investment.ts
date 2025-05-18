export const DEFAULT_VALUES = {
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
  closingCosts: 10000,
} as const;

export const INPUT_CONSTRAINTS = {
  propertyValue: { min: 50000, max: 10000000, step: 1000 },
  downPayment: { min: 0, max: 10000000, step: 1000 },
  interestRate: { min: 0, max: 20, step: 0.1 },
  loanTerm: { min: 5, max: 30, step: 5 },
  monthlyRent: { min: 0, max: 100000, step: 100 },
  propertyTax: { min: 0, max: 100000, step: 100 },
  insurance: { min: 0, max: 50000, step: 100 },
  maintenance: { min: 0, max: 50000, step: 100 },
  appreciation: { min: -5, max: 15, step: 0.1 },
  rentIncrease: { min: -5, max: 15, step: 0.1 },
  hoa: { min: 0, max: 2000, step: 10 },
  closingCosts: { min: 0, max: 100000, step: 1000 },
} as const;

export const FIELD_LABELS = {
  propertyValue: 'Property Value',
  downPayment: 'Down Payment',
  interestRate: 'Interest Rate',
  loanTerm: 'Loan Term',
  monthlyRent: 'Monthly Rent',
  propertyTax: 'Property Tax',
  insurance: 'Insurance',
  maintenance: 'Maintenance',
  appreciation: 'Appreciation',
  rentIncrease: 'Rent Increase',
  hoa: 'HOA',
  closingCosts: 'Closing Costs',
} as const;

export const FIELD_DESCRIPTIONS = {
  propertyValue: 'Total purchase price of the property',
  downPayment: 'Initial payment made when purchasing the property',
  interestRate: 'Annual interest rate for the mortgage',
  loanTerm: 'Length of the mortgage in years',
  monthlyRent: 'Expected monthly rental income',
  propertyTax: 'Annual property tax amount',
  insurance: 'Annual property insurance cost',
  maintenance: 'Annual maintenance and repair costs',
  appreciation: 'Expected annual property value increase',
  rentIncrease: 'Expected annual rent increase',
  hoa: 'Monthly homeowners association fees',
  closingCosts: 'One-time fees associated with purchasing',
} as const; 