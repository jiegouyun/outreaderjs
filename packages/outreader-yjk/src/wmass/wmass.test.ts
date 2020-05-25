import { readWmassOutput } from "./wmass";
import * as path from "path";

describe("wmass", () => {
  const dir = path.join(__dirname, "../../../../fixtures/yjk/1");

  it("should read wmass.out", async () => {
    try {
      await readWmassOutput(dir)
    } catch (error) {
      console.error(error);
    }
  });
});
