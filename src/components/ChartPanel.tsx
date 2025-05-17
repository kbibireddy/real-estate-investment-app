import { Grid, Typography, Skeleton } from '@mui/material'
import ReLineChart from './charts/ReLineChart'

interface ChartSectionProps {
  title: string
  items: string[]
  domain?: [number, number]
}

function ChartSection({ title, items, domain }: ChartSectionProps) {
  return (
    <Grid item xs={12}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <div style={{ minHeight: 300 }}>
        <ReLineChart items={items} domain={domain} />
      </div>
    </Grid>
  )
}

export default function ChartPanel() {
  const chartSections: ChartSectionProps[] = [
    {
      title: 'Net Income',
      items: ['net_income'],
      domain: [0, 2000000]
    },
    {
      title: 'Investment Value & Equity',
      items: ['cost_of_investment', 'equity_value_after_appriciation'],
      domain: [0, 2500000]
    },
    {
      title: 'Rental Income',
      items: ['rent_if_rented']
    },
    {
      title: 'Loan Analysis',
      items: [
        'outstanding_loan_amount',
        'cumulative_interest_paid',
        'cumulative_principal_paid',
        'cost_of_investment'
      ]
    },
    {
      title: 'Equity Growth',
      items: ['equity']
    },
    {
      title: 'Total Value Earned',
      items: ['value_earned']
    }
  ]

  return (
    <Grid container spacing={3}>
      {chartSections.map((section, index) => (
        <ChartSection key={index} {...section} />
      ))}
    </Grid>
  )
} 