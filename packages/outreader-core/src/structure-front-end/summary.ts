import { ISummaryFE, IWdisp, IWmass, IWzq } from '../interfaces';
import { lookUp, calcDriftLimit, stiffnessWeightRatioCheck } from './tools';

export function convertSummary(
  dir: string,
  wmass?: IWmass,
  wdisp?: IWdisp,
  wzq?: IWzq,
): ISummaryFE {
  const summary: ISummaryFE = {
    project: {
      dir: dir,
      engineering: wmass?.basicInformation.engineering || '',
      calDate: wmass?.basicInformation.calDate || '',
      software: wmass?.basicInformation.software || '',
      softwareVersion: wmass?.basicInformation.softwareVersion || '',
    },
    structures: {
      system: wmass?.generalInformation.structuralSystem || '',
      material: wmass?.generalInformation.structuralMaterial || '',
      storeys: wmass?.storey.storeyID[0] || 0,
      height: wmass?.generalInformation.basement
        ? (wmass?.storey.heightToGround[0] || 0) -
          (wmass?.storey.heightToGround[
            wmass?.storey.heightToGround.length -
              (wmass?.generalInformation.basement || 0)
          ] || 0)
        : wmass?.storey.heightToGround[0] || 0,
      basement: wmass?.generalInformation.basement || 0,
      constraintFloor: wmass?.generalInformation.constraintFloor || 0,
      intensity: wmass?.seismicInformation.intensity || '',
      pressureModified: wmass?.windInformation.pressureModified || 0,
      rigidFloorAssumption:
        wmass?.calculationControl.rigidFloorAssumption || '',
      periodReductionFactor:
        wmass?.seismicInformation.periodReductionFactor || 0,
    },
    weight: {
      live: wmass?.weight.live || 0,
      super: wmass?.weight.super || 0,
      dead: wmass?.weight.dead || 0,
      sum: wmass?.weight.sum || 0,
    },
    drift: {
      windX: lookUp(
        'min',
        wdisp?.driftWindXP.drift || [0],
        wdisp?.driftWindXP.storeyID || [0],
      ),
      windY: lookUp(
        'min',
        wdisp?.driftWindYP.drift || [0],
        wdisp?.driftWindYP.storeyID || [0],
      ),
      seismicX: lookUp(
        'min',
        wdisp?.driftSeismicX.drift || [0],
        wdisp?.driftSeismicX.storeyID || [0],
      ),
      seismicY: lookUp(
        'min',
        wdisp?.driftSeismicY.drift || [0],
        wdisp?.driftSeismicY.storeyID || [0],
      ),
      limit: wmass?.generalInformation.basement
        ? calcDriftLimit(
            wmass?.generalInformation.location || '',
            wmass?.generalInformation.structuralSystem || '',
            wmass?.generalInformation.structuralMaterial || '',
            (wmass?.storey.heightToGround[0] || 0) -
              (wmass?.storey.heightToGround[
                wmass?.storey.heightToGround.length -
                  (wmass?.generalInformation.basement || 0)
              ] || 0),
          )
        : calcDriftLimit(
            wmass?.generalInformation.location || '',
            wmass?.generalInformation.structuralSystem || '',
            wmass?.generalInformation.structuralMaterial || '',
            wmass?.storey.heightToGround[0] || 0,
          ),
    },
    dispRatio: {
      eccPX: lookUp(
        'max',
        wdisp?.ratioSeismicXEccP.ratio || [0],
        wdisp?.ratioSeismicXEccP.storeyID || [0],
      ),
      eccNX: lookUp(
        'max',
        wdisp?.ratioSeismicXEccN.ratio || [0],
        wdisp?.ratioSeismicXEccN.storeyID || [0],
      ),
      eccPY: lookUp(
        'max',
        wdisp?.ratioSeismicYEccP.ratio || [0],
        wdisp?.ratioSeismicYEccP.storeyID || [0],
      ),
      eccNY: lookUp(
        'max',
        wdisp?.ratioSeismicYEccN.ratio || [0],
        wdisp?.ratioSeismicYEccN.storeyID || [0],
      ),
      limit: '1.2 / 1.4',
    },
    dispRatioStorey: {
      eccPX: lookUp(
        'max',
        wdisp?.ratioSeismicXEccP.ratioD || [0],
        wdisp?.ratioSeismicXEccP.storeyID || [0],
      ),
      eccNX: lookUp(
        'max',
        wdisp?.ratioSeismicXEccN.ratioD || [0],
        wdisp?.ratioSeismicXEccN.storeyID || [0],
      ),
      eccPY: lookUp(
        'max',
        wdisp?.ratioSeismicYEccP.ratioD || [0],
        wdisp?.ratioSeismicYEccP.storeyID || [0],
      ),
      eccNY: lookUp(
        'max',
        wdisp?.ratioSeismicYEccN.ratioD || [0],
        wdisp?.ratioSeismicYEccN.storeyID || [0],
      ),
      limit: '1.2 / 1.4',
    },
    shearWeightRatio: {
      x:
        wzq?.seismicForce.shearWeightRatioX[
          wzq?.seismicForce.shearWeightRatioX.length -
            (wmass?.generalInformation.constraintFloor || 0) -
            1
        ] || 0,
      xLimit: wzq?.seismicForce.shearWeightRatioLimitX || 0,
      y:
        wzq?.seismicForce.shearWeightRatioY[
          wzq?.seismicForce.shearWeightRatioY.length -
            (wmass?.generalInformation.constraintFloor || 0) -
            1
        ] || 0,
      yLimit: wzq?.seismicForce.shearWeightRatioLimitY || 0,
    },
    stiffWeightRatio: {
      windX: wmass?.stableCheck.windRatioX || 0,
      windXCheck: stiffnessWeightRatioCheck(wmass?.stableCheck.windRatioX || 0),
      windY: wmass?.stableCheck.windRatioY || 0,
      windYCheck: stiffnessWeightRatioCheck(wmass?.stableCheck.windRatioY || 0),
      seismicX: wmass?.stableCheck.seismicRatioX || 0,
      seismicXCheck: stiffnessWeightRatioCheck(
        wmass?.stableCheck.seismicRatioX || 0,
      ),
      seismicY: wmass?.stableCheck.seismicRatioY || 0,
      seismicYCheck: stiffnessWeightRatioCheck(
        wmass?.stableCheck.seismicRatioY || 0,
      ),
    },
    stiffRatio: {
      x:
        wmass?.generalInformation.structuralSystem === '框架结构'
          ? lookUp(
              'min',
              wmass?.stiffness.ratx1 || [0],
              wmass?.stiffness.storeyID || [0],
            )
          : lookUp(
              'min',
              wmass?.stiffness.ratx2 || [0],
              wmass?.stiffness.storeyID || [0],
            ),
      y:
        wmass?.generalInformation.structuralSystem === '框架结构'
          ? lookUp(
              'min',
              wmass?.stiffness.raty1 || [0],
              wmass?.stiffness.storeyID || [0],
            )
          : lookUp(
              'min',
              wmass?.stiffness.raty2 || [0],
              wmass?.stiffness.storeyID || [0],
            ),
    },
    shearCapacityRatio: {
      x: lookUp(
        'min',
        wmass?.shearCapacityCheck.ratioX || [0],
        wmass?.shearCapacityCheck.storeyID || [0],
      ),
      y: lookUp(
        'min',
        wmass?.shearCapacityCheck.ratioY || [0],
        wmass?.shearCapacityCheck.storeyID || [0],
      ),
    },
    mode: writeMode(wzq),
    baseShear: {
      windX:
        wmass?.wind.shearAlongX[
          wmass?.wind.shearAlongX.length -
            (wmass?.generalInformation.constraintFloor || 0) -
            1
        ] || 0,
      windY:
        wmass?.wind.shearAlongY[
          wmass?.wind.shearAlongY.length -
            (wmass?.generalInformation.constraintFloor || 0) -
            1
        ] || 0,
      seismicX:
        wzq?.seismicForce.shearX[
          wzq?.seismicForce.shearX.length -
            (wmass?.generalInformation.constraintFloor || 0) -
            1
        ] || 0,
      seismicY:
        wzq?.seismicForce.shearY[
          wzq?.seismicForce.shearY.length -
            (wmass?.generalInformation.constraintFloor || 0) -
            1
        ] || 0,
    },
    baseMoment: {
      windX:
        wmass?.wind.momentAlongX[
          wmass?.wind.momentAlongX.length -
            (wmass?.generalInformation.constraintFloor || 0) -
            1
        ] || 0,
      windY:
        wmass?.wind.momentAlongY[
          wmass?.wind.momentAlongY.length -
            (wmass?.generalInformation.constraintFloor || 0) -
            1
        ] || 0,
      seismicX:
        wzq?.seismicForce.momentX[
          wzq?.seismicForce.momentX.length -
            (wmass?.generalInformation.constraintFloor || 0) -
            1
        ] || 0,
      seismicY:
        wzq?.seismicForce.momentY[
          wzq?.seismicForce.momentY.length -
            (wmass?.generalInformation.constraintFloor || 0) -
            1
        ] || 0,
    },
  };

  return summary;
}

function writeMode(wzq?: IWzq) {
  const modeID: number[] = wzq?.modeCoupling.modeID || [0];
  const period: number[] = wzq?.modeCoupling.period || [0];
  const angle: number[] = wzq?.modeCoupling.angle || [0];
  const factorX: number[] = wzq?.modeMass.factorX || [0];
  const factorY: number[] = wzq?.modeMass.factorY || [0];
  const factorZ: number[] = wzq?.modeMass.factorZ || [0];

  const indexPeriodZ: number =
    wzq?.modeCoupling.factorZ.findIndex((value) => value >= 0.5) || 0;
  const indexPeriodXY: number =
    wzq?.modeCoupling.factorZ.findIndex((value) => value < 0.5) || 0;
  const periodRatio: number = period[indexPeriodZ] / period[indexPeriodXY];

  const periodRatioCheck: string = periodRatio < 0.85 ? '<0.85' : '>0.85';
  const count: number = period.length;
  const sumX: number = wzq?.modeMass.sumX || 0;
  const sumY: number = wzq?.modeMass.sumY || 0;
  const sumZ: number = wzq?.modeMass.sumZ || 0;

  return {
    modeID,
    period,
    angle,
    factorX,
    factorY,
    factorZ,
    periodRatio,
    periodRatioCheck,
    count,
    sumX,
    sumY,
    sumZ,
  };
}
