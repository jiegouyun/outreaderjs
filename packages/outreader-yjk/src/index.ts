import { readWmassOutput } from './wmass';
import { readWdispOutput } from './wdisp';
import { readWzqOutput } from './wzq';
import { readWv02qOutput } from './wv02q';

export * from './wmass';
export * from './wdisp';
export * from './wzq';
export * from './wv02q';
export async function readOutputs(dir: string) {
  const wmass = await readWmassOutput(dir);
  const wdisp = await readWdispOutput(dir);
  const wzq = await readWzqOutput(dir);
  const wv02q = await readWv02qOutput(dir);

  return {
    wmass,
    wdisp,
    wzq,
    wv02q,
  };
}
