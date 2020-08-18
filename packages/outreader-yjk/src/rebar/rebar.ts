import {
  hashFile,
  IRebar,
  IArea,
  IRebarQuantity,
  IProjectQuantity,
  readLineByLine,
} from '@outreader/core';
import fs from 'fs';
import path from 'path';

// Define FLAG
let FLAG: string;

export async function readRebarOutput(
  dir: string,
): Promise<IRebar | undefined> {
  const files = fs.readdirSync(dir);
  const filename = files.filter(function (item) {
    return item.match(/全楼钢筋用量\w*.txt/gi);
  });
  if (!filename[0]) {
    console.error('cannot find file', '全楼钢筋用量.txt');
    return;
  }
  const file = path.join(dir, filename[0]);
  let rebar: IRebar = {
    hash: hashFile(file),
    area: {
      storeyID: [],
      storey: [],
      allExtracted: false,
    },
    floorRebar: {
      storeyID: [],
      storey: [],
      perArea: [],
      allExtracted: false,
    },
    beamRebar: {
      storeyID: [],
      storey: [],
      perArea: [],
      allExtracted: false,
    },
    columnRebar: {
      storeyID: [],
      storey: [],
      perArea: [],
      allExtracted: false,
    },
    wallRebar: {
      storeyID: [],
      storey: [],
      perArea: [],
      allExtracted: false,
    },
    projectRebar: {
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

      // Extract area{}
      if (!rebar.area.allExtracted) {
        rebar.area = extractArea(lineArray, rebar.area);
      }

      // Extract floorRebar{}
      if (!rebar.floorRebar.allExtracted) {
        rebar.floorRebar = extractFloorRebar(lineArray, rebar.floorRebar);
      }

      // Extract beamRebar{}
      if (!rebar.beamRebar.allExtracted) {
        rebar.beamRebar = extractBeamRebar(lineArray, rebar.beamRebar);
      }

      // Extract columnRebar{}
      if (!rebar.columnRebar.allExtracted) {
        rebar.columnRebar = extractColumnRebar(lineArray, rebar.columnRebar);
      }

      // Extract wallRebar{}
      if (!rebar.wallRebar.allExtracted) {
        rebar.wallRebar = extractWallRebar(lineArray, rebar.wallRebar);
      }

      // Extract projectRebar{}
      if (!rebar.projectRebar.allExtracted) {
        rebar.projectRebar = extractProjectRebar(lineArray, rebar.projectRebar);
      }
    },
    { encoding: 'gb2312' },
  );

  return rebar;
}

export function extractArea(lineArray: string[], area: IArea): IArea {
  if (lineArray[0] === '楼面面积') {
    FLAG = 'keyArea';
  } else if (lineArray[0] === '合计') {
    area.totalArea = Number(lineArray[1]);
    area.allExtracted = true;
    FLAG = '';
  }

  if (FLAG === 'keyArea') {
    if (!isNaN(Number(lineArray[0]))) {
      area.storeyID.push(Number(lineArray[0]));
      area.storey.push(Number(lineArray[1]));
    }
  }

  return area;
}

export function extractFloorRebar(
  lineArray: string[],
  partRebar: IRebarQuantity,
): IRebarQuantity {
  partRebar = extractRebar(lineArray, partRebar, '楼板钢筋用量', '合计');

  return partRebar;
}

export function extractBeamRebar(
  lineArray: string[],
  partRebar: IRebarQuantity,
): IRebarQuantity {
  partRebar = extractRebar(lineArray, partRebar, '梁钢筋用量', '合计');

  return partRebar;
}

export function extractColumnRebar(
  lineArray: string[],
  partRebar: IRebarQuantity,
): IRebarQuantity {
  partRebar = extractRebar(lineArray, partRebar, '柱钢筋用量', '合计');

  return partRebar;
}

export function extractWallRebar(
  lineArray: string[],
  partRebar: IRebarQuantity,
): IRebarQuantity {
  partRebar = extractRebar(lineArray, partRebar, '墙钢筋用量', '合计');

  return partRebar;
}

export function extractProjectRebar(
  lineArray: string[],
  projectRebar: IProjectQuantity,
): IProjectQuantity {
  switch (lineArray[0]) {
    case '基础插筋':
      projectRebar.insertBasement = Number(lineArray[1]);
      break;
    case '工程总计钢筋用量':
      projectRebar.total = Number(lineArray[1]);
      break;
    case '单位面积钢筋用量':
      projectRebar.totalPerArea = Number(lineArray[1]);
      projectRebar.allExtracted = true;
  }

  return projectRebar;
}

export function extractRebar(
  lineArray: string[],
  partRebar: IRebarQuantity,
  beginKeywords: string,
  endKeywords: string,
): IRebarQuantity {
  if (lineArray[0] === beginKeywords) {
    FLAG = beginKeywords;
  } else if (lineArray[0] === endKeywords) {
    if (FLAG === beginKeywords) {
      partRebar.total = Number(lineArray[lineArray.length - 2]);
      partRebar.totalPerArea = Number(lineArray[lineArray.length - 1]);
      partRebar.allExtracted = true;
      FLAG = '';
    }
  }

  if (FLAG === beginKeywords) {
    if (!isNaN(Number(lineArray[0]))) {
      partRebar.storeyID.push(Number(lineArray[0]));
      partRebar.storey.push(Number(lineArray[lineArray.length - 2]));
      partRebar.perArea.push(Number(lineArray[lineArray.length - 1]));
    }
  }

  return partRebar;
}

/**
 * @description devide line string and return string array
 * @param line: original line string
 */
function lineToArray(line: string): string[] {
  // const regexp: RegExp = /[a-zA-Z\u4e00-\u9fa5]+\d*\-?\d*|-?\d+\.?\d*[a-zA-Z]*\+?\d*/g;
  const regexp: RegExp = /[a-zA-Z\u4e00-\u9fa50-9\u2150-\u218f\.\/\-\*\，\_]+/g;
  return line.match(regexp) || [];
}
