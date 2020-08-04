import { IStructure, IForceFE, IWindFE, ISeismicFE } from '@outreader/core';

export function convertForce(structure: IStructure): IForceFE {
  const force: IForceFE = {
    wind: structure.wmass?.wind as IWindFE,
    seismic: structure.wzq?.seismicForce as ISeismicFE,
  };

  return force;
}
