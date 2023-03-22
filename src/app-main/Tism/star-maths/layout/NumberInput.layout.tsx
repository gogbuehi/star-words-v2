import styled from "styled-components";
import {BASE_UNIT} from "./starMaths.layout";

export const NumTable = styled.table`
  margin:0px;
  padding: 0px;
  border-collapse: collapse;
  
`
export const NumCell = styled.td`
  width: ${BASE_UNIT}px;
  height: ${BASE_UNIT}px;
  text-align: center;
  background-color: #61dafb;
  color: #303030;
  border-radius: ${BASE_UNIT/4}px;
  margin: 0px;
  padding: 0px;
  
  font-size: large;
  font-weight: bolder;
  cursor: pointer;
`;
