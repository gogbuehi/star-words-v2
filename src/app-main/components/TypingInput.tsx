import {useState} from "react";
import {WordBox} from "../TrickyWords";
import styled from "styled-components";

type CallbackFunction = (a: string) => void;
type TypingInputProps = {
  submitAnswerCallback: CallbackFunction;
  borderColor: string;
  textToMatch: string;
  answerText: string;
}
function TypingInput(propsReceived: TypingInputProps) {
  const {
    answerText,
    textToMatch
  } = propsReceived;
  const [typedText, setTypedText] = useState('');
  //const [answerText, setAnswerText] = useState(typedText);
  const [boxToUse, setBoxToUse] = useState((textToMatch === answerText) ? 'green':'yellow');
  let BoxToUse;
  if (answerText !== textToMatch) {
    if (boxToUse === 'green' || answerText === '') BoxToUse = NeutralBox;
    else BoxToUse = IncorrectBox;
  } else BoxToUse = CorrectBox;
  return <div>
    <BoxToUse>{answerText}</BoxToUse>
    <br />
    <input type={'text'} value={typedText}
           onChange={()=>{}}
    onKeyDown={({key, keyCode}) => {
      if(key.length === 1) {
        console.log(key, keyCode);
        const updatedText = `${typedText}${key}`;
        setTypedText(updatedText);
        setBoxToUse('yellow');
      } else {
        switch(key) {
          case 'Enter':
            console.log("Submitting answer...");
            propsReceived.submitAnswerCallback(typedText);
            setBoxToUse((propsReceived.textToMatch === answerText) ? 'green':'red');
            setTypedText('');

            break;
          default:
        }
        console.log(key, keyCode);
        switch(keyCode) {
          case 8: // Backspace
            console.log('deleting');
            setTypedText(typedText.substr(0,typedText.length -1));
            break;
        }
      }

    }}
    />
  </div>
}

export default TypingInput;

const CorrectBox = styled(WordBox)`
  border-color: green;
  background-color: lightgreen;
`;
const IncorrectBox = styled(WordBox)`
  border-color: red;
  background-color: lightsalmon;
`;
const NeutralBox = styled(WordBox)`
  border-color: brown;
  background-color: lightyellow;
`;
