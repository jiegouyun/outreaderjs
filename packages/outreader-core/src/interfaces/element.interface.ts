import { IWpj } from './wpj.interface';
// import { IWwnl } from './wwnl.interface';

export interface IElement {
  hash: string;
  dir: string;
  wpj?: IWpj;
  // wwnl?: IWwnl;
}
