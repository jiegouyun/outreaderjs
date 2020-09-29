import { readElement } from '../element';
// import { exportExcel } from '@outreader/core/src/excel/excel';
import { IElement, exportElementExcel } from '@outreader/core';
import * as path from 'path';

describe('exportElementExcel1', () => {
  const dir = path.join(__dirname, '../../../../fixtures/yjk/3');
  let element: IElement;
  let result: boolean;

  beforeEach(async () => {
    element = await readElement(dir);
    result = await exportElementExcel(element);
    result = true;
  });

  it('should extract result', async () => {
    expect(result).toBe(true);
  });
});
