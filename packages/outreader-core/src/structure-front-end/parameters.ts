import { IParametersFE, IWmass } from '../interfaces';

export function convertParameters(wmass?: IWmass): IParametersFE {
  const parameters: IParametersFE = {
    general: {
      system: wmass?.generalInformation.structuralSystem || '',
      material: wmass?.generalInformation.structuralMaterial || '',
      location: wmass?.generalInformation.location || '',
      basement: wmass?.generalInformation.basement || 0,
      constraintFloor: wmass?.generalInformation.constraintFloor || 0,
      podium: wmass?.generalInformation.podium || 0,
      transferStorey: wmass?.generalInformation.transferStorey || 0,
      reinforceStorey: wmass?.generalInformation.reinforceStorey || 0,
    },
    calculate: {
      couplingBeamFactorSeismic:
        wmass?.calculationControl.couplingBeamFactorSeismic || 0,
      couplingBeamFactorWind:
        wmass?.calculationControl.couplingBeamFactorWind || 0,
      rigidFloorAssumption:
        wmass?.calculationControl.rigidFloorAssumption || '',
    },
    wind: {
      assigned: wmass?.windInformation.useAssigned || '',
      loadCode: wmass?.windInformation.loadCode || '',
      terrainRoughness: wmass?.windInformation.terrainRoughness || '',
      pressureModified: wmass?.windInformation.pressureModified || 0,
      dampingRatio: wmass?.windInformation.dampingRatio || 0,
      pressureComfort: wmass?.windInformation.pressureComfort || 0,
      dampingRationComfort: wmass?.windInformation.dampingRationComfort || 0,
    },
    seismic: {
      use2015GB18306: wmass?.seismicInformation.use2015GB18306 || '',
      group: wmass?.seismicInformation.group || '',
      intensity: wmass?.seismicInformation.intensity || '',
      siteCategory: wmass?.seismicInformation.siteCategory || '',
      characteristicPeriod: wmass?.seismicInformation.characteristicPeriod || 0,
      dampingRatio: wmass?.seismicInformation.dampingRatio || 0,
      periodReductionFactor:
        wmass?.seismicInformation.periodReductionFactor || 0,
      eccentricityX: wmass?.seismicInformation.eccentricityX || 0,
      eccentricityY: wmass?.seismicInformation.eccentricityY || 0,
      maxSpectrumValue: wmass?.seismicInformation.maxSpectrumValue || 0,
      maxSpectrumValueL3: wmass?.seismicInformation.maxSpectrumValueL3 || 0,
      additionalDampingRatio:
        wmass?.seismicInformation.additionalDampingRatio || 0,
      modifiedSeismicReductionFactor:
        wmass?.seismicInformation.modifiedSeismicReductionFactor || 0,
    },
  };

  return parameters;
}
