/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react/jsx-pascal-case */
import WebView from '@/components/common/PWebView/PWebView';
import { getUrlByKey } from '@/utils/methods';
import { Swiper } from '@taroify/core';
import { View, Image } from '@tarojs/components';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useRouter } from 'taro-hooks';
import { SwiperProps } from 'types/componentsTypes/indexModuleTypes';
import { PLoading } from '../PLoading/PLoading';
import styles from './PSwiper.module.less';

/** 轮播图组件 */
const PSwiper = (props: SwiperProps) => {
  const { className, cmsData } = props;
  const [, { navigateTo, switchTab }] = useRouter();
  const [data, setData] = useState<any>([]);

  const judgeType = (item: any) => {
    switch (item.linkType) {
      case 1:
        WebView('h5', item.link, '');
        break;
      case 2:
        {
          const switchTabPath = ['/pages/me/me',
            '/pages/index/index', '/pages/require/require',
            '/pages/server-page/server-page'];
          if (switchTabPath.includes(item.link)) {
            switchTab(item.link);
          } else {
            navigateTo(item.link);
          }
        }
        break;
      case 3:
        navigateTo(`/pages/server-module/server-detail/server-detail?acticleID=${item.link}&isCoo=${null}&tabName=测试&isFormCms=${true}`);
        break;
      case 4:
        break;
      default:
        return;
    }
  };

  const setParmiseAll = (list: any) => {
    const newList = list;
    const params = newList.map(e => getUrlByKey(e?.image, 'png', e?.name, false, e));
    return Promise.all(params);
  };

  useEffect(() => {
    if (cmsData?.data) {
      setParmiseAll(cmsData?.data).then((res) => {
        setData(res);
      });
    }
  }, [cmsData]);

  return (
    <View style={!!cmsData?.data ? {} : { marginBottom: '32PX' }}>
      <Swiper
        touchable
        autoplay={6000}
        className={classNames(styles['swiper-container'], className)}
      >
        <Swiper.Indicator />
        {
          cmsData?.data?.length > 0
            ? data?.map(item => (
              <Swiper.Item key={item.id}>
                <Image
                  className={styles['swiper-img']}
                  src={item.url}
                  onClick={() => judgeType(item)}
                />
              </Swiper.Item>
            ))
            : (
              <PLoading
                className={styles.loading}
                status={cmsData?.status}
                iconSize={80}
                marginTop='0'
                titleFontSize='14PX'
              />
            )
        }
      </Swiper>
    </View>
  );
};

export default PSwiper;
