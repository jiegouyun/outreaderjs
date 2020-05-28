import { extractCalculationControl } from './wmass';

export interface IWmass {
  information: IInformation;
  generalInformation: IGeneralInformation;
  calculationControl: ICalculationControl;
  windInformation: IWindInformation;
  seismicInformation: ISeismicInformation;
  weight: IWeight;
  constraintFloorStiffnessRatio: IConstraintFloorStiffnessRatio;
  overturningCheck: IOverturningCheck;
  stableCheck: IStableCheck;
}

export interface IInformation {
  engineering?: string;
  engineeringCode?: string;
  designer?: string;
  checker?: string;
  software?: string;
  softwareVersion?: string;
  calDate?: string;
  allExtracted?: boolean;
}

export interface IGeneralInformation {
  structuralSystem?: string;
  structuralMaterial?: string;
  location?: string;
  basement?: number;
  constraintFloor?: number;
  podium?: number;
  transferStorey?: number;
  reinforceStorey?: number;
  allExtracted?: boolean;
}

export interface ICalculationControl {
  couplingBeamFactorSeismic?: number;
  couplingBeamFactorWind?: number;
  rigidFloorAssumption?: string;
  allExtracted?: boolean;
}

export interface IWindInformation {
  useAssigned?: boolean;
  loadCode?: string;
  terrainRoughness?: string;
  pressureModified?: number;
  dampingRatio?: number;
  pressureComfort?: number;
  dampingRationComfort?: number;
  allExtracted?: boolean;
}

export interface ISeismicInformation {
  use2015GB18306?: boolean;
  group?: string;
  intensity?: string;
  siteCategory?: string;
  characteristicPeriod?: number;
  dampingRatio?: number;
  periodReductionFactor?: number
  eccentricityX?: number;
  eccentricityY?: number;
  maxSpectrumValue?: number;
  maxSpectrumValueL3?: number;
  additionalDampingRatio?: number;
  modifiedSeismicReductionFactor?: number;
  allExtracted?: boolean;
}

export interface IWeight {
  live?: number;
  dead?: number;
  super?: number;
  sum?: number;
  allExtracted?: boolean;
}

export interface IConstraintFloorStiffnessRatio {
  storeyID?: number;
  towerID?: number;
  stiffnessX0?: number;
  stiffnessX1?: number;
  ratioX?: number;
  stiffnessY0?: number;
  stiffnessY1?: number;
  ratioY?: number;
  allExtracted?: boolean;
}

export interface IOverturningCheck {
  storeyID?: number;
  towerID?: number;
  mrWindX?: number;
  movWindX?: number;
  ratioWindX?: number;
  zeroAreaWindX?: number;
  mrWindY?: number;
  movWindY?: number;
  ratioWindY?: number;
  zeroAreaWindY?: number;
  mrSeismicX?: number;
  movSeismicX?: number;
  ratioSeismicX?: number;
  zeroAreaSeismicX?: number;
  mrSeismicY?: number;
  movSeismicY?: number;
  ratioSeismicY?: number;
  zeroAreaSeismicY?: number;
  allExtracted?: boolean;
}

export interface IStableCheck {
  seismicID?: number;
  seismicTcowerID?: number;
  seismicRatioX?: number;
  seismicRatioY?: number;
  windID?: number;
  windTcowerID?: number;
  windRatioX?: number;
  windRatioY?: number;
  allExtracted?: boolean;
}
