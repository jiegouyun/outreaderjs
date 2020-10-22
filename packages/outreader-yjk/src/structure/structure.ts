import { readWmassOutput } from '../wmass';
import { readWdispOutput } from '../wdisp';
import { readWzqOutput } from '../wzq';
import { readWv02qOutput } from '../wv02q';
import { readConcreteSteelOutput } from '../concrete-steel';
import { readRebarOutput } from '../rebar';
import { readWpjOutput } from '../wpj';
import { IStructure, hashStr } from '@outreader/core';

export async function readYJKStructure(dir: string): Promise<IStructure> {
  const wmass = await readWmassOutput(dir);
  const wdisp = await readWdispOutput(dir);
  const wzq = await readWzqOutput(dir);
  const wv02q = await readWv02qOutput(dir);
  const concreteSteel = await readConcreteSteelOutput(dir);
  const rebar = await readRebarOutput(dir);
  const wpj = await readWpjOutput(dir);
  const hash = hashStr(
    (wmass ? wmass.hash : '') +
      (wdisp ? wdisp.hash : '') +
      (wzq ? wzq.hash : '') +
      (wv02q ? wv02q.hash : '') +
      (concreteSteel ? concreteSteel.hash : '') +
      (rebar ? rebar.hash : '') +
      (wpj ? wpj.hash : ''),
  );
  const software = 'YJK';
  const name = getProjectName(dir);

  return {
    hash,
    dir,
    name,
    software,
    wmass,
    wdisp,
    wv02q,
    wzq,
    concreteSteel,
    rebar,
    wpj,
  };
}

function getProjectName(dir: string): string {
  const paths = dir.split('/');
  if (paths[paths.length - 1].match('设计结果')) {
    return paths[paths.length - 2];
  }
  return paths[paths.length - 1];
}
