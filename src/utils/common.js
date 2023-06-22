export const sampleEveryNthItem = (arr, n) => {
  const samples = [];
  for (let i = n - 1; i < arr.length; i += n) {
    samples.push(arr[i]);
  }
  return samples;
}

export const convertToTitleCase = (str) => {
  let titleCaseStr = "";
  let arr = str.split("_"); // Split the string into an array at the underscore character
  for (let i = 0; i < arr.length; i++) {
    let word = arr[i];
    titleCaseStr += word.charAt(0).toUpperCase() + word.slice(1) + " "; // Capitalize the first character of each word in the array and add a space
  }
  return titleCaseStr.trim(); // Remove the trailing space and return the result
}

const usedColors = [];
export const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  do {
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
  } while (usedColors.includes(color));
  usedColors.push(color);
  return color;
}

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

export const customChartFormatter = (key, value) => {
  switch(key) {

    case "home_value_after_appriciation":
    case "outstanding_loan_amount":
    case "monthly_interest_paid":
    case "cumulative_interest_paid":
    case "monthly_principal_paid":
    case "cumulative_principal_paid":
    case "equity_value":
    case "equity_value_after_appriciation":
    case "value_earned":
    case "cumulative_costs":
    case "cost_of_investment":
    case "net_income":
      return [formatNumber(value), convertToTitleCase(key)];
    case "equity": 
    return [value + "%", convertToTitleCase(key)];
    case "month_number":
    case "year":
      return [value, convertToTitleCase(key)];
  }

} 

