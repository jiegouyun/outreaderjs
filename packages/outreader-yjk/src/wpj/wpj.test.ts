import { readWpjOutput } from './wpj';
import { IWpj } from '@outreader/core';
import * as path from 'path';
// import { wmass as wmass1 } from '../../../../fixtures/test-result/yjk-1/wmass';
// import { wmass as wmass2 } from '../../../../fixtures/test-result/yjk-2/wmass';

describe('wpj', () => {
  const dir = path.join(__dirname, '../../../../fixtures/yjk/3');
  let wpj: IWpj;

  beforeEach(async () => {
    wpj = await readWpjOutput(dir);
  });

  it('should read wpj*.out', async () => {
    expect(wpj).toBeTruthy();
  });

  it('should extract information', async () => {
    // const basicInformation = wmass.basicInformation;
    // expect(true).toBe(true);
  });
});
