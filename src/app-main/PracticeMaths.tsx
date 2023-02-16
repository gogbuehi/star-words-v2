import {CenterContent, WordBox} from "./TrickyWords";
import {useState} from "react";
import TypingInput from "./components/TypingInput";
import styled from "styled-components";
import {NumPad} from "./components/NumPad";
import {Timer} from "./components/Timer";
import {TimesTable} from "../TimesTable";
import {ProblemsEngine} from "./Tism/engine/ProblemsEngine";
const MAX_SEQUENCE = 12;

type MathsProps = {
  doDivision: boolean;
  doAddition: boolean;
}
const PracticeMaths = (props: MathsProps) => {
  const {doDivision, doAddition} = props;
  const problemOperatorString = doAddition ?
    (doDivision ? '-' : '+') :
    (doDivision ? '÷' : 'x');

  const [firstNumber, setFirstNumber] = useState(1);
  const [secondNumber, setSecondNumber] = useState(2);
  const problem = new ProblemsEngine({firstNumber, secondNumber, operator: problemOperatorString});
  const [level, setLevel] = useState(1);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answerText, setAnswerText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(level < 3);
  const setCorrectState = (isCorrect: boolean) => {
    setIsSubmitting(true);
    setIsCorrect(isCorrect);
  }
  const [fixedNumber, setFixedNumber] = useState(-1);
  const [sequenceNumber, setSequenceNumber] = useState(0);

  const [attemptedCount, setAttemptedCount] = useState(0);
  const [rightCount, setRightCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [problemNumber, setProblemNumber] = useState(1);
  const [endTime, setEndTime] = useState(0);
  const [avgTime, setAvgTime] = useState(0);
  const [lastTime, setLastTime] = useState(0);

  const [sequence, setSequence] = useState(generateRandomSequenceUpTo(MAX_SEQUENCE));
  // const [averageTime, setAverageTime] = useState(-1);

  const offset = fixedNumber > -1 ? fixedNumber - 1 : 0;

  const setProblem = (actualFixedNumber: number, sequenceNumber: number, level: number) =>  () => {
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
    setAnswerText('');
    setTimeLeft(30);
    setProblemNumber(problemNumber+1);
    setIsCorrect(false);
    setIsSubmitting(level < 3);
  }
  const setLevelAndProblems = (level: number, fixedNumber=-1) => () => {
    setLevel(level);
    const actualFixedNumber = fixedNumber === -1 ? 2 : fixedNumber;
    setFixedNumber(actualFixedNumber);
    setSequenceNumber(0);
    setProblem(actualFixedNumber, 0, level)();
  }
  return <CenterContent>
    {!doAddition && offset > 0 && (level < 3)? <TimesTable offset={offset}/> : ''}
    <CenterContent>
      <CenterContent>
        <ProblemBox>{problem.toString()}</ProblemBox>
        <StatsBox><Timer
          timeInSeconds={timeLeft}
          problemNumber={problemNumber}
          storeEndTime={(endTime) => {setEndTime(endTime)}}
        /></StatsBox>
      </CenterContent>

        <NumberBoxContainer>
          <div>Number</div>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num, index) => {
            const NumBox = (num === fixedNumber) ? SelectedNumberBox : NumberBox;
            return (
              <NumBox key={index}
                      onClick={() => {
                        setFixedNumber(num);
                        setSequenceNumber(0);
                        setProblem(num,0, level)();
                      }
                      }

              >{num}</NumBox>)
          })}
          <div>Level</div>
          {[1, 2, 3, 4].map((num, index) => {
            const NumBox = (num === level) ? SelectedNumberBox : NumberBox;
            return (
              <NumBox key={index}
                      onClick={
                        setLevelAndProblems(num, fixedNumber)
                      }

              >{num}</NumBox>)
          })}
        </NumberBoxContainer>
      <TopNumberBox>
        <div>Answer</div>
        <TypingInput
        borderColor={isCorrect ? 'green' : 'red'}
         isCorrect={(level < 3) ? !!answerText && problem.checkAnswer(answerText) : isCorrect}
        isSubmitting={isSubmitting}
        answerText={answerText}
        submitAnswerCallback={(value) =>  {}}
      />
      </TopNumberBox>
      <TopNumberBox>
        <NumPad
          pressCallback={(a:string) => {
            switch(a) {
              case '-':
                if (answerText.length > 0) {
                  setAnswerText(answerText.substring(0, answerText.length-1));
                }
                break;
              case '':
                if (isCorrect || answerText === '') {
                  break;
                }
                // submit answer
                setAttemptedCount(attemptedCount+1);
                if (problem.checkAnswer(answerText)) {
                  const timeToSolve = timeLeft - Math.floor((endTime - (new Date().getTime()))/1000);
                  setLastTime(timeToSolve);
                  if (attemptedCount === 0) {
                    setAvgTime(timeToSolve);
                  } else {
                    if (timeToSolve > avgTime) {
                      console.log("Slower than average");
                    } else {
                      console.log("Doing great!");
                    }
                    const updatedAvgTime = ((attemptedCount) * avgTime + timeToSolve)/(attemptedCount+1);
                    setAvgTime(updatedAvgTime);

                  }
                  console.log("CORRECT", avgTime, timeToSolve);
                  setCorrectState(true);
                  setRightCount(rightCount +1);
                  setTimeout(setProblem(fixedNumber, sequenceNumber, level), 1000);
                } else {
                  console.log("INCORRECT");
                  setCorrectState(false);
                }
                break;
              default:
                setAnswerText(answerText + a);
            }

          }
          }
        />
      </TopNumberBox>

    </CenterContent>
    <CenterContent>
      <RightStatsBox>
        Correct: {rightCount}
        <br />
        {starDisplay(rightCount)}
      </RightStatsBox>
      <AttemptedStatsBox>
        Tries: {attemptedCount}
        <br />
        {starDisplay(attemptedCount)}</AttemptedStatsBox>
      <AttemptedStatsBox>Time: {lastTime}s<br />Avg: {(avgTime).toFixed(2)}s</AttemptedStatsBox>
    </CenterContent>
  </CenterContent>
}

export default PracticeMaths;

export const timesTableNumbers = () => {
  const firstNumber = randomInteger(10);
  const secondNumber = randomInteger(10);

  return {
    firstNumber, secondNumber
  }
}

const randomInteger = (maxNumber: number): number => {
  return Math.floor(Math.random() * (maxNumber+1));
}

const NumberBoxContainer = styled(WordBox)`
  border-color: cornflowerblue;
  background-color: lightblue;
  //display: inline-flex;
  color: black;
  display: inline-table;
  width: 300px;
  overflow: auto;
  font-size: 14pt;
`;
const NumberBox = styled(WordBox)`
  border-color: cornflowerblue;
  background-color: lightblue;
  display: inline-table;
  color: black;
  cursor: pointer;
  padding: 20px;
  font-size: 14pt;
  margin: 5px;
  
`;

const TopNumberBox = styled(NumberBox)`
  height: 250px;
`;

const SelectedNumberBox = styled(NumberBox)`
  border-color: darkslateblue;
  background-color: black;
  color: yellow;
`;

const StatsBox = styled(WordBox)`
  font-size: small;
  width: 150px;
  text-align: center;
  font-family: "Courier New";
  border-color: darkslateblue;
  background-color: black;
  color: yellow;
`;

const ProblemBox = styled(StatsBox)`
  font-size: x-large;
  background-color: darkgray;
  color: black;
  border-color: darkslateblue;
`;

const RightStatsBox = styled(StatsBox)`
  border-color: green;
  background-color: lightgreen;
  color: black;
  text-align: left;
`;
const AttemptedStatsBox = styled(StatsBox)`
  border-color: purple;
  background-color: lightgrey;
  color: black;
  text-align: left;
  
`;

const starDisplay = (starCount: number) => {
  let displayString = '';
  for(let i =0; i < starCount && i < 20; i++) {
    displayString += `*`;
    if (i%5 === 4) displayString += ' ';
  }
  return displayString; // + (starCount > 20 ? ` ...${starCount}` : '');
}

export const generateRandomSequenceUpTo = (num: number): number[] => {
  const usedNumberSet = new Set();
  const sequenceArray = [];
  for(let i = 0;usedNumberSet.size < num && i < 100;i++) {
    const randomNumber = Math.floor(Math.random() * num);
    if (!usedNumberSet.has(randomNumber)) {
      sequenceArray.push(randomNumber+1);
      usedNumberSet.add(randomNumber);
    }
  }
  return sequenceArray;
}
