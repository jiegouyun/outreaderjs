import {
  IStructure,
  IDistributeResultFE,
  IStoreyFE,
  IMassRatioFE,
  IStiffnessFE,
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
    shearWeightRatio: {
      storeyID: structure.wzq?.seismicForce.storeyID as number[],
      towerID: structure.wzq?.seismicForce.towerID as number[],
      factorX: structure.wzq?.seismicForce.shearWeightRatioX as number[],
      factorY: structure.wzq?.seismicForce.shearWeightRatioY as number[],
    },
    shearCapacityCheck: structure.wmass
      ?.shearCapacityCheck as IShearCapacityCheckFE,
    momentPercent: structure.wv02q?.momentPercent as IMomentPercentFE,
    columnShear: structure.wv02q?.columnShear as IColumnShearFE,
  };

  return distributeResult;
}
