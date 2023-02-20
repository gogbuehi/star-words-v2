import {NumPad} from "../components/NumPad";
import {
  CorrectBoxContainer, DeviceContainer,
  LeftBox, LevelBox, MathBox, MathBoxButton, OutputBox, OutputSection, SelectedMathBox,
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
import {convertNumberToEnglish2} from "./engine/NumberToWords";
import Speaker from "./components/Speaker";

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
  const [attemptedCount, setAttemptedCount] = useState(0);
  const [rightCount, setRightCount] = useState(0);

  const [numberText, setNumberText] = useState('');
  const [numberTextIndex, setNumberTextIndex] = useState(0);

  const numberTextArray = numberText.split(' ');
  const audioFile = numberTextArray[numberTextIndex];

  const offset = fixedNumber > -1 ? fixedNumber - 1 : 0;

  const setCorrectState = (isCorrect: boolean) => {
    // setIsSubmitting(true);
    setIsCorrect(isCorrect);
  }

  const setTextToRead = (numberText: string, textToRead: string) => {
    if (numberText !== '' && false) {
      setNumberText(numberText + ' ' + textToRead);
    } else {
      setNumberText(textToRead);
      setNumberTextIndex(0);
    }
  }

  const setOperator = (operator: string) => {
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

  const setLevelAndProblems = (level: number, operator: string, fixedNumber = -1) => () => {
    if (level < 1 || level > 4) return;
    const usableFixedNumber = fixedNumber === -1 ? 2 : fixedNumber;
    const fixedNumberString = usableFixedNumber === -1 ? 'random' : usableFixedNumber;
    addLine(`Level set to ${level} and Number set to ${fixedNumberString}`, true)
    setLevel(level);
    const actualFixedNumber = usableFixedNumber === -1 ? 2 : usableFixedNumber;
    setFixedNumber(actualFixedNumber);
    setSequenceNumber(0);
    setOutputState(operator);
    setProblem(actualFixedNumber, 0, level, operator)();
  }

  const setProblem = (actualFixedNumber: number, sequenceNumber: number, level: number, operator: string) => () => {
    const {firstNumber, secondNumber} = timesTableNumbers();
    let actual1stNumber = firstNumber;
    let actual2ndNumber = secondNumber;
    if (actualFixedNumber !== -1) {
      if (sequenceNumber > MAX_SEQUENCE) {
        const nextNumber = (level < 4) ? actualFixedNumber : (actualFixedNumber + 1) % (MAX_SEQUENCE + 1) || 2;
        setLevelAndProblems(((level + 1) % 4) || 1, operator, nextNumber)();
        return;
      }

      switch (level) {
        case 1:
          if (Math.random() > 10.5) {
            actual2ndNumber = actualFixedNumber;
            actual1stNumber = sequenceNumber;
          } else {
            actual1stNumber = actualFixedNumber;
            actual2ndNumber = sequenceNumber;
          }

          setSequenceNumber(sequenceNumber + 1);
          break;
        case 2:
        case 3:
        case 4:
          actual1stNumber = actualFixedNumber;
          actual2ndNumber = sequenceNumber < MAX_SEQUENCE ? sequence[sequenceNumber] : sequenceNumber;
          setSequenceNumber(sequenceNumber + 1);
          break;
      }

    }
    setFirstNumber(actual1stNumber);
    setSecondNumber(actual2ndNumber);
    const p = new ProblemsEngine({firstNumber: actual1stNumber, secondNumber: actual2ndNumber, operator})
    addLine(p.toString());
    setAnswerText('');
    // setTimeLeft(30);
    // setProblemNumber(problemNumber+1);
    // setIsCorrect(false);
    // setIsSubmitting(level < 3);
  }
  const checkTheAnswer = (problem: ProblemsEngine, answerText: string) => {
    if (answerText === '') {
      return;
    }
    // submit answer
    setAttemptedCount(attemptedCount + 1);
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
      setRightCount(rightCount + 1);
      setTextToRead('', 'correct');
      addLine(problem.toAnswerString(), true, true);
      setTimeout(setProblem(fixedNumber, sequenceNumber, level, currentOperator), 1500);
    } else {
      setTextToRead('', 'incorrect');
      console.log(`INCORRECT: ${answerText}`);
      setCorrectState(false);
    }
  }
  const inputCallback = (problem: ProblemsEngine) => (a: string) => {
    switch (a) {
      case '-':
        if (answerText.length > 0) {
          setAnswerText(answerText.substring(0, answerText.length - 1));
        }
        break;
      case '':
        switch (outputState) {
          case '+':
          case '-':
          case 'x':
          case '÷':
            checkTheAnswer(problem, answerText);
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
        const numberText = (answerText + a);
        const text = convertNumberToEnglish2(numberText);
        setNumberText(text);
        setNumberTextIndex(0);
        console.log(text);
    }

  }
  // 0123456789 + - x ÷ = . % &gt; &lt; ?
  let currentOutput = '';
  switch (outputState) {
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
  const addLine = (line: string, minusLine = false, isAnswer=false) => {
    if (!isAnswer) {
      console.log(normaliseLineText(line.toLowerCase()));
      setTextToRead(numberText, normaliseLineText(line.toLowerCase()));
    }

    setOutputLog((prevLines) => {
      const lastLine = prevLines[0] || '';
      const minusAnyway = matchLastCharacter(lastLine, '?') || matchLastCharacter(lastLine, '>');
      // const minusAnyway = prevLines[0] && (prevLines[0].charAt(prevLines[0].length-1) === '?' || line.charAt(line.length-1) === '?');
      const linesToUse = minusAnyway ? prevLines.splice(1) : prevLines;
      return [line, ...linesToUse]
    });
  };
  const showCorrect = (level < 3) ? !!answerText && problem.checkAnswer(answerText) : isCorrect;
  const InputComponent = showCorrect ? OutputBox : TryAgainOutputBox;
  return (<DeviceContainer>
    {/*<DeviceHeading>Math Device</DeviceHeading>*/}
    <OutputSection>
      <LevelBox>Level: {level} | #: {fixedNumber === -1 ? 'Random' : fixedNumber}</LevelBox>
      {/*<FixedNumberBox>#: {fixedNumber===-1 ?'Random' : fixedNumber}</FixedNumberBox>*/}
      <CorrectBoxContainer><CorrectBox rightCount={rightCount}/></CorrectBoxContainer>
      <TimerBox><SimplifiedTimer timeInSeconds={30} problemNumber={1} storeEndTime={(timeLeft: number) => {
      }}/></TimerBox>
    </OutputSection>
    <OutputSection>
      {/*<SpeakerBox>Speaker</SpeakerBox>*/}
      <LeftBox>
        {['Number', 'Level'].map((operator, index) => {
          const NumBox = (operator === outputState) ? SelectedMathBox : MathBoxButton;
          return (<NumBox key={index}
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
          return (<NumBox key={index}
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
        <TerminalOutput lines={outputLog}/>
      </OutputBox>
      {/*<OutputBox>*/}
      {/*  {outputLog.reverse().map((outputEntry, index) => {*/}
      {/*    const OutputComponent = index === 0 ? OutputEntry : OutputEntryPast;*/}
      {/*    return <OutputComponent>| {outputEntry}</OutputComponent>;*/}
      {/*  })}*/}

      {/*</OutputBox>*/}
      <InputComponent>&gt; {answerText}</InputComponent>
    </OutputSection>
    <MathBox><FractionCircle radius={100} divisions={9} activeIndex={0}/></MathBox>
    <MathBox><NumPad pressCallback={inputCallback(problem)}/></MathBox>
    {!doAddition && (level < 3) ? <MathBox> <TimesTable pixels={20} offset={offset}/> </MathBox> : ''}
    {audioFile && <MathBox>
      <Speaker source={audioFile} onEnded={() => {
        console.log('ended');
        setNumberTextIndex(numberTextIndex + 1);
      }}/>
    </MathBox>}


  </DeviceContainer>)
}

export default MathDevice;

const matchLastCharacter = (text: string, matchChar: string): boolean => {
  return text.charAt(text.length - 1) === matchChar;
}

const normaliseLineText = (text: string): string => {
  return text
    .split(' ')
    .filter((word: string): boolean => {
      return !['-->'].includes(word);
    })
    .map((word: string): string => {
    if (word === '?') return 'what';
    return (`${parseInt(word)}` === word) ? convertNumberToEnglish2(word) : word;

  }).join(' ');

}
