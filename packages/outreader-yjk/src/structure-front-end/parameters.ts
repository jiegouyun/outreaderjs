import { IStructure, IParametersFE } from '@outreader/core';

export function convertParameters(structure: IStructure): IParametersFE {
  const parameters: IParametersFE = {
    general: {
      system: structure.wmass?.generalInformation.structuralSystem || '',
      material: structure.wmass?.generalInformation.structuralMaterial || '',
      location: structure.wmass?.generalInformation.location || '',
      basement: structure.wmass?.generalInformation.basement as number,
      constraintFloor: structure.wmass?.generalInformation
        .constraintFloor as number,
      podium: structure.wmass?.generalInformation.podium as number,
      transferStorey: structure.wmass?.generalInformation
        .transferStorey as number,
      reinforceStorey: structure.wmass?.generalInformation
        .reinforceStorey as number,
    },
    calculate: {
      couplingBeamFactorSeismic: structure.wmass?.calculationControl
        .couplingBeamFactorSeismic as number,
      couplingBeamFactorWind: structure.wmass?.calculationControl
        .couplingBeamFactorWind as number,
      rigidFloorAssumption:
        structure.wmass?.calculationControl.rigidFloorAssumption || '',
    },
    wind: {
      assigned: structure.wmass?.windInformation.useAssigned || '',
      loadCode: structure.wmass?.windInformation.loadCode || '',
      terrainRoughness: structure.wmass?.windInformation.terrainRoughness || '',
      pressureModified: structure.wmass?.windInformation
        .pressureModified as number,
      dampingRatio: structure.wmass?.windInformation.dampingRatio as number,
      pressureComfort: structure.wmass?.windInformation
        .pressureComfort as number,
      dampingRationComfort: structure.wmass?.windInformation
        .dampingRationComfort as number,
    },
    seismic: {
      use2015GB18306: structure.wmass?.seismicInformation.use2015GB18306 || '',
      group: structure.wmass?.seismicInformation.group || '',
      intensity: structure.wmass?.seismicInformation.intensity || '',
      siteCategory: structure.wmass?.seismicInformation.siteCategory || '',
      characteristicPeriod: structure.wmass?.seismicInformation
        .characteristicPeriod as number,
      dampingRatio: structure.wmass?.seismicInformation.dampingRatio as number,
      periodReductionFactor: structure.wmass?.seismicInformation
        .periodReductionFactor as number,
      eccentricityX: structure.wmass?.seismicInformation
        .eccentricityX as number,
      eccentricityY: structure.wmass?.seismicInformation
        .eccentricityY as number,
      maxSpectrumValue: structure.wmass?.seismicInformation
        .maxSpectrumValue as number,
      maxSpectrumValueL3: structure.wmass?.seismicInformation
        .maxSpectrumValueL3 as number,
      additionalDampingRatio: structure.wmass?.seismicInformation
        .additionalDampingRatio as number,
      modifiedSeismicReductionFactor: structure.wmass?.seismicInformation
        .modifiedSeismicReductionFactor as number,
    },
  };

  return parameters;
}
