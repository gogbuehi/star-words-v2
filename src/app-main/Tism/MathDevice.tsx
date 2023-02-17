import {NumPad} from "../components/NumPad";
import {
  CorrectBoxContainer,
  DeviceContainer,
  DeviceHeading, FixedNumberBox,
  LeftBox, LevelBox,
  MathBox, MathBoxButton,
  OutputBox, OutputEntry, OutputEntryPast,
  OutputSection, SelectedMathBox,
  SpeakerBox,
  TimerBox, TryAgainOutputBox
} from "./TismStyled";
import {SimplifiedTimer} from "./SimplifiedTimer";
import {useState} from "react";
import FractionCircle from "./components/FractionCircle";
import {ProblemsEngine} from "./engine/ProblemsEngine";
import {generateRandomSequenceUpTo, timesTableNumbers} from "../PracticeMaths";
import TerminalOutput from "./components/TerminalOutput";
import {TimesTable} from "../../TimesTable";
import CorrectBox from "./components/CorrectBox";
const MAX_SEQUENCE = 12;
const FRACTION_LABEL = '½,⅓,⅗,...';
const MathDevice = () => {
  const [doDivision, setDoDivision] = useState(false);
  const [doAddition, setDoAddition] = useState(false);
  const currentOperator = (doAddition ? doDivision ? '-' : '+' : doDivision ? '÷' : 'x');
  const [firstNumber, setFirstNumber] = useState(1);
  const [secondNumber, setSecondNumber] = useState(2);
  const [level, setLevel] = useState(1);
  const [outputState, setOutputState] = useState(currentOperator);
  const problem = new ProblemsEngine({firstNumber, secondNumber, operator: currentOperator});
  const [answerText, setAnswerText] = useState('');

  const [fixedNumber, setFixedNumber] = useState(-1);
  const [sequenceNumber, setSequenceNumber] = useState(0);
  const [sequence, setSequence] = useState(generateRandomSequenceUpTo(MAX_SEQUENCE));
  const [outputLog, setOutputLog] = useState([problem.toString()]);

  const [isCorrect, setIsCorrect] = useState(false);

  const [rightCount, setRightCount] = useState(0);

  const offset = fixedNumber > -1 ? fixedNumber - 1 : 0;

  const setCorrectState = (isCorrect: boolean) => {
    // setIsSubmitting(true);
    setIsCorrect(isCorrect);
  }

  const setOperator = (operator: string) => {
    switch(operator) {
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

  const setLevelAndProblems = (level: number, operator: string, fixedNumber=-1) => () => {
    if (level < 1 || level > 4) return;
    const fixedNumberString = fixedNumber === -1 ? 'random' : fixedNumber;
    addLine(`Level set to ${level}; Number set to ${fixedNumberString}`, true)
    console.log({level, operator, fixedNumber});
    setLevel(level);
    const actualFixedNumber = fixedNumber === -1 ? 2 : fixedNumber;
    setFixedNumber(actualFixedNumber);
    setSequenceNumber(0);
    setOutputState(operator);
    setProblem(actualFixedNumber, 0, level, operator)();
  }

  const setProblem = (actualFixedNumber: number, sequenceNumber: number, level: number, operator: string) =>  () => {
    console.log(`setting problem... ${actualFixedNumber} ${sequenceNumber} ${level} ${operator}`)
    const {firstNumber, secondNumber} = timesTableNumbers();
    let actual1stNumber = firstNumber;
    let actual2ndNumber = secondNumber;
    if (actualFixedNumber !== -1) {
      switch(level) {
        case 1:
          if (Math.random() > 10.5) {
            actual2ndNumber = actualFixedNumber;
            actual1stNumber = sequenceNumber;
          } else {
            actual1stNumber = actualFixedNumber;
            actual2ndNumber = sequenceNumber;
          }
          setSequenceNumber(sequenceNumber+1);
          break;
        case 2:
        case 3:
        case 4:
          actual1stNumber = actualFixedNumber;
          actual2ndNumber = sequenceNumber < MAX_SEQUENCE ? sequence[sequenceNumber] : sequenceNumber;
          setSequenceNumber(sequenceNumber+1);
          break;
      }

    }
    setFirstNumber(actual1stNumber);
    setSecondNumber(actual2ndNumber);
    const p = new ProblemsEngine({firstNumber:actual1stNumber, secondNumber: actual2ndNumber, operator})
    addLine(p.toString());
    setAnswerText('');
    // setTimeLeft(30);
    // setProblemNumber(problemNumber+1);
    // setIsCorrect(false);
    // setIsSubmitting(level < 3);
  }
  const checkTheAnswer = (answerText: string) => {
    // if (isCorrect || answerText === '') {
    //   break;
    // }
    // submit answer
    // setAttemptedCount(attemptedCount+1);
    if (problem.checkAnswer(answerText)) {
      // const timeToSolve = timeLeft - Math.floor((endTime - (new Date().getTime()))/1000);
      // setLastTime(timeToSolve);
      // if (attemptedCount === 0) {
      //   setAvgTime(timeToSolve);
      // } else {
      //   if (timeToSolve > avgTime) {
      //     console.log("Slower than average");
      //   } else {
      //     console.log("Doing great!");
      //   }
      //   const updatedAvgTime = ((attemptedCount) * avgTime + timeToSolve)/(attemptedCount+1);
      //   setAvgTime(updatedAvgTime);
      //
      // }
      // console.log("CORRECT", avgTime, timeToSolve);
      setCorrectState(true);
      setRightCount(rightCount +1);
      addLine(problem.toAnswerString(), true);
      setTimeout(setProblem(fixedNumber, sequenceNumber, level, currentOperator), 1000);
    } else {
      console.log(`INCORRECT: ${answerText}`);
      setCorrectState(false);
    }
  }
  const inputCallback = (a:string) => {
    switch(a) {
      case '-':
        if (answerText.length > 0) {
          setAnswerText(answerText.substring(0, answerText.length-1));
        }
        break;
      case '':
        switch(outputState) {
          case '+':
          case '-':
          case 'x':
          case '÷':
            checkTheAnswer(answerText);
            break;
          case 'Number':
            setLevelAndProblems(level, currentOperator, parseInt(answerText) || -1)();
            break;
          case 'Level':
            setLevelAndProblems(parseInt(answerText) || 1, currentOperator)();
            break;
          default:
            console.log('I have no idea...');
        }
        break;
      default:
        setAnswerText(answerText + a);
    }

  }
  // 0123456789 + - x ÷ = . % &gt; &lt; ?
  let currentOutput = '';
  switch(outputState) {
    case '+':
    case '-':
    case 'x':
    case '÷':
      currentOutput = problem.toString();
      break;
    case 'Number':
      currentOutput = 'Enter a number';
      break;
    case 'Level':
      currentOutput = 'Enter level: 1 2 3 4';
      break;
    default:
      currentOutput = 'Hello';
  }
  const addLine = (line: string, minusLine=false) => {
    setOutputLog((prevLines) => {
      const linesToUse = minusLine ? prevLines.splice(1) : prevLines;
      return [line, ...linesToUse]
    });
  };
  const InputComponent = isCorrect ? OutputBox : TryAgainOutputBox;
  return (<DeviceContainer>
    {/*<DeviceHeading>Math Device</DeviceHeading>*/}
    <OutputSection>
      <LevelBox>Level: {level}</LevelBox>
      <FixedNumberBox>#: {fixedNumber===-1 ?'Random' : fixedNumber}</FixedNumberBox>
      <CorrectBoxContainer><CorrectBox rightCount={rightCount} /></CorrectBoxContainer>
      <TimerBox><SimplifiedTimer timeInSeconds={30} problemNumber={1} storeEndTime={(timeLeft:number) => {}} /></TimerBox>
    </OutputSection>
    <OutputSection>
      {/*<SpeakerBox>Speaker</SpeakerBox>*/}
      <LeftBox>
        {['Number', 'Level'].map((operator, index) => {
          const NumBox = (operator === outputState) ? SelectedMathBox : MathBoxButton;
          return (
            <NumBox key={index}
                    onClick={() => {
                      setOutputState(operator);
                      addLine(`Enter ${operator} -->`, true);
                    }
                      // setLevelAndProblems(num, fixedNumber)
                    }

            >{operator}</NumBox>)
        })}
        {['+', '-', 'x', '÷', FRACTION_LABEL].map((operator, index) => {
          const NumBox = (operator === outputState) ? SelectedMathBox : MathBoxButton;
          return (
            <NumBox key={index}
                    onClick={() => {
                      setProblem(fixedNumber, 0, level, operator)();
                      setOperator(operator);
                      setOutputState(operator);

                    }
                      // setLevelAndProblems(num, fixedNumber)
                    }

            >{operator}</NumBox>)
        })}
      </LeftBox>
      <OutputBox>
      <TerminalOutput lines={outputLog} />
      </OutputBox>
      {/*<OutputBox>*/}
      {/*  {outputLog.reverse().map((outputEntry, index) => {*/}
      {/*    const OutputComponent = index === 0 ? OutputEntry : OutputEntryPast;*/}
      {/*    return <OutputComponent>| {outputEntry}</OutputComponent>;*/}
      {/*  })}*/}

      {/*</OutputBox>*/}
      <InputComponent>&gt; {answerText}</InputComponent>
    </OutputSection>
    <MathBox><FractionCircle radius={100} divisions={9} activeIndex={0} /></MathBox>
    <MathBox><NumPad pressCallback={inputCallback} /></MathBox>
    {!doAddition && offset > 0 || (level < 3)?<MathBox> <TimesTable pixels={20} offset={offset}/> </MathBox>: ''}

  </DeviceContainer>)
}

export default MathDevice;
