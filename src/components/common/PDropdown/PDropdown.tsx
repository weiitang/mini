/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/jsx-key */
import { DatetimePicker, DropdownMenu } from '@taroify/core';
import { Key, useState } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import {  View } from '@tarojs/components';
import styles from './PDropdown.module.less';

/** 下拉菜单组件 */
const PDropdown = (props: PDropdownProps) => {
  const { className, data, onChange, setValue_, style, opt, setOnShow } = props;
  const [minDate] = useState(new Date(2021, 9, 14));
  const [maxDate] = useState(new Date(2023, 11, 12));
  const [defaultValue] = useState(new Date());
  const [value, setValue] = useState<Key | false>();

  return (
    <>
      <View onClick={setOnShow}>
        <DropdownMenu
          className={classNames(styles.dropdown, className)}
          value={value}
          onChange={setValue}
          style={style}
        >
          {data.map(item => (
            <DropdownMenu.Item
              title={item.title}
              value={item.title}
              onChange={(e) => {
                onChange(e);
              }}
            >
              {
                item.title !== '提交时间'
                  ? item?.data?.filter(_ => Object.values(_)[0] !== undefined).map(_ => <DropdownMenu.Option
                      value={`${Object.keys(_)[0]}:${Object.values(_)}`}
                  >
                    {Object.values(_)}
                  </DropdownMenu.Option>)
                  : (
                    <DropdownMenu.Option className={styles.datePicker} style={{ display: 'contents' }}>
                      <DatetimePicker
                        type='date'
                        min={minDate}
                        max={maxDate}
                        defaultValue={defaultValue}
                        onChange={(e: any) => {
                          setValue_({ ...opt, startCreateTime: moment(e).format('YYYY-MM-DD') });
                        }}
                      >
                      </DatetimePicker>
                    </DropdownMenu.Option>
                  )
              }
            </DropdownMenu.Item>
          ))}
        </DropdownMenu>
      </View>
    </>
  );
};

export default PDropdown;
