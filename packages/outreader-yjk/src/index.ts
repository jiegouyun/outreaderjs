import { readWmassOutput } from './wmass';
import { readWdispOutput } from './wdisp';

export * from './wmass';
export * from './wdisp';
export function readOutputs(dir: string) {
  readWmassOutput(dir);
  readWdispOutput(dir);
}
