import {createContext} from "react";
import {AddLineArgs} from "../../hooks/useTextInput";
import {LineItem} from "../../MathDevice";
import {ProblemsEngine} from "../../engine/ProblemsEngine";
import {SetProblemArgs} from "../../hooks/useMathDevice";
import {THEME_MATHS} from "../../hooks/useTheme";
const problem = new ProblemsEngine({firstNumber:1, secondNumber: 2, operator: '+'});
export const StarMathsContext = createContext({
  level: -1,
  setLevel: (level: number) => {},
  fixedNumber: -1,
  setFixedNumber: (num: number) => {},
  sequenceNumber: -1,
  setSequenceNumber: (num: number) => {},
  sequence: [0,1,2,3,4,5,6,7,8,9,10,11,12],

  answerText: '',
  setAnswerText: (text: string) => {},
  outputLog: [] as LineItem[],
  addLine: (args: AddLineArgs) => {},

  problem,
  setProblem: (args: SetProblemArgs) => { },
  firstNumber: -1,
  secondNumber: -1,
  currentOperator: '',
  operator: '',
  setOperator: (operator: string) => {},

  rightCount: 0,
  setRightCount: (count: number) => {},
  setCookie: (name: "stars", stars: any) => {},
  saveStars: (stars: number) => {},

  themeStyle: THEME_MATHS,
  theme: "MATHS"
});
