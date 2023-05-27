import React, { PureComponent } from 'react';
import { Container, Grid} from 'semantic-ui-react';
import AdjustableComponent from './AdjustableComponent';

export default class ControlPanel extends PureComponent {

    render() {
        return(
        <Container>
            <Grid padded columns='equal'>
                <Grid.Row>
                <Grid.Column><AdjustableComponent label="price"/></Grid.Column>
                <Grid.Column><AdjustableComponent label="property_tax_percent"/></Grid.Column>
                <Grid.Column><AdjustableComponent label="home_insurance_percent"/></Grid.Column>
                </Grid.Row>
                <Grid.Row>
                <Grid.Column><AdjustableComponent label="tenure_in_years"/></Grid.Column>
                <Grid.Column><AdjustableComponent label="intrest_rate"/></Grid.Column>
                <Grid.Column><AdjustableComponent label="down_payment_percent"/></Grid.Column>
                <Grid.Column><AdjustableComponent label="lender_fee_percent"/></Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>)
    }
}

