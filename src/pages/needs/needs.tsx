import { useDidShow } from '@tarojs/taro';
import PPage from '@/components/common/PPage/PPage';
import { View } from '@tarojs/components';
import styles from './needs.module.less';

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
        tabbarType='needs'
        className={styles['index-page']}
        scrollContainerClassName={styles['index-scroll-page']}
      >
        <View style={{ textAlign: 'center' }}>请书写你的需求</View>
      </PPage >
    </>
  );
};

export default Index;
