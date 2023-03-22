import {useContext} from "react";
import {StarMathsContext} from "../contexts/StarMathsContext";
import TerminalOutput from "../../components/TerminalOutput";
import {ProblemsEngine} from "../../engine/ProblemsEngine";

export const PromptAndResponse = () => {
  const { outputLog } = useContext(StarMathsContext);
  // const problem = new ProblemsEngine({firstNumber, secondNumber, operator: currentOperator});

  console.log({outputLog});
  return <>
    <TerminalOutput lines={outputLog} />
  </>;
}
