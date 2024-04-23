import SettingItem from '@/components/pages/meModule/SettingItem/SettingItem';
import { getStorageSync, removeStorageSync, navigateTo, showModal, setStorageSync, useDidShow, getSystemInfo, clearStorageSync } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { Button } from '@taroify/core';
import { deleteUser } from '@/service/loginApi';
import { showToast } from '@/utils/toast';
import { useState } from 'react';
import styles from './setting-info.module.less';

const SettingInfo = () => {
  const [bottomLift, setBottomLift] = useState(0);

  const change = () => {
    showModal({
      title: '是否注销',
      content: '账号注销后，将无法恢复用户数据，确定注销吗？',
      success(res) {
        if (res.confirm) {
          deleteUser().then(() => {
            showToast({
              title: '注销成功',
              icon: 'success',
            });
            removeStorageSync('token');
            setStorageSync('openPop', false);
            setStorageSync('goToRegister', true);
            removeStorageSync('userType');
            removeStorageSync('currentTime');
            removeStorageSync('userId');
            removeStorageSync('historyIndex');
            removeStorageSync('use-applet-confirm');
            removeStorageSync('userInfo');
            clearStorageSync();
            navigateTo({ url: '/pages/openId-no-found/openId-no-found?isNoOpenid=${true}' });
          }, (e) => {
            showToast(e);
          });
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      },
    });
  };

  useDidShow(() => {
    getSystemInfo({
      success: (res: any) => {
        const u = res?.screenHeight - res?.safeArea?.bottom;
        setBottomLift(u || 0);
      },
    });
  });

  return (
    <View className={styles['settings-page']}>
      <SettingItem />
      {
        !getStorageSync('engName') && <View className={styles['logout-box']} style={{ bottom: `${bottomLift}rpx` }}>
          <Button variant='text' color='primary' block onClick={change} style={{
            fontSize: '32rpx',
          }}
          >注销账号</Button>
        </View>
      }
    </View>
  );
};

export default SettingInfo;
