import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('structures', (table) => {
    table.uuid('id').primary();
    table.string('name').notNullable();
    table.string('type').notNullable();
    table.string('origin_dir').notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('structures');
}
