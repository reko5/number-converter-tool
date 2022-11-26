const ones = [
  "",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
const tens = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];
const teens = [
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];

export function convertToString(number) {
  const numberAsString = number.toString();

  if (numberAsString[0] === "-") {
    let absNumber = numberAsString.slice(1, numberAsString.length);

    return "minus " + convertBillions(Number(absNumber) % 1000000000000);
  }

  if (number < 1 && number > -1) return "zero";
  else return convertBillions(number);
}

function convertBillions(number) {
  if (number >= 1000000000 && number % 10000000000 === 0) {
    return (
      convertBillions(Math.floor(number / 1000000000)) +
      " billion" +
      convertMillions(number % 1000000000)
    );
  } else if (number >= 1000000000 && number % 1000000000 < 100000000) {
    return (
      convertBillions(Math.floor(number / 1000000000)) +
      " billion and " +
      convertMillions(number % 1000000000)
    );
  } else if (number >= 1000000000 && number % 1000000000 < 1000000000) {
    return (
      convertBillions(Math.floor(number / 1000000000)) +
      " billion " +
      convertMillions(number % 1000000000)
    );
  } else {
    return convertMillions(number);
  }
}

function convertMillions(number) {
  if (number >= 1000000 && number % 1000000 === 0) {
    return (
      convertMillions(Math.floor(number / 1000000)) +
      " million" +
      convertThousands(number % 1000000)
    );
  } else if (number >= 1000000 && number % 1000000 < 100000) {
    return (
      convertMillions(Math.floor(number / 1000000)) +
      " million and " +
      convertThousands(number % 1000000)
    );
  } else if (number >= 1000000 && number % 1000000 < 1000000) {
    return (
      convertMillions(Math.floor(number / 1000000)) +
      " million " +
      convertThousands(number % 1000000)
    );
  } else {
    return convertThousands(number);
  }
}

function convertThousands(number) {
  if (number > 1100 && number < 2000) {
    // That "if" for the "british english" between 1100 and 2000.
    return (
      teens[Math.floor(number / 100 - 10)] +
      " hundred and " +
      convertTens(number % 100)
    );
    // 1000 to 1100 left out, because british people only use that style for years/dates in that interval and not for standard numbers.
  } else if (number >= 1000 && number % 1000 === 0) {
    return (
      convertThousands(Math.floor(number / 1000)) +
      " thousand" +
      convertHundreds(number % 1000)
    );
  } else if (number >= 1000 && number % 1000 < 100) {
    return (
      convertThousands(Math.floor(number / 1000)) +
      " thousand and " +
      convertHundreds(number % 1000)
    );
  } else if (number >= 1000 && number % 1000 < 1000) {
    return (
      convertThousands(Math.floor(number / 1000)) +
      " thousand " +
      convertHundreds(number % 1000)
    );
  } else {
    return convertHundreds(number);
  }
}

function convertHundreds(number) {
  if (number >= 100 && number % 100 !== 0) {
    return (
      ones[Math.floor(number / 100)] +
      " hundred and " +
      convertTens(number % 100)
    );
  } else if (number > 99) {
    return (
      ones[Math.floor(number / 100)] + " hundred" + convertTens(number % 100)
    );
  } else {
    return convertTens(number);
  }
}

function convertTens(number) {
  if (number < 10) return ones[number];
  else if (number >= 10 && number < 20) return teens[number - 10];
  else if (number % 10 === 0) return tens[number / 10];
  else {
    return tens[Math.floor(number / 10)] + "-" + ones[number % 10];
  }
}
