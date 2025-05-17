'use client'

import { useState } from 'react'
import { Container, Grid, Paper, Tabs, Tab, Typography, Box } from '@mui/material'
import ControlPanel from '@/components/ControlPanel'
import AmortizationTable from '@/components/AmortizationTable'
import ChartPanel from '@/components/ChartPanel'
import TabPanel from '@/components/common/TabPanel'

export default function Home() {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom sx={{ mb: 4 }}>
        Real Estate Investment Analysis Tool
      </Typography>
      
      <Grid container spacing={3}>
        {/* Top Panel - Control Panel */}
        <Grid item xs={12}>
          <Paper 
            elevation={3} 
            sx={{ 
              mb: 3,
              backgroundColor: 'background.paper',
              backgroundImage: 'none'
            }}
          >
            <ControlPanel />
          </Paper>
        </Grid>

        {/* Analysis Panel - Tabs */}
        <Grid item xs={12}>
          <Paper elevation={3}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                aria-label="analysis tabs"
                variant="fullWidth"
              >
                <Tab 
                  label="Amortization Table" 
                  id="tab-0" 
                  aria-controls="tabpanel-0"
                />
                <Tab 
                  label="Charts" 
                  id="tab-1" 
                  aria-controls="tabpanel-1"
                />
              </Tabs>
            </Box>
            
            <TabPanel value={tabValue} index={0}>
              <AmortizationTable />
            </TabPanel>
            
            <TabPanel value={tabValue} index={1}>
              <ChartPanel />
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
