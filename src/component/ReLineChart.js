import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { generateAmortization } from '../utils/amortization';
import { connect } from 'react-redux';
import { Container } from '@mui/material';

import Paper from '@mui/material/Paper';
import { getRandomColor } from '../utils/common';

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

// class ReLineChart extends PureComponent {
//   constructor(props) {
//     super(props)
//     console.log(generateAmortization([props.data]))
//   }

//     getCurrency() {
//         const { data } = this.props
//         data.map(e=>formatNumber(e["outstanding_loan_amount"]))
//         console.log(data)
//         return data
//     }
//     render() {
//         const { data } = this.props
//         return (
//             <Container style={{height:250, width:700, margin:"inherit"}}>
//             <LineChart
//                 width={700}
//                 height={200}
//                 data={data}
//                 margin={{
//                 top: 5,
//                 right: 30,
//                 left: 20,
//                 bottom: 5,
//                 }}
//             >
//                 <XAxis dataKey="month_number" style={{fontSize:14}}/>
//                 <YAxis dataKey="this.getCurrency" style={{fontSize:14}}/>
//                 <Tooltip itemStyle={{fontSize:14}}/>
//                 <Legend style={{fontSize:14}}/>
//                 <Line labelStyle={{fontSize:14}} type="linear" dot={false} activeDot={{ stroke: 'red', strokeWidth: 2, r: 10 }} dataKey="outstanding_loan_amount" stroke="#8884d8" activeDot={{ r: 8 }} />
//             </LineChart>
//             </Container>
//         );
//     }
// }

function generateArray(n, maxNum) {
  const distance = maxNum / (n - 1);
  const arr = [];
  let num = 0;
  for (let i = 0; i < n; i++) {
    arr.push(Math.floor(num));
    num += distance;
  }
  console.log(arr)
  return arr;
}

function ReLineChart({ data, items }) {

  return (
    <Container maxWidth="sm" style={{margin:"auto", background:"white", padding:10, borderRadius:5}}>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="month_number" style={{fontSize: 12}}/>
          <YAxis style={{fontSize: 12}}/>
          <Tooltip wrapperStyle={{fontSize: 12}}/>
          <Legend wrapperStyle={{fontSize: 12}}/>
          {items.map((item) => {
            let lineColor = getRandomColor()
            return (<Line type="monotone" dataKey={item} stroke={lineColor} dot={false} activeDot={{ r: 8 }} />)
          })}
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};

// MapStateToProps
const mstp = (state) => ({ data: state.appState.amortizationData })
export default connect(mstp)(ReLineChart);
