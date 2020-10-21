import { IShearWeightRatioModify } from './wmass.interface';

export interface IWzq {
  hash: string;
  modeCoupling: IMode;
  modeSeismic: IMode;
  modeMass: IModeMass;
  seismicForce: ISeismicForce;
  shearWeightRatioModify?: IShearWeightRatioModify;
}

interface IAllExtracted {
  allExtracted: boolean;
}

interface IStoreyTower {
  storeyID: number[];
  towerID: number[];
}

export interface IMode extends IAllExtracted {
  modeID: number[];
  period: number[];
  angle: number[];
  factorX: number[];
  factorY: number[];
  factorZ: number[];
}

export interface IModeMass extends IAllExtracted {
  modeID: number[];
  factorX: number[];
  factorY: number[];
  factorZ: number[];
  sumX?: number;
  sumY?: number;
  sumZ?: number;
}

export interface ISeismicForce extends IAllExtracted, IStoreyTower {
  forceX: number[];
  shearX: number[];
  momentX: number[];
  shearWeightRatioX: number[];
  shearWeightRatioLimitX?: number;
  forceY: number[];
  shearY: number[];
  momentY: number[];
  shearWeightRatioY: number[];
  shearWeightRatioLimitY?: number;
}
