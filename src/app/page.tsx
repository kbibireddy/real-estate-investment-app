'use client'

import { Container, Grid } from 'semantic-ui-react'
import ControlPanel from '@/components/ControlPanel'
import AmortizationTable from '@/components/AmortizationTable'
import ReLineChart from '@/components/charts/ReLineChart'

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <div className="ui grid" style={{ margin: 0 }}>
        <div className="row">
          <div className="ui container">
            <h1 className="text-3xl font-bold text-center mb-8">
              Real Estate Investment Analysis Tool
            </h1>
          </div>
        </div>
        <div className="row">
          <ControlPanel />
        </div>
        <div className="row">
          <AmortizationTable />
        </div>
        <div className="row">
          <ReLineChart domain={[0, 2000000]} items={["net_income"]} />
        </div>
        <div className="row">
          <ReLineChart
            domain={[0, 2500000]}
            items={["cost_of_investment", "equity_value_after_appriciation"]}
          />
        </div>
        <div className="row">
          <ReLineChart items={["rent_if_rented"]} />
        </div>
        <div className="row">
          <ReLineChart
            items={[
              "outstanding_loan_amount",
              "cumulative_interest_paid",
              "cumulative_principal_paid",
              "cost_of_investment",
            ]}
          />
        </div>
        <div className="row">
          <ReLineChart items={["equity"]} />
        </div>
        <div className="row">
          <ReLineChart items={["value_earned"]} />
        </div>
      </div>
    </main>
  )
}
