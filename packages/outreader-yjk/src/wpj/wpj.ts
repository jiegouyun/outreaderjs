import {
  hashFile,
  hashStr,
  IColumnPj,
  IWpj,
  readLineByLine,
} from '@outreader/core';
import path from 'path';
import fs from 'fs';

export async function readWpjOutput(dir: string): Promise<IWpj | undefined> {
  const folder = fs.readdirSync(dir);
  const filenames = folder.filter((item) => {
    return item.match(/wpj\d*.out/gi);
  });
  if (!filenames.length) {
    console.error('cannot find file', 'wpj*.out');
    return;
  }
  filenames.sort((a, b) => parseInt(b.substr(3)) - parseInt(a.substr(3)));
  const files = filenames.map((value) => path.join(dir, value));
  const storeys = filenames.length;
  let wpj: IWpj = {
    hash: hashStr(files.map((file) => hashFile(file)).join('')),
    column: {
      storeyID: [],
      colName: [],
      colID: [],
      secType: [],
      colProps: [],
      startNode: [],
      endNode: [],
      section: [],
      ang: [],
      uc: [],
      rs: [],
      rsv: [],
      cbX: [],
      cbY: [],
      allExtracted: false,
    },
  };

  let colIDMap = new Map<number, number>();
  try {
    for await (const file of files) {
      // Define flag
      let flags: IFlags = {
        flag: '',
        colFlag: 0,
        propsFlag: 0,
      };

      // Add storeyID
      const storey = parseInt(path.basename(file, '.out').substr(3));
      wpj.column.storeyID.push(storey);

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

        // Extract column{}
        if (!wpj.column.allExtracted) {
          [flags, wpj.column, colIDMap] = extractColumnPj(
            flags,
            lineArray,
            wpj.column,
            colIDMap,
            [storey, storeys],
          );
        }
      });
    }
  } catch (error) {
    console.error(error);
  }

  console.log(wpj.hash);
  return wpj;
}

export function extractColumnPj(
  flags: IFlags,
  lineArray: string[],
  column: IColumnPj,
  colIDMap: Map<number, number>,
  storeyInfo: number[],
): [IFlags, IColumnPj, Map<number, number>] {
  let flag = flags.flag;
  let col = flags.colFlag;
  let propsFlag = flags.propsFlag;
  const [storey, storeys] = storeyInfo;

  if (lineArray[0] === '柱配筋设计及验算') {
    flag = 'keyColumn';
  } else if (lineArray[0] === '支撑配筋设计及验算') {
    flag = '';
    if (storey === 1) {
      column.allExtracted = true;
    }
  }

  if (flag === 'keyColumn') {
    if (lineArray[0] === 'N-C') {
      const startNode = Number(lineArray[3]);
      const endNode = Number(lineArray[5]);
      col =
        (colIDMap.get(startNode) === undefined
          ? colIDMap.size
          : colIDMap.get(startNode)) || col;

      if (!colIDMap.has(startNode)) {
        colIDMap.set(endNode, colIDMap.size);
        column.colName.push(colIDMap.size);
        column.colID.push(Array(storeys));
        column.startNode.push(Array(storeys));
        column.endNode.push(Array(storeys));
        column.secType.push(Array(storeys));
        column.section.push(Array(storeys));
        column.ang.push(Array(storeys));
        column.colProps.push(Array(storeys));
        column.uc.push(Array(storeys));
        column.rs.push(Array(storeys));
        column.rsv.push(Array(storeys));
        column.cbX.push(Array(storeys));
        column.cbY.push(Array(storeys));
      } else {
        colIDMap.delete(startNode);
        colIDMap.set(endNode, col);
      }

      column.colID[col][storeys - storey] = Number(lineArray[1]);
      column.startNode[col][storeys - storey] = Number(lineArray[3]);
      column.endNode[col][storeys - storey] = Number(lineArray[5]);
      column.secType[col][storeys - storey] = Number(lineArray[6]);
      column.section[col][storeys - storey] = lineArray[9]
        .split('*')
        .map((value) => Number(value));
      column.ang[col][storeys - storey] = Number(lineArray[11] || 0);

      propsFlag = 1;
    }

    if (lineArray[1] === 'Nu') {
      // console.log(lineArray);
      column.uc[col][storeys - storey] = Number(lineArray[4]);
      column.rs[col][storeys - storey] = Number(lineArray[6]);
      column.rsv[col][storeys - storey] = Number(lineArray[8]);
    }

    propsFlag && propsFlag++;
    if (propsFlag === 4) {
      column.colProps[col][storeys - storey] = lineArray;
    }

    if (lineArray[0] === '抗剪承载力') {
      // console.log(lineArray);
      column.cbX[col][storeys - storey] = Number(lineArray[2]);
      column.cbY[col][storeys - storey] = Number(lineArray[4]);
    }
  }

  flags = {
    flag: flag,
    colFlag: col,
    propsFlag: propsFlag,
  };
  return [flags, column, colIDMap];
}

/**
 * @description devide line string and return string array
 * @param line: original line string
 */
function lineToArray(line: string): string[] {
  // const regexp: RegExp = /[a-zA-Z\u4e00-\u9fa5]+\d*\-?\d*|-?\d+\.?\d*[a-zA-Z]*\+?\d*/g;
  const regexp: RegExp = /[a-zA-Z\u4e00-\u9fa50-9\u2150-\u218f\.\-\+\_\*]+/g;
  return line.match(regexp) || [];
}

interface IFlags {
  flag: string;
  colFlag: number;
  propsFlag: number;
}
