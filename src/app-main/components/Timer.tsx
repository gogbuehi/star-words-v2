import {CenterContent} from "../TrickyWords";
import {SimplifiedTimer, TimerProps} from "../Tism/SimplifiedTimer";
export const Timer = (propsReceived: TimerProps) => {
  const {timeInSeconds, problemNumber, storeEndTime} = propsReceived;
  return (<CenterContent>
    <SimplifiedTimer timeInSeconds={timeInSeconds} problemNumber={problemNumber} storeEndTime={storeEndTime} />
  </CenterContent>)
};

