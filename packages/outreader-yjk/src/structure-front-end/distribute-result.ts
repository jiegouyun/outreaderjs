import {
  IStructure,
  IDistributeResultFE,
  IStoreyFE,
  IMassRatioFE,
  IStiffnessFE,
  IShearWeightRatioModifyFE,
  IShearCapacityCheckFE,
  IMomentPercentFE,
  IColumnShearFE,
} from '@outreader/core';

export function convertDistributeResult(
  structure: IStructure,
): IDistributeResultFE {
  const distributeResult: IDistributeResultFE = {
    storey: structure.wmass?.storey as IStoreyFE,
    massRatio: structure.wmass?.massRatio as IMassRatioFE,
    stiffness: structure.wmass?.stiffness as IStiffnessFE,
    shearWeightRatioModify: structure.wmass
      ?.shearWeightRatioModify as IShearWeightRatioModifyFE,
    shearCapacityCheck: structure.wmass
      ?.shearCapacityCheck as IShearCapacityCheckFE,
    momentPercent: structure.wv02q?.momentPercent as IMomentPercentFE,
    columnShear: structure.wv02q?.columnShear as IColumnShearFE,
  };

  return distributeResult;
}
