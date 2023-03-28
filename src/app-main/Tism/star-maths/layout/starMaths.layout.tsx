import styled from "styled-components";
import {getBorderColor, Theme} from "../../hooks/useTheme";
import { ReactElement } from "react";

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

export const BaseFlexContainer = styled.div`
  // Height min
  // min-height: ${BASE_UNIT}px;
  // Width min
  min-width: ${BASE_UNIT}px;
  // Display style
  display: inline-flex;
  vertical-align: top;
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
  // line-height: ${BASE_UNIT}px;
  text-align: left;
  // Border style
  border-radius: 20px;
  // Colours
`;
export const BaseContainer = styled.div`
  // Height min
  min-height: ${BASE_UNIT}px;
  // Width min
  min-width: ${BASE_UNIT}px;
  // Display style
  padding: 0px;
  margin: ${BASE_UNIT/4}px;
  // line-height: ${BASE_UNIT}px;
  text-align: left;
  // Border style
  // border: solid 1px #61dafb;
  border: solid 1px ${getBorderColor};
  border-radius: 20px;
  // Colours
`;

const CenteredText = styled.div`
  width: 100%;
  text-align: center;
  padding: 0px;
  margin: 0px;
  border: solid 1px yellow;
  box-sizing: border-box;
  border-radius: 20px;
  font-family: monospace;
  font-weight: normal;
  font-size: ${BASE_UNIT/4}px;
  color: yellow;
`

type MultiplierProps = {
  width?: number;
  height?: number;
}
export const MultiplierContainer = styled(BaseContainer)`
  width: ${({width=1}: MultiplierProps) => (width)*BASE_UNIT}px;
  height: ${({height=2}: MultiplierProps) => (height)*BASE_UNIT}px;
  min-height: ${({height=1}: MultiplierProps) => height < 1 ? (height)*BASE_UNIT : BASE_UNIT}px;
`;
export const MultiplierBaseFlexContainer = styled(BaseFlexContainer)`
  width: ${({width=1}: MultiplierProps) => (width)*BASE_UNIT}px;
  height: ${({height=2}: MultiplierProps) => (height)*BASE_UNIT}px;
  line-height: ${({height=1}: MultiplierProps) => height < 1 ? (height)*BASE_UNIT : BASE_UNIT}px;
  min-height: ${({height=1}: MultiplierProps) => height < 1 ? (height)*BASE_UNIT : BASE_UNIT}px;
  
  margin: 0px;
`;

type HeadingMultiplierContainerProps = {
  width?: number;
  height?: number;
  theme: Theme;
  title?: string;
  children: ReactElement;
}
export const HeadingMultiplierContainer = (props: HeadingMultiplierContainerProps) => {
  const {theme, title='', width, height, children} = props;

  return <>
    <MultiplierContainer width={width} height={height} theme={theme}>
      {title ? <>
          <MultiplierBaseFlexContainer width={width} height={0.5} theme={theme}><CenteredText>{title}</CenteredText></MultiplierBaseFlexContainer>
        <MultiplierBaseFlexContainer width={width} height={height ? height-0.5 : (height || 2)-0.5} theme={theme}>{children}</MultiplierBaseFlexContainer>
        </>
        :
        <>
          <MultiplierBaseFlexContainer width={width} height={height} theme={theme}>{children}</MultiplierBaseFlexContainer>
        </>}
    </MultiplierContainer>
  </>
};


