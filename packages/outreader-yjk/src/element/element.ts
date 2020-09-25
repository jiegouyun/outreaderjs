import { readWpjOutput } from '../wpj';
import { IElement, hashStr } from '@outreader/core';

export async function readElement(dir: string): Promise<IElement> {
  const wpj = await readWpjOutput(dir);

  const hash = hashStr(
    wpj ? wpj.hash : '', // +
    // (wwnl ? wwnl.hash : '')
  );

  return {
    hash,
    dir,
    wpj,
  };
}
