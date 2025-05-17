'use client'

import { useSelector } from 'react-redux'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label
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

const COLORS = ['#64ffda', '#8892b0', '#e6edf7', '#0d2140', '#05101f']

const formatValue = (value: number) => {
  return `$${value.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })}`
}

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
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <XAxis 
              dataKey="year"
              stroke="#8892b0"
              tick={{ fill: '#8892b0' }}
            >
              <Label
                value="Years"
                position="bottom"
                offset={0}
                fill="#8892b0"
              />
            </XAxis>
            <YAxis 
              domain={domain || ['auto', 'auto']}
              stroke="#8892b0"
              tick={{ fill: '#8892b0' }}
              tickFormatter={formatValue}
            >
              <Label
                value="Value ($)"
                angle={-90}
                position="left"
                offset={0}
                fill="#8892b0"
              />
            </YAxis>
            <Tooltip 
              formatter={(value: number) => formatValue(value)}
              contentStyle={{
                backgroundColor: '#0d2140',
                border: 'none',
                borderRadius: '4px',
                color: '#e6edf7'
              }}
            />
            <Legend 
              verticalAlign="top"
              wrapperStyle={{
                paddingBottom: '20px',
                color: '#e6edf7'
              }}
            />
            {items.map((item, index) => (
              <Line
                key={item}
                type="monotone"
                dataKey={item}
                stroke={COLORS[index % COLORS.length]}
                strokeWidth={2}
                dot={false}
                label={{
                  fill: COLORS[index % COLORS.length],
                  fontSize: 12,
                  position: 'top',
                  formatter: (value: any) => {
                    // Only show label every 5 years
                    const year = value.payload.year
                    return year % 5 === 0 ? formatValue(value.value) : ''
                  }
                }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
} 