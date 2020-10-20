import { IPeriodFE, IWzq } from '../interfaces';

export function convertPeriod(wzq?: IWzq): IPeriodFE {
  const period: IPeriodFE = {
    modeCoupling: {
      modeID: wzq?.modeCoupling.modeID || [0],
      period: wzq?.modeCoupling.period || [0],
      angle: wzq?.modeCoupling.angle || [0],
      factorX: wzq?.modeCoupling.factorX || [0],
      factorY: wzq?.modeCoupling.factorY || [0],
      factorZ: wzq?.modeCoupling.factorZ || [0],
    },
    modeSeismic: {
      modeID: wzq?.modeSeismic.modeID || [0],
      period: wzq?.modeSeismic.period || [0],
      angle: wzq?.modeSeismic.angle || [0],
      factorX: wzq?.modeSeismic.factorX || [0],
      factorY: wzq?.modeSeismic.factorY || [0],
      factorZ: wzq?.modeSeismic.factorZ || [0],
    },
    modeMass: {
      modeID: wzq?.modeMass.modeID || [0],
      factorX: wzq?.modeMass.factorX || [0],
      factorY: wzq?.modeMass.factorY || [0],
      factorZ: wzq?.modeMass.factorZ || [0],
      sumX: wzq?.modeMass.sumX || 0,
      sumY: wzq?.modeMass.sumY || 0,
      sumZ: wzq?.modeMass.sumZ || 0,
    },
  };

  return period;
}
