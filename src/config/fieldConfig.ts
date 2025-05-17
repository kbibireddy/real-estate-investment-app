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
    description: 'The current market value or purchase price of the property. This is used as the basis for loan calculations and future value projections.'
  },
  downPayment: {
    min: 0,
    max: 1000000,
    default: 100000,
    step: 5000,
    label: 'Down Payment',
    prefix: '$',
    suffix: '',
    description: 'Initial cash investment in the property. A higher down payment reduces your loan amount and monthly payments but requires more upfront capital.'
  },
  interestRate: {
    min: 1,
    max: 15,
    default: 4.5,
    step: 0.1,
    label: 'Interest Rate',
    prefix: '',
    suffix: '%',
    description: 'Annual interest rate for the mortgage loan. This rate determines your monthly payments and total interest paid over the loan term.'
  },
  loanTerm: {
    min: 5,
    max: 30,
    default: 30,
    step: 5,
    label: 'Loan Term',
    prefix: '',
    suffix: ' years',
    description: 'Duration of the mortgage loan in years. Longer terms mean lower monthly payments but more total interest paid over the life of the loan.'
  },
  monthlyRent: {
    min: 500,
    max: 10000,
    default: 2500,
    step: 100,
    label: 'Monthly Rent',
    prefix: '$',
    suffix: '/month',
    description: 'Expected monthly rental income from tenants. This is a key factor in calculating your cash flow and return on investment.'
  },
  propertyTax: {
    min: 0,
    max: 20000,
    default: 2500,
    step: 100,
    label: 'Property Tax',
    prefix: '$',
    suffix: '/year',
    description: 'Annual property tax assessed by local authorities. This is an ongoing expense that affects your net operating income and should be factored into your cash flow analysis.'
  },
  insurance: {
    min: 0,
    max: 5000,
    default: 1200,
    step: 100,
    label: 'Insurance',
    prefix: '$',
    suffix: '/year',
    description: 'Annual cost of property insurance, including coverage for the building, liability, and potential rental income loss. Required by most lenders.'
  },
  maintenance: {
    min: 0,
    max: 10000,
    default: 2400,
    step: 100,
    label: 'Maintenance',
    prefix: '$',
    suffix: '/year',
    description: 'Estimated annual cost for repairs, maintenance, and property upkeep. Industry standard suggests budgeting 1-2% of property value annually.'
  },
  appreciation: {
    min: 0,
    max: 10,
    default: 3,
    step: 0.1,
    label: 'Property Appreciation',
    prefix: '',
    suffix: '%/year',
    description: 'Expected annual increase in property value. Historical average is 3-4% but varies by location and market conditions. This affects your long-term equity growth.'
  },
  rentIncrease: {
    min: 0,
    max: 10,
    default: 2,
    step: 0.1,
    label: 'Rent Increase',
    prefix: '',
    suffix: '%/year',
    description: 'Expected annual percentage increase in rental income. This helps model future cash flows and typically aligns with local market trends and inflation.'
  }
} 