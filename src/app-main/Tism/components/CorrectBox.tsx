import {Fragment, useContext} from "react";
import {starDisplay} from "../../PracticeMaths";
import {useStars} from "../hooks/useStars";
import {StarMathsContext} from "../star-maths/contexts/StarMathsContext";

type CorrectBoxProps = {
  rightCount: number;
}
const CorrectBox = (props: CorrectBoxProps) => {
  // const [attemptedCount, setAttemptedCount] = useState(0);
  // const [rightCount, setRightCount] = useState(0);
  const {rightCount} = props;
  const { rightCount: uRightCount} = useContext(StarMathsContext);
  if (rightCount === -1) {
    return <Fragment>{starDisplay(uRightCount)}</Fragment>;
  }

  return <Fragment>{starDisplay(rightCount)}</Fragment>
}

export default CorrectBox;
