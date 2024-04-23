
import { View, Image } from '@tarojs/components';
// import { QRCode } from 'taro-code';
import LoadingPng from '@/static/icons/loading.png';

import styles from './PQrCode.module.less';

/**  打开二维码组件 */
const PQrCodeCard = (props: QrCodeProps) => {
  const { url, name, desc, showMenuByLongpress } = props;

  return (
    <View className={styles.pages}>
      <View className={styles['code-content']}>
        <View className={styles['code-title']}>{name}</View>
        {/* <QRCode
          text={url}
          size={200}
          scale={4}
          errorCorrectLevel='M'
          typeNumber={2}
        /> */}
        <View className={styles['code-box']}>
          <Image className={styles['code-box']} src={url ?? LoadingPng} lazyLoad showMenuByLongpress={showMenuByLongpress} />
        </View>
        <View className={styles['code-desc']}>{desc}</View>
      </View>
    </View>

  );
};
export default PQrCodeCard;

