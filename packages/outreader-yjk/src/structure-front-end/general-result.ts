import {
  IStructure,
  IGeneralResultFE,
  IProjectFE,
  ITowerFE,
  IWeightFE,
  IConstraintFloorStiffnessRatioFE,
  IOverturningCheckFE,
  IStableCheckFE,
  IWindComfortFE,
} from '@outreader/core';

export function convertGeneralResult(structure: IStructure): IGeneralResultFE {
  const generalResult: IGeneralResultFE = {
    project: structure.wmass?.basicInformation as IProjectFE,
    tower: structure.wmass?.tower as ITowerFE,
    weight: structure.wmass?.weight as IWeightFE,
    constraintFloorStiffnessRatio: structure.wmass
      ?.constraintFloorStiffnessRatio as IConstraintFloorStiffnessRatioFE,
    overturningCheck: structure.wmass?.overturningCheck as IOverturningCheckFE,
    stableCheck: structure.wmass?.stableCheck as IStableCheckFE,
    windComfort: structure.wmass?.windComfort as IWindComfortFE,
  };

  return generalResult;
}
