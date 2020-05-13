import { readLineByLine } from "../../utils";
import * as path from "path";

export async function readWmassOutput(dir: string) {
  const file = path.join(dir, "wmass.out");
  readLineByLine(file, (line: string) => {
    console.log(line);
  });
}
