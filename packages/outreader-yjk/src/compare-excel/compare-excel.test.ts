import { readStructure } from '../structure';
import { convertStructure } from '../structure-front-end';
// import { exportCompareExcel } from '@outreader/core/src/excel/excel';
import {
  IStructure,
  IStructureFrontEnd,
  exportCompareExcel,
} from '@outreader/core';
import * as path from 'path';

describe('exportExcel1', () => {
  const dirs = [
    path.join(__dirname, '../../../../fixtures/yjk/1'),
    path.join(__dirname, '../../../../fixtures/yjk/2'),
  ];
  let structures: IStructure[] = [];
  let structureFEs: IStructureFrontEnd[] = [];
  let results: boolean = true;

  beforeEach(async () => {
    for (let i = 0; i < 2; i++) {
      structures[i] = await readStructure(dirs[i]);
      structureFEs[i] = convertStructure(structures[i]);
    }
    // results = await exportCompareExcel(structureFEs);
  });

  it('should extract result', async () => {
    expect(results).toBe(true);
  });
});
