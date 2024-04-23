/*
 https://developers.weixin.qq.com/miniprogram/dev/devtools/projectconfig.html?search-key=%E9%A1%B9%E7%9B%AE%E9%85%8D%E7%BD%AE

 全局配置 https://docs.taro.zone/docs/app-config
 */
export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/needs/needs',
    'pages/require/require',
    'pages/address/address',
    'pages/page-tips/page-tips',
    'pages/me/me',
  ],
  subPackages: [
    {
      root: 'pages/me-module',
      pages: [
        'setting-info/setting-info',
        'about/about',
        'about/user-agreement',
      ],
    },
  ],
  // 可以降低小程序的启动时间和运行时内存
  requiredPrivateInfos: ['getLocation', 'chooseAddress', 'chooseLocation'],
  window: {
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#0052D9',
    navigationBarTitleText: 'KzSeven',
    navigationBarTextStyle: 'white',
    // 添加这个配置项之后，在手机中预览小程序首页，然后杀死小程序再次进入，就会通过初始渲染缓存来渲染首页。
    initialRenderingCache: 'static',
  },
  tabBar: {
    custom: true,
    backgroundColor: '#ffffff',
    selectedColor: '#0052D9',
    color: '#666666',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
      },
      {
        pagePath: 'pages/needs/needs',
        text: '需求',
      },
      {
        pagePath: 'pages/require/require',
        text: '服务',
      },
      {
        pagePath: 'pages/address/address',
        text: '旅程',
      },
      {
        pagePath: 'pages/me/me',
        text: '我的',
      },
    ],
  },
});
