import { readStructure } from '../structure';
import { convertStructure } from '../structure-front-end';
// import { exportExcel } from '@outreader/core/src/excel/excel';
import { IStructure, IStructureFrontEnd, exportExcel } from '@outreader/core';
import * as path from 'path';

describe('exportExcel1', () => {
  const dir = path.join(__dirname, '../../../../fixtures/yjk/1');
  let structure: IStructure;
  let structureFE: IStructureFrontEnd;
  let result: boolean;

  beforeEach(async () => {
    structure = await readStructure(dir);
    structureFE = convertStructure(structure);
    result = await exportExcel(structureFE);
  });

  it('should extract result', async () => {
    expect(result).toBe(true);
  });
});

describe('exportExcel2', () => {
  const dir = path.join(__dirname, '../../../../fixtures/yjk/2');
  let structure: IStructure;
  let structureFE: IStructureFrontEnd;
  let result: boolean;

  beforeEach(async () => {
    structure = await readStructure(dir);
    structureFE = convertStructure(structure);
    result = await exportExcel(structureFE);
  });

  it('should extract result', async () => {
    expect(result).toBe(true);
  });
});
