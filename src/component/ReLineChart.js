import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { connect } from 'react-redux';
import { Container } from '@mui/material';
import { getRandomColor, customChartFormatter } from '../utils/common';

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
          <Tooltip formatter={(value, name, props)=>customChartFormatter(name, value)} wrapperStyle={{fontSize: 12}}/>
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
