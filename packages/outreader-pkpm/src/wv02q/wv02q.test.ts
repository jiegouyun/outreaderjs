import { IWv02q } from '@outreader/core';
import * as path from 'path';
import { readWv02qOutput } from './wv02q';
import { wv02q as wv02q1 } from '../../../../fixtures/test-result/pkpm-1/wv02q';
import { wv02q as wv02q2 } from '../../../../fixtures/test-result/pkpm-2/wv02q';

describe('wv02q1', () => {
  const dir = path.join(__dirname, '../../../../fixtures/pkpm/1');
  let wv02q: IWv02q;

  beforeEach(async () => {
    wv02q = await readWv02qOutput(dir);
  });

  it('should read wv02q.out', async () => {
    expect(wv02q).toBeTruthy();
  });

  it('should extract momentPercent', async () => {
    const momentPercent = wv02q.momentPercent;
    expect(momentPercent.storeyID[4]).toBe(wv02q1.storeyID);
    expect(momentPercent.percentColumnX[4]).toBe(
      wv02q1.momentPercentPercentColumnX,
    );
    expect(momentPercent.percentWallX[4]).toBe(
      wv02q1.momentPercentPercentWallX,
    );
    expect(momentPercent.percentColumnY[4]).toBe(
      wv02q1.momentPercentPercentColumnY,
    );
    expect(momentPercent.percentWallY[4]).toBe(
      wv02q1.momentPercentPercentWallY,
    );
  });

  it('should extract columnShear', async () => {
    const columnShear = wv02q.columnShear;
    expect(columnShear.storeyID[4]).toBe(wv02q1.storeyID);
    expect(columnShear.columnX[4]).toBe(wv02q1.columnShearColumnX);
    expect(columnShear.percentColumnX[4]).toBe(
      wv02q1.columnShearPercentColumnX,
    );
    expect(columnShear.columnY[4]).toBe(wv02q1.columnShearColumnY);
    expect(columnShear.percentColumnY[4]).toBe(
      wv02q1.columnShearPercentColumnY,
    );
  });

  it('should extract v02qFactor', async () => {
    const v02qFactor = wv02q.v02qFactor;
    expect(v02qFactor.storeyID[4]).toBe(wv02q1.v02qFactorStoreyID);
    expect(v02qFactor.factorX[4]).toBe(wv02q1.factorX);
    expect(v02qFactor.factorY[4]).toBe(wv02q1.factorY);
  });
});

describe('wv02q2', () => {
  const dir = path.join(__dirname, '../../../../fixtures/pkpm/2');
  let wv02q: IWv02q;

  beforeEach(async () => {
    wv02q = await readWv02qOutput(dir);
  });

  it('should read wv02q.out', async () => {
    expect(wv02q).toBeTruthy();
  });

  it('should extract momentPercent', async () => {
    const momentPercent = wv02q.momentPercent;
    expect(momentPercent.storeyID[4]).toBe(wv02q2.storeyID);
    expect(momentPercent.percentColumnX[4]).toBe(
      wv02q2.momentPercentPercentColumnX,
    );
    expect(momentPercent.percentWallX[4]).toBe(
      wv02q2.momentPercentPercentWallX,
    );
    expect(momentPercent.percentColumnY[4]).toBe(
      wv02q2.momentPercentPercentColumnY,
    );
    expect(momentPercent.percentWallY[4]).toBe(
      wv02q2.momentPercentPercentWallY,
    );
  });

  it('should extract columnShear', async () => {
    const columnShear = wv02q.columnShear;
    expect(columnShear.storeyID[4]).toBe(wv02q2.storeyID);
    expect(columnShear.columnX[4]).toBe(wv02q2.columnShearColumnX);
    expect(columnShear.percentColumnX[4]).toBe(
      wv02q2.columnShearPercentColumnX,
    );
    expect(columnShear.columnY[4]).toBe(wv02q2.columnShearColumnY);
    expect(columnShear.percentColumnY[4]).toBe(
      wv02q2.columnShearPercentColumnY,
    );
  });

  it('should extract v02qFactor', async () => {
    const v02qFactor = wv02q.v02qFactor;
    expect(v02qFactor.storeyID[4]).toBe(wv02q2.v02qFactorStoreyID);
    expect(v02qFactor.factorX[4]).toBe(wv02q2.factorX);
    expect(v02qFactor.factorY[4]).toBe(wv02q2.factorY);
  });
});
