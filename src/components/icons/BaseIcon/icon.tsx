/* eslint-disable @typescript-eslint/no-require-imports */
import { Image } from '@taroify/core';
import classNames from 'classnames';
import { PIconBasicProps, PIconProps } from 'types/componentsTypes/IconProps';
import styles from './icon.module.less';


const PIcon: React.FC<PIconProps> = (props) => {
  const { className, size, name, style, onClick, type = 'png', isDisplay = false } = props;
  return (
    <Image
      className={classNames(styles.image, className)}
      style={Object.assign(
        {},
        style,
        size ? { width: `${size}px`, height: `${size}px` } : {},
        isDisplay ? { display: 'none' } : {}
      )}
      src={require(`@/static/icons/${name}.${type}`)}
      onClick={onClick}
    />
  );
};
export default PIcon;


export const createPpmpIconComponent = (name?: any): React.FC<PIconProps> => (props: PIconBasicProps) => <PIcon name={name} {...props} />;
