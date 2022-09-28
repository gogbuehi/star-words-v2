import {randomizeWordList, WORD_LIST} from "./TrickyWords";
import exp from "constants";

describe('Tricky Words', () => {
  it('does something', () => {
    const randomWordList = randomizeWordList();
    expect(randomWordList).toHaveLength(WORD_LIST.length);
    for(let i = 0; i < WORD_LIST.length; i++) {
      const expectedWord = WORD_LIST[i];
      expect(randomWordList).toContain(expectedWord);
    }

  });
  it('randomizes teh word list', () => {

    for(let i = 0; i < 10; i++) {
      const randomWordList1 = randomizeWordList();
      const randomWordList2 = randomizeWordList();
      let misMatchCount = 0;
      for(let j = 0; j < randomWordList1.length; j++) {
        if (randomWordList1[j] != randomWordList2[j]) {
          misMatchCount++;
        }
      }
      expect(misMatchCount).toBeGreaterThan(0);
    }
  })

})
