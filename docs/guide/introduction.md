# 介绍

## 项目结构

```
├── CONTRIBUTING.md # 贡献指南
├── LICENSE
├── README.md
├── bin # 存放一些可执行文件
├── docs # 项目文档
├── fixtures # 典型的模型结果文件，作为开发的素材
│   ├── pkpm
│   └── yjk
├── lerna.json
├── package.json
├── packages # 模块目录
│   ├── outreader-cli # 命令行模块，集成一些方便的命令行方法
│   ├── outreader-client # 客户端模块
│   ├── outreader-core # 核心模块，包括一些共用的方法
│   └── outreader-yjk # YJK 模块，适配 YJK 模型的读取
├── tsconfig.json
└── yarn.lock
```
