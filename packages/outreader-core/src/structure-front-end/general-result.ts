import { IGeneralResultFE, IWmass } from '../interfaces';

export function convertGeneralResult(wmass?: IWmass): IGeneralResultFE {
  const generalResult: IGeneralResultFE = {
    project: {
      engineering: wmass?.basicInformation.engineering || '',
      engineeringCode: wmass?.basicInformation.engineeringCode || '',
      designer: wmass?.basicInformation.designer || '',
      checker: wmass?.basicInformation.checker || '',
      software: wmass?.basicInformation.software || '',
      softwareVersion: wmass?.basicInformation.softwareVersion || '',
      calDate: wmass?.basicInformation.calDate || '',
    },
    tower: {
      towerID: wmass?.tower.towerID || [0],
      structuralSystem: wmass?.tower.structuralSystem || [],
    },
    weight: {
      live: wmass?.weight.live || 0,
      dead: wmass?.weight.dead || 0,
      super: wmass?.weight.super || 0,
      sum: wmass?.weight.sum || 0,
    },
    constraintFloorStiffnessRatio: {
      storeyNo: wmass?.constraintFloorStiffnessRatio.storeyNo || 0,
      towerNo: wmass?.constraintFloorStiffnessRatio.towerNo || 0,
      stiffnessX0: wmass?.constraintFloorStiffnessRatio.stiffnessX0 || 0,
      stiffnessX1: wmass?.constraintFloorStiffnessRatio.stiffnessX1 || 0,
      ratioX: wmass?.constraintFloorStiffnessRatio.ratioX || 0,
      stiffnessY0: wmass?.constraintFloorStiffnessRatio.stiffnessY0 || 0,
      stiffnessY1: wmass?.constraintFloorStiffnessRatio.stiffnessY1 || 0,
      ratioY: wmass?.constraintFloorStiffnessRatio.ratioY || 0,
    },
    overturningCheck: {
      storeyNo: wmass?.overturningCheck.storeyNo || 0,
      towerNo: wmass?.overturningCheck.towerNo || 0,
      mrWindX: wmass?.overturningCheck.mrWindX || 0,
      movWindX: wmass?.overturningCheck.movWindX || 0,
      ratioWindX: wmass?.overturningCheck.ratioWindX || 0,
      zeroAreaWindX: wmass?.overturningCheck.zeroAreaWindX || 0,
      mrWindY: wmass?.overturningCheck.mrWindY || 0,
      movWindY: wmass?.overturningCheck.movWindY || 0,
      ratioWindY: wmass?.overturningCheck.ratioWindY || 0,
      zeroAreaWindY: wmass?.overturningCheck.zeroAreaWindY || 0,
      mrSeismicX: wmass?.overturningCheck.mrSeismicX || 0,
      movSeismicX: wmass?.overturningCheck.movSeismicX || 0,
      ratioSeismicX: wmass?.overturningCheck.ratioSeismicX || 0,
      zeroAreaSeismicX: wmass?.overturningCheck.zeroAreaSeismicX || 0,
      mrSeismicY: wmass?.overturningCheck.mrSeismicY || 0,
      movSeismicY: wmass?.overturningCheck.movSeismicY || 0,
      ratioSeismicY: wmass?.overturningCheck.ratioSeismicY || 0,
      zeroAreaSeismicY: wmass?.overturningCheck.zeroAreaSeismicY || 0,
    },
    stableCheck: {
      seismicStoreyNo: wmass?.stableCheck.seismicStoreyNo || 0,
      seismicTowerNo: wmass?.stableCheck.seismicTowerNo || 0,
      seismicRatioX: wmass?.stableCheck.seismicRatioX || 0,
      seismicRatioY: wmass?.stableCheck.seismicRatioY || 0,
      windStoreyNo: wmass?.stableCheck.windStoreyNo || 0,
      windTowerNo: wmass?.stableCheck.windTowerNo || 0,
      windRatioX: wmass?.stableCheck.windRatioX || 0,
      windRatioY: wmass?.stableCheck.windRatioY || 0,
    },
    windComfort: {
      accelerationAlongX: wmass?.windComfort.accelerationAlongX || 0,
      accelerationCrossX: wmass?.windComfort.accelerationCrossX || 0,
      accelerationAlongY: wmass?.windComfort.accelerationAlongY || 0,
      accelerationCrossY: wmass?.windComfort.accelerationCrossY || 0,
    },
  };

  return generalResult;
}
