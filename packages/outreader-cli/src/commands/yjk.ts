import { Command } from '@oclif/command';
import { readStructure } from '@outreader/yjk';

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

    this.log(`Reading from ${args.dir}`);
    readStructure(args.dir);
  }
}
