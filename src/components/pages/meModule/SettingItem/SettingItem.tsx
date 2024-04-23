/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react/no-children-prop */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-indent-props */

import { Cell, Form, Input } from '@taroify/core';
import { View } from '@tarojs/components';
import { Arrow } from '@taroify/icons';
import { useRouter } from 'taro-hooks';
import config from '@/config/config';
import styles from './SettingItem.module.less';

const prohibits = ['orgName', 'postName'];

/** (我的模块)设置页面组件 */
const SettingItem = () => {
  const [, { navigateTo }] = useRouter();

  const handleType = (type: string, _label?: string, _value?: string, key?: string) => {
    if (key && prohibits.includes(key)) {
      return;
    };
    switch (type) {
      case 'input':
        navigateTo('');
        break;
    }
  };

  return (
    <>
      <View className={styles['setting-info']}>
        <Form defaultValues={[]}>
          {
            config.REACT_APP_ENV === 'test' || true ? <Cell.Group title='Debug调试功能'>
            <Form.Item
              key={1}
              name='ghostlogin'
              rightIcon={<Arrow className={styles.arrow} />}
            >
              <Form.Label className={styles.label}>切换用户</Form.Label>
              <Form.Control >
                {(() => <Input
                  maxlength={30}
                  readonly
                  className={styles.input}
                  placeholder='请输入ghostlogin'
                  placeholderClassName={styles.placeholder}
                  value='seven'
                  onClick={() => handleType('input', 'Ghostlogin', 'seven', 'ghostlogin')}
                />)()}
                  </Form.Control>
                </Form.Item>
            </Cell.Group> : null
          }
        </Form>
      </View>
    </>
  );
};

export default SettingItem;
