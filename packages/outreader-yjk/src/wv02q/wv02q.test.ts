import { readWv02qOutput, IWv02q } from './wv02q';
import * as path from 'path';

describe('wv02q', () => {
  const dir = path.join(__dirname, '../../../../fixtures/yjk/1');
  let wv02q: IWv02q;

  beforeEach(async () => {
    wv02q = await readWv02qOutput(dir);
  });

  it('should read wv02q.out', async () => {
    expect(wv02q).toBeTruthy();
  });

  it('should extract momentPercent', async () => {
    const momentPercent = wv02q.momentPercent;
    expect(momentPercent.storeyID[4]).toBe(50);
    expect(momentPercent.percentColumnX[4]).toBe(35.2);
    expect(momentPercent.percentWallX[4]).toBe(0.1);
    expect(momentPercent.percentColumnY[4]).toBe(43.3);
    expect(momentPercent.percentWallY[4]).toBe(0.0);
  });

  it('should extract columnShear', async () => {
    const columnShear = wv02q.columnShear;
    expect(columnShear.storeyID[4]).toBe(50);
    expect(columnShear.columnX[4]).toBe(1137.2);
    expect(columnShear.percentColumnX[4]).toBe(6.34);
    expect(columnShear.columnY[4]).toBe(1620.6);
    expect(columnShear.percentColumnY[4]).toBe(9.24);
  });

  it('should extract v02qFactor', async () => {
    const v02qFactor = wv02q.v02qFactor;
    expect(v02qFactor.storeyID[4]).toBe(10);
    expect(v02qFactor.factorX[4]).toBe(1.0);
    expect(v02qFactor.factorY[4]).toBe(1.0);
  });
});
