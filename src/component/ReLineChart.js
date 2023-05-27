import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Container } from 'semantic-ui-react';
import { generateAmortization } from '../utils/amortization';
import { connect } from 'react-redux';

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  function formatNumber(num) {
    if (num >= 1000 && num < 1000000) {
      return "$" + numberWithCommas((num / 1000).toFixed(1)) + "K";
    } else if (num >= 1000000) {
      return "$" + numberWithCommas((num / 1000000).toFixed(1)) + "M";
    } else {
      return "$" + num;
    }
  }  

class ReLineChart extends PureComponent {
  constructor(props) {
    super(props)
    console.log(generateAmortization([props.data]))
  }

    getCurrency() {
        const { data } = this.props
        data.map(e=>formatNumber(e["outstanding_loan_amount"]))
        console.log(data)
        return data
    }
    render() {
        const { data } = this.props
        return (
            <Container style={{height:250, width:700, margin:"inherit"}}>
            <LineChart
                width={700}
                height={200}
                data={data}
                margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
                }}
            >
                <XAxis dataKey="month_number" style={{fontSize:14}}/>
                <YAxis dataKey="this.getCurrency" style={{fontSize:14}}/>
                <Tooltip itemStyle={{fontSize:14}}/>
                <Legend style={{fontSize:14}}/>
                <Line labelStyle={{fontSize:14}} type="linear" dot={false} activeDot={{ stroke: 'red', strokeWidth: 2, r: 10 }} dataKey="outstanding_loan_amount" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
  data: state.apiData
});

export default connect(mapStateToProps)(ReLineChart);
