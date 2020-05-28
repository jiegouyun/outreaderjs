import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import * as iconv from 'iconv-lite';

/**
 * @description read a text file line by line
 * @param path: string;
 * @param processFunc: function;
 * @param options: IOptions;
 */
export async function readLineByLine(
  pathName: string,
  processFunc: (line: string) => any,
  options: {
    encoding?: string;
  } = {},
) {
  if (!fs.existsSync(pathName)) {
    throw new Error(`Can not find ${pathName}!`);
  }

  const rl = readline.createInterface({
    input: createUtf8Stream(pathName, options.encoding),
  });

  for await (const line of rl) {
    processFunc(line);
  }
}

/**
 * @description ensure a stream to be utf8
 * @param pathName: string
 * @param initial encoding
 */
function createUtf8Stream(pathName: string, encoding?: string) {
  const extname = path.extname(pathName);
  let stream;

  if (encoding) {
    stream = fs
      .createReadStream(pathName)
      .pipe(iconv.decodeStream(encoding))
      .pipe(iconv.encodeStream('utf8'));
  } else if (extname === '.out' || extname === '.OUT') {
    stream = fs
      .createReadStream(pathName)
      .pipe(iconv.decodeStream('gb2312'))
      .pipe(iconv.encodeStream('utf8'));
  } else {
    stream = fs.createReadStream(pathName);
  }

  return stream;
}

/**
 * @description extract data by keywords
 * @param lineArray: line array
 * @param key: keywords
 * @param keyIndex: keywords index
 * @param index: value index, can be array
 */
export function extractData(
  lineArray: string[],
  key: string,
  keyIndex: number = 0,
  index: number[] | number,
): string | string[] | undefined {
  if (lineArray[keyIndex] == key) {
    console.log(`key: ${key},
    kyeIndex: ${keyIndex},
    lineArray[keyIndex]: ${lineArray[keyIndex]},
    index: ${index}`);

    if (typeof index == 'number') {
      console.log(`return: ${lineArray[index] || ''}`);
      return lineArray[index] || '';
    } else if (typeof index == 'object') {
      let result: string[] = [];
      for (const i of index) {
        result.push(lineArray[i]);
      }
      console.log(`return: ${result}`);
      return result;
    }
  }
}
