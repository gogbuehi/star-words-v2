import styled from "styled-components";

const PracticeWriting = () => {
  return <WritingContainer>
    <h1>Write something</h1>
    <WritingArea type="text" />
  </WritingContainer>
}

export default PracticeWriting;

const WritingContainer = styled.div`
  padding: 20px;
`;

const WritingArea = styled.input`
  height: 100px;
  width: 400px;
`;
