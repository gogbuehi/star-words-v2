import {CenterContent, TextBox, WordBox} from "./TrickyWords";
import {useState} from "react";
import TypingInput from "./components/TypingInput";
import styled from "styled-components";
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
  // const [averageTime, setAverageTime] = useState(-1);

  const setProblem = (actualFixedNumber: number) =>  () => {
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
  }
  return <div>
    <h1>Practice Maths</h1>

    <CenterContent>
      <TextBox>{firstNumber} X {secondNumber} = ?</TextBox>
    </CenterContent>
    <CenterContent>
      <TextBox>
        Answer
      </TextBox>
      <TypingInput
        borderColor={isCorrect ? 'green' : 'red'}
        textToMatch={textToMatch}
        answerText={answerText}
        submitAnswerCallback={(value) =>  {
          setAnswerText(value);
          setAttemptedCount(attemptedCount+1);
          if (checkAnswer(value, (firstNumber * secondNumber))) {
            console.log("CORRECT");
            setIsCorrect(true);
            setRightCount(rightCount +1);
            setTimeout(setProblem(fixedNumber), 1000);
          } else {
            console.log("INCORRECT");
            setIsCorrect(false);
          }
        }
      }
      />
    </CenterContent>
    <CenterContent>
      <RightStatsBox>
        {starDisplay(rightCount)}
      </RightStatsBox>
      <AttemptedStatsBox>{starDisplay(attemptedCount)}</AttemptedStatsBox>
      <StatsBox>Average Time to Answer: </StatsBox>
    </CenterContent>
    <CenterContent>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num, index) => {
        const NumBox = (num === fixedNumber) ? SelectedNumberBox : NumberBox;
        return (
          <NumBox key={index}
                     onClick={() => {
                       setFixedNumber(num);
                       setSequenceNumber(0);
                       setProblem(num)();
                     }
                     }

        >{num}</NumBox>)
      })}
    </CenterContent>
  </div>
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
  display: inline-block;
  color: black;
`;

const SelectedNumberBox = styled(NumberBox)`
  border-color: darkslateblue;
  background-color: black;
  color: yellow;
`;

const StatsBox = styled(WordBox)`
  font-size: small;
  width: 200px;
`;

const RightStatsBox = styled(StatsBox)`
  border-color: green;
  background-color: lightgreen;
  color: black;
  width: 100px;
`;
const AttemptedStatsBox = styled(StatsBox)`
  border-color: purple;
  background-color: lightgrey;
  color: black;
  width: 100px;
`;

const starDisplay = (starCount: number) => {
  let displayString = '';
  for(let i =0; i < starCount; i++) {
    displayString += '*';
    if (i%5 === 4) displayString += ' ';
  }
  return displayString;
}