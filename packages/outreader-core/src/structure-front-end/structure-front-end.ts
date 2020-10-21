import { IStructure, IStructureFrontEnd } from '../interfaces';
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
import { convertElement } from './element';
import { initStructureData } from './tools';

export function convertStructure(structure: IStructure): IStructureFrontEnd {
  // inirial structure data.
  initStructureData(structure);

  const structureFE: IStructureFrontEnd = {
    summary: convertSummary(
      structure.dir,
      structure.wmass,
      structure.wdisp,
      structure.wzq,
    ),
    summaryQuantity: convertSummaryQuantity(
      structure.wmass,
      structure.wdisp,
      structure.wzq,
      structure.concreteSteel,
      structure.rebar,
    ),
    parameters: convertParameters(structure.wmass),
    period: convertPeriod(structure.wzq),
    force: convertForce(structure.wmass, structure.wzq),
    drift: convertDrift(structure.wdisp),
    generalResult: convertGeneralResult(structure.wmass),
    distributeResult: convertDistributeResult(
      structure.wmass,
      structure.wzq,
      structure.wv02q,
    ),
    factor: convertFactor(structure.wmass, structure.wv02q, structure.wzq),
    quantity: convertQuantity(
      structure.wmass,
      structure.concreteSteel,
      structure.rebar,
    ),
    element: convertElement(structure.wpj),
  };

  return structureFE;
}
