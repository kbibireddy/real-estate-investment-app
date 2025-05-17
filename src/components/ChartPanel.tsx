import { Grid, Typography, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material'
import { useState } from 'react'
import ReLineChart from './charts/ReLineChart'

interface ChartOption {
  value: string
  label: string
  items: string[]
}

interface ChartSectionProps {
  title: string
  items: string[]
  domain: [number, number]
  chartType: string
  onChartTypeChange: (type: string) => void
  options: ChartOption[]
}

function ChartSection({ title, items, domain, chartType, onChartTypeChange, options }: ChartSectionProps) {
  return (
    <Grid item xs={12}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">{title}</Typography>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Chart Type</InputLabel>
          <Select
            value={chartType}
            label="Chart Type"
            onChange={(e) => onChartTypeChange(e.target.value)}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minHeight: 400 }}>
        <ReLineChart items={items} domain={domain} />
      </Box>
    </Grid>
  )
}

const valueChartOptions: ChartOption[] = [
  {
    value: 'property_value',
    label: 'Property Value & Equity',
    items: ['cost_of_investment', 'equity_value_after_appriciation', 'equity']
  },
  {
    value: 'loan_analysis',
    label: 'Loan Analysis',
    items: ['outstanding_loan_amount', 'cumulative_interest_paid', 'cumulative_principal_paid']
  },
  {
    value: 'total_value',
    label: 'Total Value Earned',
    items: ['value_earned']
  }
]

const cashFlowChartOptions: ChartOption[] = [
  {
    value: 'net_income',
    label: 'Net Income',
    items: ['net_income']
  },
  {
    value: 'rental_income',
    label: 'Rental Income Growth',
    items: ['rent_if_rented']
  },
  {
    value: 'expenses',
    label: 'Annual Expenses',
    items: ['propertyTax', 'insurance', 'maintenance']
  }
]

export default function ChartPanel() {
  const [valueChartType, setValueChartType] = useState('property_value')
  const [cashFlowChartType, setCashFlowChartType] = useState('net_income')

  const getCurrentChartItems = (options: ChartOption[], currentType: string) => {
    return options.find(opt => opt.value === currentType)?.items || []
  }

  return (
    <Grid container spacing={4}>
      <ChartSection
        title="Property Value Analysis"
        items={getCurrentChartItems(valueChartOptions, valueChartType)}
        domain={[0, 2500000]}
        chartType={valueChartType}
        onChartTypeChange={setValueChartType}
        options={valueChartOptions}
      />
      <ChartSection
        title="Cash Flow Analysis"
        items={getCurrentChartItems(cashFlowChartOptions, cashFlowChartType)}
        domain={[0, 100000]}
        chartType={cashFlowChartType}
        onChartTypeChange={setCashFlowChartType}
        options={cashFlowChartOptions}
      />
    </Grid>
  )
} 