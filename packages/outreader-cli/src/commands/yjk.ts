import { Command } from '@oclif/command';
import { readOutputs } from '@outreader/yjk';
import { initDb } from '@outreader/core';

export default class Yjk extends Command {
  static description = 'Read from a YJK model';

  static examples = [
    `$ outreader yjk path/to/yjk/model
`,
  ];

  static args = [
    { name: 'dir', required: true, description: 'directory of the YJK model' },
  ];

  async run() {
    const { args } = this.parse(Yjk);

    const { structures } = await initDb({
      client: 'sqlite3',
      connection: {
        filename: './db.dev.sqlite',
      },
      useNullAsDefault: true,
    });
    await structures.query().insert({
      name: 'test',
      type: 'yjk',
      origin_dir: args.dir,
    });
    this.log(`Reading from ${args.dir}`);
    readOutputs(args.dir);
  }
}
