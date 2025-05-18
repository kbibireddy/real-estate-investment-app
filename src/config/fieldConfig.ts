export interface FieldConfig {
  min: number
  max: number
  default: number
  step: number
  increment: number
  label: string
  prefix?: string
  suffix: string
  description?: string
}

export type FieldsConfiguration = {
  [key: string]: FieldConfig
}

export const fieldConfig: FieldsConfiguration = {
  propertyValue: {
    min: 0,
    max: 10000000,
    default: 1000000,
    step: 10000,
    increment: 10000,
    label: 'Property Value',
    prefix: '$',
    suffix: '',
    description: 'The total value of the property'
  },
  downPayment: {
    min: 0,
    max: 10000000,
    default: 200000,
    step: 10000,
    increment: 5000,
    label: 'Down Payment',
    prefix: '$',
    suffix: '',
    description: 'Initial payment made when purchasing the property'
  },
  interestRate: {
    min: 0,
    max: 20,
    default: 6.5,
    step: 0.1,
    increment: 0.25,
    label: 'Interest Rate',
    prefix: '',
    suffix: '%',
    description: 'Annual interest rate for the mortgage'
  },
  loanTerm: {
    min: 1,
    max: 40,
    default: 30,
    step: 1,
    increment: 5,
    label: 'Loan Term',
    prefix: '',
    suffix: ' years',
    description: 'Length of the mortgage in years'
  },
  monthlyRent: {
    min: 0,
    max: 100000,
    default: 2500,
    step: 100,
    increment: 250,
    label: 'Monthly Rent',
    prefix: '$',
    suffix: '/month',
    description: 'Expected monthly rental income'
  },
  propertyTax: {
    min: 0,
    max: 100000,
    default: 2500,
    step: 100,
    increment: 500,
    label: 'Property Tax',
    prefix: '$',
    suffix: '/year',
    description: 'Annual property tax amount'
  },
  insurance: {
    min: 0,
    max: 10000,
    default: 1200,
    step: 100,
    increment: 200,
    label: 'Insurance',
    prefix: '$',
    suffix: '/year',
    description: 'Annual property insurance cost'
  },
  maintenance: {
    min: 0,
    max: 50000,
    default: 2400,
    step: 100,
    increment: 500,
    label: 'Maintenance',
    prefix: '$',
    suffix: '/year',
    description: 'Annual maintenance cost'
  },
  appreciation: {
    min: 0,
    max: 20,
    default: 3,
    step: 0.1,
    increment: 0.5,
    label: 'Property Appreciation Rate',
    prefix: '',
    suffix: '%/year',
    description: 'Expected year-over-year increase in property value. This rate compounds annually, similar to how rent increases work. Historical average is 3-4% nationally, but can vary significantly by location.'
  },
  rentIncrease: {
    min: 0,
    max: 20,
    default: 2,
    step: 0.1,
    increment: 0.5,
    label: 'Rent Increase',
    prefix: '',
    suffix: '%/year',
    description: 'Expected annual rent increase'
  },
  hoa: {
    min: 0,
    max: 10000,
    default: 0,
    step: 100,
    increment: 250,
    label: 'HOA Fees',
    prefix: '$',
    suffix: '/year',
    description: 'Annual Homeowners Association fees'
  },
  closingCosts: {
    min: 0,
    max: 100000,
    default: 0,
    step: 100,
    increment: 1000,
    label: 'Closing Costs',
    prefix: '$',
    suffix: '',
    description: 'One-time costs associated with closing the property purchase'
  }
} 