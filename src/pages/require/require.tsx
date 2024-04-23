import { useDidShow } from '@tarojs/taro';
import PPage from '@/components/common/PPage/PPage';
import { View } from '@tarojs/components';
import styles from './require.module.less';

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
        tabbarType='require'
        className={styles['index-page']}
        scrollContainerClassName={styles['index-scroll-page']}
      >
        <View style={{ textAlign: 'center' }}>Seven的精致服务</View>
      </PPage >
    </>
  );
};

export default Index;
