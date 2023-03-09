type NumberLevelDatumConstructorArgs = {
  level1Complete: boolean;
  level2Complete: boolean;
  level3Complete: boolean;
  level4Complete: boolean;
}

export type ValidNumbers = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type ValidLevels = 1 | 2 | 3 | 4;
export class DataStorageSystem {
  private numberLevelBytes: Map<ValidNumbers, NumberLevelByte>;

  constructor() {
    this.numberLevelBytes = new Map();
    for(let i = 2; i < 13; i++) {
      this.numberLevelBytes.set(i as ValidNumbers, new NumberLevelByte(byteToBools(0)));
    }
  }

  public toString(): string {
    let hexString = '';
    for(let num = 2; num < 13; num++) {
      const numberLevelByte = this.numberLevelBytes.get(num as ValidNumbers);
      if (!numberLevelByte) throw new Error(`Programming error retrieving numberLevelBytes for Number(${num})`);
      hexString += `${num.toString(16)}${numberLevelByte.toString()}`;
    }
    return hexString;
  }

  // public toEncryptString(): string {
  //   let hexString = '';
  //   const levelMap: Map<string, string[]> = new Map();
  //   for(let num = 2; num < 13; num++) {
  //     const numberLevelByte = this.numberLevelBytes.get(num as ValidNumbers);
  //     if (!numberLevelByte) throw new Error(`Programming error retrieving numberLevelBytes for Number(${num})`);
  //     const levelHex = numberLevelByte.toString();
  //     if (!levelMap.has(levelHex)) { levelMap.set(levelHex, []) };
  //     const levelArray = levelMap.get(levelHex);
  //     if (!levelArray) throw new Error(`No levelArray found for levelHex(${levelHex})`);
  //     levelArray.push(num.toString(16));
  //   }
  //   return hexString;
  // }
  public fromHexString(hexString: string): void {
    // hexString.split('').forEach((hexValue, index) => {
    //   const num = index + 2;
    //   const numberLevelByte = this.numberLevelBytes.get(num as ValidNumbers);
    //   if (!numberLevelByte) throw new Error(`fromHexString(): Programming error retrieving numberLevelBytes for Number(${num})`);
    //   const byteNumber = parseInt(hexValue, 16);
    //   numberLevelByte.setInfo4Bit(byteToBools(byteNumber));
    // });
    const hexArray = hexString.split('');
    for(let index = 0; index < hexArray.length; index = index + 2) {
      const hexValue = hexArray[index+1];
      const num = (index/2)+2;
      const numberLevelByte = this.numberLevelBytes.get(num as ValidNumbers);
      if (!numberLevelByte) throw new Error(`fromHexString(): Programming error retrieving numberLevelBytes for Number(${num})`);
      const byteNumber = parseInt(hexValue, 16);
      numberLevelByte.setInfo4Bit(byteToBools(byteNumber));
    }
  }

  public levelComplete(num: ValidNumbers, level: ValidLevels): void {
    const numberLevelByte = this.numberLevelBytes.get(num);
    if (!numberLevelByte) throw new Error(`Cannot retrieve NumberLevelBytes for Number(${num}) & Level(${level})`);
    switch(level) {
      case 1:
        numberLevelByte.level1Complete();
        break
      case 2:
        numberLevelByte.level2Complete();
        break;
      case 3:
        numberLevelByte.level3Complete();
        break;
      case 4:
        numberLevelByte.level4Complete();
        break;
      default:
        throw new Error(`Cannot set level complete for Number(${num}) & Level(${level})`);
    }
  }
}

class NumberLevelByte {
  private info4Bit: number;

  public constructor(args: NumberLevelDatumConstructorArgs) {
    this.info4Bit = 0;
    this.setInfo4Bit(args);
  }

  public setInfo4Bit(args: NumberLevelDatumConstructorArgs) {
    const {
      level1Complete,
      level2Complete,
      level3Complete,
      level4Complete,
    } = args;
    this.info4Bit = 0;
    [level1Complete,
      level2Complete,
      level3Complete,
      level4Complete].forEach((value, index) => {
      const multiplier = Math.pow(2, index);
      this.info4Bit += boolean2Bit(value)*multiplier;
    });
  }

  public level1Complete(): void {
    const {
      level2Complete,
      level3Complete,
      level4Complete,
    } = byteToBools(this.info4Bit);

    this.setInfo4Bit({
      level1Complete: true,
      level2Complete,
      level3Complete,
      level4Complete,
    })
  }
  public level2Complete(): void {
    const {
      level1Complete,
      level3Complete,
      level4Complete,
    } = byteToBools(this.info4Bit);

    this.setInfo4Bit({
      level1Complete,
      level2Complete: true,
      level3Complete,
      level4Complete,
    })
  }
  public level3Complete(): void {
    const {
      level1Complete,
      level2Complete,
      level4Complete,
    } = byteToBools(this.info4Bit);

    this.setInfo4Bit({
      level1Complete,
      level2Complete,
      level3Complete: true,
      level4Complete,
    })
  }
  public level4Complete(): void {
    const {
      level1Complete,
      level2Complete,
      level3Complete,
    } = byteToBools(this.info4Bit);

    this.setInfo4Bit({
      level1Complete,
      level2Complete,
      level3Complete,
      level4Complete: true,
    })
  }
  public toString(): string {
    return this.info4Bit.toString(16);
  }
}

const boolean2Bit = (bool: boolean): number => {
  return bool ? 1 : 0;
}
const byteToBools = (num: number): NumberLevelDatumConstructorArgs => {
  let binaryString = num.toString(2);
  binaryString = `${leadingZeroes(4-binaryString.length)}${binaryString}`;
  const [level1Complete,
    level2Complete,
    level3Complete,
    level4Complete] = binaryString.split('').map((bit) => parseInt(bit));


  return {
    level1Complete: !!level1Complete,
    level2Complete: !!level2Complete,
    level3Complete: !!level3Complete,
    level4Complete: !!level4Complete
  };
}

const leadingZeroes = (numberOfZeroes: number): string => {
  let zeroes = '';
  for(let i = 0; i < numberOfZeroes; i++) {
    zeroes += '0';
  }
  return zeroes;
}
