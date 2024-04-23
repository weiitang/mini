let gCachedSystemInfo = null;

export function getCurrentAppPages() {
  return getCurrentPages();
}

export function safeNavigate(params) {
  const pages = getCurrentAppPages();
  if (pages.length === 10) {
    wx.redirectTo(params);
  } else {
    wx.navigateTo(params);
  }
}

export function safeNavigateBack(pagePath, delta = 1) {
  const pages = getCurrentAppPages();
  if (!pages || pages.length <= 1) {
    redirectTo({
      url: pagePath,
    });
  } else {
    navigateBack({
      delta,
    });
  }
}

export function navigateBack(params) {
  wx.navigateBack(params);
}

export function redirectTo(params) {
  wx.redirectTo(params);
}

export function switchTab(params) {
  wx.switchTab(params);
}

export function setBarTitle(title = '') {
  wx.setNavigationBarTitle({
    title,
  });
}

export function showLoading(title = '') {
  wx.showLoading({
    title,
  });
}

export function hideLoading() {
  wx.hideLoading();
}

export function showToast(_option) {
  const defaultOption = {
    icon: 'none',
    duration: 1500,
  };
  const option = Object.assign({}, defaultOption, _option);
  wx.showToast(option);
  if (option.onClose && option.duration) {
    setTimeout(option.onClose, option.duration);
  }
}

export function hideToast() {
  wx.hideToast();
}

export function showTabBar() {
  wx.showTabBar();
}

export function hideTabBar() {
  wx.hideTabBar();
}

export function checkWexinSession() {
  return new Promise((resolve, reject) => {
    wx.checkSession({
      success() {
        resolve();
      },
      fail() {
        reject();
      },
    });
  });
}

export function wexinLogin() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}

export function weixinSupportGetUserProfile() {
  return !!wx.getUserProfile;
}

export function getWeixinSetting() {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}

export function getWeixinUserInfo() {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      withCredentials: true,
      lang: 'zh_CN',
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}

export function getWeixinUserProfile() {
  return new Promise((resolve, reject) => {
    wx.getUserProfile({
      // 声明获取用户个人信息后的用途，后续会展示在弹窗中
      desc: '用于完善会员资料',
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}

export function getAuthedWeixinUserInfo() {
  return new Promise((resolve, reject) => {
    const supportGetUserProfile = weixinSupportGetUserProfile();
    // 支持getUserProfile的版本，不需要判断scope.userInfo，不会有相应字段
    // see: https://developers.weixin.qq.com/community/develop/doc/000cacfa20ce88df04cb468bc52801
    if (supportGetUserProfile) {
      getWeixinUserInfo().then(resolve, reject);
    } else {
      getWeixinSetting().then((res) => {
        if (res.authSetting['scope.userInfo']) {
          getWeixinUserInfo().then(resolve, reject);
        } else {
          reject('Unauthorized');
        }
      }, reject);
    }
  });
}

export function getSystemInfo(useCache = false) {
  // 注意，部分变量不能用缓存，有tab和没tab的页面，windowHeight不一样
  if (useCache && gCachedSystemInfo) {
    return gCachedSystemInfo;
  }
  /* 参考：
  {
      model: 'iPhone XR',
      pixelRatio: 2,
      windowWidth: 414,
      windowHeight: 814,
      system: 'iOS 10.0.1',
      language: 'en',
      version: '7.0.4',
      screenWidth: 414,
      screenHeight: 896,
      SDKVersion: '2.16.1',
      brand: 'devtools',
      fontSizeSetting: 16,
      benchmarkLevel: 1,
      batteryLevel: 100,
      statusBarHeight: 44,
      safeArea: {
          top: 44,
          left: 0,
          right: 414,
          bottom: 862,
          width: 414,
          height: 818,
      },
      deviceOrientation: 'portrait',
      platform: 'devtools',
      enableDebug: false,
      devicePixelRatio: 2,
  }*/
  /* 导航栏高度 = 胶囊按钮高度 + 状态栏到胶囊按钮间距 * 2
    Android导航栏高度 = 32px + 8px * 2 = 48px
    iOS导航栏高度 = 32px + 6px * 2 = 44px*/
  const systemInfo = wx.getSystemInfoSync();
  const { model, system, windowHeight, windowWidth, statusBarHeight } = systemInfo;
  let navbarHeight;
  let isIphoneX = false;
  if (/ios/i.test(system)) {
    navbarHeight = 44;
    const isIphoneWithX = /iphone\s*x/i.test(model);
    const isIphoneOverTen = /(iPhone \d{2})|(unknown<iPhone\d{2})/.test(model);
    if (isIphoneWithX || isIphoneOverTen) {
      isIphoneX = true;
    }
  } else {
    navbarHeight = 48;
  }
  const headerHeight = navbarHeight + statusBarHeight;
  const contentHeight = windowHeight - headerHeight;
  // https://juejin.cn/post/6877373754601013255
  const transformRpxRatio = windowWidth / 750;
  const extraInfo = {
    navbarHeight,
    headerHeight,
    isIphoneX,
    contentHeight,
    transformRpxRatio,
  };
  gCachedSystemInfo = Object.assign({}, extraInfo, systemInfo);
  return gCachedSystemInfo;
}

export function getPlatform() {
  const systemInfo = getSystemInfo(true);
  return systemInfo.platform;
}

export function compareVersion(ver1, ver2) {
  const verList1 = ver1.split('.');
  const verList2 = ver2.split('.');
  const len = Math.max(verList1.length, verList2.length);
  while (verList1.length < len) {
    verList1.push('0');
  }
  while (verList2.length < len) {
    verList2.push('0');
  }
  for (let i = 0; i < len; i++) {
    const num1 = parseInt(verList1[i], 10);
    const num2 = parseInt(verList2[i], 10);
    if (num1 > num2) {
      return 1;
    }
    if (num1 < num2) {
      return -1;
    }
  }
  return 0;
}

export function isSDKVersionSafe(minVersion) {
  const version = getSystemInfo(true).SDKVersion;
  return compareVersion(version, minVersion) >= 0;
}

export function canUseCalender() {
  // see: https://developers.weixin.qq.com/miniprogram/dev/api/device/calendar/wx.addPhoneCalendar.html
  const { platform } = getSystemInfo(true);
  // 模拟器、PC也不支持
  const unsupportPlatforms = ['devtools', 'mac', 'windows'];
  return isSDKVersionSafe('2.15.0') && !unsupportPlatforms.includes(platform);
}

export function pageScrollTo(param) {
  const defaultParam = {
    scrollTop: 0,
    duration: 0,
  };
  wx.pageScrollTo(Object.assign({}, defaultParam, param));
}

export function getElement(element, callback, isAll = false, notFoundCallback) {
  const query = wx.createSelectorQuery();
  // 选择所有
  if (isAll) {
    query
      .selectAll(element)
      .boundingClientRect((rects) => {
        // 没有先不调用了，避免报错
        if (rects.length > 0 && rects[0]) {
          callback(rects);
        } else {
          notFoundCallback?.();
        }
      })
      .exec();
  } else {
    // 选择一个
    query
      .select(element)
      .boundingClientRect((rect) => {
        // 没有先不调用了，避免报错
        if (rect) {
          callback(rect);
        } else {
          notFoundCallback?.();
        }
      })
      .exec();
  }
}

export function showModal(options) {
  return wx.showModal(options);
}

export default {
  getCurrentAppPages,
  safeNavigate,
  safeNavigateBack,
  navigateBack,
  redirectTo,
  switchTab,
  setBarTitle,
  showLoading,
  hideLoading,
  showToast,
  hideToast,
  showTabBar,
  hideTabBar,
  checkWexinSession,
  wexinLogin,
  weixinSupportGetUserProfile,
  getWeixinSetting,
  getWeixinUserInfo,
  getWeixinUserProfile,
  getAuthedWeixinUserInfo,
  getSystemInfo,
  getPlatform,
  compareVersion,
  isSDKVersionSafe,
  canUseCalender,
  pageScrollTo,
  getElement,
  showModal,
};
