import {useState} from "react";
import {ProblemsEngine} from "../engine/ProblemsEngine";
import {timesTableNumbers} from "../../PracticeMaths";

export type SetProblemCallback = (problem: ProblemsEngine) => void;
export type SetProblemArgs = {
  operator: string;
  callBack: SetProblemCallback;
  level?: number;
  fixedNumber?: number;
  sequenceNumber?: number;
  sequence?: number[];

};
export const DEFAULT_SEQUENCE = [0,1,2,3,4,5,6,7,8,9,10,11,12];
export const useMathDevice = () => {
  const [doDivision, setDoDivision] = useState(false);
  const [doAddition, setDoAddition] = useState(false);
  const [operator, setOperator] = useState('x')
  const currentOperator = (doAddition ? doDivision ? '-' : '+' : doDivision ? '÷' : 'x');
  const [firstNumber, setFirstNumber] = useState(-1);
  const [secondNumber, setSecondNumber] = useState(1);
  const problem = new ProblemsEngine({firstNumber, secondNumber, operator: currentOperator});

  const setProblem = ({operator, callBack, fixedNumber=-1, sequenceNumber=-1, sequence=DEFAULT_SEQUENCE}: SetProblemArgs) => {
    const {firstNumber, secondNumber} = timesTableNumbers();
    let actual1stNumber = firstNumber;
    let actual2ndNumber = secondNumber;

    if (fixedNumber !== -1 && sequenceNumber > -1) {
      if (Math.random() > 0.5) {
        actual2ndNumber = fixedNumber;
        actual1stNumber = getSequenceNumber(sequenceNumber,sequence);
      } else {
        actual1stNumber = fixedNumber;
        actual2ndNumber = getSequenceNumber(sequenceNumber,sequence);
      }
    }

    setFirstNumber(actual1stNumber);
    setSecondNumber(actual2ndNumber);

    callBack(new ProblemsEngine({firstNumber: actual1stNumber, secondNumber: actual2ndNumber, operator}));
  }

  const setOperatorFn = (operator: string) => {
    setOperator(operator);
    switch (operator) {
      case '+':
        setDoAddition(true);
        setDoDivision(false);
        break;
      case '-':
        setDoAddition(true);
        setDoDivision(true);
        break;
      case 'x':
        setDoAddition(false);
        setDoDivision(false);
        break;
      case '÷':
        setDoAddition(false);
        setDoDivision(true);
        break;
    }

  }

  return {
    setDoDivision,
    setDoAddition,
    currentOperator,
    operator,
    firstNumber,
    secondNumber,
    problem,
    setProblem,
    setOperator: setOperatorFn
  }
}

const getSequenceNumber = (sequenceNumber: number, sequence: number[]): number => {
  return sequenceNumber >= sequence.length ? sequenceNumber : sequence[sequenceNumber];
}
