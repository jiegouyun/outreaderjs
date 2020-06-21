export interface IWmass {
  hash: string;
  basicInformation: IBasicInformation;
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

interface IStoreyTower {
  storeyID: number[];
  towerID: number[];
}

interface IAllExtracted {
  allExtracted?: boolean;
}

export interface IBasicInformation extends IAllExtracted {
  engineering?: string;
  engineeringCode?: string;
  designer?: string;
  checker?: string;
  software?: string;
  softwareVersion?: string;
  calDate?: string;
}

export interface IGeneralInformation extends IAllExtracted {
  structuralSystem?: string;
  structuralMaterial?: string;
  location?: string;
  basement?: number;
  constraintFloor?: number;
  podium?: number;
  transferStorey?: number;
  reinforceStorey?: number;
}

export interface ICalculationControl extends IAllExtracted {
  couplingBeamFactorSeismic?: number;
  couplingBeamFactorWind?: number;
  rigidFloorAssumption?: string;
}

export interface IWindInformation extends IAllExtracted {
  useAssigned?: string;
  loadCode?: string;
  terrainRoughness?: string;
  pressureModified?: number;
  dampingRatio?: number;
  pressureComfort?: number;
  dampingRationComfort?: number;
}

export interface ISeismicInformation extends IAllExtracted {
  use2015GB18306?: string;
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
}

export interface IStorey extends IAllExtracted, IStoreyTower {
  attribute?: string[];
  height?: number[];
  heightToGround?: number[];
  area?: number[];
}

export interface ITower extends IAllExtracted {
  towerID: number[];
  structuralSystem: string[];
}

export interface IMassRatio extends IAllExtracted, IStoreyTower {
  ratio?: number[];
  storeyMass?: number[];
  massPerArea?: number[];
  massPerAreaRatio?: number[];
}

export interface IWeight extends IAllExtracted {
  live?: number;
  dead?: number;
  super?: number;
  sum?: number;
}

export interface IWind extends IAllExtracted, IStoreyTower {
  forceX?: number[];
  shearX?: number[];
  momentX?: number[];
  forceY?: number[];
  shearY?: number[];
  momentY?: number[];
}

export interface IStiffness extends IAllExtracted, IStoreyTower {
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
}

export interface IConstraintFloorStiffnessRatio extends IAllExtracted {
  storeyID?: number;
  towerID?: number;
  stiffnessX0?: number;
  stiffnessX1?: number;
  ratioX?: number;
  stiffnessY0?: number;
  stiffnessY1?: number;
  ratioY?: number;
}

export interface IOverturningCheck extends IAllExtracted {
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
}

export interface IStableCheck extends IAllExtracted {
  seismicID?: number;
  seismicTcowerID?: number;
  seismicRatioX?: number;
  seismicRatioY?: number;
  windID?: number;
  windTcowerID?: number;
  windRatioX?: number;
  windRatioY?: number;
}

export interface IShearWeightRatioModify extends IAllExtracted, IStoreyTower {
  factorX?: number[];
  factorY?: number[];
}

export interface IWindComfort extends IAllExtracted {
  accelerationAlongX?: number;
  accelerationCrossX?: number;
  accelerationAlongY?: number;
  accelerationCrossY?: number;
}

export interface IShearCapacityCheck extends IAllExtracted, IStoreyTower {
  capacityX?: number[];
  ratioX?: number[];
  capacityY?: number[];
  ratioY?: number[];
}
