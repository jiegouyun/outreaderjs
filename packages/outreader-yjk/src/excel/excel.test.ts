import { readStructure } from '../structure';
// import { exportExcel } from '@outreader/core/src/excel/excel';
import { IStructure, hashStr, exportExcel } from '@outreader/core';
import * as path from 'path';

describe('exportExcel', () => {
  const dir = path.join(__dirname, '../../../../fixtures/yjk/2');
  let structure: IStructure;
  let result: boolean;

  beforeEach(async () => {
    structure = await readStructure(dir);
    result = await exportExcel(dir, structure);
  });

  it('should extract result', async () => {
    expect(result).toBe(true);
  });
});
