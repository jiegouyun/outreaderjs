import { IStructure, IParametersFE } from '@outreader/core';

export function convertParameters(structure: IStructure): IParametersFE {
  const parameters: IParametersFE = {
    general: {
      system: structure.wmass?.generalInformation.structuralSystem || '',
      material: structure.wmass?.generalInformation.structuralMaterial || '',
      location: structure.wmass?.generalInformation.location || '',
      basement: structure.wmass?.generalInformation.basement || 0,
      constraintFloor: structure.wmass?.generalInformation.constraintFloor || 0,
      podium: structure.wmass?.generalInformation.podium || 0,
      transferStorey: structure.wmass?.generalInformation.transferStorey || 0,
      reinforceStorey: structure.wmass?.generalInformation.reinforceStorey || 0,
    },
    calculate: {
      couplingBeamFactorSeismic:
        structure.wmass?.calculationControl.couplingBeamFactorSeismic || 0,
      couplingBeamFactorWind:
        structure.wmass?.calculationControl.couplingBeamFactorWind || 0,
      rigidFloorAssumption:
        structure.wmass?.calculationControl.rigidFloorAssumption || '',
    },
    wind: {
      assigned: structure.wmass?.windInformation.useAssigned || '',
      loadCode: structure.wmass?.windInformation.loadCode || '',
      terrainRoughness: structure.wmass?.windInformation.terrainRoughness || '',
      pressureModified: structure.wmass?.windInformation.pressureModified || 0,
      dampingRatio: structure.wmass?.windInformation.dampingRatio || 0,
      pressureComfort: structure.wmass?.windInformation.pressureComfort || 0,
      dampingRationComfort:
        structure.wmass?.windInformation.dampingRationComfort || 0,
    },
    seismic: {
      use2015GB18306: structure.wmass?.seismicInformation.use2015GB18306 || '',
      group: structure.wmass?.seismicInformation.group || '',
      intensity: structure.wmass?.seismicInformation.intensity || '',
      siteCategory: structure.wmass?.seismicInformation.siteCategory || '',
      characteristicPeriod:
        structure.wmass?.seismicInformation.characteristicPeriod || 0,
      dampingRatio: structure.wmass?.seismicInformation.dampingRatio || 0,
      periodReductionFactor:
        structure.wmass?.seismicInformation.periodReductionFactor || 0,
      eccentricityX: structure.wmass?.seismicInformation.eccentricityX || 0,
      eccentricityY: structure.wmass?.seismicInformation.eccentricityY || 0,
      maxSpectrumValue:
        structure.wmass?.seismicInformation.maxSpectrumValue || 0,
      maxSpectrumValueL3:
        structure.wmass?.seismicInformation.maxSpectrumValueL3 || 0,
      additionalDampingRatio:
        structure.wmass?.seismicInformation.additionalDampingRatio || 0,
      modifiedSeismicReductionFactor:
        structure.wmass?.seismicInformation.modifiedSeismicReductionFactor || 0,
    },
  };

  return parameters;
}
