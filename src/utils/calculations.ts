interface AmortizationRow {
  beginningBalance: number
  payment: number
  principal: number
  interest: number
  endingBalance: number
}

export function calculateAmortization(
  loanAmount: number,
  annualInterestRate: number,
  loanTermYears: number
): AmortizationRow[] {
  const monthlyInterestRate = annualInterestRate / 100 / 12
  const numberOfPayments = loanTermYears * 12
  const monthlyPayment =
    (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)

  const amortization: AmortizationRow[] = []
  let balance = loanAmount

  for (let year = 1; year <= loanTermYears; year++) {
    let yearlyPrincipal = 0
    let yearlyInterest = 0
    const beginningBalance = balance

    // Calculate monthly payments for the year
    for (let month = 1; month <= 12; month++) {
      const interestPayment = balance * monthlyInterestRate
      const principalPayment = monthlyPayment - interestPayment

      yearlyPrincipal += principalPayment
      yearlyInterest += interestPayment
      balance -= principalPayment
    }

    amortization.push({
      beginningBalance,
      payment: yearlyPrincipal + yearlyInterest,
      principal: yearlyPrincipal,
      interest: yearlyInterest,
      endingBalance: balance
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