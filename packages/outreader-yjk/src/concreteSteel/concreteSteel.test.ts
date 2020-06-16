import { readConcreteSteelOutput } from './concreteSteel';
import { IConcreteSteel } from '@outreader/core';
import * as path from 'path';

describe('concreteSteel', () => {
  const dir = path.join(__dirname, '../../../../fixtures/yjk/1');
  let concreteSteel: IConcreteSteel;

  beforeEach(async () => {
    concreteSteel = await readConcreteSteelOutput(dir);
  });

  it('should read 上部结构工程量_20200616.txt', async () => {
    expect(concreteSteel).toBeTruthy();
  });

  it('should extract concrete', async () => {
    const concrete = concreteSteel.concrete;
    expect(concrete.storeyID[3]).toBe(4);
    expect(concrete.wall[3]).toBe(791.69);
    expect(concrete.column[3]).toBe(307.88);
    expect(concrete.floor[3]).toBe(200.46);
    expect(concrete.storey[3]).toBe(1423.5);
  });

  it('should extract steel', async () => {
    const steel = concreteSteel.steel;
    expect(steel.storeyID[3]).toBe(4);
    expect(steel.beam[3]).toBe(199.15);
    expect(steel.column[3]).toBe(413.62);
    expect(steel.storey[3]).toBe(612.77);
  });
});
