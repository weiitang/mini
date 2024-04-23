import { View, Image } from '@tarojs/components';
import { Empty as NoDataImg } from '../../icons/index';

const defaultStyle: any = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

/** 空状态组件 */
export const PNoData = (props: NoDataType) => <>
  <View style={props.style ? props.style : defaultStyle}>
    <View style={{ textAlign: 'center', marginTop: props.marginTop ?? '-28px', marginBottom: '' }}>
      {
        props?.imgUrl ? <Image src={props.imgUrl} style={props.imageStyle} /> : <NoDataImg size={props.iconSize ?? 160} type='png' name='empty' />
      }
      {props?.title && <View style={{ textAlign: 'center', fontSize: props.titleFontSize ?? '14PX', color: props.titleColor || '#999999' }}>{props.title}</View>}
    </View>
  </View>
</>;
