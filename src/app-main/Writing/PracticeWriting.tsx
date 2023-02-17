import styled from "styled-components";
import {useState} from "react";

const PracticeWriting = () => {
  const [writtenText, setWrittenText] = useState('');
  return <WritingContainer>
    <h1>Write something</h1>
    <OutputText type="text" value={writtenText} readOnly={true}/>
    <br />
    <WritingArea type="text"
    onChange={(e) => {
      // console.log('something changed',e.target.value);
      setWrittenText(writtenText + e.target.value);
      e.target.value='';
    }
    }
    />
  </WritingContainer>
}

export default PracticeWriting;

const WritingContainer = styled.div`
  padding: 20px;
`;
const OutputText = styled.input`
  width: 800px;
`;
const WritingArea = styled(OutputText)`
  height: 400px;
  vertical-align: top;
  
`;
