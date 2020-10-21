import { readRebarOutput } from './rebar';
import { IRebar } from '@outreader/core';
import * as path from 'path';
import { rebar as rebar1 } from '../../../../fixtures/test-result/pkpm-1/rebar';
import { rebar as rebar2 } from '../../../../fixtures/test-result/pkpm-2/rebar';

describe('concreteSteel1', () => {
  const dir = path.join(__dirname, '../../../../fixtures/pkpm/1');
  let rebar: IRebar;

  beforeEach(async () => {
    rebar = await readRebarOutput(dir);
  });

  it('should read 全楼钢筋用量_20200616.txt', async () => {
    expect(rebar).toBeTruthy();
  });

  // it('should extract area', async () => {
  //   const area = rebar.area;
  //   expect(area.storeyID[3]).toBe(rebar1.storeyID);
  //   expect(area.storey[3]).toBe(rebar1.areaStorey);
  //   expect(area.totalArea).toBe(rebar1.areaTotalArea);
  // });

  // it('should extract beamRebar', async () => {
  //   const beamRebar = rebar.beamRebar;
  //   expect(beamRebar.storeyID[3]).toBe(rebar1.storeyID);
  //   expect(beamRebar.storey[3]).toBe(rebar1.beamRebarStorey);
  //   expect(beamRebar.total).toBe(rebar1.beamRebarTotal);
  // });

  // it('should extract columnRebar', async () => {
  //   const columnRebar = rebar.columnRebar;
  //   expect(columnRebar.storeyID[2]).toBe(rebar1.columnStoreyID);
  //   expect(columnRebar.storey[2]).toBe(rebar1.columnRebarStorey);
  //   expect(columnRebar.total).toBe(rebar1.columnRebarTotal);
  // });

  // it('should extract wallRebar', async () => {
  //   const wallRebar = rebar.wallRebar;
  //   expect(wallRebar.storeyID[3]).toBe(rebar1.storeyID);
  //   expect(wallRebar.storey[3]).toBe(rebar1.wallRebarStorey);
  //   expect(wallRebar.total).toBe(rebar1.wallRebarTotal);
  // });

  // it('should extract projectRebar', async () => {
  //   const projectRebar = rebar.projectRebar;
  //   expect(projectRebar.insertBasement).toBe(rebar1.projectRebarInsertBasement);
  //   expect(projectRebar.total).toBe(rebar1.projectRebarTotal);
  //   expect(projectRebar.totalPerArea).toBe(rebar1.projectRebarTotalPerArea);
  // });
});

describe('concreteSteel2', () => {
  const dir = path.join(__dirname, '../../../../fixtures/pkpm/2');
  let rebar: IRebar;

  beforeEach(async () => {
    rebar = await readRebarOutput(dir);
  });

  it('should read 全楼钢筋用量_20200616.txt', async () => {
    expect(rebar).toBeTruthy();
  });

  // it('should extract area', async () => {
  //   const area = rebar.area;
  //   expect(area.storeyID[3]).toBe(rebar2.storeyID);
  //   expect(area.storey[3]).toBe(rebar2.areaStorey);
  //   expect(area.totalArea).toBe(rebar2.areaTotalArea);
  // });

  // it('should extract beamRebar', async () => {
  //   const beamRebar = rebar.beamRebar;
  //   expect(beamRebar.storeyID[3]).toBe(rebar2.storeyID);
  //   expect(beamRebar.storey[3]).toBe(rebar2.beamRebarStorey);
  //   expect(beamRebar.total).toBe(rebar2.beamRebarTotal);
  // });

  // it('should extract columnRebar', async () => {
  //   const columnRebar = rebar.columnRebar;
  //   expect(columnRebar.storeyID[2]).toBe(rebar2.columnStoreyID);
  //   expect(columnRebar.storey[2]).toBe(rebar2.columnRebarStorey);
  //   expect(columnRebar.total).toBe(rebar2.columnRebarTotal);
  // });

  // it('should extract wallRebar', async () => {
  //   const wallRebar = rebar.wallRebar;
  //   expect(wallRebar.storeyID[3]).toBe(rebar2.storeyID);
  //   expect(wallRebar.storey[3]).toBe(rebar2.wallRebarStorey);
  //   expect(wallRebar.total).toBe(rebar2.wallRebarTotal);
  // });

  // it('should extract projectRebar', async () => {
  //   const projectRebar = rebar.projectRebar;
  //   expect(projectRebar.insertBasement).toBe(rebar2.projectRebarInsertBasement);
  //   expect(projectRebar.total).toBe(rebar2.projectRebarTotal);
  //   expect(projectRebar.totalPerArea).toBe(rebar2.projectRebarTotalPerArea);
  // });
});
