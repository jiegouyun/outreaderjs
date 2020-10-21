import { readWpjOutput } from './wpj';
import { IWpj } from '@outreader/core';
import * as path from 'path';
// import { wmass as wmass1 } from '../../../../fixtures/test-result/yjk-1/wmass';
// import { wmass as wmass2 } from '../../../../fixtures/test-result/yjk-2/wmass';

describe('wpj-1', () => {
  const dir = path.join(__dirname, '../../../../fixtures/pkpm/1');
  let wpj: IWpj;

  beforeEach(async () => {
    wpj = await readWpjOutput(dir);
  });

  it('should read pkpm-1 wpj*.out', async () => {
    expect(wpj).toBeTruthy();
  });

  it('should extract information', async () => {
    // const basicInformation = wmass.basicInformation;
    // expect(true).toBe(true);
  });
});

describe('wpj-2', () => {
  const dir = path.join(__dirname, '../../../../fixtures/pkpm/2');
  let wpj: IWpj;

  beforeEach(async () => {
    wpj = await readWpjOutput(dir);
  });

  it('should read pkpm-2 wpj*.out', async () => {
    expect(wpj).toBeTruthy();
  });

  it('should extract information', async () => {
    // const basicInformation = wmass.basicInformation;
    // expect(true).toBe(true);
  });
});
