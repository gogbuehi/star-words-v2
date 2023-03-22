import {LineItem, matchLastCharacter} from "../MathDevice";
import {useState} from "react";
export type AddLineArgs = {
  line: string;
  minusLine?: boolean;
  isAnswer?: boolean;
  isCorrect?: boolean;
}
export const useTextInput = () => {
  const outputInitialState: LineItem[] = [];
  const [outputLog, setOutputLog] = useState(outputInitialState);
  const addLineFn = (args: AddLineArgs) => {
    const { line, minusLine=false, isAnswer=false, isCorrect=true } = args;
    // if (!isAnswer) {
    //   console.log(normaliseLineText(line.toLowerCase()));
    //   setTextToRead(numberText, normaliseLineText(line.toLowerCase()));
    // }

    setOutputLog((prevLines: LineItem[]) => {
      const lastLine = prevLines[0] || {line: '', color: false};
      if(lastLine.line === line) return prevLines;
      const minusAnyway = matchLastCharacter(lastLine.line, '~') || matchLastCharacter(lastLine.line, '>');
      const linesToUse = minusAnyway ? prevLines.splice(1) : prevLines;
      return [{line, color: isCorrect}, ...linesToUse]
    });
  };

  return {
    outputLog,
    addLine: addLineFn
  }
}
