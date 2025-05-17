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
}

export function calculateAmortization(
  loanAmount: number,
  annualInterestRate: number,
  loanTermYears: number,
  propertyTax: number,
  insurance: number,
  hoa: number,
  closingCosts: number
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
  let cumulativePrincipal = 0
  const startDate = new Date()
  const annualExpenses = propertyTax + insurance + hoa

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
    const cumulativeExpenses = (annualExpenses * year)
    const totalInvestmentCost = closingCosts + cumulativePayment + cumulativeExpenses

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
      totalInvestmentCost
    })
  }

  return amortization
}

export function calculateMonthlyAmortization(
  loanAmount: number,
  annualInterestRate: number,
  loanTermYears: number,
  propertyTax: number,
  insurance: number,
  hoa: number,
  closingCosts: number
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
  let cumulativePrincipal = 0
  const startDate = new Date()
  const monthlyExpenses = (propertyTax + insurance + hoa) / 12

  for (let month = 1; month <= numberOfPayments; month++) {
    const beginningBalance = balance
    const interestPayment = balance * monthlyInterestRate
    const principalPayment = monthlyPayment - interestPayment
    
    balance -= principalPayment
    cumulativePayment += monthlyPayment
    cumulativeInterest += interestPayment
    cumulativePrincipal += principalPayment

    const currentDate = new Date(startDate)
    currentDate.setMonth(startDate.getMonth() + (month - 1))
    
    const cumulativeExpenses = (monthlyExpenses * month)
    const totalInvestmentCost = closingCosts + cumulativePayment + cumulativeExpenses

    amortization.push({
      date: currentDate,
      beginningBalance,
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      endingBalance: balance,
      cumulativePayment,
      cumulativeInterest,
      cumulativePrincipal,
      cumulativeExpenses,
      totalInvestmentCost
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