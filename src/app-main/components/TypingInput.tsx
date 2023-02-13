import {CenterContent, WordBox} from "../TrickyWords";
import styled from "styled-components";

type CallbackFunction = (a: string) => void;
type TypingInputProps = {
  submitAnswerCallback: CallbackFunction;
  borderColor: string;
  answerText: string;
  isCorrect: boolean;
  isSubmitting: boolean;
}
function TypingInput(propsReceived: TypingInputProps) {
  const {
    answerText,
    isCorrect,
    isSubmitting
  } = propsReceived;
  let BoxToUse;
  if (!isSubmitting || answerText === '') {
    BoxToUse = NeutralBox;
  } else if (isCorrect) {
    BoxToUse = CorrectBox;
  } else {
    BoxToUse = IncorrectBox;
  }
  return <CenterContent>
    <BoxToUse>{answerText}</BoxToUse>
  </CenterContent>
}

export default TypingInput;

const CorrectBox = styled(WordBox)`
  border-color: green;
  background-color: lightgreen;
  color: darkgreen;
  height: 50px;
  width: 80px;
  text-align: center;
  display: inline-block;
`;
const IncorrectBox = styled(WordBox)`
  border-color: red;
  background-color: lightsalmon;
  color: darkred;
  height: 50px;
  width: 80px;
  text-align: center;
  display: inline-block;
`;
const NeutralBox = styled(WordBox)`
  border-color: brown;
  background-color: lightyellow;
  color: black;
  height: 50px;
  width: 80px;
  text-align: center;
  display: inline-block;
`;
