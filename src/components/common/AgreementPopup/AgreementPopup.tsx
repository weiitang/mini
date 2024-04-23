import { Dialog, Button } from '@taroify/core';
import { View, Text } from '@tarojs/components';
import { showToast } from '@/utils/toast';
import { setStorageSync, getStorageSync, navigateTo } from '@tarojs/taro';
import { useEffect, useState } from 'react';
import styles from './AgreementPopup.module.less';

const key = 'use-applet-confirm';

/** 环形进度条组件 */
const AgreementPopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const useAppletConfirm = getStorageSync(key);

    if (!useAppletConfirm) {
      setOpen(true);
    }
  }, []);

  const closeChange = () => {
    showToast('需同意才能使用本小程序');
  };

  const confirmChange = () => {
    setOpen(false);
    setStorageSync(key, 'true');
  };

  const go = (_path: string) => {
    navigateTo({
      url: _path,
    });
  };

  return (
    <Dialog open={open} >
      <Dialog.Header>用户服务及隐私保护说明</Dialog.Header>
      <Dialog.Content>
        <View className={styles.content}>
          <View className={styles.indent}>欢迎您使用“KZ-Seven”！我们将通过“
            <Text className={styles['go-path']} onClick={() => go('/pages/me-module/about/user-agreement')}>《KZ-Seven Mini》</Text>
          </View>
          <View className={styles.indent}>请您务必仔细阅读、充分理解相关内容，若您同意，请选择同意并开始接受我们的服务，若您不同意，请选择暂不使用。</View>
        </View>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onClick={closeChange}>暂不使用</Button>
        <Button className={styles.confirm} onClick={confirmChange}>同意</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default AgreementPopup;
