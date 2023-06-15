import {NumCell, NumTable} from "../layout/NumberInput.layout";
import {useContext} from "react";
import {StarMathsContext} from "../contexts/StarMathsContext";
import {ProblemsEngine} from "../../engine/ProblemsEngine";
const FRACTION_LABEL = '½…';
export const OperatorInput = () => {
  const {setOperator, currentOperator, setProblem, addLine, fixedNumber, setNav} = useContext(StarMathsContext);

  const problemCallback = (problem: ProblemsEngine) => {
    addLine({line: problem.toString()});
  }
  const clickMethod = (operator: string) => () => {
    if (operator === '←') {
      console.log('SET NAV');
      setNav('Nav');
      return;
    }
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
    [FRACTION_LABEL,FRACTION_LABEL],
    ['%','%'],
    ['#','#'],
    ['←','←']
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
      {Array.from(operatorStrings.keys()).map((operatorKey) => {
        return <NumCell key={operatorKey} onClick={clickMethod(operatorKey)}>{displayOperator(operatorKey)}</NumCell>
      })}
    </tr>

    {/*</tr>*/}
    </tbody>
  </NumTable>);

}
