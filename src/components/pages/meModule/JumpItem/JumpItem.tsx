/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-misused-promises */
import WebView from '@/components/common/PWebView/PWebView';
import { View, Image } from '@tarojs/components';
import { Divider } from '@taroify/core';
import { Arrow } from '@taroify/icons';
import Taro from '@tarojs/taro';
import { useRouter } from 'taro-hooks';
import classNames from 'classnames';
import styles from './JumpItem.module.less';


/** （我的页面）页面跳转Item组件 */
const JumpItem = (props: JumpItemProps) => {
  const {
    iconSrc,
    title,
    link,
    isSwitch,
    userId,
    className,
    isGotoLink,
  } = props;
  const [, { navigateTo, switchTab }] = useRouter();

  const gotoLink = () => {
    Taro.openEmbeddedMiniProgram({
      // 要跳转的小程序的appid
      appId: '',
      envVersion: 'release',
      path: 'p',
      extraData: {
        // 把1368数字换成你的产品ID，否则会跳到别的产品
        id: '488472',
      },
      fail: (error) => {
        console.log('跳转小程序失败', error);
      },
    });
  };
  return (
    <View
      className={classNames(styles['jump-item-container'], className)}
      onClick={() => (isGotoLink ? gotoLink() : link === '' ? WebView('inner', '', '')
        : isSwitch ? switchTab(link) : navigateTo(`${link}?userId=${userId}`))}
    >
      <Image src={iconSrc} className={styles.icon} />
      <View className={styles.info}>{title}</View>
      <Arrow size={16} className={styles.arrow} />
      <Divider className={styles.divider} />
    </View>
  );
};

export default JumpItem;
