import { Model } from 'objection';
import { IBasicInformation } from '../interfaces';
import { applyMixins } from '../../utils';

interface StructureInterface extends IBasicInformation {
  id: string;
  name: string;
  type: string;
  origin_dir: string;
}

export class StructureModel extends Model {
  static tableName = 'structures';
}

export interface StructureModel extends Model, StructureInterface {}
applyMixins(StructureModel, [Model]);
