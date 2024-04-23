import { View } from '@tarojs/components';
import classNames from 'classnames';
import styles from './PHighlight.module.less';

/** 高亮组件 */
const PHighlightItem = (props: PHighlightProps) => {
  const { searchValue, name, onCLick, className, style } = props;
  const reg = new RegExp(searchValue, 'g');
  const hlName = searchValue
    ? name?.replace(reg, `<span>${searchValue}</span>`)
    : name;

  return <View
    style={{
      width: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      ...style,
    }}
    className={classNames(styles.keyword, className)}
    dangerouslySetInnerHTML={{ __html: hlName || '' }}
    onClick={onCLick}
  />;
};
export default PHighlightItem;
