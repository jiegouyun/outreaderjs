import { IStructure, IPeriodFE } from '../interfaces';

export function convertPeriod(structure: IStructure): IPeriodFE {
  const period: IPeriodFE = {
    modeCoupling: {
      modeID: structure.wzq?.modeCoupling.modeID || [0],
      period: structure.wzq?.modeCoupling.period || [0],
      angle: structure.wzq?.modeCoupling.angle || [0],
      factorX: structure.wzq?.modeCoupling.factorX || [0],
      factorY: structure.wzq?.modeCoupling.factorY || [0],
      factorZ: structure.wzq?.modeCoupling.factorZ || [0],
    },
    modeSeismic: {
      modeID: structure.wzq?.modeSeismic.modeID || [0],
      period: structure.wzq?.modeSeismic.period || [0],
      angle: structure.wzq?.modeSeismic.angle || [0],
      factorX: structure.wzq?.modeSeismic.factorX || [0],
      factorY: structure.wzq?.modeSeismic.factorY || [0],
      factorZ: structure.wzq?.modeSeismic.factorZ || [0],
    },
    modeMass: {
      modeID: structure.wzq?.modeMass.modeID || [0],
      factorX: structure.wzq?.modeMass.factorX || [0],
      factorY: structure.wzq?.modeMass.factorY || [0],
      factorZ: structure.wzq?.modeMass.factorZ || [0],
      sumX: structure.wzq?.modeMass.sumX || 0,
      sumY: structure.wzq?.modeMass.sumY || 0,
      sumZ: structure.wzq?.modeMass.sumZ || 0,
    },
  };

  return period;
}
