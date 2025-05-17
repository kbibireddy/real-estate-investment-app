export interface FieldConfig {
  min: number
  max: number
  default: number
  step: number
  label: string
  prefix?: string
  suffix: string
  description?: string
}

export interface FieldsConfiguration {
  [key: string]: FieldConfig
}

export const fieldConfig: FieldsConfiguration = {
  propertyValue: {
    min: 50000,
    max: 2000000,
    default: 500000,
    step: 10000,
    label: 'Property Value',
    prefix: '$',
    suffix: '',
    description: 'Total value of the property'
  },
  downPayment: {
    min: 0,
    max: 1000000,
    default: 100000,
    step: 5000,
    label: 'Down Payment',
    prefix: '$',
    suffix: '',
    description: 'Initial payment for the property'
  },
  interestRate: {
    min: 1,
    max: 15,
    default: 4.5,
    step: 0.1,
    label: 'Interest Rate',
    prefix: '',
    suffix: '%',
    description: 'Annual interest rate for the loan'
  },
  loanTerm: {
    min: 5,
    max: 30,
    default: 30,
    step: 5,
    label: 'Loan Term',
    prefix: '',
    suffix: ' years',
    description: 'Duration of the loan'
  },
  monthlyRent: {
    min: 500,
    max: 10000,
    default: 2500,
    step: 100,
    label: 'Monthly Rent',
    prefix: '$',
    suffix: '/month',
    description: 'Expected monthly rental income'
  },
  propertyTax: {
    min: 0,
    max: 20000,
    default: 2500,
    step: 100,
    label: 'Property Tax',
    prefix: '$',
    suffix: '/year',
    description: 'Annual property tax'
  },
  insurance: {
    min: 0,
    max: 5000,
    default: 1200,
    step: 100,
    label: 'Insurance',
    prefix: '$',
    suffix: '/year',
    description: 'Annual insurance cost'
  },
  maintenance: {
    min: 0,
    max: 10000,
    default: 2400,
    step: 100,
    label: 'Maintenance',
    prefix: '$',
    suffix: '/year',
    description: 'Annual maintenance cost'
  },
  appreciation: {
    min: 0,
    max: 10,
    default: 3,
    step: 0.1,
    label: 'Property Appreciation',
    prefix: '',
    suffix: '%/year',
    description: 'Expected annual property value increase'
  },
  rentIncrease: {
    min: 0,
    max: 10,
    default: 2,
    step: 0.1,
    label: 'Rent Increase',
    prefix: '',
    suffix: '%/year',
    description: 'Expected annual rent increase'
  }
} 