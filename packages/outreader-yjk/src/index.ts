import { readWmassOutput } from './wmass';

export * from './wmass';
export function readOutputs(dir: string) {
  readWmassOutput(dir);
}
