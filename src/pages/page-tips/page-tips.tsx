
import { View } from '@tarojs/components';
import { getCurrentInstance } from '@tarojs/taro';
import styles from './page-tips.module.less';

const tips = {
  register: 'register',
  delay: 'delay',
  codeDelay: 'codeDelay',
};

const PageTips = () => {
  const { router } = getCurrentInstance();
  const params: any = router?.params;


  return (
    <>
      <View className={styles['openid-nofound-page']}>
        {/* <Image src={OpenIdNoFoundPng} className={styles.image} /> */}
        {
          params?.tips === tips.register && <View className={styles['info-content']}>
          <View className={styles.info}>已提交注册信息，请等待后台审核</View>
          <View className={styles.info}>您可联系投资经理加速审核</View>
        </View>
        }
        {
          params?.tips === tips.delay && <View className={styles['info-content']}>
          <View className={styles.info}>邀请7天内有效，当前已失效</View>
          <View className={styles.info}>请联系负责人重新发送邀请</View>
        </View>
        }
        {
          params?.tips === tips.codeDelay && <View className={styles['info-content']}>
          <View className={styles.info}>二维码已过期</View>
        </View>
        }
      </View>
    </>
  );
};

export default PageTips;
