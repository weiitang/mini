import Warn from '@/components/icons/icons-container/Warn';
import { Dialog, Divider, Button } from '@taroify/core';
import { View, Image, Input } from '@tarojs/components';
import classNames from 'classnames';
import { useState } from 'react';
import styles from './PInput.module.less';

/** 输入框组件，目前只有邀请模块在使用 */
const PInput = (props: InputProps) => {
  const { icon = '', laber, placeholderTitle, disabled = false, onClick, value, onInput, className, onBlur, isDialogIcon, maxlength } = props;
  const [openWarn, setOpenWarn] = useState<boolean>(false);// 打开提示弹框
  return (
    <>
      <View className={classNames(styles.content, className)}>
        <View className={styles['text-contaner']}>
          <View className={styles.text}>{laber}</View>
          <View className={styles.stars}>*</View>
          {
            isDialogIcon
              ? <Warn
                  className={styles.warn}
                  onClick={() => {
                    setOpenWarn(true);
                  }}
                  type='png'
                  size={18}
                  name='warn-icon-green'
              />
              : <></>
          }

        </View>
        <View className={styles['input-container']}
          onClick={onClick}
        >
          <Input
            type={styles.text}
            placeholder={placeholderTitle}
            disabled={disabled}
            value={value}
            cursor={value?.length}
            onInput={e => onInput(e)}
            onBlur={e => onBlur(e)}
            maxlength={maxlength}
          />
          <Image className={styles.icon} src={icon}></Image>
        </View>
        <Divider className={styles.line} />
      </View>
      <Dialog open={openWarn} onClose={setOpenWarn} className={styles.dialog}>
        <Dialog.Content>
          <View className={styles['title-content']}>
            作为邀请方的称呼，被邀请人可以修改名称，若不知道被邀请人真实名称，可以填写xx总，英文名， xx先生/小姐?
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <View id={styles.btn}>
            <Button onClick={() => setOpenWarn(false)}>确定</Button>
          </View>
        </Dialog.Actions>
      </Dialog>
    </>
  );
};

export default PInput;
