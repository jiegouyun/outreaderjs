import { IFactorFE, IWmass, IWv02q } from '../interfaces';

export function convertFactor(wmass?: IWmass, wv02q?: IWv02q): IFactorFE {
  const factor: IFactorFE = {
    stiffness: {
      storeyID: wmass?.stiffness.storeyID || [0],
      towerID: wmass?.stiffness.towerID || [0],
      weakStoreyFactor: wmass?.stiffness.weakStoreyFactor || [0],
    },
    shearWeightRatioModify: {
      storeyID: wmass?.shearWeightRatioModify.storeyID || [0],
      towerID: wmass?.shearWeightRatioModify.towerID || [0],
      factorX: wmass?.shearWeightRatioModify.factorX || [0],
      factorY: wmass?.shearWeightRatioModify.factorY || [0],
    },
    v02qFactor: {
      storeyID: wv02q?.v02qFactor.storeyID || [0],
      towerID: wv02q?.v02qFactor.towerID || [0],
      factorX: wv02q?.v02qFactor.factorX || [0],
      factorY: wv02q?.v02qFactor.factorY || [0],
    },
  };

  return factor;
}
