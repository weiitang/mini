/* eslint-disable react/jsx-pascal-case */
import { Skeleton, WhiteSpace } from '@taroify/core';
import { View } from '@tarojs/components';
import styles from './PSkeleton.module.less';

/** 骨架屏组件 */
const PSkeleton = (props: Partial<SkeletonProps>) => {
  const { variant, width, size } = props;
  return (
    <View className={styles['skeleton-container']}>
      <Skeleton style={{ width }} />
      <WhiteSpace size='20px' />
      <Skeleton style={{ width: '90%', marginLeft: '32px' }} />
      <WhiteSpace />
      <Skeleton />
      <WhiteSpace />
      <Skeleton style={{ width: '60%' }} />
      <WhiteSpace />
      <View className={styles['variant-container']}>
        <Skeleton variant={variant} style={{ width: '90%' }} className={styles.variant} />
      </View>
      <WhiteSpace size='20px' />
      <Skeleton style={{ width: '90%', marginLeft: '37px', marginTop: '50px' }} />
      <WhiteSpace size='20px' />
      <Skeleton />
      <WhiteSpace />
      {
        size === 'big' && <>
          <Skeleton style={{ width: '60%' }} />
          <WhiteSpace size='20px' />
          <Skeleton style={{ width: '90%', marginLeft: '32px' }} />
          <WhiteSpace size='20px' />
          <Skeleton />
          <WhiteSpace />
          <Skeleton style={{ width: '60%' }} />
          <WhiteSpace />
          <Skeleton style={{ width: '60%' }} />
          <WhiteSpace size='20px' />
          <Skeleton style={{ width: '90%', marginLeft: '32px' }} />
          <WhiteSpace size='20px' />
          <Skeleton />
          <WhiteSpace />
          <Skeleton style={{ width: '60%' }} />
          <Skeleton />
          <WhiteSpace />
          <Skeleton style={{ width: '60%' }} />
          <WhiteSpace size='20px' />
          <Skeleton style={{ width: '90%', marginLeft: '32px' }} />
          <WhiteSpace size='20px' />
          <Skeleton />
          <WhiteSpace />
        </>
      }
    </View>
  );
};

export default PSkeleton;
