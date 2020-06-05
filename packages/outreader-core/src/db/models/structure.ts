import { Model } from 'objection';

export class Structure extends Model {
  id!: string;
  name!: string;
  type!: string;
  origin_dir!: string;

  static tableName = 'structures';
}
