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

