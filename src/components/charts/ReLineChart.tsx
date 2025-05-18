'use client'

import { useSelector } from 'react-redux'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  Label,
  LabelList
} from 'recharts'
import { RootState } from '@/store/store'
import { calculateAmortization, calculateFutureValue } from '@/utils/calculations'
import { useState } from 'react'

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

const formatShortValue = (value: number) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`
  }
  return `$${value.toFixed(0)}`
}

const CHART_LABELS = {
  net_income: 'Net Income',
  cost_of_investment: 'Investment Cost',
  equity_value_after_appriciation: 'Future Value',
  rent_if_rented: 'Rental Income',
  outstanding_loan_amount: 'Loan Balance',
  cumulative_interest_paid: 'Total Interest',
  cumulative_principal_paid: 'Total Principal',
  equity: 'Equity',
  value_earned: 'Value Earned',
  propertyTax: 'Property Tax',
  insurance: 'Insurance',
  maintenance: 'Maintenance'
}

export default function ReLineChart({ items, domain }: ReLineChartProps) {
  const investment = useSelector((state: RootState) => state.investment)
  const [activeValues, setActiveValues] = useState<{ [key: string]: string }>({})
  const [activeYear, setActiveYear] = useState<number | null>(null)

  const handleMouseMove = (e: any) => {
    if (e.activePayload) {
      const newValues: { [key: string]: string } = {}
      e.activePayload.forEach((payload: any) => {
        newValues[payload.dataKey] = formatValue(payload.value)
      })
      setActiveValues(newValues)
      setActiveYear(e.activePayload[0].payload.year)
    }
  }

  const handleMouseLeave = () => {
    setActiveValues({})
    setActiveYear(null)
  }

  const generateChartData = (): ChartData[] => {
    const amortization = calculateAmortization(
      investment.propertyValue - investment.downPayment,
      investment.interestRate,
      investment.loanTerm,
      investment.propertyTax,
      investment.insurance,
      investment.hoa || 0,
      investment.closingCosts || 0,
      investment.propertyValue,
      investment.appreciation,
      investment.maintenance
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
          default:
            if (investment[item as keyof typeof investment]) {
              data[item] = investment[item as keyof typeof investment]
            }
        }
      })

      return data
    })
  }

  const data = generateChartData()

  return (
    <div style={{ width: '100%', height: 400, position: 'relative' }}>
      {activeYear && Object.keys(activeValues).length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            padding: '10px',
            backgroundColor: '#0d2140',
            border: '1px solid #233554',
            borderRadius: '4px',
            color: '#e6edf7',
            zIndex: 1000,
          }}
        >
          <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>Year {activeYear}</div>
          {items.map((item, index) => (
            <div key={item} style={{ color: COLORS[index % COLORS.length] }}>
              {CHART_LABELS[item as keyof typeof CHART_LABELS] || item}: {activeValues[item]}
            </div>
          ))}
        </div>
      )}
      <ResponsiveContainer>
        <LineChart 
          data={data} 
          margin={{ top: 30, right: 30, left: 20, bottom: 20 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
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
          <Legend 
            formatter={(value: string) => 
              CHART_LABELS[value as keyof typeof CHART_LABELS] || value
            }
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
              name={item}
              stroke={COLORS[index % COLORS.length]}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: COLORS[index % COLORS.length] }}
            >
              <LabelList
                dataKey={item}
                position="top"
                fill={COLORS[index % COLORS.length]}
                fontSize={12}
                formatter={(value: number) => {
                  const dataPoint = data.find(d => d[item] === value)
                  return dataPoint && dataPoint.year % 5 === 0 ? formatShortValue(value) : ''
                }}
              />
            </Line>
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
} 