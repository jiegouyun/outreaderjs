import { IStructure, IStructureFrontEnd } from '@outreader/core';
import { convertSummary } from './summary';
import { convertSummaryQuantity } from './summary-quantity';
import { convertParameters } from './parameters';
import { convertPeriod } from './period';
import { convertForce } from './force';
import { convertDrift } from './drift';
import { convertGeneralResult } from './general-result';
import { convertDistributeResult } from './distribute-result';
import { convertFactor } from './factor';
import { convertQuantity } from './quantity';
import { initStructureData } from './tools';

export function convertStructure(structure: IStructure): IStructureFrontEnd {
  // inirial structure data.
  initStructureData(structure);

  const structureFE: IStructureFrontEnd = {
    summary: convertSummary(structure),
    summaryQuantity: convertSummaryQuantity(structure),
    parameters: convertParameters(structure),
    period: convertPeriod(structure),
    force: convertForce(structure),
    drift: convertDrift(structure),
    generalResult: convertGeneralResult(structure),
    distributeResult: convertDistributeResult(structure),
    factor: convertFactor(structure),
    quantity: convertQuantity(structure),
  };

  return structureFE;
}
