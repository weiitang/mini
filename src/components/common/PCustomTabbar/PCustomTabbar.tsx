import { Text, View, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { FC } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import stores from '../../../stores/index';
import imgObj from './imgObj';
import styles from './PCustomTabbar.module.less';

// 兼容iphoneX底部横条
const info: any = Taro.getSystemInfoSync();
const safeBottom = info.screenHeight - info.safeArea?.bottom || 0;
interface IProps {
  /** 是否显示底部导航 */
  tabbarType?: string;
}

const PCustomTabbar: FC<IProps> = ({ tabbarType = 'index' }) => {
  const { CustomTabBarStore } = stores;
  const { data } = CustomTabBarStore;

  // 用户导航
  const list = [
    {
      key: 'index',
      text: '首页',
      pagePath: '/pages/index/index',
      iconPath: imgObj.index,
      selectedIconPath: imgObj.index_active,
      show: true,
    },
    {
      key: 'require',
      text: '服务',
      pagePath: '/pages/require/require',
      iconPath: imgObj.service,
      selectedIconPath: imgObj.service_active,
      show: true,
    },
    {
      key: 'needs',
      text: '需求',
      pagePath: '/pages/needs/needs',
      iconPath: imgObj.demand,
      selectedIconPath: imgObj.demand_active,
      show: true,
    },
    {
      key: 'address',
      text: '旅程',
      pagePath: '/pages/address/address',
      iconPath: imgObj.mailList,
      selectedIconPath: imgObj.mailList_active,
      show: true,
    },
    {
      key: 'me',
      text: '我的',
      pagePath: '/pages/me/me',
      iconPath: imgObj.me,
      selectedIconPath: imgObj.me_active,
      show: true,
    },
  ];

  const switchTab = (url: string) => {
    const appObj = Taro.getCurrentInstance().app;
    // 这么取似乎不稳定？Taro似乎没有声明
    // @ts-ignore
    const tabList = (appObj?.config?.tabBar?.list || []).map((v) => {
      const path = v?.pagePath || '';
      return path.indexOf('/') === 0 ? path : `/${path}`;
    });
    console.log('tag', tabList);

    // 非tabbar路由，使用navigateTo跳转
    // tabList不为空才判断，为空就走
    if (tabList.length > 0) {
      if (tabList.includes(url)) {
        Taro.switchTab({ url });
      } else {
        Taro.navigateTo({ url });
      }
      return;
    }


    // 历史写法，先保留，后续看情况删除
    if (url === '/pages/invite/invite') {
      Taro.navigateTo({ url });
    } else {
      Taro.switchTab({ url });
    }
  };

  if (data.showTab) {
    return (
      <View style={{ paddingBottom: `${safeBottom > 0 ? safeBottom : 20}rpx`, backgroundColor: 'white' }} className={styles.custom_tabbar}>
        {list.map(e => e.show && (
          <View onClick={() => switchTab(e.pagePath)} key={e.key} className={classNames(styles.tab_bar, { active: tabbarType === e.key })}>
            <Image className={tabbarType === e.key ? styles.tab_img2 : styles.tab_img} src={tabbarType === e.key ? e.selectedIconPath : e.iconPath}></Image>
            <Text className={tabbarType === e.key ? styles.tab_text_active : styles.tab_text}>{e.text}</Text>
          </View>
        ))}
      </View>
    );
  }
  return <></>;
};

export default observer(PCustomTabbar);
