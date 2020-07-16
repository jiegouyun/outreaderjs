import {
  hashFile,
  IQuantity,
  IConcreteSteel,
  readLineByLine,
} from '@outreader/core';
import fs from 'fs';
import path from 'path';

// Define FLAG
let STOREYID: number;
let FLAG: string;

export async function readConcreteSteelOutput(
  dir: string,
): Promise<IConcreteSteel | undefined> {
  const files = fs.readdirSync(dir);
  const filename = files.filter(function (item) {
    return item.match(/上部结构工程量\w*.txt/gi);
  });
  const file = path.join(dir, filename[0]);
  if (!fs.existsSync(file)) {
    console.error('cannot find file', file);
    return;
  }
  let concreteSteel: IConcreteSteel = {
    hash: hashFile(file),
    concrete: {
      storeyID: [],
      wall: [],
      beam: [],
      column: [],
      floor: [],
      storey: [],
      totalWall: 0,
      totalBeam: 0,
      totalColumn: 0,
      totalFloor: 0,
      totalStorey: 0,
      allExtracted: false,
    },
    steel: {
      storeyID: [],
      wall: [],
      beam: [],
      column: [],
      floor: [],
      storey: [],
      totalWall: 0,
      totalBeam: 0,
      totalColumn: 0,
      totalFloor: 0,
      totalStorey: 0,
      allExtracted: false,
    },
  };

  await readLineByLine(
    file,
    (line: string) => {
      // Extract valuable data from .out

      if (line.length === 0) {
        return;
      }

      // Divide line into array
      const lineArray = lineToArray(line);
      if (lineArray.length === 0) {
        return;
      }

      // Extract concrete{}
      if (
        !concreteSteel.concrete.allExtracted &&
        !concreteSteel.steel.allExtracted
      ) {
        concreteSteel = extractConcreteSteel(lineArray, concreteSteel);
      }
    },
    { encoding: 'UTF-16 LE' },
  );

  return concreteSteel;
}

export function extractConcreteSteel(
  lineArray: string[],
  concreteSteel: IConcreteSteel,
): IConcreteSteel {
  if (lineArray[0] === '第') {
    concreteSteel.concrete = extractStoreyID(lineArray, concreteSteel.concrete);
    concreteSteel.steel = extractStoreyID(lineArray, concreteSteel.steel);
  } else if (lineArray[0] === '全楼统计') {
    concreteSteel.concrete.allExtracted = true;
    concreteSteel.steel.allExtracted = true;
  }

  if (lineArray[0] === '砼等级') {
    FLAG = 'keyConcrete';
  } else if (lineArray[0] === '钢等级') {
    FLAG = 'keySteel';
  }

  if (FLAG === 'keyConcrete') {
    concreteSteel.concrete = extractQuantity(lineArray, concreteSteel.concrete);
  } else if (FLAG === 'keySteel') {
    concreteSteel.steel = extractQuantity(lineArray, concreteSteel.steel);
  }

  return concreteSteel;
}

export function extractStoreyID(
  lineArray: string[],
  quantity: IQuantity,
): IQuantity {
  STOREYID = Number(lineArray[1].slice(0, -3));
  for (let key in quantity) {
    if (quantity[key as keyof IQuantity] instanceof Array) {
      if (key === 'storeyID') {
        quantity.storeyID[STOREYID - 1] = STOREYID;
      } else {
        (quantity[key as keyof IQuantity] as number[])[STOREYID - 1] = 0;
      }
    }
  }

  return quantity;
}

export function extractQuantity(
  lineArray: string[],
  quantity: IQuantity,
): IQuantity {
  switch (lineArray[0]) {
    case '墙':
      quantity.wall[STOREYID - 1] = lineArray
        .slice(2)
        .reduce((sum, current) => sum + Number(current), 0);
      quantity.totalWall += quantity.wall[STOREYID - 1];
      break;
    case '梁':
      quantity.beam[STOREYID - 1] = lineArray
        .slice(2)
        .reduce((sum, current) => sum + Number(current), 0);
      quantity.totalBeam += quantity.beam[STOREYID - 1];
      break;
    case '柱':
      quantity.column[STOREYID - 1] = lineArray
        .slice(2)
        .reduce((sum, current) => sum + Number(current), 0);
      quantity.totalColumn += quantity.column[STOREYID - 1];
      break;
    case '楼板':
      quantity.floor[STOREYID - 1] = lineArray
        .slice(2)
        .reduce((sum, current) => sum + Number(current), 0);
      quantity.totalFloor += quantity.floor[STOREYID - 1];
      break;
    case '小计':
      quantity.storey[STOREYID - 1] = Number(lineArray[lineArray.length - 1]);
      quantity.totalStorey += quantity.storey[STOREYID - 1];
  }

  return quantity;
}

/**
 * @description devide line string and return string array
 * @param line: original line string
 */
function lineToArray(line: string): string[] {
  // const regexp: RegExp = /[a-zA-Z\u4e00-\u9fa5]+\d*\-?\d*|-?\d+\.?\d*[a-zA-Z]*\+?\d*/g;
  const regexp: RegExp = /[a-zA-Z\u4e00-\u9fa50-9\u2150-\u218f\.\/\*\，\_]+/g;
  return line.match(regexp) || [];
}
