import { readYJKStructure } from '../structure';
import {
  IStructure,
  IStructureFrontEnd,
  convertStructure,
} from '@outreader/core';
import * as path from 'path';

describe('convertStructure1', () => {
  const dir = path.join(__dirname, '../../../../fixtures/yjk/1');
  let structure: IStructure;
  let result: IStructureFrontEnd;

  beforeEach(async () => {
    structure = await readYJKStructure(dir);
    result = convertStructure(structure);
  });

  it('should extract result', async () => {
    expect(typeof result).toBe('object');
  });
});

describe('convertStructure2', () => {
  const dir = path.join(__dirname, '../../../../fixtures/yjk/2');
  let structure: IStructure;
  let result: IStructureFrontEnd;

  beforeEach(async () => {
    structure = await readYJKStructure(dir);
    result = convertStructure(structure);
  });

  it('should extract result', async () => {
    expect(typeof result).toBe('object');
  });
});
