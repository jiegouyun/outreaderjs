import { IStructure, ISummaryFE } from '@outreader/core';
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
      storeys: structure.wmass?.storey.storeyID[0] as number,
      height: structure.wmass?.generalInformation.basement
        ? (structure.wmass?.storey.heightToGround[0] as number) -
          (structure.wmass?.storey.heightToGround[
            structure.wmass?.storey.heightToGround.length -
              (structure.wmass?.generalInformation.basement as number)
          ] as number)
        : (structure.wmass?.storey.heightToGround[0] as number),
      basement: structure.wmass?.generalInformation.basement as number,
      constraintFloor: structure.wmass?.generalInformation
        .constraintFloor as number,
      intensity: structure.wmass?.seismicInformation.intensity || '',
      pressureModified: structure.wmass?.windInformation
        .pressureModified as number,
      rigidFloorAssumption:
        structure.wmass?.calculationControl.rigidFloorAssumption || '',
      periodReductionFactor: structure.wmass?.seismicInformation
        .periodReductionFactor as number,
    },
    weight: {
      live: structure.wmass?.weight.live as number,
      super: structure.wmass?.weight.dead as number,
      dead: structure.wmass?.weight.super as number,
      sum: structure.wmass?.weight.sum as number,
    },
    drift: {
      windX: lookUp(
        'min',
        structure.wdisp?.driftWindXP.drift as number[],
        structure.wdisp?.driftWindXP.storeyID as number[],
      ),
      windY: lookUp(
        'min',
        structure.wdisp?.driftWindYP.drift as number[],
        structure.wdisp?.driftWindYP.storeyID as number[],
      ),
      seismicX: lookUp(
        'min',
        structure.wdisp?.driftSeismicX.drift as number[],
        structure.wdisp?.driftSeismicX.storeyID as number[],
      ),
      seismicY: lookUp(
        'min',
        structure.wdisp?.driftSeismicY.drift as number[],
        structure.wdisp?.driftSeismicY.storeyID as number[],
      ),
      limit: structure.wmass?.generalInformation.basement
        ? calcDriftLimit(
            structure.wmass?.generalInformation.location as string,
            structure.wmass?.generalInformation.structuralSystem as string,
            structure.wmass?.generalInformation.structuralMaterial as string,
            (structure.wmass?.storey.heightToGround[0] as number) -
              (structure.wmass?.storey.heightToGround[
                structure.wmass?.storey.heightToGround.length -
                  (structure.wmass?.generalInformation.basement as number)
              ] as number),
          )
        : calcDriftLimit(
            structure.wmass?.generalInformation.location as string,
            structure.wmass?.generalInformation.structuralSystem as string,
            structure.wmass?.generalInformation.structuralMaterial as string,
            structure.wmass?.storey.heightToGround[0] as number,
          ),
    },
    dispRatio: {
      eccPX: lookUp(
        'max',
        structure.wdisp?.ratioSeismicXEccP.ratio as number[],
        structure.wdisp?.ratioSeismicXEccP.storeyID as number[],
      ),
      eccNX: lookUp(
        'max',
        structure.wdisp?.ratioSeismicXEccN.ratio as number[],
        structure.wdisp?.ratioSeismicXEccN.storeyID as number[],
      ),
      eccPY: lookUp(
        'max',
        structure.wdisp?.ratioSeismicYEccP.ratio as number[],
        structure.wdisp?.ratioSeismicYEccP.storeyID as number[],
      ),
      eccNY: lookUp(
        'max',
        structure.wdisp?.ratioSeismicYEccN.ratio as number[],
        structure.wdisp?.ratioSeismicYEccN.storeyID as number[],
      ),
      limit: '1.2 / 1.4',
    },
    dispRatioStorey: {
      eccPX: lookUp(
        'max',
        structure.wdisp?.ratioSeismicXEccP.ratioD as number[],
        structure.wdisp?.ratioSeismicXEccP.storeyID as number[],
      ),
      eccNX: lookUp(
        'max',
        structure.wdisp?.ratioSeismicXEccN.ratioD as number[],
        structure.wdisp?.ratioSeismicXEccN.storeyID as number[],
      ),
      eccPY: lookUp(
        'max',
        structure.wdisp?.ratioSeismicYEccP.ratioD as number[],
        structure.wdisp?.ratioSeismicYEccP.storeyID as number[],
      ),
      eccNY: lookUp(
        'max',
        structure.wdisp?.ratioSeismicYEccN.ratioD as number[],
        structure.wdisp?.ratioSeismicYEccN.storeyID as number[],
      ),
      limit: '1.2 / 1.4',
    },
    shearWeightRatio: {
      x: structure.wzq?.seismicForce.shearWeightRatioX[
        structure.wzq?.seismicForce.shearWeightRatioX.length -
          (structure.wmass?.generalInformation.constraintFloor as number) -
          1
      ] as number,
      xLimit: structure.wzq?.seismicForce.shearWeightRatioLimitX as number,
      y: structure.wzq?.seismicForce.shearWeightRatioY[
        structure.wzq?.seismicForce.shearWeightRatioY.length -
          (structure.wmass?.generalInformation.constraintFloor as number) -
          1
      ] as number,
      yLimit: structure.wzq?.seismicForce.shearWeightRatioLimitY as number,
    },
    stiffWeightRatio: {
      windX: structure.wmass?.stableCheck.windRatioX as number,
      windXCheck: stiffnessWeightRatioCheck(
        structure.wmass?.stableCheck.windRatioX as number,
      ),
      windY: structure.wmass?.stableCheck.windRatioY as number,
      windYCheck: stiffnessWeightRatioCheck(
        structure.wmass?.stableCheck.windRatioY as number,
      ),
      seismicX: structure.wmass?.stableCheck.seismicRatioX as number,
      seismicXCheck: stiffnessWeightRatioCheck(
        structure.wmass?.stableCheck.seismicRatioX as number,
      ),
      seismicY: structure.wmass?.stableCheck.seismicRatioY as number,
      seismicYCheck: stiffnessWeightRatioCheck(
        structure.wmass?.stableCheck.seismicRatioY as number,
      ),
    },
    stiffRatio: {
      x:
        structure.wmass?.generalInformation.structuralSystem === '框架结构'
          ? lookUp(
              'min',
              structure.wmass?.stiffness.ratx1 as number[],
              structure.wmass?.stiffness.storeyID as number[],
            )
          : lookUp(
              'min',
              structure.wmass?.stiffness.ratx2 as number[],
              structure.wmass?.stiffness.storeyID as number[],
            ),
      y:
        structure.wmass?.generalInformation.structuralSystem === '框架结构'
          ? lookUp(
              'min',
              structure.wmass?.stiffness.raty1 as number[],
              structure.wmass?.stiffness.storeyID as number[],
            )
          : lookUp(
              'min',
              structure.wmass?.stiffness.raty2 as number[],
              structure.wmass?.stiffness.storeyID as number[],
            ),
    },
    shearCapacityRatio: {
      x: lookUp(
        'min',
        structure.wmass?.shearCapacityCheck.ratioX as number[],
        structure.wmass?.shearCapacityCheck.storeyID as number[],
      ),
      y: lookUp(
        'min',
        structure.wmass?.shearCapacityCheck.ratioY as number[],
        structure.wmass?.shearCapacityCheck.storeyID as number[],
      ),
    },
    mode: writeMode(structure),
    baseShear: {
      windX: structure.wmass?.wind.shearAlongX[
        structure.wmass?.wind.shearAlongX.length -
          (structure.wmass?.generalInformation.constraintFloor as number) -
          1
      ] as number,
      windY: structure.wmass?.wind.shearAlongY[
        structure.wmass?.wind.shearAlongY.length -
          (structure.wmass?.generalInformation.constraintFloor as number) -
          1
      ] as number,
      seismicX: structure.wzq?.seismicForce.shearX[
        structure.wzq?.seismicForce.shearX.length -
          (structure.wmass?.generalInformation.constraintFloor as number) -
          1
      ] as number,
      seismicY: structure.wzq?.seismicForce.shearY[
        structure.wzq?.seismicForce.shearY.length -
          (structure.wmass?.generalInformation.constraintFloor as number) -
          1
      ] as number,
    },
    baseMoment: {
      windX: structure.wmass?.wind.momentAlongX[
        structure.wmass?.wind.momentAlongX.length -
          (structure.wmass?.generalInformation.constraintFloor as number) -
          1
      ] as number,
      windY: structure.wmass?.wind.momentAlongY[
        structure.wmass?.wind.momentAlongY.length -
          (structure.wmass?.generalInformation.constraintFloor as number) -
          1
      ] as number,
      seismicX: structure.wzq?.seismicForce.momentX[
        structure.wzq?.seismicForce.momentX.length -
          (structure.wmass?.generalInformation.constraintFloor as number) -
          1
      ] as number,
      seismicY: structure.wzq?.seismicForce.momentY[
        structure.wzq?.seismicForce.momentY.length -
          (structure.wmass?.generalInformation.constraintFloor as number) -
          1
      ] as number,
    },
  };

  return summary;
}

function writeMode(structure: IStructure) {
  const modeID: number[] = structure.wzq?.modeCoupling.modeID as number[];
  const period: number[] = structure.wzq?.modeCoupling.period as number[];
  const factorX: number[] = structure.wzq?.modeMass.factorX as number[];
  const factorY: number[] = structure.wzq?.modeMass.factorY as number[];
  const factorZ: number[] = structure.wzq?.modeMass.factorZ as number[];

  const indexPeriodZ: number = structure.wzq?.modeCoupling.factorZ.findIndex(
    (value) => value >= 0.5,
  ) as number;
  const indexPeriodXY: number = structure.wzq?.modeCoupling.factorZ.findIndex(
    (value) => value < 0.5,
  ) as number;
  const periodRatio: number = period[indexPeriodZ] / period[indexPeriodXY];

  const periodRatioCheck: string = periodRatio < 0.85 ? '<0.85' : '>0.85';
  const count: number = period.length;
  const sumX: number = structure.wzq?.modeMass.sumX as number;
  const sumY: number = structure.wzq?.modeMass.sumY as number;
  const sumZ: number = structure.wzq?.modeMass.sumZ as number;

  return {
    modeID,
    period,
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
