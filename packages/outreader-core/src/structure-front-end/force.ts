import { IForceFE, IWmass, IWzq } from '../interfaces';

export function convertForce(wmass?: IWmass, wzq?: IWzq): IForceFE {
  const force: IForceFE = {
    wind: {
      storeyID: wmass?.wind.storeyID || [0],
      towerID: wmass?.wind.towerID || [0],
      forceAlongX: wmass?.wind.forceAlongX || [0],
      shearAlongX: wmass?.wind.shearAlongX || [0],
      momentAlongX: wmass?.wind.momentAlongX || [0],
      forceAlongY: wmass?.wind.forceAlongY || [0],
      shearAlongY: wmass?.wind.shearAlongY || [0],
      momentAlongY: wmass?.wind.momentAlongY || [0],
      forceCrossX: wmass?.wind.forceCrossX || [0],
      shearCrossX: wmass?.wind.shearCrossX || [0],
      momentCrossX: wmass?.wind.momentCrossX || [0],
      forceCrossY: wmass?.wind.forceCrossY || [0],
      shearCrossY: wmass?.wind.shearCrossY || [0],
      momentCrossY: wmass?.wind.momentCrossY || [0],
    },
    seismic: {
      storeyID: wzq?.seismicForce.storeyID || [0],
      towerID: wzq?.seismicForce.towerID || [0],
      forceX: wzq?.seismicForce.forceX || [0],
      shearX: wzq?.seismicForce.shearX || [0],
      momentX: wzq?.seismicForce.momentX || [0],
      forceY: wzq?.seismicForce.forceY || [0],
      shearY: wzq?.seismicForce.shearY || [0],
      momentY: wzq?.seismicForce.momentY || [0],
    },
  };

  return force;
}
