import {
  HeadingMultiplierContainer,
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


export const StarMaths = () => {
  const { nav, theme, problem } = useContext(StarMathsContext);
  return <>
    <StarMathsContainer>
      <HeadingMultiplierContainer width={7} theme={theme as Theme} title={'Stars for Elliott'}><CorrectBox rightCount={-1}/></HeadingMultiplierContainer>
      <HeadingMultiplierContainer width={2} theme={theme as Theme} title={nav + ' Status'}><LevelNumberInfo /></HeadingMultiplierContainer>
    </StarMathsContainer>
    <StarMathsContainer>
      <HeadingMultiplierContainer width={6} height={2} theme={theme as Theme}  title={problem.toString()}><PromptAndResponse /></HeadingMultiplierContainer>
      <HeadingMultiplierContainer width={3} height={2} theme={theme as Theme}><TextInput /></HeadingMultiplierContainer>
    </StarMathsContainer>
    <StarMathsContainer>
      <HeadingMultiplierContainer width={2} height={3} theme={theme as Theme} title={'Operators'}><OperatorInput /></HeadingMultiplierContainer>
      <HeadingMultiplierContainer width={3} height={4} theme={theme as Theme}><NumberInput /></HeadingMultiplierContainer>
      <HeadingMultiplierContainer width={3.5} height={3.5} theme={theme as Theme}><TimesTable pixels={17} /></HeadingMultiplierContainer>
    </StarMathsContainer>
  </>;
}
