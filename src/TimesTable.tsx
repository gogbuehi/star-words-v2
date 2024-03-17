import {CenterContent} from "./app-main/TrickyWords";
import styled from "styled-components";
import {useContext, useState} from "react";
import {StarMathsContext} from "./app-main/Tism/star-maths/contexts/StarMathsContext";

interface ITimesTableProps  {
  offset?: number;
  pixels?: number;
}
export const TimesTable = (props: ITimesTableProps) => {
  const {level, fixedNumber} = useContext(StarMathsContext);
  const [algorithmNum, setAlgorithmNum] = useState('100');
  const TABLE_SIZE = 12;
  const {offset, pixels} = props;
  const actualOffset = offset ? offset : fixedNumber > -1 ? fixedNumber - 1 : 0;
  const clickOnTable = (multiplier: number, i: number) => {
    setAlgorithmNum(algorithmNum === '100' ? `${multiplier}-${i}` : '100');
  }
  return (<>
    {level < 3 && generateTimesTable({
      offset: actualOffset,
      algorithmNum, size: TABLE_SIZE, clickCallback: clickOnTable}, pixels)}
    {/*<br />*/}
    {/*<button onClick={() => {setAlgorithmNum('100')}}>RESET</button>*/}
  </>)


}

type TimesTableArgs = {
  algorithmNum: string;
  size: number;
  offset?: number;
  clickCallback: (multiplier: number, i: number) => void;
}
const generateTimesTable = (timesTableArgs: TimesTableArgs, pixels=0) => {
  const {algorithmNum, size, offset, clickCallback} = timesTableArgs;
  const rows = size; //offset ? 1 : size;
  const tableRows = [];
  // if (rows === 1 && offset !== 0) {
  //   tableRows.push(generateTimesRow({algorithmNum, size, offset: 0, multiplier: 1, clickCallback}));
  // }
  for(let i = 1; i < rows+1; i++) {
    tableRows.push(generateTimesRow({algorithmNum, size, offset, multiplier: i, clickCallback}, pixels));
  }
  return (<TableA size={pixels}>
    <tbody>
    {tableRows}
    </tbody>
  </TableA>)
}

type TimesRowArgs = {
  algorithmNum: string;
  size: number;
  multiplier: number;
  clickCallback: (multiplier: number, i: number) => void;
  offset?: number;
}
const generateTimesRow = (timesRowArg: TimesRowArgs, pixels=0) => {
  const {algorithmNum, size, multiplier, clickCallback} = timesRowArg;
  const offset = timesRowArg.offset || 0;
  const tableCell = [];

  for(let i = 1; i < (size+1); i++) {
    tableCell.push(generateTimesCell({algorithmNum, multiplier: multiplier, offset,  i, clickCallback}, pixels) );
  }
  return (<TTRow key={`row-${multiplier}`}>{tableCell}</TTRow>);
}
type TimesCellArgs = {
  algorithmNum: string;
  i: number;
  multiplier: number;
  clickCallback: (multiplier: number, i: number) => void;
  offset: number;
}
const generateTimesCell = (timesCellArgs: TimesCellArgs, pixels=0) => {
  // algorithmNum: string, multiplier: number, i: number, clickCallback: (multiplier: number, i: number) => void
  const {algorithmNum, multiplier, clickCallback,offset, i} = timesCellArgs;
  const CellToUse = determineCellToUse(algorithmNum, multiplier, i, offset+1);
  return (<CellToUse size={pixels} key={`${multiplier}-${i}`}
  onClick={() => {
  clickCallback(multiplier, i)}
  }
  >
    {multiplier*i}
  </CellToUse>);
}

const determineCellToUse = (algorithmNum: string, multiplier: number, i: number, numMatch=0) => {
  switch(algorithmNum) {
    case '100':
      if ((multiplier === numMatch) || (i === numMatch)) return CellC;
      return (((multiplier%2) + (i%2) + 1)%2) ? CellA : CellB;
    case '101':
      return (multiplier%2) ? CellA : CellB;
    case '102':
      return (i%2) ? CellA : CellB;
    default:
      const [algoMultiplier, algoIString] = algorithmNum.split(/[-]/g);
      const algoM = parseInt(algoMultiplier) || 0;
      const algoI = parseInt(algoIString) || 0;
      return (multiplier === algoM) || (i === algoI) ? CellB : CellA;
  }

}

type CellProps = {
  size?: number;
}

const TableA = styled.table`
  // margin-left: ${(props: CellProps) => (props.size || '50')}px;
  // margin-right: ${(props: CellProps) => (props.size || '50')}px;
  
  display: inline-block;
`;
const CellA = styled.td`
  padding: 2px;
  text-align: center;
  font-size: 16pt;
  //border-radius: 5px;
  width: ${(props: CellProps) => (props.size || '50')}px;
  height: ${(props: CellProps) => (props.size || '50')}px;
  line-height: ${(props: CellProps) => (props.size || '50')}px;
  //border-top: solid 1px #8080e0;
  //border-right: solid 1px #8080e0;
  background-color: #61dafb;
  color: black;
  cursor: pointer;
`;

const CellB = styled(CellA)`
  background-color: #303030;
  color: white;
`;
const CellC = styled(CellA)`
  background-color: #000000;
  color: greenyellow;
`;
const TTRow = styled.tr`
  border: solid 1px white;
`;
