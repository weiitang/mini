import { useDidShow } from '@tarojs/taro';
import PPage from '@/components/common/PPage/PPage';
import { View } from '@tarojs/components';
import { useEffect } from 'react';
import styles from './index.module.less';

const Index = () => {
  useDidShow(() => {
    const now = +new Date();

    console.log('===now===', now);
  });

  useEffect(() => {
    console.log('init初始化');
  }, []);


  return (
    <>
      <PPage
        isTabPage
        isScrollView
        tabbarType='index'
        className={styles['index-page']}
        scrollContainerClassName={styles['index-scroll-page']}
      >
        <View style={{ margin: 24 }}>当爱在你我心间绽放，欢迎来到我们的小程序首页，这里将带给我们一段浪漫而甜蜜的旅程。在这个温馨的空间里，让我们一同探索不一样的世界。本小程序提供专属服务，供应需求，以及点点滴滴的连接。小程序初始化，后续增添更多美好的颜色。让我们一同穿越时光与浪漫，将这段旅程烙印在记忆中最美的一页。让我们的小程序成为爱的见证。让我们一起书写属于我们的浪漫传说吧！</View>
      </PPage >
    </>
  );
};

export default Index;
