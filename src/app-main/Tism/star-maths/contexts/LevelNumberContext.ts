import {createContext} from "react";

type LevelNumberContextData = {
  level: number;
  fixedNumber: number;
  sequenceNumber: number;
}

export const LevelNumberContext = createContext({
  level: -1,
  number: 0,
  sequenceNumber: 1
});
