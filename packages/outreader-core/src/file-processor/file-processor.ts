import fs from 'fs';
import path from 'path';
import readline from 'readline';
import iconv from 'iconv-lite';
import { keccak256 } from 'js-sha3';

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
 * @description calculate the unique hash of a file
 * @param pathName: string;
 */
export function hashFile(pathName: string) {
  if (!fs.existsSync(pathName)) {
    throw new Error(`Can not find ${pathName}!`);
  }

  return keccak256(fs.readFileSync(pathName));
}

/**
 * @description calculate the unique hash of a string
 * @param str: string;
 */
export function hashStr(str: string) {
  return keccak256(str);
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
