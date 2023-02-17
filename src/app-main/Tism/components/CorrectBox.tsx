import {Fragment} from "react";
import {starDisplay} from "../../PracticeMaths";

type CorrectBoxProps = {
  rightCount: number;
}
const CorrectBox = (props: CorrectBoxProps) => {
  // const [attemptedCount, setAttemptedCount] = useState(0);
  // const [rightCount, setRightCount] = useState(0);
  const {rightCount} = props;
  return <Fragment>{starDisplay(rightCount)}</Fragment>
}

export default CorrectBox;
