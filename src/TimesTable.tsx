import {CenterContent} from "./app-main/TrickyWords";
import styled from "styled-components";
import {useState} from "react";

interface ITimesTableProps  {
  offset?: number;
}
export const TimesTable = (props: ITimesTableProps) => {
  const [algorithmNum, setAlgorithmNum] = useState('100');
  const TABLE_SIZE = 15;
  const {offset} = props;
  const clickOnTable = (multiplier: number, i: number) => {
    setAlgorithmNum(`${multiplier}-${i}`);
  }
  return (<CenterContent>
    <button onClick={() => {setAlgorithmNum('100')}}>RESET</button>
    <br />
    {generateTimesTable({
      offset,
      algorithmNum, size: TABLE_SIZE, clickCallback: clickOnTable})}
  </CenterContent>)


}

type TimesTableArgs = {
  algorithmNum: string;
  size: number;
  offset?: number;
  clickCallback: (multiplier: number, i: number) => void;
}
const generateTimesTable = (timesTableArgs: TimesTableArgs) => {
  const {algorithmNum, size, offset, clickCallback} = timesTableArgs;
  const rows = offset ? 1 : size;
  const tableRows = [];
  for(let i = 1; i < rows+1; i++) {
    tableRows.push(generateTimesRow({algorithmNum, size, offset, multiplier: i, clickCallback}));
  }
  return (<TableA>
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
const generateTimesRow = (timesRowArg: TimesRowArgs) => {
  const {algorithmNum, size, multiplier, clickCallback} = timesRowArg;
  const offset = timesRowArg.offset || 0;
  const tableCell = [];

  for(let i = 1; i < (size+1); i++) {
    tableCell.push(generateTimesCell(algorithmNum, multiplier + offset, i, clickCallback) );
  }
  return (<TTRow key={`row-${multiplier}`}>{tableCell}</TTRow>);
}

const generateTimesCell = (algorithmNum: string, multiplier: number, i: number, clickCallback: (multiplier: number, i: number) => void) => {
  const CellToUse = determineCellToUse(algorithmNum, multiplier, i);
  return (<CellToUse key={`${multiplier}-${i}`}
  onClick={() => {
  clickCallback(multiplier, i)}
  }
  >
    {multiplier*i}
  </CellToUse>);
}

const determineCellToUse = (algorithmNum: string, multiplier: number, i: number) => {
  switch(algorithmNum) {
    case '100':
      return ((multiplier%2) + (i%2) + 1)%2 ? CellA : CellB;
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

const TableA = styled.table`
  margin-left: 50px;
  margin-right: 50px;
  display: inline-block;
`;
const CellA = styled.td`
  padding: 5px;
  text-align: center;
  font-size: 20pt;
  border-radius: 5px;
  width: 50px;
  height: 50px;
  border-top: solid 1px white;
  border-right: solid 1px white;
`;

const CellB = styled(CellA)`
  background-color: black;
  color: white;
`;

const TTRow = styled.tr`
  border: solid 1px white;
`;
