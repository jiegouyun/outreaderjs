import { readWzqOutput } from './wzq';
import { IWzq } from '@outreader/core';
import * as path from 'path';

describe('wzq', () => {
  const dir = path.join(__dirname, '../../../../fixtures/yjk/1');
  let wzq: IWzq;

  beforeEach(async () => {
    wzq = await readWzqOutput(dir);
  });

  it('should read wzq.out', async () => {
    expect(wzq).toBeTruthy();
  });

  it('should extract modeCoupling', async () => {
    const modeCoupling = wzq.modeCoupling;
    expect(modeCoupling.modeID[3]).toBe(4);
    expect(modeCoupling.period[3]).toBe(1.6191);
    expect(modeCoupling.factorX[3]).toBe(0.92);
  });

  it('should extract modeSeismic', async () => {
    const modeSeismic = wzq.modeSeismic;
    expect(modeSeismic.modeID[3]).toBe(4);
    expect(modeSeismic.period[3]).toBe(1.6242);
    expect(modeSeismic.factorX[3]).toBe(0.86);
  });

  it('should extract modeMass', async () => {
    const modeMass = wzq.modeMass;
    expect(modeMass.modeID[3]).toBe(4);
    expect(modeMass.factorX[3]).toBe(13.91);
    expect(modeMass.factorY[3]).toBe(1.5);
  });

  it('should extract seismicForce', async () => {
    const seismicForce = wzq.seismicForce;
    expect(seismicForce.storeyID[4]).toBe(50);
    expect(seismicForce.shearX[4]).toBe(3694.25);
    expect(seismicForce.shearY[4]).toBe(4011.83);
  });
});
