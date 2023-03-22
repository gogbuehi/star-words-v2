import {useState} from "react";

export const useStars = () => {
  const [attemptedCount, setAttemptedCount] = useState(0);
  const [rightCount, setRightCount] = useState(0);

  return {
    rightCount,
    setRightCount
  }
}
