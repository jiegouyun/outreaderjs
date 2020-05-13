import * as fs from "fs";
import * as readline from "readline";

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
    input: fs.createReadStream(path),
  });

  for await (const line of rl) {
    processFunc(line);
  }
}
