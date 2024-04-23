import { useDidShow } from '@tarojs/taro';
import PPage from '@/components/common/PPage/PPage';
import { View } from '@tarojs/components';
import styles from './address.module.less';

const Index = () => {
  useDidShow(() => {
    const now = +new Date();

    console.log('===now===', now);
  });

  return (
    <>
      <PPage
        isTabPage
        isScrollView
        tabbarType='address'
        className={styles['index-page']}
        scrollContainerClassName={styles['index-scroll-page']}
      >
        <View style={{ textAlign: 'center' }}>记录一些旅程</View>
      </PPage >
    </>
  );
};

export default Index;
