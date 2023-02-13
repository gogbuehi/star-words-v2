import styled from "styled-components";

export const DeviceContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #a0a0a0;
  padding: 20px;
`;

export const DeviceHeading = styled.h1`
  text-align: center;
`;
export const OutputSection = styled.div`
  background-color: #282c34;
  padding: 20px;
  width: auto;
`;

export const MathBox = styled.div`
  border: solid 1px yellow;
  border-radius: 50px;
  padding: 30px;
  margin: 5px;
  text-align: justify;
  vertical-align: top;
  //color: #e0d080;
  //background-color: #302000;
  font-weight: bold;
  font-size: 16pt;
  width: fit-content;
  display: inline-block;
  overflow: scroll;
`;

export const SelectedMathBox = styled(MathBox)`
  background-color: #282c34;
  color: #61dafb;
`;


export const LeftBox = styled(MathBox)`
  width: 20%;
  
`;
export const SpeakerBox = styled(LeftBox)`
  height: 200px;
`;

export const OutputBox = styled(MathBox)`
  color: greenyellow;
  background-color: black;
  font-family: "Courier New";
  height: 200px;
  width: 30%;
`;

export const  TimerBox = styled.div`
  position: absolute;
  right: 50px;
  border: solid 1px white;
  border-radius: 15px;
  padding: 10px;
`;