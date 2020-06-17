import { readWmassOutput } from '../wmass';
import { readWdispOutput } from '../wdisp';
import { readWzqOutput } from '../wzq';
import { readWv02qOutput } from '../wv02q';
import { readConcreteSteelOutput } from '../concreteSteel';
import { readRebarOutput } from '../rebar';
import { IStructure, hashStr } from '@outreader/core';

export async function readStructure(dir: string): Promise<IStructure> {
  const wmass = await readWmassOutput(dir);
  const wdisp = await readWdispOutput(dir);
  const wzq = await readWzqOutput(dir);
  const wv02q = await readWv02qOutput(dir);
  const concreteSteel = await readConcreteSteelOutput(dir);
  const rebar = await readRebarOutput(dir);
  const hash = hashStr(
    (wmass ? wmass.hash : '') +
      (wdisp ? wdisp.hash : '') +
      (wzq ? wzq.hash : '') +
      (wv02q ? wv02q.hash : '') +
      (concreteSteel ? concreteSteel.hash : '') +
      (rebar ? rebar.hash : ''),
  );

  return {
    hash,
    wmass,
    wdisp,
    wv02q,
    wzq,
    concreteSteel,
    rebar,
  };
}
