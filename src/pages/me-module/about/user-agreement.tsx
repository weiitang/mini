import { View } from '@tarojs/components';
import styles from './agreement.module.less';

function UserAgreement() {
  return  <View className={styles.wrapper}>
    <View className={styles.title}>KZ-Seven Mini</View>
    <View className={styles.content}>
      <View className={styles.blockItem}>【导言】</View>
      <View className={styles.blockItem}>欢迎进入KZ-Seven的小程序</View>
      <View className={styles.blockItemRight}>KS</View>
    </View>
  </View>;
}

export default UserAgreement;
