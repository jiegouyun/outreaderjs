import { readConcreteSteelOutput } from './concrete-steel';
import { IConcreteSteel } from '@outreader/core';
import * as path from 'path';
import { concreteSteel as concreteSteel1 } from '../../../../fixtures/test-result/pkpm-1/concrete-steel';
import { concreteSteel as concreteSteel2 } from '../../../../fixtures/test-result/pkpm-2/concrete-steel';

describe('concreteSteel1', () => {
  const dir = path.join(__dirname, '../../../../fixtures/pkpm/1');
  let concreteSteel: IConcreteSteel;

  beforeEach(async () => {
    concreteSteel = await readConcreteSteelOutput(dir);
  });

  it('should read 上部结构工程量_20200616.txt', async () => {
    expect(concreteSteel).toBeTruthy();
  });

  // it('should extract concrete', async () => {
  //   const concrete = concreteSteel.concrete;
  //   expect(concrete.storeyID[3]).toBe(concreteSteel1.storeyID);
  //   expect(concrete.wall[3]).toBe(concreteSteel1.concreteWall);
  //   expect(concrete.column[3]).toBe(concreteSteel1.concreteColumn);
  //   expect(concrete.floor[3]).toBe(concreteSteel1.concreteDloor);
  //   expect(concrete.storey[3]).toBe(concreteSteel1.concreteStorey);
  // });

  // it('should extract steel', async () => {
  //   const steel = concreteSteel.steel;
  //   expect(steel.storeyID[3]).toBe(concreteSteel1.storeyID);
  //   expect(steel.beam[3]).toBe(concreteSteel1.steelBeam);
  //   expect(steel.column[3]).toBe(concreteSteel1.steelColumn);
  //   expect(steel.storey[3]).toBe(concreteSteel1.steelStorey);
  // });
});

describe('concreteSteel2', () => {
  const dir = path.join(__dirname, '../../../../fixtures/pkpm/2');
  let concreteSteel: IConcreteSteel;

  beforeEach(async () => {
    concreteSteel = await readConcreteSteelOutput(dir);
  });

  it('should read 上部结构工程量_20200616.txt', async () => {
    expect(concreteSteel).toBeTruthy();
  });

  // it('should extract concrete', async () => {
  //   const concrete = concreteSteel.concrete;
  //   expect(concrete.storeyID[3]).toBe(concreteSteel2.storeyID);
  //   expect(concrete.wall[3]).toBe(concreteSteel2.concreteWall);
  //   expect(concrete.column[3]).toBe(concreteSteel2.concreteColumn);
  //   expect(concrete.floor[3]).toBe(concreteSteel2.concreteDloor);
  //   expect(concrete.storey[3]).toBe(concreteSteel2.concreteStorey);
  // });

  // it('should extract steel', async () => {
  //   const steel = concreteSteel.steel;
  //   expect(steel.storeyID[3]).toBe(concreteSteel2.storeyID);
  //   expect(steel.beam[3]).toBe(concreteSteel2.steelBeam);
  //   expect(steel.column[3]).toBe(concreteSteel2.steelColumn);
  //   expect(steel.storey[3]).toBe(concreteSteel2.steelStorey);
  // });
});
