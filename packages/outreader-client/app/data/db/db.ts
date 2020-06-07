import electron from 'electron';
import Knex from 'knex';
import { Model } from 'objection';
import path from 'path';
import { StructureModel } from './models';

export async function initDb() {
  const filename = path.join(
    (electron.app || electron.remote.app).getPath('userData'),
    'db.sqlite'
  );
  const knex = Knex({
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename,
    },
  });
  await knex.migrate.latest({
    directory: path.join(__dirname, 'migrations'),
  });
  Model.knex(knex);

  return {
    structures: StructureModel,
  };
}
