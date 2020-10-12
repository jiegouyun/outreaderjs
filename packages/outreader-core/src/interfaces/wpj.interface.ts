export interface IWpj {
  hash: string;
  column: IColumnPj;
}

interface IStoreyID {
  storeyID: number[];
}

interface IAllExtracted {
  allExtracted: boolean;
}

export interface IColumnPj extends IStoreyID, IAllExtracted {
  colName: number[];
  colID: number[][];
  secType: number[][];
  colProps: string[][][];
  startNode: number[][];
  endNode: number[][];
  section: number[][][];
  ang: number[][];
  uc: number[][];
  ucG: number[][];
  rs: number[][];
  rsv: number[][];
  cbX: number[][];
  cbY: number[][];
}
