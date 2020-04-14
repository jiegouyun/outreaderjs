outreader-cli
=============

A CLI tool to read output files

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/outreader-cli.svg)](https://npmjs.org/package/outreader-cli)
[![Downloads/week](https://img.shields.io/npm/dw/outreader-cli.svg)](https://npmjs.org/package/outreader-cli)
[![License](https://img.shields.io/npm/l/outreader-cli.svg)](https://github.com/outreaderjs/outreaderjs/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g outreader-cli
$ outreader COMMAND
running command...
$ outreader (-v|--version|version)
outreader-cli/0.0.1 darwin-x64 node-v12.10.0
$ outreader --help [COMMAND]
USAGE
  $ outreader COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`outreader hello [FILE]`](#outreader-hello-file)
* [`outreader help [COMMAND]`](#outreader-help-command)

## `outreader hello [FILE]`

describe the command here

```
USAGE
  $ outreader hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ outreader hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/outreaderjs/outreaderjs/blob/v0.0.1/src/commands/hello.ts)_

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_
<!-- commandsstop -->
