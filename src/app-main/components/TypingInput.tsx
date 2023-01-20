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
  console.log(`hmmm... ${textToMatch}`);
  const [typedText, setTypedText] = useState('');
  //const [answerText, setAnswerText] = useState(typedText);
  const [boxToUse, setBoxToUse] = useState((textToMatch === answerText) ? 'green':'yellow');
  let BoxToUse;
  if (answerText !== textToMatch) {
    if (boxToUse === 'green' || answerText === '') BoxToUse = NeutralBox;
    else BoxToUse = IncorrectBox;
  } else BoxToUse = CorrectBox;
  // switch(boxToUse) {
  //   case 'red':
  //     BoxToUse = IncorrectBox;
  //     break;
  //   case 'green':
  //     BoxToUse = CorrectBox;
  //     break;
  //   default:
  //     BoxToUse = NeutralBox;
  // }
  return <p>
    <BoxToUse>{answerText}</BoxToUse>
    <br />
    <input type={'text'} value={typedText}
     defaultValue={''}
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
  </p>
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
