import {useState} from "react";
import { useCookies } from 'react-cookie';

export const useStars = () => {
  const [attemptedCount, setAttemptedCount] = useState(0);
  const [cookies, setCookie, removeCookie] = useCookies(["stars"]);
  const [rightCount, setRightCount] = useState(parseInt(cookies?.stars || "0"));

  const setRightCountFn = (rightCount: number) => {
    setRightCount(rightCount);
    setCookie("stars", `${rightCount}`);
  }

  return {
    rightCount,
    setRightCount: setRightCountFn,
    cookies,
    setCookie
  }
}
