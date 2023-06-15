import {useState} from "react";
import { useCookies } from 'react-cookie';
import {MathsRecord} from "../engine/MathsRecord";

export const useStars = () => {
  const [attemptedCount, setAttemptedCount] = useState(0);
  const [cookies, setCookie, removeCookie] = useCookies(["stars"]);
  const [rightCount, setRightCount] = useState(parseInt(cookies?.stars || "0"));
  const [mathsRecord, setMathsRecord] = useState(new MathsRecord());

  const setRightCountFn = (rightCount: number) => {
    setRightCount(rightCount);
    // setCookie("stars", `${rightCount}`);
  }
  const saveStars = (starCount: number) => {
    setCookie("stars", `${starCount}`);
  }

  return {
    rightCount,
    setRightCount: setRightCountFn,
    cookies,
    setCookie,
    saveStars,
    mathsRecord

  }
}
