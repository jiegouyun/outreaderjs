import { readRebarOutput } from './rebar';
import { IRebar } from '@outreader/core';
import * as path from 'path';

describe('concreteSteel', () => {
  const dir = path.join(__dirname, '../../../../fixtures/yjk/2');
  let rebar: IRebar;

  beforeEach(async () => {
    rebar = await readRebarOutput(dir);
  });

  it('should read 全楼钢筋用量_20200616.txt', async () => {
    expect(rebar).toBeTruthy();
  });

  it('should extract area', async () => {
    const area = rebar.area;
    expect(area.storeyID[3]).toBe(4);
    expect(area.storey[3]).toBe(2016.0);
    expect(area.totalArea).toBe(99712.68);
  });

  it('should extract beamRebar', async () => {
    const beamRebar = rebar.beamRebar;
    expect(beamRebar.storeyID[3]).toBe(4);
    expect(beamRebar.storey[3]).toBe(28063.2);
    expect(beamRebar.total).toBe(899521.7);
  });

  it('should extract columnRebar', async () => {
    const columnRebar = rebar.columnRebar;
    expect(columnRebar.storeyID[2]).toBe(3);
    expect(columnRebar.storey[2]).toBe(95627.4);
    expect(columnRebar.total).toBe(210257.4);
  });

  it('should extract wallRebar', async () => {
    const wallRebar = rebar.wallRebar;
    expect(wallRebar.storeyID[3]).toBe(4);
    expect(wallRebar.storey[3]).toBe(280370.2);
    expect(wallRebar.total).toBe(2700933.2);
  });

  it('should extract projectRebar', async () => {
    const projectRebar = rebar.projectRebar;
    expect(projectRebar.insertBasement).toBe(6995.9);
    expect(projectRebar.total).toBe(3817708.2);
    expect(projectRebar.totalPerArea).toBe(38.29);
  });
});
