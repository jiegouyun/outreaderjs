# OutReader-js

![ClientCI](https://github.com/jiegouyun/outreaderjs/workflows/ClientCI/badge.svg) ![NodeCI](https://github.com/jiegouyun/outreaderjs/workflows/NodeCI/badge.svg) ![deploy-docs](https://github.com/jiegouyun/outreaderjs/workflows/deploy-docs/badge.svg)

A structral model (YJK, PKPM, ETABS) output files reader implemented in
Javascript.

## 开始开发

### 开发环境准备

开发前需要安装 nodejs 以及 yarn 。

#### nodejs 安装

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | bash
source ~/.bashrc
export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node
nvm install --lts
```

检查安装是否安装成功

```bash
node -v
```

#### yarn 安装

```bash
curl -o- -L https://yarnpkg.com/install.sh | bash
source ~/.bashrc
```

检查安装是否安装成功

```bash
yarn -v
```

### 拉取仓库

```bash
git clone git@github.com:jiegouyun/outreaderjs.git
```

### 进入项目目录

```bash
cd outreaderjs
```

### 安装依赖

```bash
yarn install
yarn lerna bootstrap
```

### 执行 CLI

```
yarn build
yarn cli
```

顺利的话会显示 CLI 的使用说明，例如

```
A CLI tool to read output files

VERSION
  outreader-cli/0.0.1 darwin-x64 node-v12.10.0

USAGE
  $ outreader [COMMAND]

COMMANDS
  help  display help for outreader
  yjk   Read from a YJK model
```

### 以 yjk 读取为例

```bash
yarn cli yjk ~/Downloads/outreader-model-fixtures/1#
```

## 打包发布

待补充。
