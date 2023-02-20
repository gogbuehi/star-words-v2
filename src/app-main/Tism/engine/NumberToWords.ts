const ONES = 'ones';
const TENS = 'tens';
const TEENS = 'teens';
const HUNDREDS = 'hundred';
const THOUSANDS = 'thousand';
const MILLIONS = 'million';
const BILLIONS = 'billion';
const TRILLIONS = 'trillion';
const QUADRILLIONS = 'quadrillion';
const QUINTILLIONS = 'quintillion';
const TILLION_06 = 'sextillion';
const TILLION_07 = 'septillion';
const TILLION_08 = 'octillion';
const TILLION_09 = 'nonillion';
const TILLION_10 = 'decillion';
const TILLION_11 = 'undecllion';
const TILLION_12 = 'duodecillion';
const TILLION_13 = 'tredecillion';
const TILLION_14 = 'quattuordecillion';
const TILLION_15 = 'quindecillion'
const TILLION_16 = 'sexdecillion';
const TILLION_17 = 'septendecillion';
const TILLION_18 = 'octodecillion';
const TILLION_19 = 'novemdecillion';
const TILLION_20 = 'vigintillion';
const MAP_OF_NUMBER_STRINGS = new Map([
  [ONES, ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']],
  [TENS, ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']],
  [TEENS, ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']],
]);

const TRI_ARRAY_BASE = [
  '',
  THOUSANDS,
  MILLIONS,
  BILLIONS,
  TRILLIONS,
  QUADRILLIONS,
  QUINTILLIONS,
  TILLION_06,
  TILLION_07,
  TILLION_08,
  TILLION_09,
  TILLION_10,
  TILLION_11,
  TILLION_12,
  TILLION_13,
  TILLION_14,
  TILLION_15,
  TILLION_16,
  TILLION_17,
  TILLION_18,
  TILLION_19,
  TILLION_20
];
export const convertNumberToEnglish2 = (number: string): string => {
  if (number === '0') return 'zero';
  if (number === '') return '';
  const reversedNumber = reverseString(number);
  const triDigitsArray = [];
  let currentTriDigits = reversedNumber.substring(0, 3);
  for (let i = 0, j = 0; currentTriDigits !== ''; i = i +  3, j++) {
    currentTriDigits = reversedNumber.substring(i, i+3)
    const triDigitsString = processTriDigits(currentTriDigits);
    if (triDigitsString) triDigitsArray.push(triDigitsString + (TRI_ARRAY_BASE[j] ? ' ' + TRI_ARRAY_BASE[j] : ''));
  }
  return triDigitsArray.reverse().join(' ');
}
const processTriDigits = (triDigits: string): string => {
  const ones = triDigits.charAt(0);
  const onesNumeral = parseInt(ones);
  const tens = triDigits.charAt(1);
  const tensNumeral = parseInt(tens) || 0;
  const hundreds = triDigits.charAt(2);
  const hundredsNumeral = parseInt(hundreds) || 0;

  let onesOutput, tensOutput, hundredsOutput;
  onesOutput = tens === '1' ? getDigitString(TEENS, onesNumeral) : getDigitString(ONES, onesNumeral);
  tensOutput = tens === '1' ? '' : getDigitString(TENS, tensNumeral);
  hundredsOutput = hundredsNumeral ? getDigitString(ONES, hundredsNumeral) + ' hundred' : '';

  const triArray = [];
  if (hundredsOutput) triArray.push(hundredsOutput);
  if (tensOutput) triArray.push(tensOutput);
  if (onesOutput) triArray.push(onesOutput);

  return triArray.length ? triArray.join(' ') : '';
}

type GetDigitStringKeys = typeof ONES | typeof TENS | typeof TEENS;
const getDigitString = (key: GetDigitStringKeys, index: number): string => {
  if(!MAP_OF_NUMBER_STRINGS.has(key)) {
    throw new Error(`Cannot get digit string for: ${key}`);
  }
  const stringsArray = MAP_OF_NUMBER_STRINGS.get(key);
  if (!stringsArray) {
    throw new Error('THIS WILL NEVER HAPPEN');
  }
  return stringsArray[index];

}
const reverseString = (inputString: string): string => {
  let reversedString = '';

  for (let i = inputString.length - 1; i >= 0; i--) {
    reversedString += inputString[i];
  }

  return reversedString;
};
