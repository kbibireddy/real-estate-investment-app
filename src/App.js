import './App.css';
import React from 'react';
import { Container, Grid} from 'semantic-ui-react';
import ReLineChart from './component/ReLineChart'
import ControlPanel from './component/ControlPanel';
import AmortizationTable from './component/AmortizationTable';
import 'semantic-ui-css/semantic.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Grid style={{paddingTop:30, margin:0}}>
            <Grid.Row><Container>Real Estate Inventment Analyis Tool</Container></Grid.Row>
            <Grid.Row><ControlPanel/></Grid.Row>
            <Grid.Row><AmortizationTable/></Grid.Row>
            <Grid.Row><ReLineChart items={["outstanding_loan_amount", "cumulative_interest_paid", "cumulative_principal_paid"]}/></Grid.Row>
            <Grid.Row><ReLineChart items={["equity"]}/></Grid.Row>
            <Grid.Row><ReLineChart items={["value_earned"]}/></Grid.Row>
          </Grid>
      </header>
    </div>
  );
}

export default App;
