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
      if (nextP > 16) {
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
  console.log(currentLines[paragraph]);
  return (<ParagraphBox>
    <h1>Giraffe</h1>
    <div>
      <FullWidthStoryBox>
        {currentLines[paragraph]}
      </FullWidthStoryBox>

    </div>
    <div>
      {currentLines.map((text, index) => {

        const ElementToUse = index === paragraph ? CurrentBookText : index < paragraph ? PreviousBookText : NextBookText;
        return <ElementToUse
          key={`line-${index}`}
          onClick={paragraphClick}
        >{textToWordBoxes(text)}</ElementToUse>
      })}
    </div>

  </ParagraphBox>);
}
const ParagraphBox = styled.div`
  vertical-align: text-top;
  width: 100%;
  padding: 10px;
`;
const StoryBox = styled.div`
  border: solid 1px darkgray;
  border-radius: 3px;
  padding: 10px;
  margin: 10px;
  //text-align: justify;
  vertical-align: text-top;
  //color: #e0d080;
  background-color: #303030;
  color: darkgray;
  font-weight: bold;
  font-size: 16pt;
  width: 15%;
  //height: 400px;
  display: inline-block;
  height: 200px;
`;

const FullWidthStoryBox = styled(StoryBox)`
  width: 80%;
  height: auto;
  background-color: #303030;
  color: greenyellow;
  padding: 30px;
  border-radius: 30px;
`;
const BookText = styled(StoryBox)`
  
`;

const CurrentBookText = styled(BookText)`
  background-color: black;
  font-size: xx-small;
`;

const NextBookText = styled(BookText)`
  font-size: xx-small;
`;

const PreviousBookText = styled(BookText)`
  background-color: #202020;
  font-size: xx-small;
`;

const WordBox = styled.span`
  display:inline-grid;
  margin: 0px;
  font-size: x-small;
  padding: 3px 3px 3px 3px;
  //border-bottom: dotted 1px #A8AcA4;
  //border-left: dotted 1px #A8AcA4;
  border-radius: 5px;
  width: fit-content;
  text-align: center;
  font-family: "Times New Roman";
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

const CH1_P4 = [
  "On my next visit to the Grubber, I was standing across the road gazing at the wonderful old bulding when suddenly an enormous bathtub came sailing out through one of the second-floor windows and crashed right on to the middle of the road!"
];

const CH1_P5 = [
  "A few moments later,l a white porcelain lavatory pan with the wooden seat still on it came flying out of the same window and landed with a wonderful splintering crash just beside the bathtub.",
  "This was followed by a kitchen sink and an empty canary-cage and a four-poster bed and two hot water bottles and a rocking horse and a sewing-machine and goodness knows what else besides."
];

const CH1_P6 = [
  "It looked as though some madman was ripping out the whole of the inside of the house, because hnow pieces of staircase and bits of the banisters and a whole lot of old floorboards came whistling through the windows."
];

const CH1_P7 = [
  "Then there was silence.",
  "I waited and waited but not another sound came from within the building.",
  "I crossed the road and stood right under the windows and called out, \"Is anybody at home?\""
];

const CH1_P8 = [
  "There was no answer."
];

const CH1_P9 = [
  "In the end it began to get dark so I had to turn away and start walking home.",
  "But you can bet your life nothing was going to stop me from hurrying back there again tomorrow morning to see what the next surprise was going to be."
];

const CH1_P10 = [
  "When I got back to the Grubber house the next morning, the first thing I noticed was the new door.",
  "The dirty old brown door had been taken out and in its place someone had fitted a brand-new red one",
  "The new door was fantastic.",
  "It was twice as high as the other one had been and it looked ridiculous.",
  "I couldn't begin to imagine who would want a tremendous tall door like that in his house unless it was a giant."
];

const CH1_P11 = [
  "As well as this, somebody had scraped away the 'SOLED' notice on the shop-window and now there was a whole lot of different writing all over the glass.",
  "I stood there reading it and reading it and trying to figure out what on earth it all meant."
];

const CH1_P12 = [
  "I tried to catch some sign or sound of movement inside the house but there was none...",
  "until all of a sudden...",
  "out of the corner of my eye...",
  "I noticed that one of the windows on the top floor was slowly beginning to open outwards..."
];

const CH1_P13 = [
  "Then a 'HEAD' appeard at the open window."
];

const CH1_P14 = [
  "I stared at the head.",
  "The head stared back at me with big round dark eyes."
];

const CH1_P15 = [
  "Suddenly, a second window was flung wide open and of all the crazy things a gigantic white bird hopped out and perched on the window-sill.",
  "I knew what this one was because of its amazing beak which was shaped like a huge orange-coloured basin.",
  "The Pelican looked down at me and sang out:"
];

const CH1_P16 = [
  "\"Oh, how I wish",
  "For a big fat fish!",
  "I'm as hungry as ever could be!",
  "A dish of fish is my only wish!",
  "How far are we from the sea?\""
]

const BOOK_MAP: Map<string, string[]> = new Map([
  ['CH1_P1', CH1_P1],
  ['CH1_P2', CH1_P2],
  ['CH1_P3', CH1_P3],
  ['CH1_P4', CH1_P4],
  ['CH1_P5', CH1_P5],
  ['CH1_P6', CH1_P6],
  ['CH1_P7', CH1_P7],
  ['CH1_P8', CH1_P8],
  ['CH1_P9', CH1_P9],
  ['CH1_P10', CH1_P10],
  ['CH1_P11', CH1_P11],
  ['CH1_P12', CH1_P12],
  ['CH1_P13', CH1_P13],
  ['CH1_P14', CH1_P14],
  ['CH1_P15', CH1_P15],
  ['CH1_P16', CH1_P16],
]);

const textToWordBoxes = (text:string) => {
  return text.split(/\s/).map((word, index) => {
    return (<WordBox key={`wb-${index}`}>{word}</WordBox>);
  })
}

