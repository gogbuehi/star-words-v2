import {NumCell, NumRowCell, NumTable} from "../layout/NumberInput.layout";
import {useContext} from "react";
import {StarMathsContext} from "../contexts/StarMathsContext";
import {ProblemsEngine} from "../../engine/ProblemsEngine";
import {MAX_LEVEL, MAX_NUMBER} from "../../hooks/useLevel";
import {DEFAULT_SEQUENCE} from "../../hooks/useMathDevice";
import {OperatorInput} from "./OperatorInput";

export const NumberInput = () => {
  const {
    currentOperator, operator, setOperator,
    fixedNumber, setFixedNumber,
    sequence, sequenceNumber, setSequenceNumber,
    level,
    setLevel,
    answerText, setAnswerText,
    problem, setProblem,
    addLine,
    rightCount, setRightCount, saveStars, mathsRecord,
    theme
  } = useContext(StarMathsContext);

  const problemCallback = (problem: ProblemsEngine) => {
    addLine({line: problem.toString()});
  }
  const clickMethod = (val: string) => () => {
    switch (val) {
      case '-':
        if (answerText.length > 0) {
          setAnswerText(answerText.substring(0, answerText.length - 1));
        }
        break;
      case '':
        if (operator === '#') {
          setAnswerText('');
          setFixedNumber(parseInt(answerText) || 2);
          setOperator(currentOperator);
          const nextSequenceNumber = sequenceNumber !== -1 ? 0  :sequenceNumber;
          setSequenceNumber(nextSequenceNumber);
          setProblem({operator: currentOperator, fixedNumber: parseInt(answerText) || 2, sequenceNumber: 0, callBack: problemCallback})
          setLevel(1);
          return;
        }
        if (problem.evaluateProblem() === -1) {
          // FIXME: Get callback in place
          setProblem({operator: currentOperator, callBack: problemCallback});
        }
        if (answerText === '') {
          return;
        }
        mathsRecord.recordResponse(problem, parseInt(answerText));
        if (problem.checkAnswer(answerText)) {
          addLine({line: problem.toAnswerString()});
          const nextSequenceNumber = sequenceNumber !== -1 ? (sequenceNumber+1)%(MAX_NUMBER+1) : sequenceNumber;
          let currentLevel = level;
          let currentFixedNumber = fixedNumber;
          if (sequenceNumber === MAX_NUMBER) {
            const nextLevel = (level + 1)%(MAX_LEVEL+1);
            setLevel(nextLevel || 1);
            saveStars(rightCount+1);
            currentLevel = nextLevel || 1;
            if (level === MAX_LEVEL) {
              currentFixedNumber = fixedNumber+1;
              setFixedNumber(currentFixedNumber);
            }
          }
          setSequenceNumber(nextSequenceNumber);
          const sequenceToUse = currentLevel > 1 ? sequence : DEFAULT_SEQUENCE;
          setProblem({
            operator: currentOperator,
            callBack: problemCallback,
            fixedNumber: currentFixedNumber,
            sequenceNumber: nextSequenceNumber,
            sequence: sequenceToUse
          });
          setAnswerText('');
          setRightCount(rightCount+1);
        } else {
          // addLine({line: problem.toString()});
          addLine({line: problem.toSubmissionString(answerText), isCorrect: false});
          setAnswerText('');
          if (rightCount > 0) {
            setRightCount(rightCount-1);
          }
        }
        // switch (outputState) {
        //   case '+':
        //   case '-':
        //   case 'x':
        //   case '÷':
        //     checkTheAnswer(problem, answerText);
        //     break;
        //   case 'Number':
        //     setLevelAndProblems(level, currentOperator, parseInt(answerText) || -1)();
        //     break;
        //   case 'Level':
        //     setLevelAndProblems(parseInt(answerText) || 1, currentOperator)();
        //     break;
        //   default:
        //     if (numberText === '' && answerText === '') {
        //       addLine({
        //         line: problem.toString()
        //       });
        //       return;
        //     }
        //     console.log('I have no idea...');
        // }
        console.log('GO');
        break;
      default:
        setAnswerText(answerText + val);
        // const updatedNumberText = (answerText + a);
        // const text = convertNumberToEnglish2(updatedNumberText);
        // setNumberText(text);
        // setNumberTextIndex(0);
        // console.log(text);
    }
  };
  return (<NumTable>
    <tbody>
    <tr>
      <NumRowCell colSpan={3}><OperatorInput/></NumRowCell>
    </tr>
    <tr>
      {[7, 8, 9].map((num) => (
        <NumCell
          key={`${num}`}
          theme={theme} onClick={clickMethod(`${num}`)}>{num}</NumCell>
      ))}
    </tr>
    <tr>
      {[4, 5, 6].map((num) => (
        <NumCell
          key={`${num}`}
          theme={theme} onClick={clickMethod(`${num}`)}>{num}</NumCell>
      ))}
    </tr>
    <tr>
      {[1, 2, 3].map((num) => (
        <NumCell
          key={`${num}`}
          theme={theme} onClick={clickMethod(`${num}`)}>{num}</NumCell>
      ))}
    </tr>
    <tr>
      {['-', '0', ''].map((num) => (
        <NumCell
          key={`${num}`}
          theme={theme} onClick={clickMethod(`${num}`)}>{num === '-' ? '<' : num || 'GO'}</NumCell>
      ))}
    </tr>
    </tbody>
  </NumTable>);
}


