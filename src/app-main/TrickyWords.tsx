import styled from "styled-components";
import {useState} from "react";

const TrickyWords = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [randomWordList, setRandomWordList] = useState(WORD_LIST);
  return <div>
    <h1>Tricky Words</h1>
    <div>
      <h2>What's the word?</h2>
      <WordBox
      onClick={() => { nextWord(wordIndex, setWordIndex, setRandomWordList); }}
      >{randomWordList[wordIndex]}</WordBox>
    </div>
  </div>
}

const WordBox = styled.div`
  border: solid 3px yellow;
  border-radius: 30px;
  padding: 30px;
  margin: 10px;
  text-align: center;
  vertical-align: center;
  color: #e0d080;
  background-color: #302000;
  font-weight: bold;
  font-size: xxx-large;
  width: fit-content;
  display: inline-block;
;
`;

const WORD_LIST = [
  'photograph',
  'apatosaurus',
  'Robin Hood',
  'frightened',
  'd',
  'b',
  'again',
  'strawberries',
  'giant',
  'magic',
  'over',
  'began',
  'adventure',
  'drink',
  'climbed',
  'mountain',
  'desert',
  'jungle',
  'bumble-bee',
  'called',
  'inside',
  'smaller',
  'outside',
  'village',
  'snow',
  'fight',
  'grandfather',
  'little'


];

const nextWord = (
  index: number,
  updateIndexCallback: (num: number) => any,
  updateWordListCallback: (wordList: any[]) => any
) => {
  const modIndex = (index+1) % WORD_LIST.length;
  if (modIndex === 0) {
    const wordList = randomizeWordList();
    updateWordListCallback(wordList);

  }

  updateIndexCallback(modIndex);
}
// updateRandomWordListCallback: (arr: [string]) => any
const randomizeWordList = (): any[] => {
  const randomWordList = [];
  const wordList = [];
  wordList.push(...WORD_LIST);
  for(let i = 0; i < WORD_LIST.length; i++) {
    const j = Math.floor(Math.random() * wordList.length);
    randomWordList.push(wordList.splice(j,1).pop());
  }
  console.log(`New Random Word List: ${randomWordList}`);
  return randomWordList;

}

 export {TrickyWords, randomizeWordList, WORD_LIST};
