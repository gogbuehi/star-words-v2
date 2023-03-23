import styled from "styled-components";
import {getBorderColor, Theme} from "../../hooks/useTheme";

export const BASE_UNIT = 80;

export const  StarMathsContainer = styled.div`
  width: 100%;
  margin: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: none;
  border-right: none;
`;

export const BaseContainer = styled.div`
  // Height min
  min-height: ${BASE_UNIT}px;
  // Width min
  min-width: ${BASE_UNIT}px;
  // Display style
  display: inline-flex;
  padding: 0px;
  margin: ${BASE_UNIT/4}px;
  line-height: ${BASE_UNIT}px;
  text-align: left;
  // Border style
  // border: solid 1px #61dafb;
  border: solid 1px ${getBorderColor};
  border-radius: 20px;
  // Colours
`;

type MultiplierProps = {
  width?: number;
  height?: number;
}
export const MultiplierContainer = styled(BaseContainer)`
  width: ${({width=1}: MultiplierProps) => (width)*BASE_UNIT}px;
  height: ${({height=1}: MultiplierProps) => (height)*BASE_UNIT}px;
`;

