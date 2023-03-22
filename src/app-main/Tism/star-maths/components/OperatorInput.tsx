import {NumCell, NumTable} from "../layout/NumberInput.layout";
import {useContext} from "react";
import {StarMathsContext} from "../contexts/StarMathsContext";
import {ProblemsEngine} from "../../engine/ProblemsEngine";

export const OperatorInput = () => {
  const {setOperator, currentOperator, setProblem, addLine, fixedNumber} = useContext(StarMathsContext);
  const displayFixedNumber = fixedNumber === -1 ? '--' : fixedNumber;

  const problemCallback = (problem: ProblemsEngine) => {
    console.log({problem});
    addLine({line: problem.toString()});
  }
  const clickMethod = (operator: string) => () => {
    setOperator(operator);
    if (operator === '#') {
      addLine({line: 'Enter number:'});
      return;
    }
    setProblem({operator, callBack: problemCallback, fixedNumber});
  }


  const operatorStrings = new Map([
    ['+','+'],
    ['-','-'],
    ['x','x'],
    ['÷','÷'],
    ['#','#']
  ]);

  const displayOperator = (op: string): string => {
    if (op === currentOperator) {
      return operatorStrings.has(op) ? `[${operatorStrings.get(op)}]` : 'error';
    }
    return operatorStrings.has(op) ? `${operatorStrings.get(op)}` : 'error';
  }
  return (<NumTable>
    <tbody>
    <tr>
      <NumCell onClick={clickMethod('+')}>{displayOperator('+')}</NumCell>
      <NumCell onClick={clickMethod('-')}>{displayOperator('-')}</NumCell>
    </tr>
    <tr>
      <NumCell onClick={clickMethod('x')}>{displayOperator('x')}</NumCell>
      <NumCell onClick={clickMethod('÷')}>{displayOperator('÷')}</NumCell>
    </tr>
    <tr>
      <NumCell onClick={clickMethod('#')}>{displayOperator('#')}:{displayFixedNumber}</NumCell>
      <NumCell onClick={clickMethod('÷')}>{displayOperator('÷')}</NumCell>
    </tr>
    </tbody>
  </NumTable>);

}
