import {useLevel} from "../../hooks/useLevel";

import {useContext} from "react";
import {StarMathsContext} from "../contexts/StarMathsContext";

export const LevelNumberInfo = () => {

  const {fixedNumber, level, setLevel} = useContext(StarMathsContext);
  const displayFixedNumber = fixedNumber === -1 ? '--' : fixedNumber;
  return <>
    <span
    onClick={() => {
      setLevel(level + 1)}
    }
    >Level {level} / #{displayFixedNumber}</span>
  </>;
}
