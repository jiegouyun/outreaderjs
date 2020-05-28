import { expect, test } from '@oclif/test';

describe('yjk', () => {
  test
    .stdout()
    .command(['yjk'])
    .it('runs yjk', (ctx) => {
      expect(ctx.stdout).to.contain('Reading from');
    });

  test
    .stdout()
    .command(['yjk', '--name', 'jeff'])
    .it('runs hello --name jeff', (ctx) => {
      expect(ctx.stdout).to.contain('hello jeff');
    });
});
