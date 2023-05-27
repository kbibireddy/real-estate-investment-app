import './App.css';
import React from 'react';
import { Container, Grid} from 'semantic-ui-react';
import ReLineChart from './component/ReLineChart'
import ControlPanel from './component/ControlPanel';
import 'semantic-ui-css/semantic.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Grid style={{paddingTop:30, margin:0}}>
            <Grid.Row><Container>Real Estate Inventment Analyis Tool</Container></Grid.Row>
            <Grid.Row><ControlPanel/></Grid.Row>
            <Grid.Row><ReLineChart/></Grid.Row>
          </Grid>
      </header>
    </div>
  );
}

export default App;
