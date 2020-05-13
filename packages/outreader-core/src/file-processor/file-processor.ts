import * as fs from "fs";
import * as readline from "readline";
import * as iconv from "iconv-lite";

/**
 * @description read a text file line by line
 * @param path: string;
 * @param processFunc: function;
 */
export async function readLineByLine(
  path: string,
  processFunc: (line: string) => any
) {
  if (!fs.existsSync(path)) {
    throw new Error(`Can not find ${path}!`);
  }

  const rl = readline.createInterface({
    input: fs
      .createReadStream(path)
      .pipe(iconv.decodeStream("gb2312"))
      .pipe(iconv.encodeStream("utf8")),
  });

  for await (const line of rl) {
    processFunc(line);
  }
}
