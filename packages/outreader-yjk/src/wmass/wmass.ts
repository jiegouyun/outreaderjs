import { readLineByLine } from "@outreader/core";
import * as path from "path";

export async function readWmassOutput(dir: string) {
  const file = path.join(dir, "wmass.out");
  readLineByLine(file, (line: string) => {
    // TODO
    // Extract valuable data from .out
    console.log(line);
  });
}
