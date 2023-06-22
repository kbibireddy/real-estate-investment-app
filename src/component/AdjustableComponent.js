import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { formatNumber, toPercentageString } from '../utils/dataConverter';
import { convertToTitleCase } from '../utils/common';
import { stepClasses } from '@mui/material';
import store from '../store/store';

class AdjustableComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      label: props.label,
      defaultValue: props.data[props.label],
      value: props.data[props.label],
      minValue: 0,
      maxValue: 0,
      marks: []
    };

    this.state.scaleValue = 1;
    if (props.data[props.label] < 10) {
     this.state.scaleValue = 100;
     this.state.defaultValue = this.state.defaultValue * this.state.scaleValue;
     this.state.value = this.state.defaultValue;
    }

    this.state.minValue = Math.floor(this.state.defaultValue / 2);
    this.state.maxValue = Math.floor(this.state.defaultValue * 2);

    console.log(this.state)

    this.state.marks = [
      {
        value: this.state.minValue,
        label: this.numberFormatter(this.state.label, this.state.minValue / this.state.scaleValue)
      },
      {
        value: this.state.maxValue,
        label: this.numberFormatter(this.state.label, this.state.maxValue / this.state.scaleValue)
      }
    ];
  }

  numberFormatter(label, value) {
    if (label === 'price') {
      return formatNumber(value);
    }

    if (
      label === 'property_tax_percent' ||
      label === 'home_insurance_percent' ||
      label === 'home_yoy_appriciation_percent' ||
      label === 'intrest_rate' ||
      label === 'lender_fee_percent' ||
      label === 'down_payment_percent'
    ) {
      return toPercentageString(value);
    }

    if (label === 'tenure_in_years') {
      return value + ' years';
    }
  }

  valueCorrector(label, value) {
    if (
      label === 'property_tax_percent' ||
      label === 'home_insurance_percent' ||
      label === 'home_yoy_appriciation_percent' ||
      label === 'intrest_rate' ||
      label === 'lender_fee_percent' ||
      label === 'down_payment_percent'
    ) {
      return value/100;
    }
    return value
  }

  handleSliderChange = (event, value) => {
    this.setState({ value });
  };

  handleSliderChangeCommit = (event, value) => {
    const { label } = this.state;
    store.dispatch({
      type: "UPDATE_LISTING_DATA",
      payload: {"key": label, "value": this.valueCorrector(label, value)}
    });
    store.dispatch({
      type: "UPDATE_AMORTIZATION_DATA",
      payload: store.getState().listingState.data
    });
  }

  render() {
    return (
      <Card sx={{ minWidth: 200, minHeight: 75 }}>
        <Box>
          <CardContent sx={{ flex: '1 0 auto', textAlign: 'center', overflowWrap: 'break-word' }}>
            <Typography component="div" variant="h5" sx={{ fontWeight: 'bolder', fontSize: '1rem' }}>
              {convertToTitleCase(this.state.label)}
            </Typography>
            <Typography sx={{fontSize:'2rem', fontWeight:700, color:'#a6863c'}} variant="subtitle1" color="text.secondary" component="div">
              {this.numberFormatter(this.state.label, this.state.value / this.state.scaleValue)}
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 5, pr: 5, pb: 2 }}>
            <Slider
              defaultValue={this.state.defaultValue}
              value={this.state.value}
              size="small"
              onChange={this.handleSliderChange}
              onChangeCommitted={this.handleSliderChangeCommit}
              marks={this.state.marks}
              min={this.state.minValue}
              max={this.state.maxValue}
            />
          </Box>
        </Box>
      </Card>
    );
  }
}

// MapStateToProps
const mstp = (state) => (state.listingState)
export default connect(mstp)(AdjustableComponent);
