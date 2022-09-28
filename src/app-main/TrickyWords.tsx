import styled from "styled-components";
import {useState} from "react";

const TrickyWords = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [randomWordList, setRandomWordList] = useState(WORD_LIST);
  const [wordRound, setWordRound] = useState(1);
  const [trickyWords, setTrickyWords] = useState(new Set());

  const WordBoxComponent = wordRound === 1 ? WordBox : WordBoxRound2;
  return <div>
    <h1>Tricky Words</h1>
    <h2><WordBoxComponent>Round: {wordRound}</WordBoxComponent></h2>
    <div>
      <h2>Read the word</h2>
      <WordBoxComponent
      onClick={() => { nextWord(wordIndex, wordRound, setWordIndex, setRandomWordList, setWordRound); }}
      >{randomWordList[wordIndex]}</WordBoxComponent>
      <br />
      <TrickyWordButton
      onClick={() => {
        console.log(`Add tricky word: ${randomWordList[wordIndex]}`);
        trickyWords.add(randomWordList[wordIndex]);
        const updatedTrickyWords = new Set(trickyWords.values());
        setTrickyWords(updatedTrickyWords);
      }}
      >TRICKY</TrickyWordButton>
    </div>
    <div>
      {Array.from(trickyWords.values()).map((value, index) => {
        return <TrickyWordBox key={index}
        onClick={() => {
          console.log(`Remove tricky word: ${value}`);
          trickyWords.delete(value);
          const updatedTrickyWords = new Set(trickyWords.values());
          setTrickyWords(updatedTrickyWords);
        }
        }>{`${value}`}</TrickyWordBox>
      })}
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
`;

const WordBoxRound2 = styled(WordBox)`
  border: solid 3px forestgreen;
  color: #e0d080;
  background-color: #002030;
`;

const TrickyWordButton = styled.button`
  border: solid 1px #800020 ;
  border-radius: 5px;
  padding: 20px;
  margin: 10px;
  text-align: center;
  vertical-align: center;
  color: #e0d0e0;
  background-color: #303030;
  
  font-weight: bold;
  font-size: x-large;
  width: fit-content;

`;

const TrickyWordBox = styled.div`
  border: solid 1px darkolivegreen;
  border-radius: 30px;
  padding: 10px;
  margin: 5px;
  text-align: center;
  vertical-align: center;
  color: #80e0d0;
  background-color: #000030;
  font-weight: bold;
  font-size: x-large;
  width: fit-content;
  display: inline-block;
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
  currentRound: number,
  updateIndexCallback: (num: number) => any,
  updateWordListCallback: (wordList: any[]) => any,
  updateRoundCallback: (num: number) => any
) => {
  const modIndex = (index+1) % WORD_LIST.length;
  if (modIndex === 0) {
    const wordList = randomizeWordList();
    updateWordListCallback(wordList);
    updateRoundCallback(currentRound + 1)

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
