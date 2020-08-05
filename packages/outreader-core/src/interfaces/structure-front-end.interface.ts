export interface IStructureFrontEnd {
  summary: ISummaryFE;
  summaryQuantity: ISummaryQuantityFE;
  parameters: IParametersFE;
  period: IPeriodFE;
  force: IForceFE;
  drift: IDriftFE;
  generalResult: IGeneralResultFE;
  distributeResult: IDistributeResultFE;
  factor: IFactorFE;
  quantity: IQuantityFE;
}

export interface ISummaryFE {
  project: {
    dir: string;
    engineering: string;
    calDate: string;
    software: string;
    softwareVersion: string;
  };
  structures: {
    system: string;
    material: string;
    storeys: number;
    height: number;
    basement: number;
    constraintFloor: number;
    intensity: string;
    pressureModified: number;
    rigidFloorAssumption: string;
    periodReductionFactor: number;
  };
  weight: {
    live: number;
    super: number;
    dead: number;
    sum: number;
  };
  drift: {
    windX: number[];
    windY: number[];
    seismicX: number[];
    seismicY: number[];
    limit: number;
  };
  dispRatio: {
    eccPX: number[];
    eccNX: number[];
    eccPY: number[];
    eccNY: number[];
    limit: string;
  };
  dispRatioStorey: {
    eccPX: number[];
    eccNX: number[];
    eccPY: number[];
    eccNY: number[];
    limit: string;
  };
  shearWeightRatio: {
    x: number;
    xLimit: number;
    y: number;
    yLimit: number;
  };
  stiffWeightRatio: {
    windX: number;
    windXCheck: string;
    windY: number;
    windYCheck: string;
    seismicX: number;
    seismicXCheck: string;
    seismicY: number;
    seismicYCheck: string;
  };
  stiffRatio: {
    x: number[];
    y: number[];
  };
  shearCapacityRatio: {
    x: number[];
    y: number[];
  };
  mode: {
    modeID: number[];
    period: number[];
    factorX: number[];
    factorY: number[];
    factorZ: number[];
    periodRatio: number;
    periodRatioCheck: string;
    count: number;
    sumX: number;
    sumY: number;
    sumZ: number;
  };
  baseShear: {
    windX: number;
    windY: number;
    seismicX: number;
    seismicY: number;
  };
  baseMoment: {
    windX: number;
    windY: number;
    seismicX: number;
    seismicY: number;
  };
}

export interface ISummaryQuantityFE {
  structure: {
    engineering: string;
    height: number;
    area: number;
    period: string;
    drift: string;
  };
  unitRebar: IPartQuantityFE;
  unitConcrete: IPartQuantityFE;
  unitSteel: IPartQuantityFE;
  rebar: IPartQuantityFE;
  concrete: IPartQuantityFE;
  steel: IPartQuantityFE;
}

export interface IPartQuantityFE {
  wall: number;
  column: number;
  beam: number;
  floor: number;
  total: number;
}

export interface IParametersFE {
  general: {
    system: string;
    material: string;
    location: string;
    basement: number;
    constraintFloor: number;
    podium: number;
    transferStorey: number;
    reinforceStorey: number;
  };
  calculate: {
    couplingBeamFactorSeismic: number;
    couplingBeamFactorWind: number;
    rigidFloorAssumption: string;
  };
  wind: {
    assigned: string;
    loadCode: string;
    terrainRoughness: string;
    pressureModified: number;
    dampingRatio: number;
    pressureComfort: number;
    dampingRationComfort: number;
  };
  seismic: {
    use2015GB18306: string;
    group: string;
    intensity: string;
    siteCategory: string;
    characteristicPeriod: number;
    dampingRatio: number;
    periodReductionFactor: number;
    eccentricityX: number;
    eccentricityY: number;
    maxSpectrumValue: number;
    maxSpectrumValueL3: number;
    additionalDampingRatio: number;
    modifiedSeismicReductionFactor: number;
  };
}

export interface IPeriodFE {
  modeCoupling: IModeFE;
  modeSeismic: IModeFE;
  modeMass: IModeMassFE;
}

export interface IModeFE {
  modeID: number[];
  period: number[];
  angle: number[];
  factorX: number[];
  factorY: number[];
  factorZ: number[];
}

export interface IModeMassFE {
  modeID: number[];
  factorX: number[];
  factorY: number[];
  factorZ: number[];
  sumX: number;
  sumY: number;
  sumZ: number;
}

export interface IForceFE {
  wind: IWindFE;
  seismic: ISeismicFE;
}

export interface IWindFE {
  storeyID: number[];
  towerID: number[];
  forceAlongX: number[];
  shearAlongX: number[];
  momentAlongX: number[];
  forceAlongY: number[];
  shearAlongY: number[];
  momentAlongY: number[];
  forceCrossX: number[];
  shearCrossX: number[];
  momentCrossX: number[];
  forceCrossY: number[];
  shearCrossY: number[];
  momentCrossY: number[];
}

export interface ISeismicFE {
  storeyID: number[];
  towerID: number[];
  forceX: number[];
  shearX: number[];
  momentX: number[];
  forceY: number[];
  shearY: number[];
  momentY: number[];
}

export interface IDriftFE {
  driftSeismicX: ISeismicDriftFE;
  driftSeismicTwoWayX: ISeismicDriftFE;
  driftSeismicXEccP: ISeismicDriftFE;
  driftSeismicXEccN: ISeismicDriftFE;
  driftSeismicY: ISeismicDriftFE;
  driftSeismicTwoWayY: ISeismicDriftFE;
  driftSeismicYEccP: ISeismicDriftFE;
  driftSeismicYEccN: ISeismicDriftFE;
  driftWindXP: IWindDriftFE;
  driftCrossWindXP: IWindDriftFE;
  driftWindXN: IWindDriftFE;
  driftCrossWindXN: IWindDriftFE;
  driftWindYP: IWindDriftFE;
  driftCrossWindYP: IWindDriftFE;
  driftWindYN: IWindDriftFE;
  driftCrossWindYN: IWindDriftFE;
  ratioSeismicX: ISeismicDispRatio;
  ratioSeismicXEccP: ISeismicDispRatio;
  ratioSeismicXEccN: ISeismicDispRatio;
  ratioSeismicY: ISeismicDispRatio;
  ratioSeismicYEccP: ISeismicDispRatio;
  ratioSeismicYEccN: ISeismicDispRatio;
}

export interface ISeismicDriftFE {
  storeyID: number[];
  towerID: number[];
  displacement: number[];
  drift: number[];
}

export interface IWindDriftFE {
  storeyID: number[];
  towerID: number[];
  displacement: number[];
  drift: number[];
  ratio: number[];
  ratioD: number[];
}

export interface ISeismicDispRatio {
  storeyID: number[];
  towerID: number[];
  ratio: number[];
  ratioD: number[];
}

export interface IGeneralResultFE {
  project: IProjectFE;
  tower: ITowerFE;
  weight: IWeightFE;
  constraintFloorStiffnessRatio: IConstraintFloorStiffnessRatioFE;
  overturningCheck: IOverturningCheckFE;
  stableCheck: IStableCheckFE;
  windComfort: IWindComfortFE;
}

export interface IProjectFE {
  engineering: string;
  engineeringCode: string;
  designer: string;
  checker: string;
  software: string;
  softwareVersion: string;
  calDate: string;
}

export interface ITowerFE {
  towerID: number[];
  structuralSystem: string[];
}

export interface IWeightFE {
  live: number;
  dead: number;
  super: number;
  sum: number;
}

export interface IConstraintFloorStiffnessRatioFE {
  storeyNo: number;
  towerNo: number;
  stiffnessX0: number;
  stiffnessX1: number;
  ratioX: number;
  stiffnessY0: number;
  stiffnessY1: number;
  ratioY: number;
}

export interface IOverturningCheckFE {
  storeyNo: number;
  towerNo: number;
  mrWindX: number;
  movWindX: number;
  ratioWindX: number;
  zeroAreaWindX: number;
  mrWindY: number;
  movWindY: number;
  ratioWindY: number;
  zeroAreaWindY: number;
  mrSeismicX: number;
  movSeismicX: number;
  ratioSeismicX: number;
  zeroAreaSeismicX: number;
  mrSeismicY: number;
  movSeismicY: number;
  ratioSeismicY: number;
  zeroAreaSeismicY: number;
}

export interface IStableCheckFE {
  seismicStoreyNo: number;
  seismicTowerNo: number;
  seismicRatioX: number;
  seismicRatioY: number;
  windStoreyNo: number;
  windTowerNo: number;
  windRatioX: number;
  windRatioY: number;
}

export interface IWindComfortFE {
  accelerationAlongX: number;
  accelerationCrossX: number;
  accelerationAlongY: number;
  accelerationCrossY: number;
}

export interface IDistributeResultFE {
  storey: IStoreyFE;
  massRatio: IMassRatioFE;
  stiffness: IStiffnessFE;
  shearWeightRatio: IShearWeightRatioFE;
  shearCapacityCheck: IShearCapacityCheckFE;
  momentPercent: IMomentPercentFE;
  columnShear: IColumnShearFE;
}

export interface IStoreyFE {
  storeyID: number[];
  towerID: number[];
  attribute: string[];
  height: number[];
  heightToGround: number[];
  area: number[];
}

export interface IMassRatioFE {
  storeyID: number[];
  towerID: number[];
  ratio: number[];
  storeyMass: number[];
  massPerArea: number[];
  massPerAreaRatio: number[];
}

export interface IStiffnessFE {
  storeyID: number[];
  towerID: number[];
  ratx1: number[];
  ratx2: number[];
  rjx1: number[];
  rjx3: number[];
  raty1: number[];
  raty2: number[];
  rjy1: number[];
  rjy3: number[];
  rjz1: number[];
  rjz3: number[];
}

export interface IShearWeightRatioFE {
  storeyID: number[];
  towerID: number[];
  factorX: number[];
  factorY: number[];
}

export interface IShearCapacityCheckFE {
  storeyID: number[];
  towerID: number[];
  capacityX: number[];
  ratioX: number[];
  capacityY: number[];
  ratioY: number[];
}

export interface IMomentPercentFE {
  storeyID: number[];
  towerID: number[];
  percentColumnX: number[];
  percentWallX: number[];
  percentColumnY: number[];
  percentWallY: number[];
}

export interface IColumnShearFE {
  storeyID: number[];
  towerID: number[];
  columnX: number[];
  wallX: number[];
  totalX: number[];
  percentColumnX: number[];
  columnY: number[];
  wallY: number[];
  totalY: number[];
  percentColumnY: number[];
}

export interface IFactorFE {
  stiffness: {
    storeyID: number[];
    towerID: number[];
    weakStoreyFactor: number[];
  };
  shearWeightRatioModify: IShearWeightRatioModifyFE;
  v02qFactor: IV02qFactorFE;
}

export interface IShearWeightRatioModifyFE {
  storeyID: number[];
  towerID: number[];
  factorX: number[];
  factorY: number[];
}

export interface IV02qFactorFE {
  storeyID: number[];
  towerID: number[];
  factorX: number[];
  factorY: number[];
}

export interface IQuantityFE {
  storeyID: number[];
  towerID: number[];
  area: number[];
  concrete: ISubQuantityFE;
  unitConcrete: ISubQuantityFE;
  steel: ISubQuantityFE;
  unitSteel: ISubQuantityFE;
  rebar: ISubQuantityFE;
  unitRebar: ISubQuantityFE;
}

export interface ISubQuantityFE {
  storeyID: number[];
  wall: number[];
  beam: number[];
  column: number[];
  floor: number[];
  storey: number[];
}
