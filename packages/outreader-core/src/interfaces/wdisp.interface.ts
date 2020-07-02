export interface IWdisp {
  hash: string;
  driftSeismicX: IDrift;
  driftSeismicTwoWayX: IDrift;
  driftSeismicXEccP: IDrift;
  driftSeismicXEccN: IDrift;
  driftSeismicY: IDrift;
  driftSeismicTwoWayY: IDrift;
  driftSeismicYEccP: IDrift;
  driftSeismicYEccN: IDrift;
  driftWindXP: IWindDriftDisp;
  driftWindXN: IWindDriftDisp;
  driftWindYP: IWindDriftDisp;
  driftWindYN: IWindDriftDisp;
  ratioSeismicX: IDispRatio;
  ratioSeismicXEccP: IDispRatio;
  ratioSeismicXEccN: IDispRatio;
  ratioSeismicY: IDispRatio;
  ratioSeismicYEccP: IDispRatio;
  ratioSeismicYEccN: IDispRatio;
}

interface IStoreyTower {
  storeyID: number[];
  towerID: number[];
}

interface IAllExtracted {
  allExtracted: boolean;
}

export interface IDrift extends IStoreyTower, IAllExtracted {
  displacement: number[];
  drift: number[];
}

export interface IDispRatio extends IStoreyTower, IAllExtracted {
  ratio: number[];
  ratioD: number[];
}

export interface IWindDriftDisp extends IDrift, IDispRatio {}
