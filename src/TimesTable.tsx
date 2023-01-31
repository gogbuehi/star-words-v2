import {CenterContent} from "./app-main/TrickyWords";
import styled from "styled-components";
import {useState} from "react";

export const TimesTable = () => {
  const [algorithmNum, setAlgorithmNum] = useState('100');
  const TABLE_SIZE = 12;
  const clickOnTable = (multiplier: number, i: number) => {
    setAlgorithmNum(`${multiplier}-${i}`);
  }
  return (<CenterContent>
    <button onClick={() => {setAlgorithmNum('100')}}>RESET</button>
    <br />
    {generateTimesTable(algorithmNum, TABLE_SIZE, clickOnTable)}
  </CenterContent>)


}

const generateTimesTable = (algorithmNum: string, size: number, clickCallback: (multiplier: number, i: number) => void) => {
  const tableRows = [];
  for(let i = 1; i < size+1; i++) {
    tableRows.push(generateTimesRow(algorithmNum, size, i, clickCallback));
  }
  return (<TableA>
    <tbody>
    {tableRows}
    </tbody>
  </TableA>)
}

const generateTimesRow = (algorithmNum: string, size: number, multiplier: number, clickCallback: (multiplier: number, i: number) => void) => {
  const tableCell = [];

  for(let i = 1; i < (size+1); i++) {
    tableCell.push(generateTimesCell(algorithmNum, multiplier, i, clickCallback) );
  }
  return (<tr key={`row-${multiplier}`}>{tableCell}</tr>);
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
`;

const CellB = styled(CellA)`
  background-color: black;
  color: white;
`;
