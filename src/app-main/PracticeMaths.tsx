import {CenterContent, WordBox} from "./TrickyWords";
import {useState} from "react";
import TypingInput from "./components/TypingInput";
import styled from "styled-components";
import {NumPad} from "./components/NumPad";
import {Timer} from "./components/Timer";
const checkAnswer = (submittedAnswer: string, correctAnswer: number): boolean => {
  const numericAnswer = parseInt(submittedAnswer);
  // Validate as a number
  const parsedAnswer = `${numericAnswer}`;
  return (parsedAnswer === submittedAnswer) && (numericAnswer === correctAnswer);
}
const PracticeMaths = () => {

  const [firstNumber, setFirstNumber] = useState(1);
  const [secondNumber, setSecondNumber] = useState(2);
  const [isCorrect, setIsCorrect] = useState(false);
  const [textToMatch, setTextToMatch] = useState(`${firstNumber * secondNumber}`);
  const [answerText, setAnswerText] = useState('');
  const [fixedNumber, setFixedNumber] = useState(-1);
  const [sequenceNumber, setSequenceNumber] = useState(0);

  const [attemptedCount, setAttemptedCount] = useState(0);
  const [rightCount, setRightCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [problemNumber, setProblemNumber] = useState(1);
  const [endTime, setEndTime] = useState(0);
  const [avgTime, setAvgTime] = useState(0);
  const [lastTime, setLastTime] = useState(0);
  // const [averageTime, setAverageTime] = useState(-1);

  const setProblem = (actualFixedNumber: number, sequenceNumber: number) =>  () => {
    const {firstNumber, secondNumber} = timesTableNumbers();
    let actual1stNumber = firstNumber;
    let actual2ndNumber = secondNumber;
    if (actualFixedNumber !== -1) {
      if (Math.random() > 10.5) {
        actual2ndNumber = actualFixedNumber;
        actual1stNumber = sequenceNumber;
      } else {
        actual1stNumber = actualFixedNumber;
        actual2ndNumber = sequenceNumber;
      }
      setSequenceNumber(sequenceNumber+1);
    }
    setFirstNumber(actual1stNumber);
    setSecondNumber(actual2ndNumber);
    setTextToMatch(`${actual1stNumber * actual2ndNumber}`);
    setAnswerText('');
    setTimeLeft(30);
    setProblemNumber(problemNumber+1);
    setIsCorrect(false);
  }
  return <CenterContent>
    <CenterContent>
      <CenterContent>
        <StatsBox>{firstNumber} X {secondNumber} = ?</StatsBox>
        <StatsBox><Timer
          timeInSeconds={timeLeft}
          problemNumber={problemNumber}
          storeEndTime={(endTime) => {setEndTime(endTime)}}
        /></StatsBox>
      </CenterContent>
      <TopNumberBox>
        <TypingInput
        borderColor={isCorrect ? 'green' : 'red'}
        textToMatch={textToMatch}
        answerText={answerText}
        submitAnswerCallback={(value) =>  {
          setAnswerText(value);
          setAttemptedCount(attemptedCount+1);
          if (checkAnswer(value, (firstNumber * secondNumber))) {
            console.log("CORRECT", endTime - (new Date().getTime()));

            setIsCorrect(true);
            setRightCount(rightCount +1);
            setTimeout(setProblem(fixedNumber, sequenceNumber), 1000);
          } else {
            console.log("INCORRECT");
            setIsCorrect(false);
          }
        }
        }
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
                if (checkAnswer(answerText, (firstNumber * secondNumber))) {
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
                  setIsCorrect(true);
                  setRightCount(rightCount +1);
                  setTimeout(setProblem(fixedNumber, sequenceNumber), 1000);
                } else {
                  console.log("INCORRECT");
                  setIsCorrect(false);
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
    <CenterContent>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num, index) => {
        const NumBox = (num === fixedNumber) ? SelectedNumberBox : NumberBox;
        return (
          <NumBox key={index}
                     onClick={() => {
                       setFixedNumber(num);
                       setSequenceNumber(0);
                       setProblem(num,0)();
                     }
                     }

        >{num}</NumBox>)
      })}
    </CenterContent>
  </CenterContent>
}

export default PracticeMaths;

const timesTableNumbers = () => {
  const firstNumber = randomInteger(10);
  const secondNumber = randomInteger(10);

  return {
    firstNumber, secondNumber
  }
}

const randomInteger = (maxNumber: number): number => {
  return Math.floor(Math.random() * (maxNumber+1));
}

const NumberBox = styled(WordBox)`
  border-color: cornflowerblue;
  background-color: lightblue;
  display: inline-flex;
  color: black;
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
  text-align: left;
`;

const RightStatsBox = styled(StatsBox)`
  border-color: green;
  background-color: lightgreen;
  color: black;
`;
const AttemptedStatsBox = styled(StatsBox)`
  border-color: purple;
  background-color: lightgrey;
  color: black;
  
`;

const starDisplay = (starCount: number) => {
  let displayString = '';
  for(let i =0; i < starCount && i < 20; i++) {
    displayString += `*`;
    if (i%5 === 4) displayString += ' ';
  }
  return displayString; // + (starCount > 20 ? ` ...${starCount}` : '');
}
