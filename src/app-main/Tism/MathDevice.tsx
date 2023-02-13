import {NumPad} from "../components/NumPad";
import {
  DeviceContainer,
  DeviceHeading,
  LeftBox,
  MathBox,
  OutputBox,
  OutputSection, SelectedMathBox,
  SpeakerBox,
  TimerBox
} from "./TismStyled";
import {SimplifiedTimer} from "./SimplifiedTimer";
import {useState} from "react";

const MathDevice = () => {
  const [doDivision, setDoDivision] = useState(false);
  const [doAddition, setDoAddition] = useState(false);
  const currentOperator = (doAddition ? doDivision ? '-' : '+' : doDivision ? '÷' : 'x');
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

  return (<DeviceContainer>
    <DeviceHeading>Math Device</DeviceHeading>
    <OutputSection>
      <TimerBox><SimplifiedTimer timeInSeconds={30} problemNumber={1} storeEndTime={(timeLeft:number) => {}} /></TimerBox>
    </OutputSection>
    <OutputSection>
      <SpeakerBox>Speaker</SpeakerBox>
      <OutputBox>0123456789 + - x ÷ = . % &gt; &lt; ?</OutputBox>
      <MathBox>Answer</MathBox>
    </OutputSection>
    <LeftBox>
      <MathBox>Number</MathBox>
      <MathBox>Level</MathBox>
      {/*<MathBox>+</MathBox>*/}
      {/*<MathBox>-</MathBox>*/}
      {/*<MathBox>x</MathBox>*/}
      {/*<MathBox>÷</MathBox>*/}
      {['+', '-', 'x', '÷'].map((operator, index) => {
        const NumBox = (operator === currentOperator) ? SelectedMathBox : MathBox;
        return (
          <NumBox key={index}
                  onClick={() => {
                    setOperator(operator);
                  }
                    // setLevelAndProblems(num, fixedNumber)
                  }

          >{operator}</NumBox>)
      })}
    </LeftBox>
    <MathBox><NumPad pressCallback={(key) => {
      console.log(key);
    }
    } /></MathBox>

  </DeviceContainer>)
}

export default MathDevice;
