import {useState} from "react";
import {CenterContent, WordBox} from "../TrickyWords";
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
  return <CenterContent>
    <EInput type={'number'} value={typedText}
           onChange={()=>{}}
    onKeyDown={({key, keyCode}) => {
      if(key.length === 1 && key ===`${parseInt(key)}`) {
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
    <br />
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

const EInput = styled.input`
  border: solid 2px #61dafb;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  width: fit-content;
  text-align: center;
  vertical-align: center;
  color: aliceblue;
  font-size: 24pt;
  background-color: #282c34;
  //display: inline-flex;
  display: none;
`;
