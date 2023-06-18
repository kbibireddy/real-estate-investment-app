export const generateAmortization = (listingData) => {
  let down_payment_amount = listingData["price"] * (listingData["down_payment_percent"] / 100);
  let loan_amount = listingData["price"] - down_payment_amount;
  let monthly_interest_rate = listingData["intrest_rate"] / 1200;
  let month_count = listingData["tenure_in_years"] * 12;
  let monthly_mortgage_payment = loan_amount * ((monthly_interest_rate * ((1 + monthly_interest_rate) ** month_count)) / (((1 + monthly_interest_rate) ** month_count) - 1));
  
  var result = [];
  
  for (let i = 0; i < month_count; i++) {
    let outstanding_loan_amount = loan_amount;
    let monthly_interest_paid = outstanding_loan_amount * monthly_interest_rate;
    let cumulative_interest_paid = monthly_interest_paid;
    let monthly_principal_paid = monthly_mortgage_payment - monthly_interest_paid;
    let cumulative_principal_paid = monthly_principal_paid;

    if (i > 0 && result.length > 0) {
      outstanding_loan_amount = parseFloat(result[result.length - 1]["outstanding_loan_amount"]) - parseFloat(result[result.length - 1]["monthly_principal_paid"]);
      monthly_interest_paid = outstanding_loan_amount * monthly_interest_rate;
      cumulative_interest_paid = monthly_interest_paid + parseFloat(result[result.length - 1]["cumulative_interest_paid"]);
      monthly_principal_paid = monthly_mortgage_payment - monthly_interest_paid;
      cumulative_principal_paid = monthly_principal_paid + parseFloat(result[result.length - 1]["cumulative_principal_paid"]);
    }

    let equity = (((down_payment_amount + cumulative_principal_paid) * 100) / listingData["price"])

    let amMonthlyUnit = {
      "month_number": i + 1,
      "year": Math.floor((i + 1) / 12) + 1,
      "outstanding_loan_amount": Math.floor(outstanding_loan_amount),
      "monthly_interest_paid": parseFloat(monthly_interest_paid).toFixed(2),
      "cumulative_interest_paid": parseFloat(cumulative_interest_paid).toFixed(2),
      "monthly_principal_paid": parseFloat(monthly_principal_paid).toFixed(2),
      "cumulative_principal_paid": parseFloat(cumulative_principal_paid).toFixed(2),
      "equity": parseFloat(equity).toFixed(2),
      "value_earned":  parseFloat(equity* listingData["price"]/100).toFixed(2) 
    };

    result.push(amMonthlyUnit);
  }

  console.log(result);
  return result;
};