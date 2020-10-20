import { IStructure, ISummaryFE } from '../interfaces';
import { lookUp, calcDriftLimit, stiffnessWeightRatioCheck } from './tools';

export function convertSummary(structure: IStructure): ISummaryFE {
  const summary: ISummaryFE = {
    project: {
      dir: structure.dir,
      engineering: structure.wmass?.basicInformation.engineering || '',
      calDate: structure.wmass?.basicInformation.calDate || '',
      software: structure.wmass?.basicInformation.software || '',
      softwareVersion: structure.wmass?.basicInformation.softwareVersion || '',
    },
    structures: {
      system: structure.wmass?.generalInformation.structuralSystem || '',
      material: structure.wmass?.generalInformation.structuralMaterial || '',
      storeys: structure.wmass?.storey.storeyID[0] || 0,
      height: structure.wmass?.generalInformation.basement
        ? (structure.wmass?.storey.heightToGround[0] || 0) -
          (structure.wmass?.storey.heightToGround[
            structure.wmass?.storey.heightToGround.length -
              (structure.wmass?.generalInformation.basement || 0)
          ] || 0)
        : structure.wmass?.storey.heightToGround[0] || 0,
      basement: structure.wmass?.generalInformation.basement || 0,
      constraintFloor: structure.wmass?.generalInformation.constraintFloor || 0,
      intensity: structure.wmass?.seismicInformation.intensity || '',
      pressureModified: structure.wmass?.windInformation.pressureModified || 0,
      rigidFloorAssumption:
        structure.wmass?.calculationControl.rigidFloorAssumption || '',
      periodReductionFactor:
        structure.wmass?.seismicInformation.periodReductionFactor || 0,
    },
    weight: {
      live: structure.wmass?.weight.live || 0,
      super: structure.wmass?.weight.super || 0,
      dead: structure.wmass?.weight.dead || 0,
      sum: structure.wmass?.weight.sum || 0,
    },
    drift: {
      windX: lookUp(
        'min',
        structure.wdisp?.driftWindXP.drift || [0],
        structure.wdisp?.driftWindXP.storeyID || [0],
      ),
      windY: lookUp(
        'min',
        structure.wdisp?.driftWindYP.drift || [0],
        structure.wdisp?.driftWindYP.storeyID || [0],
      ),
      seismicX: lookUp(
        'min',
        structure.wdisp?.driftSeismicX.drift || [0],
        structure.wdisp?.driftSeismicX.storeyID || [0],
      ),
      seismicY: lookUp(
        'min',
        structure.wdisp?.driftSeismicY.drift || [0],
        structure.wdisp?.driftSeismicY.storeyID || [0],
      ),
      limit: structure.wmass?.generalInformation.basement
        ? calcDriftLimit(
            structure.wmass?.generalInformation.location || '',
            structure.wmass?.generalInformation.structuralSystem || '',
            structure.wmass?.generalInformation.structuralMaterial || '',
            (structure.wmass?.storey.heightToGround[0] || 0) -
              (structure.wmass?.storey.heightToGround[
                structure.wmass?.storey.heightToGround.length -
                  (structure.wmass?.generalInformation.basement || 0)
              ] || 0),
          )
        : calcDriftLimit(
            structure.wmass?.generalInformation.location || '',
            structure.wmass?.generalInformation.structuralSystem || '',
            structure.wmass?.generalInformation.structuralMaterial || '',
            structure.wmass?.storey.heightToGround[0] || 0,
          ),
    },
    dispRatio: {
      eccPX: lookUp(
        'max',
        structure.wdisp?.ratioSeismicXEccP.ratio || [0],
        structure.wdisp?.ratioSeismicXEccP.storeyID || [0],
      ),
      eccNX: lookUp(
        'max',
        structure.wdisp?.ratioSeismicXEccN.ratio || [0],
        structure.wdisp?.ratioSeismicXEccN.storeyID || [0],
      ),
      eccPY: lookUp(
        'max',
        structure.wdisp?.ratioSeismicYEccP.ratio || [0],
        structure.wdisp?.ratioSeismicYEccP.storeyID || [0],
      ),
      eccNY: lookUp(
        'max',
        structure.wdisp?.ratioSeismicYEccN.ratio || [0],
        structure.wdisp?.ratioSeismicYEccN.storeyID || [0],
      ),
      limit: '1.2 / 1.4',
    },
    dispRatioStorey: {
      eccPX: lookUp(
        'max',
        structure.wdisp?.ratioSeismicXEccP.ratioD || [0],
        structure.wdisp?.ratioSeismicXEccP.storeyID || [0],
      ),
      eccNX: lookUp(
        'max',
        structure.wdisp?.ratioSeismicXEccN.ratioD || [0],
        structure.wdisp?.ratioSeismicXEccN.storeyID || [0],
      ),
      eccPY: lookUp(
        'max',
        structure.wdisp?.ratioSeismicYEccP.ratioD || [0],
        structure.wdisp?.ratioSeismicYEccP.storeyID || [0],
      ),
      eccNY: lookUp(
        'max',
        structure.wdisp?.ratioSeismicYEccN.ratioD || [0],
        structure.wdisp?.ratioSeismicYEccN.storeyID || [0],
      ),
      limit: '1.2 / 1.4',
    },
    shearWeightRatio: {
      x:
        structure.wzq?.seismicForce.shearWeightRatioX[
          structure.wzq?.seismicForce.shearWeightRatioX.length -
            (structure.wmass?.generalInformation.constraintFloor || 0) -
            1
        ] || 0,
      xLimit: structure.wzq?.seismicForce.shearWeightRatioLimitX || 0,
      y:
        structure.wzq?.seismicForce.shearWeightRatioY[
          structure.wzq?.seismicForce.shearWeightRatioY.length -
            (structure.wmass?.generalInformation.constraintFloor || 0) -
            1
        ] || 0,
      yLimit: structure.wzq?.seismicForce.shearWeightRatioLimitY || 0,
    },
    stiffWeightRatio: {
      windX: structure.wmass?.stableCheck.windRatioX || 0,
      windXCheck: stiffnessWeightRatioCheck(
        structure.wmass?.stableCheck.windRatioX || 0,
      ),
      windY: structure.wmass?.stableCheck.windRatioY || 0,
      windYCheck: stiffnessWeightRatioCheck(
        structure.wmass?.stableCheck.windRatioY || 0,
      ),
      seismicX: structure.wmass?.stableCheck.seismicRatioX || 0,
      seismicXCheck: stiffnessWeightRatioCheck(
        structure.wmass?.stableCheck.seismicRatioX || 0,
      ),
      seismicY: structure.wmass?.stableCheck.seismicRatioY || 0,
      seismicYCheck: stiffnessWeightRatioCheck(
        structure.wmass?.stableCheck.seismicRatioY || 0,
      ),
    },
    stiffRatio: {
      x:
        structure.wmass?.generalInformation.structuralSystem === '框架结构'
          ? lookUp(
              'min',
              structure.wmass?.stiffness.ratx1 || [0],
              structure.wmass?.stiffness.storeyID || [0],
            )
          : lookUp(
              'min',
              structure.wmass?.stiffness.ratx2 || [0],
              structure.wmass?.stiffness.storeyID || [0],
            ),
      y:
        structure.wmass?.generalInformation.structuralSystem === '框架结构'
          ? lookUp(
              'min',
              structure.wmass?.stiffness.raty1 || [0],
              structure.wmass?.stiffness.storeyID || [0],
            )
          : lookUp(
              'min',
              structure.wmass?.stiffness.raty2 || [0],
              structure.wmass?.stiffness.storeyID || [0],
            ),
    },
    shearCapacityRatio: {
      x: lookUp(
        'min',
        structure.wmass?.shearCapacityCheck.ratioX || [0],
        structure.wmass?.shearCapacityCheck.storeyID || [0],
      ),
      y: lookUp(
        'min',
        structure.wmass?.shearCapacityCheck.ratioY || [0],
        structure.wmass?.shearCapacityCheck.storeyID || [0],
      ),
    },
    mode: writeMode(structure),
    baseShear: {
      windX:
        structure.wmass?.wind.shearAlongX[
          structure.wmass?.wind.shearAlongX.length -
            (structure.wmass?.generalInformation.constraintFloor || 0) -
            1
        ] || 0,
      windY:
        structure.wmass?.wind.shearAlongY[
          structure.wmass?.wind.shearAlongY.length -
            (structure.wmass?.generalInformation.constraintFloor || 0) -
            1
        ] || 0,
      seismicX:
        structure.wzq?.seismicForce.shearX[
          structure.wzq?.seismicForce.shearX.length -
            (structure.wmass?.generalInformation.constraintFloor || 0) -
            1
        ] || 0,
      seismicY:
        structure.wzq?.seismicForce.shearY[
          structure.wzq?.seismicForce.shearY.length -
            (structure.wmass?.generalInformation.constraintFloor || 0) -
            1
        ] || 0,
    },
    baseMoment: {
      windX:
        structure.wmass?.wind.momentAlongX[
          structure.wmass?.wind.momentAlongX.length -
            (structure.wmass?.generalInformation.constraintFloor || 0) -
            1
        ] || 0,
      windY:
        structure.wmass?.wind.momentAlongY[
          structure.wmass?.wind.momentAlongY.length -
            (structure.wmass?.generalInformation.constraintFloor || 0) -
            1
        ] || 0,
      seismicX:
        structure.wzq?.seismicForce.momentX[
          structure.wzq?.seismicForce.momentX.length -
            (structure.wmass?.generalInformation.constraintFloor || 0) -
            1
        ] || 0,
      seismicY:
        structure.wzq?.seismicForce.momentY[
          structure.wzq?.seismicForce.momentY.length -
            (structure.wmass?.generalInformation.constraintFloor || 0) -
            1
        ] || 0,
    },
  };

  return summary;
}

function writeMode(structure: IStructure) {
  const modeID: number[] = structure.wzq?.modeCoupling.modeID || [0];
  const period: number[] = structure.wzq?.modeCoupling.period || [0];
  const angle: number[] = structure.wzq?.modeCoupling.angle || [0];
  const factorX: number[] = structure.wzq?.modeMass.factorX || [0];
  const factorY: number[] = structure.wzq?.modeMass.factorY || [0];
  const factorZ: number[] = structure.wzq?.modeMass.factorZ || [0];

  const indexPeriodZ: number =
    structure.wzq?.modeCoupling.factorZ.findIndex((value) => value >= 0.5) || 0;
  const indexPeriodXY: number =
    structure.wzq?.modeCoupling.factorZ.findIndex((value) => value < 0.5) || 0;
  const periodRatio: number = period[indexPeriodZ] / period[indexPeriodXY];

  const periodRatioCheck: string = periodRatio < 0.85 ? '<0.85' : '>0.85';
  const count: number = period.length;
  const sumX: number = structure.wzq?.modeMass.sumX || 0;
  const sumY: number = structure.wzq?.modeMass.sumY || 0;
  const sumZ: number = structure.wzq?.modeMass.sumZ || 0;

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
