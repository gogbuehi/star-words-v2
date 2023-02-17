import React from "react";
import {starDisplay} from "../../PracticeMaths";

type CorrectBoxProps = {
  rightCount: number;
}
const CorrectBox = (props: CorrectBoxProps) => {
  // const [attemptedCount, setAttemptedCount] = useState(0);
  // const [rightCount, setRightCount] = useState(0);
  const {rightCount} = props;
  return <React.Fragment>{starDisplay(rightCount)}</React.Fragment>
}

export default CorrectBox;
