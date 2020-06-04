import { readWmassOutput } from './wmass';
import { readWdispOutput } from './wdisp';
import { readWzqOutput } from './wzq';
import { readWv02qOutput } from './wv02q';

export * from './wmass';
export * from './wdisp';
export * from './wzq';
export * from './wv02q';
export function readOutputs(dir: string) {
  readWmassOutput(dir);
  readWdispOutput(dir);
  readWzqOutput(dir);
  readWv02qOutput(dir);
}
