# outreader-cli

A CLI tool to read output files

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/outreader-cli.svg)](https://npmjs.org/package/outreader-cli)
[![Downloads/week](https://img.shields.io/npm/dw/outreader-cli.svg)](https://npmjs.org/package/outreader-cli)
[![License](https://img.shields.io/npm/l/outreader-cli.svg)](https://github.com/outreaderjs/outreaderjs/blob/master/package.json)

<!-- toc -->

- [outreader-cli](#outreader-cli)
- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g @outreader/cli
$ outreader COMMAND
running command...
$ outreader (-v|--version|version)
@outreader/cli/0.0.5 linux-x64 node-v12.18.0
$ outreader --help [COMMAND]
USAGE
  $ outreader COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`outreader help [COMMAND]`](#outreader-help-command)
- [`outreader yjk DIR`](#outreader-yjk-dir)

## `outreader help [COMMAND]`

display help for outreader

```
USAGE
  $ outreader help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_

## `outreader yjk DIR`

Read from a YJK model

```
USAGE
  $ outreader yjk DIR

ARGUMENTS
  DIR  directory of the YJK model

EXAMPLE
  $ outreader yjk path/to/yjk/model
```

_See code: [src/commands/yjk.ts](https://github.com/outreaderjs/outreaderjs/blob/v0.0.5/src/commands/yjk.ts)_

<!-- commandsstop -->
