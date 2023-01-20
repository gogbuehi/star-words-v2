import {CenterContent} from "./app-main/TrickyWords";
import styled from "styled-components";

export const TimesTable = () => {
  const TABLE_SIZE = 12;
  return (<CenterContent>
    {generateTimesTable(TABLE_SIZE)}
  </CenterContent>)


}

const generateTimesTable = (size: number) => {
  const tableRows = [];
  for(let i = 1; i < size+1; i++) {
    tableRows.push(generateTimesRow(size, i));
  }
  return (<TableA>
    {tableRows}
  </TableA>)
}

const generateTimesRow = (size: number, multiplier: number) => {
  const tableCell = [];

  for(let i = 1; i < (size+1); i++) {
    tableCell.push(generateTimesCell(multiplier, i) );
  }
  return (<tr key={`row-${multiplier}`}>{tableCell}</tr>);
}

const generateTimesCell = (multiplier: number, i: number) => {
  const CellToUse = ((multiplier%2) + (i%2))%2 ? CellA : CellB;
  return (<CellToUse key={`${multiplier}-${i}`}>
    {multiplier*i}
  </CellToUse>);
}

const TableA = styled.table`
  margin-left: 50px;
  margin-right: 50px;
`;
const CellA = styled.td`
  padding: 5px;
  text-align: center;
`;

const CellB = styled(CellA)`
  background-color: black;
  color: white;
`;
