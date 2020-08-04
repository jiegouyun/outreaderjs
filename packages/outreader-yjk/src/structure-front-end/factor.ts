import {
  IStructure,
  IFactorFE,
  IShearWeightRatioModifyFE,
  IV02qFactorFE,
} from '@outreader/core';

export function convertFactor(structure: IStructure): IFactorFE {
  const factor: IFactorFE = {
    stiffness: {
      storeyID: structure.wmass?.stiffness.storeyID as number[],
      towerID: structure.wmass?.stiffness.towerID as number[],
      weakStoreyFactor: structure.wmass?.stiffness.weakStoreyFactor as number[],
    },
    shearWeightRatioModify: structure.wmass
      ?.shearWeightRatioModify as IShearWeightRatioModifyFE,
    v02qFactor: structure.wv02q?.v02qFactor as IV02qFactorFE,
  };

  return factor;
}
