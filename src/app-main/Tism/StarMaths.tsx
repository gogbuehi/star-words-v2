import {
  HeadingMultiplierContainer, MultiplierContainer,
  StarMathsContainer
} from "./star-maths/layout/starMaths.layout";
import {LevelNumberInfo} from "./star-maths/components/LevelNumberInfo";
import {PromptAndResponse} from "./star-maths/components/PromptAndResponse";
import {StarMathsContext} from "./star-maths/contexts/StarMathsContext";

import {Theme} from "./hooks/useTheme";

import {NumberInput} from "./star-maths/components/NumberInput";
import {TextInput} from "./star-maths/components/TextInput";
import CorrectBox from "./components/CorrectBox";
import {OperatorInput} from "./star-maths/components/OperatorInput";
import {TimesTable} from "../../TimesTable";
import {useContext} from "react";
import {EzeLearningContainer} from "./star-maths/layout/ezeLearningMaths.layout";


export const StarMaths = () => {
  const { nav, theme, problem } = useContext(StarMathsContext);
  return <>
    <EzeLearningContainer>
      <HeadingMultiplierContainer width={7} height={2} theme={theme as Theme} title={'Stars for Elliott'}><CorrectBox rightCount={-1}/></HeadingMultiplierContainer>
      <HeadingMultiplierContainer width={2} height={2} theme={theme as Theme} title={nav + ' Status'}><LevelNumberInfo /></HeadingMultiplierContainer>
    </EzeLearningContainer>
    <EzeLearningContainer>
      <HeadingMultiplierContainer width={6} height={3} theme={theme as Theme} title={problem.toString()}><PromptAndResponse /></HeadingMultiplierContainer>
      <HeadingMultiplierContainer width={3} height={3} theme={theme as Theme}><TextInput /></HeadingMultiplierContainer>
    </EzeLearningContainer>
    <EzeLearningContainer>
      <HeadingMultiplierContainer width={6} height={1} theme={theme as Theme}><OperatorInput /></HeadingMultiplierContainer>
      <HeadingMultiplierContainer width={3} height={4} theme={theme as Theme}><NumberInput /></HeadingMultiplierContainer>
    </EzeLearningContainer>

    <StarMathsContainer>


      <HeadingMultiplierContainer width={7} height={7} theme={theme as Theme}><TimesTable pixels={17} /></HeadingMultiplierContainer>
    </StarMathsContainer>
  </>;
}
