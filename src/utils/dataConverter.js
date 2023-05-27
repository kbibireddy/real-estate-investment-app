export const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  
export const formatNumber = (num) => {
    if (num >= 1000 && num < 1000000) {
        return "$" + numberWithCommas((num / 1000).toFixed(1)) + "K";
    } else if (num >= 1000000) {
        return "$" + numberWithCommas((num / 1000000).toFixed(1)) + "M";
    } else {
        return "$" + num;
    }
}

export const toPercentageString = (num) => {
    return num + "%";
}  