import {MultiplierContainer, StarMathsContainer} from "./star-maths/layout/starMaths.layout";
import {LevelNumberInfo} from "./star-maths/components/LevelNumberInfo";
import {PromptAndResponse} from "./star-maths/components/PromptAndResponse";
import {useContext} from "react";
import {StarMathsContext} from "./star-maths/contexts/StarMathsContext";
import {useLevel} from "./hooks/useLevel";
import {NumberInput} from "./star-maths/components/NumberInput";
import {useInput} from "./hooks/useInput";
import {TextInput} from "./star-maths/components/TextInput";
import {useTextInput} from "./hooks/useTextInput";
import {useMathDevice} from "./hooks/useMathDevice";
import {useStars} from "./hooks/useStars";
import CorrectBox from "./components/CorrectBox";
import {OperatorInput} from "./star-maths/components/OperatorInput";
import {TimesTable} from "../../TimesTable";

export const StarMaths = () => {
  const uLevel = useLevel();
  const uInput = useInput();
  const uTextInput = useTextInput();
  const uMathDevice = useMathDevice();
  const uStars = useStars();
  return <StarMathsContext.Provider value={{...uLevel, ...uInput, ...uTextInput, ...uMathDevice, ...uStars }}>
    <StarMathsContainer>
      <MultiplierContainer width={7}><CorrectBox rightCount={-1}/></MultiplierContainer>
      <MultiplierContainer width={2}><LevelNumberInfo /></MultiplierContainer>
    </StarMathsContainer><StarMathsContainer>
      <MultiplierContainer width={6} height={2}><PromptAndResponse /></MultiplierContainer>
      <MultiplierContainer width={3} height={2}><TextInput /></MultiplierContainer>
    </StarMathsContainer><StarMathsContainer>
      <MultiplierContainer width={2} height={3}><OperatorInput /></MultiplierContainer>
      <MultiplierContainer width={3} height={4}><NumberInput /></MultiplierContainer>
      <MultiplierContainer width={3.5} height={3.5}><TimesTable pixels={17} /></MultiplierContainer>
    </StarMathsContainer>
  </StarMathsContext.Provider>;
}
