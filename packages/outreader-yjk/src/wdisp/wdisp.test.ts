import { readWdispOutput } from './wdisp';
import { IWdisp } from '@outreader/core';
import * as path from 'path';
import { wdisp as wdisp1 } from '../../../../fixtures/test-result/yjk-1/wdisp';
import { wdisp as wdisp2 } from '../../../../fixtures/test-result/yjk-2/wdisp';

describe('wdisp1', () => {
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
    expect(driftSeismicX.storeyID[4]).toBe(wdisp1.storeyID);
    expect(driftSeismicX.drift[4]).toBe(wdisp1.driftSeismicXDrift);
  });

  it('should extract driftSeismicTwoWayX', async () => {
    const driftSeismicTwoWayX = wdisp.driftSeismicTwoWayX;
    expect(driftSeismicTwoWayX.storeyID[4]).toBe(wdisp1.storeyID);
    expect(driftSeismicTwoWayX.drift[4]).toBe(wdisp1.driftSeismicTwoWayXDrift);
  });

  it('should extract driftSeismicXEccP', async () => {
    const driftSeismicXEccP = wdisp.driftSeismicXEccP;
    expect(driftSeismicXEccP.storeyID[4]).toBe(wdisp1.storeyID);
    expect(driftSeismicXEccP.drift[4]).toBe(wdisp1.driftSeismicXEccPDrift);
  });

  it('should extract driftSeismicXEccN', async () => {
    const driftSeismicXEccN = wdisp.driftSeismicXEccN;
    expect(driftSeismicXEccN.storeyID[4]).toBe(wdisp1.storeyID);
    expect(driftSeismicXEccN.drift[4]).toBe(wdisp1.driftSeismicXEccNDrift);
  });

  it('should extract driftSeismicY', async () => {
    const driftSeismicY = wdisp.driftSeismicY;
    expect(driftSeismicY.storeyID[4]).toBe(wdisp1.storeyID);
    expect(driftSeismicY.drift[4]).toBe(wdisp1.driftSeismicYDrift);
  });

  it('should extract driftSeismicTwoWayY', async () => {
    const driftSeismicTwoWayY = wdisp.driftSeismicTwoWayY;
    expect(driftSeismicTwoWayY.storeyID[4]).toBe(wdisp1.storeyID);
    expect(driftSeismicTwoWayY.drift[4]).toBe(wdisp1.driftSeismicTwoWayYDrift);
  });

  it('should extract driftSeismicYEccP', async () => {
    const driftSeismicYEccP = wdisp.driftSeismicYEccP;
    expect(driftSeismicYEccP.storeyID[4]).toBe(wdisp1.storeyID);
    expect(driftSeismicYEccP.drift[4]).toBe(wdisp1.driftSeismicYEccPDrift);
  });

  it('should extract driftSeismicYEccN', async () => {
    const driftSeismicYEccN = wdisp.driftSeismicYEccN;
    expect(driftSeismicYEccN.storeyID[4]).toBe(wdisp1.storeyID);
    expect(driftSeismicYEccN.drift[4]).toBe(wdisp1.driftSeismicYEccNDrift);
  });

  it('should extract driftWindXP', async () => {
    const driftWindXP = wdisp.driftWindXP;
    expect(driftWindXP.storeyID[4]).toBe(wdisp1.storeyID);
    expect(driftWindXP.drift[4]).toBe(wdisp1.driftWindXPDrift);
    expect(driftWindXP.ratio[4]).toBe(wdisp1.driftWindXPRatioD);
  });

  it('should extract driftWindXN', async () => {
    const driftWindXN = wdisp.driftWindXN;
    expect(driftWindXN.storeyID[4]).toBe(wdisp1.storeyID);
    expect(driftWindXN.drift[4]).toBe(wdisp1.driftWindXNDrift);
    expect(driftWindXN.ratio[4]).toBe(wdisp1.driftWindXNRatioD);
  });

  it('should extract driftWindYP', async () => {
    const driftWindYP = wdisp.driftWindYP;
    expect(driftWindYP.storeyID[4]).toBe(wdisp1.storeyID);
    expect(driftWindYP.drift[4]).toBe(wdisp1.driftWindYPDrift);
    expect(driftWindYP.ratio[4]).toBe(wdisp1.driftWindYPRatioD);
  });

  it('should extract driftWindYN', async () => {
    const driftWindYN = wdisp.driftWindYN;
    expect(driftWindYN.storeyID[4]).toBe(wdisp1.storeyID);
    expect(driftWindYN.drift[4]).toBe(wdisp1.driftWindYNDrift);
    expect(driftWindYN.ratio[4]).toBe(wdisp1.driftWindYNRatioD);
  });

  it('should extract ratioSeismicX', async () => {
    const ratioSeismicX = wdisp.ratioSeismicX;
    expect(ratioSeismicX.storeyID[4]).toBe(wdisp1.storeyID);
    expect(ratioSeismicX.ratioD[4]).toBe(wdisp1.ratioSeismicXRatioD);
  });

  it('should extract ratioSeismicXEccP', async () => {
    const ratioSeismicXEccP = wdisp.ratioSeismicXEccP;
    expect(ratioSeismicXEccP.storeyID[4]).toBe(wdisp1.storeyID);
    expect(ratioSeismicXEccP.ratioD[4]).toBe(wdisp1.ratioSeismicXEccPRatioD);
  });

  it('should extract ratioSeismicXEccN', async () => {
    const ratioSeismicXEccN = wdisp.ratioSeismicXEccN;
    expect(ratioSeismicXEccN.storeyID[4]).toBe(wdisp1.storeyID);
    expect(ratioSeismicXEccN.ratioD[4]).toBe(wdisp1.ratioSeismicXEccNRatioD);
  });

  it('should extract ratioSeismicY', async () => {
    const ratioSeismicY = wdisp.ratioSeismicY;
    expect(ratioSeismicY.storeyID[4]).toBe(wdisp1.storeyID);
    expect(ratioSeismicY.ratioD[4]).toBe(wdisp1.ratioSeismicYRatioD);
  });

  it('should extract ratioSeismicYEccP', async () => {
    const ratioSeismicYEccP = wdisp.ratioSeismicYEccP;
    expect(ratioSeismicYEccP.storeyID[4]).toBe(wdisp1.storeyID);
    expect(ratioSeismicYEccP.ratioD[4]).toBe(wdisp1.ratioSeismicYEccPRatioD);
  });

  it('should extract ratioSeismicYEccN', async () => {
    const ratioSeismicYEccN = wdisp.ratioSeismicYEccN;
    expect(ratioSeismicYEccN.storeyID[4]).toBe(wdisp1.storeyID);
    expect(ratioSeismicYEccN.ratioD[4]).toBe(wdisp1.ratioSeismicYEccNRatioD);
  });
});

describe('wdisp2', () => {
  const dir = path.join(__dirname, '../../../../fixtures/yjk/2');
  let wdisp: IWdisp;

  beforeEach(async () => {
    wdisp = await readWdispOutput(dir);
  });

  it('should read wdisp.out', async () => {
    expect(wdisp).toBeTruthy();
  });

  it('should extract driftSeismicX', async () => {
    const driftSeismicX = wdisp.driftSeismicX;
    expect(driftSeismicX.storeyID[4]).toBe(wdisp2.storeyID);
    expect(driftSeismicX.drift[4]).toBe(wdisp2.driftSeismicXDrift);
  });

  it('should extract driftSeismicTwoWayX', async () => {
    const driftSeismicTwoWayX = wdisp.driftSeismicTwoWayX;
    expect(driftSeismicTwoWayX.storeyID[4]).toBe(wdisp2.storeyID);
    expect(driftSeismicTwoWayX.drift[4]).toBe(wdisp2.driftSeismicTwoWayXDrift);
  });

  it('should extract driftSeismicXEccP', async () => {
    const driftSeismicXEccP = wdisp.driftSeismicXEccP;
    expect(driftSeismicXEccP.storeyID[4]).toBe(wdisp2.storeyID);
    expect(driftSeismicXEccP.drift[4]).toBe(wdisp2.driftSeismicXEccPDrift);
  });

  it('should extract driftSeismicXEccN', async () => {
    const driftSeismicXEccN = wdisp.driftSeismicXEccN;
    expect(driftSeismicXEccN.storeyID[4]).toBe(wdisp2.storeyID);
    expect(driftSeismicXEccN.drift[4]).toBe(wdisp2.driftSeismicXEccNDrift);
  });

  it('should extract driftSeismicY', async () => {
    const driftSeismicY = wdisp.driftSeismicY;
    expect(driftSeismicY.storeyID[4]).toBe(wdisp2.storeyID);
    expect(driftSeismicY.drift[4]).toBe(wdisp2.driftSeismicYDrift);
  });

  it('should extract driftSeismicTwoWayY', async () => {
    const driftSeismicTwoWayY = wdisp.driftSeismicTwoWayY;
    expect(driftSeismicTwoWayY.storeyID[4]).toBe(wdisp2.storeyID);
    expect(driftSeismicTwoWayY.drift[4]).toBe(wdisp2.driftSeismicTwoWayYDrift);
  });

  it('should extract driftSeismicYEccP', async () => {
    const driftSeismicYEccP = wdisp.driftSeismicYEccP;
    expect(driftSeismicYEccP.storeyID[4]).toBe(wdisp2.storeyID);
    expect(driftSeismicYEccP.drift[4]).toBe(wdisp2.driftSeismicYEccPDrift);
  });

  it('should extract driftSeismicYEccN', async () => {
    const driftSeismicYEccN = wdisp.driftSeismicYEccN;
    expect(driftSeismicYEccN.storeyID[4]).toBe(wdisp2.storeyID);
    expect(driftSeismicYEccN.drift[4]).toBe(wdisp2.driftSeismicYEccNDrift);
  });

  it('should extract driftWindXP', async () => {
    const driftWindXP = wdisp.driftWindXP;
    expect(driftWindXP.storeyID[4]).toBe(wdisp2.storeyID);
    expect(driftWindXP.drift[4]).toBe(wdisp2.driftWindXPDrift);
    expect(driftWindXP.ratio[4]).toBe(wdisp2.driftWindXPRatioD);
  });

  it('should extract driftCrossWindXN', async () => {
    const driftCrossWindXN = wdisp.driftCrossWindXN;
    expect(driftCrossWindXN.storeyID[4]).toBe(wdisp2.storeyID);
    expect(driftCrossWindXN.drift[4]).toBe(wdisp2.driftCrossWindXNDrift);
    expect(driftCrossWindXN.ratio[4]).toBe(wdisp2.driftCrossWindXNRatioD);
  });

  it('should extract driftWindYP', async () => {
    const driftWindYP = wdisp.driftWindYP;
    expect(driftWindYP.storeyID[4]).toBe(wdisp2.storeyID);
    expect(driftWindYP.drift[4]).toBe(wdisp2.driftWindYPDrift);
    expect(driftWindYP.ratio[4]).toBe(wdisp2.driftWindYPRatioD);
  });

  it('should extract driftCrossWindYN', async () => {
    const driftCrossWindYN = wdisp.driftCrossWindYN;
    expect(driftCrossWindYN.storeyID[4]).toBe(wdisp2.storeyID);
    expect(driftCrossWindYN.drift[4]).toBe(wdisp2.driftCrossWindYNDrift);
    expect(driftCrossWindYN.ratio[4]).toBe(wdisp2.driftCrossWindYNRatioD);
  });

  it('should extract ratioSeismicX', async () => {
    const ratioSeismicX = wdisp.ratioSeismicX;
    expect(ratioSeismicX.storeyID[4]).toBe(wdisp2.storeyID);
    expect(ratioSeismicX.ratioD[4]).toBe(wdisp2.ratioSeismicXRatioD);
  });

  it('should extract ratioSeismicXEccP', async () => {
    const ratioSeismicXEccP = wdisp.ratioSeismicXEccP;
    expect(ratioSeismicXEccP.storeyID[4]).toBe(wdisp2.storeyID);
    expect(ratioSeismicXEccP.ratioD[4]).toBe(wdisp2.ratioSeismicXEccPRatioD);
  });

  it('should extract ratioSeismicXEccN', async () => {
    const ratioSeismicXEccN = wdisp.ratioSeismicXEccN;
    expect(ratioSeismicXEccN.storeyID[4]).toBe(wdisp2.storeyID);
    expect(ratioSeismicXEccN.ratioD[4]).toBe(wdisp2.ratioSeismicXEccNRatioD);
  });

  it('should extract ratioSeismicY', async () => {
    const ratioSeismicY = wdisp.ratioSeismicY;
    expect(ratioSeismicY.storeyID[4]).toBe(wdisp2.storeyID);
    expect(ratioSeismicY.ratioD[4]).toBe(wdisp2.ratioSeismicYRatioD);
  });

  it('should extract ratioSeismicYEccP', async () => {
    const ratioSeismicYEccP = wdisp.ratioSeismicYEccP;
    expect(ratioSeismicYEccP.storeyID[4]).toBe(wdisp2.storeyID);
    expect(ratioSeismicYEccP.ratioD[4]).toBe(wdisp2.ratioSeismicYEccPRatioD);
  });

  it('should extract ratioSeismicYEccN', async () => {
    const ratioSeismicYEccN = wdisp.ratioSeismicYEccN;
    expect(ratioSeismicYEccN.storeyID[4]).toBe(wdisp2.storeyID);
    expect(ratioSeismicYEccN.ratioD[4]).toBe(wdisp2.ratioSeismicYEccNRatioD);
  });
});
