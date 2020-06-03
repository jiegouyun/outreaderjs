import { readWdispOutput, IWdisp } from './wdisp';
import * as path from 'path';

describe('wdisp', () => {
  const dir = path.join(__dirname, '../../../../fixtures/yjk/1');
  let wdisp: IWdisp;

  beforeEach(async () => {
    wdisp = await readWdispOutput(dir);
  });

  it('should read wdisp.out', async () => {
    expect(wdisp).toBeTruthy();
  });

  it('should extract driftSeismicX', async () => {
    const driftSeismicX = wdisp.driftSeismicX;
    expect(driftSeismicX.storeyID[4]).toBe(50);
    expect(driftSeismicX.drift[4]).toBe(1371);
  });

  it('should extract driftSeismicTwoWayX', async () => {
    const driftSeismicTwoWayX = wdisp.driftSeismicTwoWayX;
    expect(driftSeismicTwoWayX.storeyID[4]).toBe(50);
    expect(driftSeismicTwoWayX.drift[4]).toBe(1370);
  });

  it('should extract driftSeismicXEccP', async () => {
    const driftSeismicXEccP = wdisp.driftSeismicXEccP;
    expect(driftSeismicXEccP.storeyID[4]).toBe(50);
    expect(driftSeismicXEccP.drift[4]).toBe(1295);
  });

  it('should extract driftSeismicXEccN', async () => {
    const driftSeismicXEccN = wdisp.driftSeismicXEccN;
    expect(driftSeismicXEccN.storeyID[4]).toBe(50);
    expect(driftSeismicXEccN.drift[4]).toBe(1323);
  });

  it('should extract driftSeismicY', async () => {
    const driftSeismicY = wdisp.driftSeismicY;
    expect(driftSeismicY.storeyID[4]).toBe(50);
    expect(driftSeismicY.drift[4]).toBe(875);
  });

  it('should extract driftSeismicTwoWayY', async () => {
    const driftSeismicTwoWayY = wdisp.driftSeismicTwoWayY;
    expect(driftSeismicTwoWayY.storeyID[4]).toBe(50);
    expect(driftSeismicTwoWayY.drift[4]).toBe(872);
  });

  it('should extract driftSeismicYEccP', async () => {
    const driftSeismicYEccP = wdisp.driftSeismicYEccP;
    expect(driftSeismicYEccP.storeyID[4]).toBe(50);
    expect(driftSeismicYEccP.drift[4]).toBe(837);
  });

  it('should extract driftSeismicYEccN', async () => {
    const driftSeismicYEccN = wdisp.driftSeismicYEccN;
    expect(driftSeismicYEccN.storeyID[4]).toBe(50);
    expect(driftSeismicYEccN.drift[4]).toBe(822);
  });

  it('should extract driftWindXP', async () => {
    const driftWindXP = wdisp.driftWindXP;
    expect(driftWindXP.storeyID[4]).toBe(50);
    expect(driftWindXP.drift[4]).toBe(1925);
    expect(driftWindXP.ratio[4]).toBe(1.06);
  });

  it('should extract driftWindXN', async () => {
    const driftWindXN = wdisp.driftWindXN;
    expect(driftWindXN.storeyID[4]).toBe(50);
    expect(driftWindXN.drift[4]).toBe(1925);
    expect(driftWindXN.ratio[4]).toBe(1.06);
  });

  it('should extract driftWindYP', async () => {
    const driftWindYP = wdisp.driftWindYP;
    expect(driftWindYP.storeyID[4]).toBe(50);
    expect(driftWindYP.drift[4]).toBe(682);
    expect(driftWindYP.ratio[4]).toBe(1.08);
  });

  it('should extract driftWindYN', async () => {
    const driftWindYN = wdisp.driftWindYN;
    expect(driftWindYN.storeyID[4]).toBe(50);
    expect(driftWindYN.drift[4]).toBe(682);
    expect(driftWindYN.ratio[4]).toBe(1.08);
  });

  it('should extract ratioSeismicX', async () => {
    const ratioSeismicX = wdisp.ratioSeismicX;
    expect(ratioSeismicX.storeyID[4]).toBe(50);
    expect(ratioSeismicX.ratioD[4]).toBe(1.0);
  });

  it('should extract ratioSeismicXEccP', async () => {
    const ratioSeismicXEccP = wdisp.ratioSeismicXEccP;
    expect(ratioSeismicXEccP.storeyID[4]).toBe(50);
    expect(ratioSeismicXEccP.ratioD[4]).toBe(1.06);
  });

  it('should extract ratioSeismicXEccN', async () => {
    const ratioSeismicXEccN = wdisp.ratioSeismicXEccN;
    expect(ratioSeismicXEccN.storeyID[4]).toBe(50);
    expect(ratioSeismicXEccN.ratioD[4]).toBe(1.06);
  });

  it('should extract ratioSeismicY', async () => {
    const ratioSeismicY = wdisp.ratioSeismicY;
    expect(ratioSeismicY.storeyID[4]).toBe(50);
    expect(ratioSeismicY.ratioD[4]).toBe(1.02);
  });

  it('should extract ratioSeismicYEccP', async () => {
    const ratioSeismicYEccP = wdisp.ratioSeismicYEccP;
    expect(ratioSeismicYEccP.storeyID[4]).toBe(50);
    expect(ratioSeismicYEccP.ratioD[4]).toBe(1.05);
  });

  it('should extract ratioSeismicYEccN', async () => {
    const ratioSeismicYEccN = wdisp.ratioSeismicYEccN;
    expect(ratioSeismicYEccN.storeyID[4]).toBe(50);
    expect(ratioSeismicYEccN.ratioD[4]).toBe(1.08);
  });
});
