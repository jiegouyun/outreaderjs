import {
  hashFile,
  IColumnShear,
  IMomentPercent,
  IV02qFactor,
  IWv02q,
  readLineByLine,
} from '@outreader/core';
import fs from 'fs';
import path from 'path';

// Define flag
let FLAG = '';
let INFLAG = '';

export async function readWv02qOutput(
  dir: string,
): Promise<IWv02q | undefined> {
  const file = path.join(dir, 'wv02q.out');
  if (!fs.existsSync(file)) {
    console.error('cannot find file', file);
    return;
  }
  let wv02q: IWv02q = {
    hash: hashFile(file),
    momentPercent: {
      storeyID: [],
      towerID: [],
      percentColumnX: [],
      percentWallX: [],
      percentColumnY: [],
      percentWallY: [],
      percentWallXX: [],
      percentWallYX: [],
      percentEdgeX: [],
      percentWallXY: [],
      percentWallYY: [],
      percentEdgeY: [],
      allExtracted: false,
    },
    columnShear: {
      storeyID: [],
      towerID: [],
      columnX: [],
      wallX: [],
      totalX: [],
      percentColumnX: [],
      columnY: [],
      wallY: [],
      totalY: [],
      percentColumnY: [],
      percentWallXX: [],
      percentWallYX: [],
      percentEdgeX: [],
      percentWallXY: [],
      percentWallYY: [],
      percentEdgeY: [],
      allExtracted: false,
    },
    v02qFactor: {
      storeyID: [],
      towerID: [],
      factorX: [],
      factorY: [],
      allExtracted: false,
    },
  };

  await readLineByLine(file, (line: string) => {
    // Extract valuable data from .out

    if (line.length === 0) {
      return;
    }

    // Divide line into array
    const lineArray = lineToArray(line);
    if (lineArray.length === 0) {
      return;
    }

    // Extract momentPercent{}
    if (!wv02q.momentPercent.allExtracted) {
      wv02q.momentPercent = extractMomentPercent(
        lineArray,
        wv02q.momentPercent,
      );
    }

    // Extract columnShear{}
    if (!wv02q.columnShear.allExtracted) {
      wv02q.columnShear = extractColumnShear(lineArray, wv02q.columnShear);
    }

    // Extract v02qFactor{}
    if (wv02q.columnShear.allExtracted && !wv02q.v02qFactor.allExtracted) {
      wv02q.v02qFactor = extractv02qFactor(lineArray, wv02q.v02qFactor);
    }
  });

  return wv02q;
}

export function extractMomentPercent(
  lineArray: string[],
  momentPercent: IMomentPercent,
): IMomentPercent {
  if (
    lineArray[0] === '规定水平力下框架柱、短肢墙地震倾覆力矩百分比' ||
    lineArray[0] === '规定水平力下框架柱、短肢墙地震倾覆弯矩百分比'
  ) {
    FLAG = 'keyMomentPercent';
  } else if (
    lineArray[0] === '规定水平力下框架柱、短肢墙地震倾覆力矩（轴力方式）' ||
    lineArray[0] === '规定水平力下框架柱、短肢墙地震倾覆弯矩（轴力方式）'
  ) {
    if (FLAG === 'keyMomentPercent') {
      momentPercent.allExtracted = true;
    }
    FLAG = '';
    INFLAG = '';
  }

  if (FLAG === 'keyMomentPercent') {
    if (lineArray[lineArray.length - 1] === '边缘构件X力矩百分比') {
      INFLAG = 'keyMomentLackWallX';
    } else if (lineArray[lineArray.length - 1] === '边缘构件Y力矩百分比') {
      INFLAG = 'keyMomentLackWallY';
    }

    if (!isNaN(Number(lineArray[0]))) {
      if (lineArray[2] === 'X') {
        momentPercent.storeyID.push(Number(lineArray[0]));
        momentPercent.towerID.push(Number(lineArray[1]));
        momentPercent.percentColumnX.push(Number(lineArray[3]));
        momentPercent.percentWallX.push(Number(lineArray[4]));
      } else if (lineArray[2] === 'Y') {
        momentPercent.percentColumnY.push(Number(lineArray[3]));
        momentPercent.percentWallY.push(Number(lineArray[4]));
      }

      if (INFLAG === 'keyMomentLackWallX') {
        momentPercent.percentWallXX.push(Number(lineArray[6]));
        momentPercent.percentWallYX.push(Number(lineArray[7]));
        momentPercent.percentEdgeX.push(Number(lineArray[8]));
      } else if (INFLAG === 'keyMomentLackWallY') {
        momentPercent.percentWallXY.push(Number(lineArray[6]));
        momentPercent.percentWallYY.push(Number(lineArray[7]));
        momentPercent.percentEdgeY.push(Number(lineArray[8]));
      }
    }
  }

  return momentPercent;
}

export function extractColumnShear(
  lineArray: string[],
  columnShear: IColumnShear,
): IColumnShear {
  if (lineArray[0] === '框架柱地震剪力百分比') {
    FLAG = 'keyColumnShear';
  } else if (
    lineArray[0] === '框架柱风倾覆力矩百分比' ||
    lineArray[0] === '框架柱风倾覆弯矩百分比'
  ) {
    if (FLAG === 'keyColumnShear') {
      columnShear.allExtracted = true;
    }
    FLAG = '';
    INFLAG = '';
  }

  if (FLAG === 'keyColumnShear') {
    if (lineArray[lineArray.length - 1] === '边缘构件X剪力百分比') {
      INFLAG = 'keyShearLackWallX';
    } else if (lineArray[lineArray.length - 1] === '边缘构件Y剪力百分比') {
      INFLAG = 'keyShearLackWallY';
    }

    if (!isNaN(Number(lineArray[0]))) {
      if (lineArray[2] === 'X') {
        columnShear.storeyID.push(Number(lineArray[0]));
        columnShear.towerID.push(Number(lineArray[1]));
        columnShear.columnX.push(Number(lineArray[3]));
        columnShear.wallX.push(Number(lineArray[4]));
        columnShear.totalX.push(Number(lineArray[5]));
        columnShear.percentColumnX.push(Number(lineArray[7]));
      } else if (lineArray[2] === 'Y') {
        columnShear.columnY.push(Number(lineArray[3]));
        columnShear.wallY.push(Number(lineArray[4]));
        columnShear.totalY.push(Number(lineArray[5]));
        columnShear.percentColumnY.push(Number(lineArray[7]));
      }

      if (INFLAG === 'keyShearLackWallX') {
        columnShear.percentWallXX.push(Number(lineArray[6]));
        columnShear.percentWallYX.push(Number(lineArray[7]));
        columnShear.percentEdgeX.push(Number(lineArray[8]));
      } else if (INFLAG === 'keyShearLackWallY') {
        columnShear.percentWallXY.push(Number(lineArray[6]));
        columnShear.percentWallYY.push(Number(lineArray[7]));
        columnShear.percentEdgeY.push(Number(lineArray[8]));
      }
    }
  }

  return columnShear;
}

export function extractv02qFactor(
  lineArray: string[],
  v02qFactor: IV02qFactor,
): IV02qFactor {
  if (lineArray[0] === '0.2V0调整系数') {
    FLAG = 'keyV02qFactor';
  }

  if (FLAG === 'keyV02qFactor') {
    if (lineArray[0] === '层号') {
      v02qFactor.storeyID.push(Number(lineArray[1]));
      v02qFactor.towerID.push(Number(lineArray[3]));
    }
    if (!isNaN(Number(lineArray[0])) && lineArray.length === 4) {
      v02qFactor.factorX.push(Number(lineArray[0]));
      v02qFactor.factorY.push(Number(lineArray[1]));
    }
  }

  return v02qFactor;
}

/**
 * @description devide line string and return string array
 * @param line: original line string
 */
function lineToArray(line: string): string[] {
  // const regexp: RegExp = /[a-zA-Z\u4e00-\u9fa5]+\d*\-?\d*|-?\d+\.?\d*[a-zA-Z]*\+?\d*/g;
  const regexp: RegExp = /[a-zA-Z\u4e00-\u9fa50-9\u2150-\u218f\.\-\+\（\）\，\_\、]+/g;
  return line.match(regexp) || [];
}
