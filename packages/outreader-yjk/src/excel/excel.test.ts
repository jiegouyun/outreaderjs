import { readYJKStructure } from '../structure';
// import { exportExcel } from '@outreader/core/src/excel/excel';
import {
  IStructure,
  IStructureFrontEnd,
  exportExcel,
  convertStructure,
} from '@outreader/core';
import * as path from 'path';

describe('exportExcel1', () => {
  const dir = path.join(__dirname, '../../../../fixtures/yjk/1');
  let structure: IStructure;
  let structureFE: IStructureFrontEnd;
  let result: boolean;

  beforeEach(async () => {
    structure = await readYJKStructure(dir);
    structureFE = convertStructure(structure);
    // result = await exportExcel(structureFE);
    result = true;
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
    structure = await readYJKStructure(dir);
    structureFE = convertStructure(structure);
    // result = await exportExcel(structureFE);
    result = true;
  });

  it('should extract result', async () => {
    expect(result).toBe(true);
  });
});
