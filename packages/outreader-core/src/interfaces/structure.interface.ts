import { IWdisp } from './wdisp.interface';
import { IWmass } from './wmass.interface';
import { IWv02q } from './wv02q.interface';
import { IWzq } from './wzq.interface';

export interface IStructure {
  hash: string;
  wmass?: IWmass;
  wdisp?: IWdisp;
  wv02q?: IWv02q;
  wzq?: IWzq;
}
