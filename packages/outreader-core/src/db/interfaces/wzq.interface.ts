export interface IWzq {
  modeCoupling: IMode;
  modeSeismic: IMode;
  modeMass: IModeMass;
  seismicForce: ISeismicForce;
}

interface IAllExtracted {
  allExtracted?: boolean;
}

interface IStoreyTower {
  storeyID?: number[];
  towerID?: number[];
}

export interface IMode extends IAllExtracted {
  modeID?: number[];
  period?: number[];
  angle?: number[];
  factorX?: number[];
  factorY?: number[];
  factorZ?: number[];
}

export interface IModeMass extends IAllExtracted {
  modeID?: number[];
  factorX?: number[];
  factorY?: number[];
  factorZ?: number[];
  sumX?: number;
  sumY?: number;
  sumZ?: number;
}

export interface ISeismicForce extends IAllExtracted, IStoreyTower {
  forceX?: number[];
  shearX?: number[];
  momentX?: number[];
  shearWeiightRatioX?: number[];
  forceY?: number[];
  shearY?: number[];
  momentY?: number[];
  shearWeiightRatioY?: number[];
}
