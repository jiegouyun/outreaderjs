module.exports = {
  title: 'OutReader',
  description: '工程师数据一站式解决方案',
  base: '/',
  themeConfig: {
    nav: [
      { text: '软件下载', link: '/download/' },
      { text: '技术手册', link: '/guide/' },
      { text: 'GitHub', link: 'https://github.com/jiegouyun/outreaderjs' },
    ],
    sidebar: {
      '/guide/': [
        {
          title: 'OutReader 使用说明',
          collapseble: false,
          children: ['', 'extract', 'structure', 'compare', 'update'],
        },
      ],
    },
  },
};
