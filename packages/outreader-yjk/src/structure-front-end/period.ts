import { IStructure, IPeriodFE, IModeFE, IModeMassFE } from '@outreader/core';

export function convertPeriod(structure: IStructure): IPeriodFE {
  const period: IPeriodFE = {
    modeCoupling: structure.wzq?.modeCoupling as IModeFE,
    modeSeismic: structure.wzq?.modeSeismic as IModeFE,
    modeMass: structure.wzq?.modeMass as IModeMassFE,
  };

  return period;
}
