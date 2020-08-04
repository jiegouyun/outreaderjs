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

export async function convertStructure(
  structure: IStructure,
): Promise<IStructureFrontEnd> {
  const structureFE: IStructureFrontEnd = {
    summary: await convertSummary(structure),
    summaryQuantity: await convertSummaryQuantity(structure),
    parameters: await convertParameters(structure),
    period: await convertPeriod(structure),
    force: await convertForce(structure),
    drift: await convertDrift(structure),
    generalResult: await convertGeneralResult(structure),
    distributeResult: await convertDistributeResult(structure),
    factor: await convertFactor(structure),
    quantity: await convertQuantity(structure),
  };

  return structureFE;
}

function convertParameters(structure: IStructure): Promise<IParametersFE> {
  const parameters: IParametersFE = {};

  return parameters;
}

function convertPeriod(structure: IStructure): Promise<IPeriodFE> {
  const period: IPeriodFE = {};

  return period;
}

function convertForce(structure: IStructure): Promise<IForceFE> {
  const force: IForceFE = {};

  return force;
}

function convertDrift(structure: IStructure): Promise<IDriftFE> {
  const drift: IDriftFE = {};

  return drift;
}

function convertGeneralResult(
  structure: IStructure,
): Promise<IGeneralResultFE> {
  const generalResult: IGeneralResultFE = {};

  return generalResult;
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
