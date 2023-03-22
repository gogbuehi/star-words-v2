import styled from "styled-components";
import {BASE_UNIT} from "./starMaths.layout";

export const AnswerText = styled.div`
  text-align: justify;
  vertical-align: top;
  word-break: break-word;
  line-height: 20px;
  border-radius: ${BASE_UNIT/4}px;
  padding: ${BASE_UNIT/4}px;
  width: 100%;
  `;

export const OutputBox = styled(AnswerText)`
  color: greenyellow;
  background-color: black;
  font-family: "Courier New";
`;

export const TryAgainOutputBox = styled(OutputBox)`
  border-color: red;
  background-color: #200000;
`;
