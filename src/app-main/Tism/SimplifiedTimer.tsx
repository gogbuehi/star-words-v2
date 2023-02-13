import React, {useEffect, useState} from "react";

export type TimerProps = {
  timeInSeconds: number;
  problemNumber: number;
  storeEndTime: (timeLeft: number) => void
}
export const SimplifiedTimer = (propsReceived: TimerProps) => {
  const {timeInSeconds, problemNumber, storeEndTime} = propsReceived;
  const [timeLeft, setTimeLeft] = useState(timeInSeconds*1000);
  const [endTime, setEndTime] = useState((new Date().getTime()) + timeInSeconds*1000);
  const [timerProblem, setTimerProblem] = useState(0);
  const keepTimeMethod = (timeLeft: number) => {
    const localTimeLeft = endTime - new Date().getTime();
    if (localTimeLeft > 0) {
      setTimeLeft(localTimeLeft);
    }
    else {
      if (timeLeft !== 0) {
        setTimeLeft(0);
      }

    }
  }
  useEffect(() => {
    if (timerProblem !== problemNumber) {
      setTimeLeft(timeInSeconds*1000);
      setTimerProblem(problemNumber);
      setEndTime((new Date().getTime() + timeInSeconds*1000));
      storeEndTime((new Date().getTime() + timeInSeconds*1000));
      return ;
    }
    if (timeLeft === 0) {
      return;
    }
    const interval = setInterval(() => keepTimeMethod(timeLeft), 100);
    return () => clearInterval(interval);
  }, [timeLeft, problemNumber, timeInSeconds, storeEndTime, timerProblem]);
  return (<React.Fragment>
    {formatTimeLeft(timeLeft)}
  </React.Fragment>)
};

export const formatTimeLeft = (timeLeft: number): string => {
  const ms = timeLeft % 1000;
  const secs = Math.floor(timeLeft/1000) % 60;
  const mins = Math.floor(timeLeft/60000);

  const msString = leadingZero(ms, 3);
  const secsString = leadingZero(secs);
  const minsString = leadingZero(mins);

  return `${minsString}:${secsString}:${msString}`;
};

const leadingZero = (num: number, digits = 2): string => {
  let stringResult = `${num}`;
  for(let i = 1; i < digits + 1; i++) {
    const moduloNum = Math.pow(10, i);
    if (num === (num%moduloNum) && stringResult.length < digits) {
      stringResult = `0${stringResult}`;
    }
  }
  return stringResult
}
