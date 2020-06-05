import { readWmassOutput } from './wmass';
import { readWdispOutput } from './wdisp';
import { readWzqOutput } from './wzq';

export * from './wmass';
export * from './wdisp';
export * from './wzq';
export function readOutputs(dir: string) {
  readWmassOutput(dir);
  readWdispOutput(dir);
  readWzqOutput(dir);
}
