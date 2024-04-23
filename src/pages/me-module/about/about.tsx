import { Divider } from '@taroify/core';
import { navigateTo } from '@tarojs/taro';

import { View } from '@tarojs/components';
import styles from './about.module.less';

const About = () => (
    <View className={styles['about-page']}>
      <View className={styles['info-divider']}>
        <View className={styles.info} onClick={() => navigateTo({ url: '/pages/me-module/about/user-agreement' })}>KZ-Seven Mini</View>
        <Divider className={styles.divider} />
      </View>
    </View >
);

export default About;
