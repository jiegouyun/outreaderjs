# OutReader-js

A structral model (YJK, PKPM, ETABS) output files reader implemented in
Javascript.

## 开始开发

### 开发环境准备

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | bash
source ~/.bashrc
export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node
nvm install --lts
curl -o- -L https://yarnpkg.com/install.sh | bash
source ~/.bashrc
```

检查安装是否安装成功

```bash
node -v
yarn -v
```

### 拉取仓库

```bash
git clone git@github.com:jiegouyun/outreaderjs.git
cd outreaderjs
```

安装依赖

```bash
yarn install
```

### 执行 CLI

```
./packages/outreader-cli/bin/run -h
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

## 打包发布

待补充。
