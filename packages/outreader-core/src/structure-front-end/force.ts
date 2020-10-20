import { IStructure, IForceFE } from '../interfaces';

export function convertForce(structure: IStructure): IForceFE {
  const force: IForceFE = {
    wind: {
      storeyID: structure.wmass?.wind.storeyID || [0],
      towerID: structure.wmass?.wind.towerID || [0],
      forceAlongX: structure.wmass?.wind.forceAlongX || [0],
      shearAlongX: structure.wmass?.wind.shearAlongX || [0],
      momentAlongX: structure.wmass?.wind.momentAlongX || [0],
      forceAlongY: structure.wmass?.wind.forceAlongY || [0],
      shearAlongY: structure.wmass?.wind.shearAlongY || [0],
      momentAlongY: structure.wmass?.wind.momentAlongY || [0],
      forceCrossX: structure.wmass?.wind.forceCrossX || [0],
      shearCrossX: structure.wmass?.wind.shearCrossX || [0],
      momentCrossX: structure.wmass?.wind.momentCrossX || [0],
      forceCrossY: structure.wmass?.wind.forceCrossY || [0],
      shearCrossY: structure.wmass?.wind.shearCrossY || [0],
      momentCrossY: structure.wmass?.wind.momentCrossY || [0],
    },
    seismic: {
      storeyID: structure.wzq?.seismicForce.storeyID || [0],
      towerID: structure.wzq?.seismicForce.towerID || [0],
      forceX: structure.wzq?.seismicForce.forceX || [0],
      shearX: structure.wzq?.seismicForce.shearX || [0],
      momentX: structure.wzq?.seismicForce.momentX || [0],
      forceY: structure.wzq?.seismicForce.forceY || [0],
      shearY: structure.wzq?.seismicForce.shearY || [0],
      momentY: structure.wzq?.seismicForce.momentY || [0],
    },
  };

  return force;
}
