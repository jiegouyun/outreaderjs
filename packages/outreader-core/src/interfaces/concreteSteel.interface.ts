export interface IConcreteSteel {
  hash: string;
  concrete: IQuantity;
  steel: IQuantity;
}

export interface IQuantity {
  storeyID?: number[];
  wall?: number[];
  beam?: number[];
  column?: number[];
  floor?: number[];
  storey?: number[];
  totalWall?: number;
  totalBeam?: number;
  totalColumn?: number;
  totalFloor?: number;
  totalStorey?: number;
  allExtracted?: boolean;
}
