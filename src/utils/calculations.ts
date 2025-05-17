interface AmortizationRow {
  date: Date
  beginningBalance: number
  payment: number
  principal: number
  interest: number
  endingBalance: number
  cumulativePayment: number
  cumulativeInterest: number
  cumulativePrincipal: number
  cumulativeExpenses: number
  totalInvestmentCost: number
  appreciatedValue: number
}

export function calculateAmortization(
  loanAmount: number,
  annualInterestRate: number,
  loanTermYears: number,
  propertyTax: number,
  insurance: number,
  hoa: number,
  closingCosts: number,
  propertyValue: number,
  appreciationRate: number
): AmortizationRow[] {
  const monthlyInterestRate = annualInterestRate / 100 / 12
  const numberOfPayments = loanTermYears * 12
  const monthlyPayment =
    (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)

  const amortization: AmortizationRow[] = []
  let balance = loanAmount
  let cumulativePayment = 0
  let cumulativeInterest = 0
  let cumulativePrincipal = propertyValue - loanAmount // Start with down payment
  const startDate = new Date()
  const annualExpenses = propertyTax + insurance + hoa
  let cumulativeExpenses = closingCosts // Start with closing costs

  for (let year = 1; year <= loanTermYears; year++) {
    let yearlyPrincipal = 0
    let yearlyInterest = 0
    const beginningBalance = balance
    const yearDate = new Date(startDate)
    yearDate.setFullYear(startDate.getFullYear() + (year - 1))

    // Calculate monthly payments for the year
    for (let month = 1; month <= 12; month++) {
      const interestPayment = balance * monthlyInterestRate
      const principalPayment = monthlyPayment - interestPayment

      yearlyPrincipal += principalPayment
      yearlyInterest += interestPayment
      balance -= principalPayment
    }

    cumulativePayment += yearlyPrincipal + yearlyInterest
    cumulativeInterest += yearlyInterest
    cumulativePrincipal += yearlyPrincipal
    cumulativeExpenses += annualExpenses
    const totalInvestmentCost = cumulativePrincipal
    const appreciatedValue = totalInvestmentCost * Math.pow(1 + appreciationRate / 100, year)

    amortization.push({
      date: yearDate,
      beginningBalance,
      payment: yearlyPrincipal + yearlyInterest,
      principal: yearlyPrincipal,
      interest: yearlyInterest,
      endingBalance: balance,
      cumulativePayment,
      cumulativeInterest,
      cumulativePrincipal,
      cumulativeExpenses,
      totalInvestmentCost,
      appreciatedValue
    })
  }

  return amortization
}

export function calculateMonthlyPayment(
  loanAmount: number,
  annualInterestRate: number,
  loanTermYears: number
): number {
  const monthlyInterestRate = annualInterestRate / 100 / 12
  const numberOfPayments = loanTermYears * 12
  return (
    (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
  )
}

export function calculateFutureValue(
  presentValue: number,
  annualRate: number,
  years: number
): number {
  return presentValue * Math.pow(1 + annualRate / 100, years)
} 