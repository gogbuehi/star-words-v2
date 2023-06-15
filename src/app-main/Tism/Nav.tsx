import {useContext} from "react";
import {StarMathsContext} from "./star-maths/contexts/StarMathsContext";
import {HeadingMultiplierContainer, StarMathsContainer} from "./star-maths/layout/starMaths.layout";
import {Theme} from "./hooks/useTheme";
import {CenterContent} from "../TrickyWords";
import {NavButton} from "./star-maths/layout/Nav.layout";

export const Nav = () => {
  const { nav, theme, setNav } = useContext(StarMathsContext);
  console.log({theme});
  const currentTheme = "NAV" as Theme;
  return <StarMathsContainer>
    <HeadingMultiplierContainer width={1} height={1} theme={currentTheme as Theme}>
      <CenterContent>Nav</CenterContent>
    </HeadingMultiplierContainer>
    <HeadingMultiplierContainer width={1} height={1} theme={currentTheme as Theme}>
      <CenterContent>
        <NavButton onClick={() => {
        setNav('Maths');
      }}>Maths</NavButton>
      </CenterContent>
    </HeadingMultiplierContainer>

  </StarMathsContainer>
}
