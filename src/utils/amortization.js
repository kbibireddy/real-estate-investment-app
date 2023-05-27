export const generateAmortization = (apiData) => {
    var amortizedData = []  
    amortizedData = apiData.map((elm) => {
      let down_payment_amount = (elm["price"] * (elm["down_payment_percent"]/100));
      let loan_amount = elm["price"] - down_payment_amount;
      let monthly_interest_rate = elm["intrest_rate"]/1200;
      let month_count = elm["tenure_in_months"];
      let monthly_mortigage_payment = loan_amount * ((monthly_interest_rate * ((1 + monthly_interest_rate) ** month_count)) / (((1 + monthly_interest_rate) ** month_count) - 1));
      
      var result = [];
      for(let i=0; i<(month_count); i++) {
        
        let outstanding_loan_amount = loan_amount;
        let monthly_interest_paid = outstanding_loan_amount * monthly_interest_rate;
        let cumulative_interest_paid = monthly_interest_paid;
        let monthly_principal_paid = monthly_mortigage_payment - monthly_interest_paid;
        let cumulative_principal_paid = monthly_principal_paid;
        
        if (i > 0 && result.length > 0) {
          outstanding_loan_amount = result[result.length-1]["outstanding_loan_amount"] - result[result.length-1]["monthly_principal_paid"];
          monthly_interest_paid = outstanding_loan_amount * monthly_interest_rate;
          cumulative_interest_paid = monthly_interest_paid + result[result.length-1]["cumulative_interest_paid"];
          monthly_principal_paid = monthly_mortigage_payment - monthly_interest_paid;
          cumulative_principal_paid = monthly_principal_paid + result[result.length-1]["cumulative_principal_paid"];
        }
  
        let equity = (((down_payment_amount + cumulative_principal_paid) * 100) / elm["price"])
  
        let amMothlyUnit = {
          "month_number": i+1,
          "year": Math.floor((i+1)/12)+1,
          "outstanding_loan_amount": outstanding_loan_amount,
          "monthly_interest_paid": monthly_interest_paid,
          "cumulative_interest_paid": cumulative_interest_paid,
          "monthly_principal_paid": monthly_principal_paid,
          "cumulative_principal_paid": cumulative_principal_paid,
          "equity": equity
        }
  
        result.push(amMothlyUnit)
      }
      return result;
    });
    console.log(amortizedData)
    return amortizedData;
  } 