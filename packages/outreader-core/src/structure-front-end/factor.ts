import { IFactorFE, IWmass, IWv02q, IWzq } from '../interfaces';

export function convertFactor(
  wmass?: IWmass,
  wv02q?: IWv02q,
  wzq?: IWzq,
): IFactorFE {
  const factor: IFactorFE = {
    stiffness: {
      storeyID: wmass?.stiffness.storeyID || [1],
      towerID: wmass?.stiffness.towerID || [1],
      weakStoreyFactor: wmass?.stiffness.weakStoreyFactor || [0],
    },
    shearWeightRatioModify: {
      storeyID: wzq?.shearWeightRatioModify?.storeyID ||
        wmass?.shearWeightRatioModify.storeyID || [1],
      towerID: wzq?.shearWeightRatioModify?.towerID ||
        wmass?.shearWeightRatioModify.towerID || [1],
      factorX: wzq?.shearWeightRatioModify?.factorX ||
        wmass?.shearWeightRatioModify.factorX || [0],
      factorY: wzq?.shearWeightRatioModify?.factorY ||
        wmass?.shearWeightRatioModify.factorY || [0],
    },
    v02qFactor: {
      storeyID: wv02q?.v02qFactor.storeyID || [1],
      towerID: wv02q?.v02qFactor.towerID || [1],
      factorX: wv02q?.v02qFactor.factorX || [0],
      factorY: wv02q?.v02qFactor.factorY || [0],
    },
  };

  return factor;
}
