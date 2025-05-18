'use client'

import { Box, Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { RootState } from '@/store/store'
import { calculateAmortization } from '@/utils/calculations'

interface ChartItem {
  id: string
  label: string
  color: string
  category: 'loan' | 'costs' | 'value' | 'comparison' | 'rental'
}

const chartItems: ChartItem[] = [
  // Loan Metrics
  { id: 'loan_balance', label: 'Loan Balance', color: '#ffd700', category: 'loan' },
  { id: 'cumulative_interest', label: 'Cumulative Interest', color: '#ff6b6b', category: 'loan' },
  
  // Cost Metrics
  { id: 'cost_of_ownership', label: 'Total Cost of Ownership', color: '#ff9800', category: 'costs' },
  { id: 'cumulative_rental_cost', label: 'Cumulative Cost if Renting', color: '#ba68c8', category: 'costs' },
  { id: 'maintenance_costs', label: 'Maintenance Costs', color: '#f06292', category: 'costs' },
  { id: 'tax_insurance', label: 'Tax & Insurance', color: '#4db6ac', category: 'costs' },
  
  // Value & Returns
  { id: 'appreciated_value', label: 'Property Value with Appreciation', color: '#00ff9d', category: 'value' },
  { id: 'equity_built', label: 'Equity Built', color: '#64b5f6', category: 'value' },
  { id: 'net_worth_impact', label: 'Net Worth Impact', color: '#4caf50', category: 'value' },
  
  // Rental Analysis
  { id: 'rental_income', label: 'Potential Rental Income', color: '#ffa726', category: 'rental' },
  { id: 'net_rental_profit', label: 'Net Rental Profit', color: '#66bb6a', category: 'rental' }
]

const categoryLabels = {
  loan: 'Loan Metrics',
  costs: 'Cost Analysis',
  value: 'Value & Returns',
  rental: 'Rental Analysis'
}

export default function ChartPanel() {
  const [selectedItems, setSelectedItems] = useState<string[]>(['appreciated_value', 'equity_built', 'net_worth_impact'])
  const investment = useSelector((state: RootState) => state.investment)

  const handleItemToggle = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const generateChartData = () => {
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

    return amortization.map((row, index) => {
      const year = index + 1
      const taxInsurance = (investment.propertyTax + investment.insurance) * year
      const maintenanceCosts = (investment.propertyValue * 0.01) * year // Assuming 1% maintenance cost per year
      const costOfOwnership = row.cumulativeInterest + row.cumulativeExpenses
      
      // Calculate rental metrics
      const rentalIncome = investment.monthlyRent * 12 * 
        Math.pow(1 + investment.rentIncrease / 100, year)
      const netRentalProfit = rentalIncome - (row.payment + taxInsurance + maintenanceCosts)
      
      // Calculate cumulative rental cost (if renting instead of buying)
      const cumulativeRentalCost = investment.monthlyRent * 12 * 
        (Math.pow(1 + investment.rentIncrease / 100, year) - 1) / 
        (investment.rentIncrease / 100)
      
      // Calculate equity and net worth impact
      const equityBuilt = investment.propertyValue - row.endingBalance
      const netWorthImpact = row.appreciatedValue - row.endingBalance

      return {
        year,
        loan_balance: Math.max(0, row.endingBalance),
        cumulative_interest: Math.max(0, row.cumulativeInterest),
        cost_of_ownership: Math.max(0, costOfOwnership),
        cumulative_rental_cost: Math.max(0, cumulativeRentalCost),
        maintenance_costs: maintenanceCosts,
        tax_insurance: taxInsurance,
        appreciated_value: row.appreciatedValue,
        equity_built: Math.max(0, equityBuilt),
        net_worth_impact: netWorthImpact,
        rental_income: rentalIncome,
        net_rental_profit: netRentalProfit
      }
    })
  }

  const data = generateChartData()

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      height: '900px',
      mb: 6
    }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Investment Value Visualization
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Visualize how different aspects of your investment change over time. Toggle between key metrics to compare 
          trends and identify important crossover points. The chart helps you understand when your investment begins 
          to appreciate significantly and how your loan balance decreases relative to the property's value.
        </Typography>
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          p: 2,
          mb: 3,
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'divider'
        }}>
          {Object.entries(categoryLabels).map(([category, label]) => (
            <Box key={category}>
              <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
                {label}
              </Typography>
              <FormGroup row sx={{ gap: { xs: 1, sm: 2, md: 3 } }}>
                {chartItems
                  .filter(item => item.category === category)
                  .map(item => (
                    <FormControlLabel
                      key={item.id}
                      control={
                        <Checkbox
                          checked={selectedItems.includes(item.id)}
                          onChange={() => handleItemToggle(item.id)}
                          size="small"
                          sx={{
                            color: item.color,
                            '&.Mui-checked': {
                              color: item.color
                            },
                          }}
                        />
                      }
                      label={item.label}
                      sx={{ 
                        '& .MuiFormControlLabel-label': { 
                          fontSize: '0.875rem',
                          color: 'text.primary',
                          whiteSpace: 'nowrap'
                        }
                      }}
                    />
                  ))}
              </FormGroup>
            </Box>
          ))}
        </Box>
      </Box>
      
      <Box sx={{ 
        flex: 1,
        minHeight: '600px',
        mt: 4
      }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 60
            }}
          >
            <XAxis 
              dataKey="year" 
              tick={{ fill: '#e6edf7' }}
              tickFormatter={(value) => value % 5 === 0 ? value : ''}
            />
            <YAxis 
              tick={{ fill: '#e6edf7' }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
              domain={[0, 'auto']}
            />
            <Tooltip 
              formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              labelFormatter={(label) => `Year ${label}`}
              contentStyle={{
                backgroundColor: '#0d2140',
                border: '1px solid #233554',
                borderRadius: '4px',
                color: '#e6edf7'
              }}
            />
            <Legend 
              verticalAlign="bottom"
              height={72}
              wrapperStyle={{
                paddingTop: '20px',
                marginBottom: '-50px'
              }}
            />
            {selectedItems.map(itemId => {
              const item = chartItems.find(i => i.id === itemId)!
              return (
                <Line
                  key={itemId}
                  type="monotone"
                  dataKey={itemId}
                  name={item.label}
                  stroke={item.color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              )
            })}
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  )
} 