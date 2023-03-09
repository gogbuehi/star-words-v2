const CYPHER_LETTERS = 'zabcdefghjklmnor';
const BYTE_LETTER_INDECES = [0,1,3,7,15];
const NUMBER_LETTER_INDECES = [2,4,6,8,10,13,14,5,9,11,12];
const CYPHER_NAME = '9876123405 eoazwctdfqgkhumilnbpjrxsvy-4230571896';
const LETTER_INDECES = 'abcdefghijklmnopqrstuvwxyz 0123456789-';

type CypherSystemConstructorArgs = {
  name: string;
  data: string;
  score: number;
}
export class CypherSystem {
  private name: string;
  private cypherOffset: number;
  private encryptedName: string;
  private encryptedData: string;
  private encryptedScore: string;

  constructor({name, data, score}: CypherSystemConstructorArgs) {
    this.name = name;
    this.encryptedName = '';
    this.encryptName();
    this.cypherOffset = 1;
    this.encryptedData = '';
    this.encryptData(data);
    this.encryptedScore = score.toString(16);
  }

  public byteLetters(): string {
    return BYTE_LETTER_INDECES.map((index) => {
      const cypherIndex = (this.cypherOffset + index) % 16;
      return CYPHER_LETTERS.charAt(cypherIndex);
    })
      .join('');
  }

  public numberLetters(): string {
    return NUMBER_LETTER_INDECES.map((index) => {
      const cypherIndex = (this.cypherOffset + index) % 16;
      return CYPHER_LETTERS.charAt(cypherIndex);
    })
      .join('');
  }
  public encryptName(): string {
    const name = (this.name).toLowerCase();
    const nameArray = name.split('');
    const nameOffset = CYPHER_NAME.indexOf(nameArray[0]);
    const CYPHER_LENGTH = CYPHER_NAME.length;
    const encryptedName = nameArray.map((letter, index) => {
      const letterValue = LETTER_INDECES.indexOf(letter);
      const cypherIndex = (nameOffset + letterValue + Math.pow(index, 3))%CYPHER_LENGTH;
      return CYPHER_NAME.charAt(cypherIndex);
    }).join('');
    this.encryptedName = encryptedName;
    return this.encryptedName;
  }
  public encryptData(data: string): string {
    const byteLetters = this.byteLetters();
    const numberLetters = this.numberLetters();

    const levelMap: Map<string, string[]> = new Map();
    const dataArray = data.split('');
    for(let i = 0; i < dataArray.length; i = i + 2) {
      const hexNumberCharIndex = parseInt(dataArray[i], 16)-2;
      const hexLevelCharIndex = parseInt(dataArray[i+1], 16);

      const hexNumberChar = numberLetters.charAt(hexNumberCharIndex);
      const hexLevelChar = byteLetters.charAt(hexLevelCharIndex);


      if (!levelMap.has(hexLevelChar)) levelMap.set(hexLevelChar, []);
      const levelArray = levelMap.get(hexLevelChar);
      if (!levelArray) throw new Error(`No levelArray found for hexLevelChar(${hexLevelChar})`);
      levelArray.push(hexNumberChar);
    }
    let encryptedString = '';
    // @ts-ignore
    for( let [key, value] of levelMap) {
      encryptedString += `${key}${value.join('')}`;
    }
    this.encryptedData = encryptedString;

    return this.encryptedData;
  }

  public decryptData(encryptedData: string): string {

    const byteLetters = this.byteLetters();
    const numberLetters = this.numberLetters();
    const encryptedArray = encryptedData.split('');

    let currentByteLetter = '';
    const hexPairsArray: string[] = [];
    encryptedArray.forEach((dHex) => {
      const realValue = (byteLetters.includes(dHex) ? byteLetters.indexOf(dHex) : (numberLetters.indexOf(dHex) + 2)).toString(16);
      if (byteLetters.includes(dHex)) currentByteLetter = realValue;
      else {
        hexPairsArray.push(`${realValue}${currentByteLetter}`);
        // return `${realValue}${currentByteLetter}`;
      }
      // return '';
    });

    return hexPairsArray.sort().join('');
  }
  public encryptScore(score: number): string {
    return score.toString(7);
  }
}
