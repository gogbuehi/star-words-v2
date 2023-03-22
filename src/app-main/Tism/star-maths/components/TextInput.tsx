import {useContext} from "react";
import {StarMathsContext} from "../contexts/StarMathsContext";
import {OutputBox} from "../layout/TextInput.layout";

export const TextInput = () => {
  const {answerText} = useContext(StarMathsContext);

  return <OutputBox>&gt; {answerText}</OutputBox>;
}
