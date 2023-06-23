export const generateAmortization = (listingData) => {
  let down_payment_amount = listingData["price"] * (listingData["down_payment_percent"] / 100);
  let loan_amount = listingData["price"] - down_payment_amount;
  let monthly_interest_rate = listingData["intrest_rate"] / 1200;
  let month_count = listingData["tenure_in_years"] * 12;
  let monthly_mortgage_payment = loan_amount * ((monthly_interest_rate * ((1 + monthly_interest_rate) ** month_count)) / (((1 + monthly_interest_rate) ** month_count) - 1));
  let home_value_after_appriciation = listingData["price"] * ( 1 + (listingData["home_yoy_appriciation_percent"] / 1200));
  
  // One time costs
  let lender_fee = parseFloat(listingData["lender_fee_percent"] * listingData["price"] / 100);
  let closing_fee = lender_fee;

  // Monthly other costs
  let monthly_hoa = parseFloat(listingData["hoa_fee_in_dollars"]);
  let monthly_home_insurance = parseFloat(listingData["home_insurance_percent"] * listingData["price"] / 100);
  let monthly_prop_tax = parseFloat(listingData["property_tax_percent"] * listingData["price"] / 100);
  let monthly_costs = monthly_hoa + (monthly_home_insurance/12) + (monthly_prop_tax/12);

  var result = [];

  for (let i = 0; i < month_count; i++) {
    let outstanding_loan_amount = loan_amount;
    let monthly_interest_paid = outstanding_loan_amount * monthly_interest_rate;
    let cumulative_interest_paid = monthly_interest_paid;
    let monthly_principal_paid = monthly_mortgage_payment - monthly_interest_paid;
    let cumulative_principal_paid = monthly_principal_paid;
    let cumulative_costs = monthly_costs + closing_fee;
    let rent_if_rented = listingData["rent_if_rented"];


    // All months expecept first month
    if (i > 0 && result.length > 0) {
      outstanding_loan_amount = parseFloat(result[result.length - 1]["outstanding_loan_amount"]) - parseFloat(result[result.length - 1]["monthly_principal_paid"]);
      monthly_interest_paid = outstanding_loan_amount * monthly_interest_rate;
      cumulative_interest_paid = monthly_interest_paid + parseFloat(result[result.length - 1]["cumulative_interest_paid"]);
      monthly_principal_paid = monthly_mortgage_payment - monthly_interest_paid;
      cumulative_principal_paid = monthly_principal_paid + parseFloat(result[result.length - 1]["cumulative_principal_paid"]);
      cumulative_costs = monthly_costs + parseFloat(result[result.length - 1]["cumulative_costs"]);
      home_value_after_appriciation = parseFloat(result[result.length - 1]["home_value_after_appriciation"]) * ( 1 + (listingData["home_yoy_appriciation_percent"] / 1200));
      rent_if_rented = parseFloat(result[result.length - 1]["rent_if_rented"]) * ( 1 + (listingData["rental_yoy_appriciation_percent"] / 1200));
    }
    
    let cost_of_investment = parseFloat(cumulative_costs + cumulative_interest_paid).toFixed(2);
    let equity = (((down_payment_amount + cumulative_principal_paid) * 100) / listingData["price"])
    let equity_value = listingData["price"] * equity / 100
    let equity_value_after_appriciation = home_value_after_appriciation * equity/100
    let net_income = equity_value_after_appriciation - cost_of_investment + rent_if_rented;

    let amMonthlyUnit = {
      "month_number": i + 1,
      "year": Math.floor((i + 1) / 12) + 1,
      "home_value_after_appriciation": parseFloat(home_value_after_appriciation).toFixed(2),
      "outstanding_loan_amount": Math.floor(outstanding_loan_amount),
      "monthly_interest_paid": parseFloat(monthly_interest_paid).toFixed(2),
      "cumulative_interest_paid": parseFloat(cumulative_interest_paid).toFixed(2),
      "monthly_principal_paid": parseFloat(monthly_principal_paid).toFixed(2),
      "cumulative_principal_paid": parseFloat(cumulative_principal_paid).toFixed(2),
      "equity": parseFloat(equity).toFixed(2),
      "equity_value": parseFloat(equity_value).toFixed(2),
      "equity_value_after_appriciation": parseFloat(equity_value_after_appriciation).toFixed(2),
      "value_earned": parseFloat(equity * listingData["price"] / 100).toFixed(2),
      "cumulative_costs": cumulative_costs,
      "cost_of_investment": cost_of_investment,
      "rent_if_rented": rent_if_rented,
      "net_income": parseFloat(net_income).toFixed(2)
      
    };

    result.push(amMonthlyUnit);
  }

  console.log(result);
  return result;
};