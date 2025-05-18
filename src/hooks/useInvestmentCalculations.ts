import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { AmortizationRow, RentVsBuyRow, RentingOutRow } from '@/types/investment';

export const useInvestmentCalculations = () => {
  const investment = useSelector((state: RootState) => state.investment);

  const calculateMonthlyPayment = (principal: number, annualRate: number, years: number): number => {
    const monthlyRate = annualRate / 12 / 100;
    const numberOfPayments = years * 12;
    return (
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    );
  };

  const amortizationSchedule = useMemo((): AmortizationRow[] => {
    const monthlyRate = investment.interestRate / 12 / 100;
    const numberOfPayments = investment.loanTerm * 12;
    const principal = investment.propertyValue - investment.downPayment;
    const monthlyPayment = calculateMonthlyPayment(
      principal,
      investment.interestRate,
      investment.loanTerm
    );

    const schedule: AmortizationRow[] = [];
    let balance = principal;
    let totalInterest = 0;
    let totalPrincipal = 0;

    for (let month = 1; month <= numberOfPayments; month++) {
      const interest = balance * monthlyRate;
      const principalPayment = monthlyPayment - interest;
      balance -= principalPayment;
      totalInterest += interest;
      totalPrincipal += principalPayment;

      schedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest,
        balance: Math.max(0, balance),
        totalInterest,
        totalPrincipal,
      });
    }

    return schedule;
  }, [investment]);

  const rentVsBuyAnalysis = useMemo((): RentVsBuyRow[] => {
    const analysis: RentVsBuyRow[] = [];
    const monthlyPayment = calculateMonthlyPayment(
      investment.propertyValue - investment.downPayment,
      investment.interestRate,
      investment.loanTerm
    );

    let propertyValue = investment.propertyValue;
    let rentPayment = investment.monthlyRent * 12;

    for (let year = 1; year <= investment.loanTerm; year++) {
      propertyValue *= 1 + investment.appreciation / 100;
      rentPayment *= 1 + investment.rentIncrease / 100;

      const mortgagePayment = monthlyPayment * 12;
      const equity = propertyValue - (investment.propertyValue - investment.downPayment) * (1 - year / investment.loanTerm);
      
      analysis.push({
        year,
        rentPayment,
        mortgagePayment,
        propertyValue,
        equity,
        rentSavings: rentPayment * year,
        buySavings: equity - (mortgagePayment * year),
      });
    }

    return analysis;
  }, [investment]);

  const rentingOutAnalysis = useMemo((): RentingOutRow[] => {
    const analysis: RentingOutRow[] = [];
    let propertyValue = investment.propertyValue;
    let yearlyRent = investment.monthlyRent * 12;
    const monthlyPayment = calculateMonthlyPayment(
      investment.propertyValue - investment.downPayment,
      investment.interestRate,
      investment.loanTerm
    );

    for (let year = 1; year <= investment.loanTerm; year++) {
      propertyValue *= 1 + investment.appreciation / 100;
      yearlyRent *= 1 + investment.rentIncrease / 100;

      const expenses = 
        monthlyPayment * 12 + 
        investment.propertyTax + 
        investment.insurance + 
        investment.maintenance +
        investment.hoa * 12;

      const cashFlow = yearlyRent - expenses;
      const totalInvestment = investment.downPayment + investment.closingCosts;
      const roi = (cashFlow / totalInvestment) * 100;

      analysis.push({
        year,
        rentalIncome: yearlyRent,
        expenses,
        cashFlow,
        roi,
        propertyValue,
      });
    }

    return analysis;
  }, [investment]);

  return {
    amortizationSchedule,
    rentVsBuyAnalysis,
    rentingOutAnalysis,
    calculateMonthlyPayment,
  };
}; 