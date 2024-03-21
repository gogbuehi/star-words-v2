import styled from "styled-components";
import {BASE_UNIT} from "./starMaths.layout";
import {getAltColor, getButtonBgColor, getButtonColor} from "../../hooks/useTheme";

export const NumTable = styled.table`
  margin:0px;
  padding: 0px;
  border-collapse: collapse;
  
`
export const NumCell = styled.td`
  width: ${BASE_UNIT}px;
  height: ${BASE_UNIT}px;
  text-align: center;
  background-color: ${getButtonBgColor};
  color: #303030;
  border-radius: 5px;
  margin: 0px;
  padding: 0px;
  
  font-size: large;
  font-weight: bolder;
  cursor: pointer;
`;

export const NumRowCell = styled(NumCell)`
    // width: ${BASE_UNIT * 3}px;
    height: ${BASE_UNIT}px;
    background-color: ${getButtonColor};
    color: ${getAltColor};
`;
