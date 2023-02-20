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
// const ARRAY_BASE = [
//   [ONES],
//   [TENS],
//   [ONES,HUNDREDS],
//   [ONES, THOUSANDS],
//   [TENS],
//   [ONES, HUNDREDS],
//   [ONES, MILLIONS],
//   [TENS],
//   [ONES, HUNDREDS],
//   [ONES, BILLIONS],
//   [TENS],
//   [ONES, HUNDREDS],
//   [ONES, TRILLIONS],
//   [TENS],
//   [ONES, HUNDREDS],
//   [ONES, QUADRILLIONS],
//   [TENS],
//   [ONES, HUNDREDS],
//   [ONES, QUINTILLIONS],
//   [TENS],
//   [ONES, HUNDREDS],
//   [ONES, QUINTILLIONS],
//   [TENS],
//   [ONES, HUNDREDS],
//   [ONES, TILLION_06],
//   [TENS],
//   [ONES, HUNDREDS],
//   [ONES, TILLION_07],
//   [TENS],
//   [ONES, HUNDREDS],
//   [ONES, TILLION_08],
//   [TENS],
//   [ONES, HUNDREDS],
//   [ONES, TILLION_09],
//   [TENS],
//   [ONES, HUNDREDS],
//   [ONES, TILLION_10],
//   [TENS],
//   [ONES, HUNDREDS],
//   [ONES, TILLION_11],
//   [TENS],
//   [ONES, HUNDREDS],
//   [ONES, TILLION_12],
//   [TENS],
//   [ONES, HUNDREDS],
//   [ONES, TILLION_13],
//   [TENS],
//   [ONES, HUNDREDS],
//   [ONES, TILLION_14],
//   [TENS],
//   [ONES, HUNDREDS],
//   [ONES, TILLION_15],
//   [TENS],
//   [ONES, HUNDREDS],
//   [ONES, TILLION_16],
//   [TENS],
//   [ONES, HUNDREDS],
//   [ONES, TILLION_17],
//   [TENS],
//   [ONES, HUNDREDS],
//   [ONES, TILLION_18],
//   [TENS],
//   [ONES, HUNDREDS],
//   [ONES, TILLION_19],
//   [TENS],
//   [ONES, HUNDREDS],
//   [ONES, TILLION_20],
//   [TENS],
//   [ONES, HUNDREDS],
//
// ];
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
// export const  convertNumberToEnglishText = (number: string): string => {
//   const reversedNumber = reverseString(number);
//   const textArray = [];
//   if (reversedNumber.length > ARRAY_BASE.length) {
//     return 'A really big number';
//   }
//   for(let i = 0; i < reversedNumber.length && i < ARRAY_BASE.length; i++) {
//     const currentDigit = reversedNumber.charAt(i);
//     const stringsToUse = ARRAY_BASE[i];
//     for(let j = stringsToUse.length-1; j > -1; j--) {
//       const key = stringsToUse[j];
//       if (MAP_OF_NUMBER_STRINGS.has(key)) {
//         const numString = MAP_OF_NUMBER_STRINGS.get(key) || ['boom'];
//         let lowerZeroes = true;
//         if (i%3) {
//           for(let k = 1; k < ((i%3)+1); k++) {
//             if (reversedNumber.charAt(i-k) !== '0') {
//               lowerZeroes = false;
//               break;
//             }
//           }
//           if (currentDigit !== '0' && lowerZeroes && ARRAY_BASE[(i-i%3)][1]) {
//             textArray.unshift(ARRAY_BASE[(i-i%3)][1]);
//           }
//
//         }
//
//         if (numString[parseInt(currentDigit) || 0] !== '') {
//           textArray.push(numString[parseInt(currentDigit) || 0]);
//         }
//
//       } else if (currentDigit !== '0') {
//         //console.log({otherProblem: key});
//         textArray.push(key);
//       }
//     }
//   }
//   return textArray.reverse().join(' ');
// }

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
