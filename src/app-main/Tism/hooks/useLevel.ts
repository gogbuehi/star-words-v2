import {useState} from "react";
import {generateRandomSequenceUpTo} from "../../PracticeMaths";

export const MAX_LEVEL = 3;
export const MAX_NUMBER = 12;
export const useLevel = () => {
  const [level, setLevel] = useState(0);
  const [fixedNumber, setFixedNumber] = useState(-1);
  const [sequenceNumber, setSequenceNumber] = useState(0);
  const [sequence, setSequence] = useState(generateRandomSequenceUpTo(MAX_NUMBER));

  const setLevelFn = (level: number): void => {
    const actualLevel = oneToZero(level, MAX_LEVEL);
    if (actualLevel === 0) {
      setNumberFn(zeroToOne(fixedNumber)+1);
    }
    setLevel(oneToZero(level, MAX_LEVEL));
  }
  const nextLevel = () => {
    setLevelFn(zeroToOne(level)+1);
  }
  const setNumberFn = (number: number): void => {
    // Does number ever influence level?
    // if (number === MAX_NUMBER) {
    //   nextLevel();
    //   return;
    // }
    if (number === -1) return;
    setFixedNumber(oneToZero(number, MAX_NUMBER));
  }
  return {
    fixedNumber: zeroToOne(fixedNumber),
    setFixedNumber: setNumberFn,
    level: zeroToOne(level),
    setLevel: setLevelFn,
    sequenceNumber,
    setSequenceNumber,
    sequence
  }

}

const oneToZero = (one: number, mod: number): number => {
  return ((one-1)%(mod));
}

const zeroToOne = (zero: number): number => {
  if (zero < 0) return zero;
  return zero+1;
}
