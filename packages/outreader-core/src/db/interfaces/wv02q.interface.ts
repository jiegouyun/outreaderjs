export interface IWv02q {
  momentPercent: IMomentPercent;
  columnShear: IColumnShear;
  v02qFactor: IV02qFactor;
}

interface IStoreyTower {
  storeyID?: number[];
  towerID?: number[];
}

interface IAllExtracted {
  allExtracted?: boolean;
}

export interface IMomentPercent extends IAllExtracted, IStoreyTower {
  percentColumnX?: number[];
  percentWallX?: number[];
  percentColumnY?: number[];
  percentWallY?: number[];
}

export interface IColumnShear extends IAllExtracted, IStoreyTower {
  columnX?: number[];
  wallX?: number[];
  totalX?: number[];
  percentColumnX?: number[];
  columnY?: number[];
  wallY?: number[];
  totalY?: number[];
  percentColumnY?: number[];
}

export interface IV02qFactor extends IAllExtracted, IStoreyTower {
  factorX?: number[];
  factorY?: number[];
}
