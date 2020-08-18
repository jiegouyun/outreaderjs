import { IStructure, IFactorFE } from '@outreader/core';

export function convertFactor(structure: IStructure): IFactorFE {
  const factor: IFactorFE = {
    stiffness: {
      storeyID: structure.wmass?.stiffness.storeyID || [0],
      towerID: structure.wmass?.stiffness.towerID || [0],
      weakStoreyFactor: structure.wmass?.stiffness.weakStoreyFactor || [0],
    },
    shearWeightRatioModify: {
      storeyID: structure.wmass?.shearWeightRatioModify.storeyID || [0],
      towerID: structure.wmass?.shearWeightRatioModify.towerID || [0],
      factorX: structure.wmass?.shearWeightRatioModify.factorX || [0],
      factorY: structure.wmass?.shearWeightRatioModify.factorY || [0],
    },
    v02qFactor: {
      storeyID: structure.wv02q?.v02qFactor.storeyID || [0],
      towerID: structure.wv02q?.v02qFactor.towerID || [0],
      factorX: structure.wv02q?.v02qFactor.factorX || [0],
      factorY: structure.wv02q?.v02qFactor.factorY || [0],
    },
  };

  return factor;
}
