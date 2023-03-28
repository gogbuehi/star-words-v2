import {useNav} from "./hooks/useNav";
import {StarMaths} from "./StarMaths";
import {Nav} from "./Nav";
import {useLevel} from "./hooks/useLevel";
import {useInput} from "./hooks/useInput";
import {useTextInput} from "./hooks/useTextInput";
import {useMathDevice} from "./hooks/useMathDevice";
import {useStars} from "./hooks/useStars";
import {useTheme} from "./hooks/useTheme";
import {StarMathsContext} from "./star-maths/contexts/StarMathsContext";

export const TheDevice = () => {
  const uNav = useNav();

  const uLevel = useLevel();
  const uInput = useInput();
  const uTextInput = useTextInput();
  const uMathDevice = useMathDevice();
  const uStars = useStars();
  const uTheme = useTheme();
  console.log({nav: uNav.nav});

  let OutputComponent;
  switch(uNav.nav) {
    case 'Maths':
      OutputComponent = StarMaths;
      break;
    case 'Nav':
      OutputComponent = Nav;
      break;
    default:
      OutputComponent = Nav;
  }
  return <StarMathsContext.Provider value={{...uLevel, ...uInput, ...uTextInput, ...uMathDevice, ...uStars, ...uTheme, ...uNav }}>
    <OutputComponent />
  </StarMathsContext.Provider>

}
