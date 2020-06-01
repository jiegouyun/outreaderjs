import { extractCalculationControl } from './wmass';

export interface IWmass {
  information: IInformation;
  generalInformation: IGeneralInformation;
  calculationControl: ICalculationControl;
  windInformation: IWindInformation;
  seismicInformation: ISeismicInformation;
  storey: IStorey;
  tower: ITower;
  massRatio: IMassRatio;
  weight: IWeight;
  wind: IWind;
  stiffness: IStiffness;
  constraintFloorStiffnessRatio: IConstraintFloorStiffnessRatio;
  overturningCheck: IOverturningCheck;
  stableCheck: IStableCheck;
  shearWeightRatioModify: IShearWeightRatioModify;
  windComfort: IWindComfort;
  shearCapacityCheck: IShearCapacityCheck;
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
  periodReductionFactor?: number;
  eccentricityX?: number;
  eccentricityY?: number;
  maxSpectrumValue?: number;
  maxSpectrumValueL3?: number;
  additionalDampingRatio?: number;
  modifiedSeismicReductionFactor?: number;
  allExtracted?: boolean;
}

export interface IStorey {
  storeyID?: number[];
  towerID?: number[];
  attribute?: string[];
  height?: number[];
  heightToGround?: number[];
  area?: number[];
  allExtracted?: boolean;
}

export interface ITower {
  towerID?: number[];
  structuralSystem?: string[];
  allExtracted?: boolean;
}

export interface IMassRatio {
  storeyID?: number[];
  towerID?: number[];
  ratio?: number[];
  storeyMass?: number[];
  massPerArea?: number[];
  massPerAreaRatio?: number[];
  allExtracted?: boolean;
}

export interface IWeight {
  live?: number;
  dead?: number;
  super?: number;
  sum?: number;
  allExtracted?: boolean;
}

export interface IWind {
  storeyID?: number[];
  towerID?: number[];
  forceX?: number[];
  shearX?: number[];
  momentX?: number[];
  forceY?: number[];
  shearY?: number[];
  momentY?: number[];
  allExtracted?: boolean;
}

export interface IStiffness {
  storeyID?: number[];
  towerID?: number[];
  ratx1?: number[];
  ratx2?: number[];
  rjx1?: number[];
  rjx3?: number[];
  raty1?: number[];
  raty2?: number[];
  rjy1?: number[];
  rjy3?: number[];
  rjz1?: number[];
  rjz3?: number[];
  weakStoreyFactor?: number[];
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

export interface IShearWeightRatioModify {
  storeyID?: number[];
  towerID?: number[];
  factorX?: number[];
  factorY?: number[];
  allExtracted?: boolean;
}

export interface IWindComfort {
  accelerationAlongX?: number;
  accelerationCrossX?: number;
  accelerationAlongY?: number;
  accelerationCrossY?: number;
  allExtracted?: boolean;
}

export interface IShearCapacityCheck {
  storeyID?: number[];
  towerID?: number[];
  capacityX?: number[];
  ratioX?: number[];
  capacityY?: number[];
  ratioY?: number[];
  allExtracted?: boolean;
}