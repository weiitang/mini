import { onAppHide, getAccountInfoSync } from '@tarojs/taro';
import '@taroify/icons/index.scss';
import '@taroify/core/index.scss';
import { useEffect } from 'react';
import './app.less';
import stores from './stores';
import { initSdk } from './utils/common';

const App = (props) => {
  useEffect(() => {
    const version = getAccountInfoSync().miniProgram.envVersion;
    if (version === 'release') {
      initSdk('');
    }
  }, []);

  onAppHide(() => {
    stores.AppStore.setIsShowApp(false);
  });

  return props.children;
};

export default App;
