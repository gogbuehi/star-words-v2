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
import {useTheme} from "./hooks/useTheme";

export const StarMaths = () => {
  const uLevel = useLevel();
  const uInput = useInput();
  const uTextInput = useTextInput();
  const uMathDevice = useMathDevice();
  const uStars = useStars();
  const uTheme = useTheme();
  return <StarMathsContext.Provider value={{...uLevel, ...uInput, ...uTextInput, ...uMathDevice, ...uStars, ...uTheme }}>
    <StarMathsContainer>
      <MultiplierContainer width={7} theme={uTheme.theme}><CorrectBox rightCount={-1}/></MultiplierContainer>
      <MultiplierContainer width={2} theme={uTheme.theme}><LevelNumberInfo /></MultiplierContainer>
    </StarMathsContainer><StarMathsContainer>
      <MultiplierContainer width={6} height={2} theme={uTheme.theme}><PromptAndResponse /></MultiplierContainer>
      <MultiplierContainer width={3} height={2} theme={uTheme.theme}><TextInput /></MultiplierContainer>
    </StarMathsContainer><StarMathsContainer>
      <MultiplierContainer width={2} height={3} theme={uTheme.theme}><OperatorInput /></MultiplierContainer>
      <MultiplierContainer width={3} height={4} theme={uTheme.theme}><NumberInput /></MultiplierContainer>
      <MultiplierContainer width={3.5} height={3.5} theme={uTheme.theme}><TimesTable pixels={17} /></MultiplierContainer>
    </StarMathsContainer>
  </StarMathsContext.Provider>;
}
