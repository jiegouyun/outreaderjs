import { readWmassOutput, IWmass } from './wmass';
import * as path from 'path';

describe('wmass', () => {
  const dir = path.join(__dirname, '../../../../fixtures/yjk/1');
  let wmass: IWmass;

  beforeEach(async () => {
    wmass = await readWmassOutput(dir);
  });

  it('should read wmass.out', async () => {
    expect(wmass).toBeTruthy();
  });

  it('should extract information', async () => {
    const information = wmass.information;
    expect(information.engineering).toBe('071A');
    expect(information.software).toBe('盈建科建筑结构设计软件');
  });
});
