export interface IStructureFrontEnd {
  summary: ISummaryFE;
  summaryQuantity: ISummaryQuantityFE;
  parameters: IParametersFE;
  period: IPeriodFE;
  force: IForceFE;
  drift: IDriftFE;
  generalResult: IGeneralResultFE;
  distributeResult: IDistributeResult;
  factor: IFactorFE;
  quantity: IQuantityFE;
}

interface ISummaryFE {
  project: {
    dir: string;
    engineering: string;
    calDate: string;
    software: string;
    softwareVersion: string;
  };
  structure: {
    system: string;
    material: string;
    storeys: number;
    height: number;
    basemnet: number;
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
    windX: number;
    windXStorey: number;
    windY: number;
    windYStorey: number;
    seismicX: number;
    seismicXStorey: number;
    seismicY: number;
    seismicYStorey: number;
    limit: number;
  };
  dispRatio: {
    eccPX: number;
    eccPXStorey: number;
    eccNX: number;
    eccNXStorey: number;
    eccPY: number;
    eccPYStorey: number;
    eccNY: number;
    eccNYStorey: number;
    limit: string;
  };
  dispRatioStorey: {
    eccPX: number;
    eccPXStorey: number;
    eccNX: number;
    eccNXStorey: number;
    eccPY: number;
    eccPYStorey: number;
    eccNY: number;
    eccNYStorey: number;
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
    seidmicYCheck: string;
  };
  stiffRatio: {
    x: number;
    xStorey: number;
    y: number;
    yStorey: number;
  };
  shearCapacityRatio: {
    x: number;
    xStorey: number;
    y: number;
    yStorey: number;
  };
  mode: {
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

interface ISummaryQuantityFE {
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

interface IPartQuantityFE {
  wall: number;
  column: number;
  beam: number;
  floor: number;
  total: number;
}

interface IParametersFE {
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

interface IPeriodFE {
  modeCoupling: IModeFE;
  modeSeismic: IModeFE;
  modeMass: {
    modeID: number[];
    factorX: number[];
    factorY: number[];
    factorZ: number[];
    sumX: number;
    sumY: number;
    sumZ: number;
  };
}

interface IModeFE {
  modeID: number[];
  period: number[];
  angle: number[];
  factorX: number[];
  factorY: number[];
  factorZ: number[];
}

interface IForceFE {
  wind: {
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
  };
  seismic: {
    storeyID: number[];
    towerID: number[];
    forceX: number[];
    shearX: number[];
    momentX: number[];
    forceY: number[];
    shearY: number[];
    momentY: number[];
  };
}

interface IDriftFE {
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

interface ISeismicDriftFE {
  storeyID: number[];
  towerID: number[];
  displacement: number[];
  drift: number[];
}

interface IWindDriftFE {
  storeyID: number[];
  towerID: number[];
  displacement: number[];
  drift: number[];
  ratio: number[];
  ratioD: number[];
}

interface ISeismicDispRatio {
  storeyID: number[];
  towerID: number[];
  ratio: number[];
  ratioD: number[];
}

interface IGeneralResultFE {
  project: {
    engineering: string;
    engineeringCode: string;
    designer: string;
    checker: string;
    software: string;
    softwareVersion: string;
    calDate: string;
  };
  tower: {
    towerID: number[];
    structuralSystem: string[];
  };
  weight: {
    live: number;
    dead: number;
    super: number;
    sum: number;
  };
  constraintFloorStiffnessRatio: {
    storeyNo: number;
    towerNo: number;
    stiffnessX0: number;
    stiffnessX1: number;
    ratioX: number;
    stiffnessY0: number;
    stiffnessY1: number;
    ratioY: number;
  };
  overturningCheck: {
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
  };
  stableCheck: {
    seismicStoreyNo: number;
    seismicTowerNo: number;
    seismicRatioX: number;
    seismicRatioY: number;
    windStoreyNo: number;
    windTowerNo: number;
    windRatioX: number;
    windRatioY: number;
  };
  windComfort: {
    accelerationAlongX: number;
    accelerationCrossX: number;
    accelerationAlongY: number;
    accelerationCrossY: number;
  };
}

interface IDistributeResult {
  storey: {
    storeyID: number[];
    towerID: number[];
    attribute: string[];
    height: number[];
    heightToGround: number[];
    area: number[];
  };
  massRatio: {
    storeyID: number[];
    towerID: number[];
    ratio: number[];
    storeyMass: number[];
    massPerArea: number[];
    massPerAreaRatio: number[];
  };
  stiffness: {
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
  };
  shearWeightRatioModify: {
    storeyID: number[];
    towerID: number[];
    factorX: number[];
    factorY: number[];
  };
  shearCapacityCheck: {
    storeyID: number[];
    towerID: number[];
    capacityX: number[];
    ratioX: number[];
    capacityY: number[];
    ratioY: number[];
  };
  momentPercent: {
    storeyID: number[];
    towerID: number[];
    percentColumnX: number[];
    percentWallX: number[];
    percentColumnY: number[];
    percentWallY: number[];
  };
  columnShear: {
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
  };
}

interface IFactorFE {
  stiffness: {
    storeyID: number[];
    towerID: number[];
    weakStoreyFactor: number[];
  };
  shearWeightRatioModify: {
    storeyID: number[];
    towerID: number[];
    factorX: number[];
    factorY: number[];
  };
  v02qFactor: {
    storeyID: number[];
    towerID: number[];
    factorX: number[];
    factorY: number[];
  };
}

interface IQuantityFE {
  concrete: ISubQuantityFE;
  unitConcrete: ISubQuantityFE;
  steel: ISubQuantityFE;
  unitSteel: ISubQuantityFE;
  rebar: ISubQuantityFE;
  unitRebar: ISubQuantityFE;
}

interface ISubQuantityFE {
  storeyID: number[];
  wall: number[];
  beam: number[];
  column: number[];
  floor: number[];
  storey: number[];
}
