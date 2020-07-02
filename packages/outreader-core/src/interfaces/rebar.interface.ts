export interface IRebar {
  hash: string;
  area: IArea;
  floorRebar: IRebarQuantity;
  beamRebar: IRebarQuantity;
  columnRebar: IRebarQuantity;
  wallRebar: IRebarQuantity;
  projectRebar: IProjectQuantity;
}

interface IStoreyID {
  storeyID: number[];
}

interface IAllExtracted {
  allExtracted: boolean;
}

interface ITotal {
  total?: number;
  totalPerArea?: number;
}

export interface IArea extends IStoreyID, IAllExtracted {
  storey: number[];
  totalArea?: number;
}

export interface IRebarQuantity extends IStoreyID, IAllExtracted, ITotal {
  storey: number[];
  perArea: number[];
}

export interface IProjectQuantity extends IAllExtracted, ITotal {
  insertBasement?: number;
}
