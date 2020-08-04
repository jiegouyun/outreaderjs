import {
  IStructure,
  IStructureFrontEnd,
  ISummaryFE,
  ISummaryQuantityFE,
  IParametersFE,
  IPeriodFE,
  IForceFE,
  IDriftFE,
  IGeneralResultFE,
  IDistributeResultFE,
  IFactorFE,
  IQuantityFE,
} from '@outreader/core';
import { convertSummary } from './summary';
import { convertSummaryQuantity } from './summary-quantity';
import { convertParameters } from './parameters';
import { convertPeriod } from './period';
import { convertForce } from './force';
import { convertDrift } from './drift';
import { convertGeneralResult } from './general-result';

export function convertStructure(
  structure: IStructure,
): Promise<IStructureFrontEnd> {
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

function convertDistributeResult(
  structure: IStructure,
): Promise<IDistributeResultFE> {
  const distributeResult: IDistributeResultFE = {};

  return distributeResult;
}

function convertFactor(structure: IStructure): Promise<IFactorFE> {
  const factor: IFactorFE = {};

  return factor;
}

function convertQuantity(structure: IStructure): Promise<IQuantityFE> {
  const quantity: IQuantityFE = {};

  return quantity;
}
