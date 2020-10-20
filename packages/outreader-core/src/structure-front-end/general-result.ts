import { IStructure, IGeneralResultFE } from '../interfaces';

export function convertGeneralResult(structure: IStructure): IGeneralResultFE {
  const generalResult: IGeneralResultFE = {
    project: {
      engineering: structure.wmass?.basicInformation.engineering || '',
      engineeringCode: structure.wmass?.basicInformation.engineeringCode || '',
      designer: structure.wmass?.basicInformation.designer || '',
      checker: structure.wmass?.basicInformation.checker || '',
      software: structure.wmass?.basicInformation.software || '',
      softwareVersion: structure.wmass?.basicInformation.softwareVersion || '',
      calDate: structure.wmass?.basicInformation.calDate || '',
    },
    tower: {
      towerID: structure.wmass?.tower.towerID || [0],
      structuralSystem: structure.wmass?.tower.structuralSystem || [],
    },
    weight: {
      live: structure.wmass?.weight.live || 0,
      dead: structure.wmass?.weight.dead || 0,
      super: structure.wmass?.weight.super || 0,
      sum: structure.wmass?.weight.sum || 0,
    },
    constraintFloorStiffnessRatio: {
      storeyNo: structure.wmass?.constraintFloorStiffnessRatio.storeyNo || 0,
      towerNo: structure.wmass?.constraintFloorStiffnessRatio.towerNo || 0,
      stiffnessX0:
        structure.wmass?.constraintFloorStiffnessRatio.stiffnessX0 || 0,
      stiffnessX1:
        structure.wmass?.constraintFloorStiffnessRatio.stiffnessX1 || 0,
      ratioX: structure.wmass?.constraintFloorStiffnessRatio.ratioX || 0,
      stiffnessY0:
        structure.wmass?.constraintFloorStiffnessRatio.stiffnessY0 || 0,
      stiffnessY1:
        structure.wmass?.constraintFloorStiffnessRatio.stiffnessY1 || 0,
      ratioY: structure.wmass?.constraintFloorStiffnessRatio.ratioY || 0,
    },
    overturningCheck: {
      storeyNo: structure.wmass?.overturningCheck.storeyNo || 0,
      towerNo: structure.wmass?.overturningCheck.towerNo || 0,
      mrWindX: structure.wmass?.overturningCheck.mrWindX || 0,
      movWindX: structure.wmass?.overturningCheck.movWindX || 0,
      ratioWindX: structure.wmass?.overturningCheck.ratioWindX || 0,
      zeroAreaWindX: structure.wmass?.overturningCheck.zeroAreaWindX || 0,
      mrWindY: structure.wmass?.overturningCheck.mrWindY || 0,
      movWindY: structure.wmass?.overturningCheck.movWindY || 0,
      ratioWindY: structure.wmass?.overturningCheck.ratioWindY || 0,
      zeroAreaWindY: structure.wmass?.overturningCheck.zeroAreaWindY || 0,
      mrSeismicX: structure.wmass?.overturningCheck.mrSeismicX || 0,
      movSeismicX: structure.wmass?.overturningCheck.movSeismicX || 0,
      ratioSeismicX: structure.wmass?.overturningCheck.ratioSeismicX || 0,
      zeroAreaSeismicX: structure.wmass?.overturningCheck.zeroAreaSeismicX || 0,
      mrSeismicY: structure.wmass?.overturningCheck.mrSeismicY || 0,
      movSeismicY: structure.wmass?.overturningCheck.movSeismicY || 0,
      ratioSeismicY: structure.wmass?.overturningCheck.ratioSeismicY || 0,
      zeroAreaSeismicY: structure.wmass?.overturningCheck.zeroAreaSeismicY || 0,
    },
    stableCheck: {
      seismicStoreyNo: structure.wmass?.stableCheck.seismicStoreyNo || 0,
      seismicTowerNo: structure.wmass?.stableCheck.seismicTowerNo || 0,
      seismicRatioX: structure.wmass?.stableCheck.seismicRatioX || 0,
      seismicRatioY: structure.wmass?.stableCheck.seismicRatioY || 0,
      windStoreyNo: structure.wmass?.stableCheck.windStoreyNo || 0,
      windTowerNo: structure.wmass?.stableCheck.windTowerNo || 0,
      windRatioX: structure.wmass?.stableCheck.windRatioX || 0,
      windRatioY: structure.wmass?.stableCheck.windRatioY || 0,
    },
    windComfort: {
      accelerationAlongX: structure.wmass?.windComfort.accelerationAlongX || 0,
      accelerationCrossX: structure.wmass?.windComfort.accelerationCrossX || 0,
      accelerationAlongY: structure.wmass?.windComfort.accelerationAlongY || 0,
      accelerationCrossY: structure.wmass?.windComfort.accelerationCrossY || 0,
    },
  };

  return generalResult;
}
