/* eslint @typescript-eslint/ban-ts-ignore: off */
import {
  app,
  Menu,
  shell,
  BrowserWindow,
  MenuItemConstructorOptions,
} from 'electron';

interface DarwinMenuItemConstructorOptions extends MenuItemConstructorOptions {
  selector?: string;
  submenu?: DarwinMenuItemConstructorOptions[] | Menu;
}

export default class MenuBuilder {
  mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  buildMenu() {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      this.setupDevelopmentEnvironment();
    }

    const template =
      process.platform === 'darwin'
        ? this.buildDarwinTemplate()
        : this.buildDefaultTemplate();

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    return menu;
  }

  setupDevelopmentEnvironment() {
    this.mainWindow.webContents.on('context-menu', (_, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([
        {
          label: '查看元素',
          click: () => {
            this.mainWindow.webContents.inspectElement(x, y);
          },
        },
      ]).popup({ window: this.mainWindow });
    });
  }

  buildDarwinTemplate() {
    const subMenuAbout: DarwinMenuItemConstructorOptions = {
      label: 'OutReader',
      submenu: [
        {
          label: '关于 OutReader',
          selector: 'orderFrontStandardAboutPanel:',
        },
        // { type: 'separator' },
        // { label: 'Services', submenu: [] },
        // { type: 'separator' },
        {
          label: '隐藏 OutReader',
          accelerator: 'Command+H',
          selector: 'hide:',
        },
        {
          label: '隐藏其他',
          accelerator: 'Command+Shift+H',
          selector: 'hideOtherApplications:',
        },
        { label: '全部显示', selector: 'unhideAllApplications:' },
        { type: 'separator' },
        {
          label: '退出',
          accelerator: 'Command+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    };
    const subMenuEdit: DarwinMenuItemConstructorOptions = {
      label: '编辑',
      submenu: [
        { label: '撤销', accelerator: 'Command+Z', selector: 'undo:' },
        { label: '重做', accelerator: 'Shift+Command+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: '剪切', accelerator: 'Command+X', selector: 'cut:' },
        { label: '拷贝', accelerator: 'Command+C', selector: 'copy:' },
        { label: '复制', accelerator: 'Command+V', selector: 'paste:' },
        {
          label: '全选',
          accelerator: 'Command+A',
          selector: 'selectAll:',
        },
      ],
    };
    const subMenuViewDev: MenuItemConstructorOptions = {
      label: '视图',
      submenu: [
        {
          label: '刷新',
          accelerator: 'Command+R',
          click: () => {
            this.mainWindow.webContents.reload();
          },
        },
        {
          label: '全屏',
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          },
        },
        {
          label: '开发者工具',
          accelerator: 'Alt+Command+I',
          click: () => {
            this.mainWindow.webContents.toggleDevTools();
          },
        },
      ],
    };
    const subMenuViewProd: MenuItemConstructorOptions = {
      label: '视图',
      submenu: [
        {
          label: '全屏',
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          },
        },
      ],
    };
    const subMenuWindow: DarwinMenuItemConstructorOptions = {
      label: '窗口',
      submenu: [
        {
          label: '最小化',
          accelerator: 'Command+M',
          selector: 'performMiniaturize:',
        },
        { label: '关闭', accelerator: 'Command+W', selector: 'performClose:' },
        { type: 'separator' },
        { label: '前置所有窗口', selector: 'arrangeInFront:' },
      ],
    };
    const subMenuHelp: MenuItemConstructorOptions = {
      label: '帮助',
      submenu: [
        {
          label: '打开主页',
          click() {
            shell.openExternal('https://outreader.com/');
          },
        },
        {
          label: '软件下载',
          click() {
            shell.openExternal('https://outreader.com/download/');
          },
        },
        {
          label: '技术手册',
          click() {
            shell.openExternal('https://outreader.com/guide/');
          },
        },
        {
          label: '联系我们',
          click() {
            shell.openExternal('https://outreader.com/contact/');
          },
        },
        {
          label: 'GitHub仓库',
          click() {
            shell.openExternal('https://github.com/jiegouyun/outreaderjs');
          },
        },
      ],
    };

    const subMenuView =
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
        ? subMenuViewDev
        : subMenuViewProd;

    return [subMenuAbout, subMenuEdit, subMenuView, subMenuWindow, subMenuHelp];
  }

  buildDefaultTemplate() {
    const templateDefault = [
      {
        label: '文件',
        submenu: [
          {
            label: '打开',
            accelerator: 'Ctrl+O',
          },
          {
            label: '关闭',
            accelerator: 'Ctrl+W',
            click: () => {
              this.mainWindow.close();
            },
          },
        ],
      },
      {
        label: '视图',
        submenu:
          process.env.NODE_ENV === 'development' ||
          process.env.DEBUG_PROD === 'true'
            ? [
                {
                  label: '刷新',
                  accelerator: 'Ctrl+R',
                  click: () => {
                    this.mainWindow.webContents.reload();
                  },
                },
                {
                  label: '全屏',
                  accelerator: 'F11',
                  click: () => {
                    this.mainWindow.setFullScreen(
                      !this.mainWindow.isFullScreen()
                    );
                  },
                },
                {
                  label: '开发者工具',
                  accelerator: 'Alt+Ctrl+I',
                  click: () => {
                    this.mainWindow.webContents.toggleDevTools();
                  },
                },
              ]
            : [
                {
                  label: '全屏',
                  accelerator: 'F11',
                  click: () => {
                    this.mainWindow.setFullScreen(
                      !this.mainWindow.isFullScreen()
                    );
                  },
                },
              ],
      },
      {
        label: '帮助',
        submenu: [
          {
            label: '打开主页',
            click() {
              shell.openExternal('https://outreader.com/');
            },
          },
          {
            label: '软件下载',
            click() {
              shell.openExternal('https://outreader.com/download/');
            },
          },
          {
            label: '技术手册',
            click() {
              shell.openExternal('https://outreader.com/guide/');
            },
          },
          {
            label: '联系我们',
            click() {
              shell.openExternal('https://outreader.com/contact/');
            },
          },
          {
            label: 'GitHub仓库',
            click() {
              shell.openExternal('https://github.com/jiegouyun/outreaderjs');
            },
          },
        ],
      },
    ];

    return templateDefault;
  }
}
