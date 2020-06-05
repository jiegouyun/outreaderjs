import Knex from 'knex';
import { Model } from 'objection';
import path from 'path';
import { StructureModel } from './models';

export async function initDb(config: Knex.Config) {
  const knex = Knex(config);
  await knex.migrate.latest({
    directory: path.join(__dirname, 'migrations'),
  });
  Model.knex(knex);

  return {
    structures: StructureModel,
  };
}
