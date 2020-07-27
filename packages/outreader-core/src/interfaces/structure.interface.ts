import { IWdisp } from './wdisp.interface';
import { IWmass } from './wmass.interface';
import { IWv02q } from './wv02q.interface';
import { IWzq } from './wzq.interface';
import { IConcreteSteel } from './concrete-steel.interface';
import { IRebar } from './rebar.interface';

export interface IStructure {
  hash: string;
  dir: string;
  wmass?: IWmass;
  wdisp?: IWdisp;
  wv02q?: IWv02q;
  wzq?: IWzq;
  concreteSteel?: IConcreteSteel;
  rebar?: IRebar;
}
