'use client'

import { useState } from 'react'
import ControlPanel from '@/components/ControlPanel'
import AmortizationTable from '@/components/AmortizationTable'
import ReLineChart from '@/components/charts/ReLineChart'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'table' | 'charts'>('table')

  return (
    <main className="min-h-screen p-4">
      <div className="ui container">
        <h1 className="text-3xl font-bold text-center mb-8">
          Real Estate Investment Analysis Tool
        </h1>
        
        <div className="ui grid">
          {/* Left Panel - Control Panel */}
          <div className="five wide column">
            <div className="ui segment">
              <ControlPanel />
            </div>
          </div>

          {/* Right Panel - Tabs */}
          <div className="eleven wide column">
            <div className="ui top attached tabular menu">
              <a 
                className={`item ${activeTab === 'table' ? 'active' : ''}`}
                onClick={() => setActiveTab('table')}
              >
                Amortization Table
              </a>
              <a 
                className={`item ${activeTab === 'charts' ? 'active' : ''}`}
                onClick={() => setActiveTab('charts')}
              >
                Charts
              </a>
            </div>
            
            <div className="ui bottom attached segment">
              {activeTab === 'table' ? (
                <AmortizationTable />
              ) : (
                <div className="ui grid">
                  <div className="row">
                    <div className="column">
                      <h3 className="ui header">Net Income</h3>
                      <ReLineChart domain={[0, 2000000]} items={["net_income"]} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="column">
                      <h3 className="ui header">Investment Value & Equity</h3>
                      <ReLineChart
                        domain={[0, 2500000]}
                        items={["cost_of_investment", "equity_value_after_appriciation"]}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="column">
                      <h3 className="ui header">Rental Income</h3>
                      <ReLineChart items={["rent_if_rented"]} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="column">
                      <h3 className="ui header">Loan Analysis</h3>
                      <ReLineChart
                        items={[
                          "outstanding_loan_amount",
                          "cumulative_interest_paid",
                          "cumulative_principal_paid",
                          "cost_of_investment",
                        ]}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="column">
                      <h3 className="ui header">Equity Growth</h3>
                      <ReLineChart items={["equity"]} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="column">
                      <h3 className="ui header">Total Value Earned</h3>
                      <ReLineChart items={["value_earned"]} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
