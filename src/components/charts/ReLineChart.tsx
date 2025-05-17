'use client'

import { useSelector } from 'react-redux'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { RootState } from '@/store/store'
import { calculateAmortization, calculateFutureValue } from '@/utils/calculations'

interface ReLineChartProps {
  items: string[]
  domain?: [number, number]
}

interface ChartData {
  year: number
  [key: string]: number
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00C49F']

export default function ReLineChart({ items, domain }: ReLineChartProps) {
  const investment = useSelector((state: RootState) => state.investment)

  const generateChartData = (): ChartData[] => {
    const amortization = calculateAmortization(
      investment.propertyValue - investment.downPayment,
      investment.interestRate,
      investment.loanTerm
    )

    return Array.from({ length: investment.loanTerm }, (_, index) => {
      const year = index + 1
      const data: ChartData = { year }

      items.forEach((item) => {
        switch (item) {
          case 'net_income':
            data[item] =
              investment.monthlyRent * 12 * Math.pow(1 + investment.rentIncrease / 100, year) -
              (investment.propertyTax + investment.insurance + investment.maintenance)
            break
          case 'cost_of_investment':
            data[item] = investment.propertyValue
            break
          case 'equity_value_after_appriciation':
            data[item] = calculateFutureValue(investment.propertyValue, investment.appreciation, year)
            break
          case 'rent_if_rented':
            data[item] = investment.monthlyRent * 12 * Math.pow(1 + investment.rentIncrease / 100, year)
            break
          case 'outstanding_loan_amount':
            data[item] = amortization[index].endingBalance
            break
          case 'cumulative_interest_paid':
            data[item] = amortization
              .slice(0, index + 1)
              .reduce((sum, row) => sum + row.interest, 0)
            break
          case 'cumulative_principal_paid':
            data[item] = amortization
              .slice(0, index + 1)
              .reduce((sum, row) => sum + row.principal, 0)
            break
          case 'equity':
            data[item] =
              calculateFutureValue(investment.propertyValue, investment.appreciation, year) -
              amortization[index].endingBalance
            break
          case 'value_earned':
            const futureValue = calculateFutureValue(
              investment.propertyValue,
              investment.appreciation,
              year
            )
            const rentIncome =
              investment.monthlyRent *
              12 *
              (Math.pow(1 + investment.rentIncrease / 100, year) - 1) /
              (investment.rentIncrease / 100)
            data[item] = futureValue + rentIncome - investment.propertyValue
            break
        }
      })

      return data
    })
  }

  const data = generateChartData()

  return (
    <div className="ui container">
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis domain={domain || ['auto', 'auto']} />
            <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
            <Legend />
            {items.map((item, index) => (
              <Line
                key={item}
                type="monotone"
                dataKey={item}
                stroke={COLORS[index % COLORS.length]}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
} 