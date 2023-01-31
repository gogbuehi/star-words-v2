import {CenterContent, WordBox} from "./app-main/TrickyWords";
import styled from "styled-components";
import {useState} from "react";

export const Giraffe =  () => {
  const [ch, setCh] = useState(1);
  const [p, setP] = useState(1);
  const [paragraph, setParagraph] = useState(0);
  const [lastP, setLastP] = useState(0);

  const currentLinesKey = `CH${ch}_P${p}`;
  let currentLines: string[]= [];
  if (BOOK_MAP.has(currentLinesKey)) {
    currentLines = BOOK_MAP.get(currentLinesKey) || currentLines;
  }
  const paragraphClick = () => {
    const nextParagraph = paragraph+1;
    if (nextParagraph >= currentLines.length) {
      const nextP = p+1;
      if (nextP > 3) {
        setP(1);
      } else {
        console.log('p+1',nextP);
        setP(nextP);

      }

      setParagraph(0);
      return;
    }
    setParagraph((paragraph+1)%currentLines.length);
  }
  return (<CenterContent>
    <h1>Giraffe</h1>
    {currentLines.map((text, index) => {

      const ElementToUse = index === paragraph ? CurrentBookText : index < paragraph ? PreviousBookText : NextBookText;
      return <ElementToUse
        key={`line-${index}`}
        onClick={paragraphClick}
      >{text}</ElementToUse>
    })}
  </CenterContent>);
}


const BookText = styled(WordBox)`
  text-align: justify;
`;

const CurrentBookText = styled(BookText)`
  background-color: black;
`;

const NextBookText = styled(BookText)`
  padding: 10px;
  font-size: xx-small;
`;

const PreviousBookText = styled(BookText)`
  background-color: #202020;
  font-size: xx-small;
  border-width: 1px;
  border-style: dotted;
  padding: 15px;
`;

const CH1_P1 = [
  "Not far from where I live there is a queer old empty wooden house standing all by itself on the side of the road.",
  "I long to explore inside it but the door is always locked, and when I peer through a window all I can see is darkness and dust.",
  "I know the ground floor used once to be a shop because I can still read the faded lettering across the front which says THE GRUBBER.",
  "My mother has told me that in our part of the country in the olden days a grubber was another name for a sweet-shop, and now every time I look at it I think to myself what a lovely old sweet-shop it must have been."
];

const CH1_P2 = [
  "On the shop-window itself somebody has painted in white the words FOR SAIL."
];

const CH1_P3 = [
  "One morning, I noticed that FOR SAIL had been scraped off the shop-window and in its place somebody had painted soled.",
  "I stood there staring at the new writing and wishing like mad that it had been me who had bought it because then I would have been able to make it into a grubber all over again.",
  "I have always longed and longed to own a sweet-shop.",
  "The sweet-shop of my dreams would be loaded from top to bottom with Sherbet Suckers and Caramel Fudge and Russian Toffee and Sugar Snorters and Butter Gumballs and thousands and thousands of other glorious things like that.",
  "Oh boy, what I couldn't have done with that old Grubber shop if it had been mine!"
];

const BOOK_MAP: Map<string, string[]> = new Map([
  ['CH1_P1', CH1_P1],
  ['CH1_P2', CH1_P2],
  ['CH1_P3', CH1_P3]
]);

