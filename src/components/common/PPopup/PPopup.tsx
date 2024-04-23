/* eslint-disable no-loop-func */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react/jsx-key */
import { service } from '@/service/index';
import { getLoginInfo } from '@/service/loginApi';
import { wexinLogin } from '@/utils/mp/wechat';
import { showToast } from '@/utils/toast';
import { DatetimePicker, Picker, Popup } from '@taroify/core';
import { getStorageSync, setStorageSync } from '@tarojs/taro';
import moment from 'moment';
import { useState } from 'react';
import { RequestResponseCode } from '../../../../types/taro-enum';
import PSearch from '../PSearch/PSearch';
import styles from './PPopup.module.less';

/** 弹出层组件 */
const PPopup = (props: PopupProps) => {
  const { open, rounded = true, height, type, setOpen, setValue, onSearch, pickerData, pickType, placementArea, marginTop, ref, dateType, orgName, orgId, pickerTitle, data, setFirstName, typeData, firstName } = props;
  const [minDate] = useState(new Date(1980, 9, 14));
  const [maxDate] = useState(new Date(2050, 11, 12));
  const [defaultValue] = useState(new Date());
  if (!pickType) return <></>;
  const arr = ['status', 'orgProfessionLevel1', 'orgMaGroup', 'orgClassification', 'firstLevelName', 'secondLevelName', 'inviterStatus', 'postId', 'investStatus'];

  return (
    <>
      <Popup
        open={open}
        onClose={setOpen}
        rounded={rounded}
        style={{ height, marginTop, width: '100vw' }}
        placement={placementArea ?? 'bottom'}
        className={styles['popup-container']}
      >
        {
          type === 'search'
          && <Picker
            onConfirm={(e) => {
              setValue(e[0]);
              setOpen(false);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          >
            <Picker.Toolbar>
              <Picker.Button>取消</Picker.Button>
              <Picker.Title>{`请选择${pickerTitle}`}</Picker.Title>
              <Picker.Button>确认</Picker.Button>
            </Picker.Toolbar>
            <PSearch listData={pickerData} setValue={setValue} setOpen={setOpen} onSearch={onSearch} />
          </Picker>
        }
        {
          type === 'picker'
          && <Picker
            onCancel={() => setOpen(false)}
            onConfirm={async (e) => {
              switch (pickType) {
                case 'postName': {
                  try {
                    setStorageSync('postName', [e[0]]);
                    setValue(e[0]);
                    setOpen(false);
                  } catch (err) {
                    setOpen(false);

                    const { code } = err;
                    if (code === RequestResponseCode.FAIL) {
                      wexinLogin().then((res: any) => {
                        getLoginInfo({
                          code: res?.code,
                        }).then((lRes: any) => {
                          service.setToken(lRes.token);
                        }, (error) => {
                          showToast(error);
                        });
                      });
                    } else {
                      showToast(err);
                    }
                  }
                }
                  break;
                case 'demandType': {
                  const id = pickerData?.filter(_ => _.typeName === e[0])[0]?.typeId;
                  setValue({
                    value: e[0],
                    id,
                  });
                  setOpen(false);
                }
                  break;
                case 'demandSubType': {
                  const id = pickerData?.filter(_ => _.typeName === e[0])[0]?.typeId;
                  const name = pickerData?.filter(_ => _.typeName === e[0])[0]?.typeName;
                  setValue({
                    value: name ?? pickerData?.[0]?.typeName,
                    id: id ?? pickerData?.[0]?.typeId,
                  });
                  setOpen(false);
                }
                  break;
                case 'postData': {
                  const id = pickerData?.filter(_ => _.postName === e[0])[0]?.postId;
                  setValue({
                    value: e[0],
                    id,
                  });
                  setOpen(false);
                }
                  break;
                case 'createByName': {
                  const id = pickerData?.filter(_ => _.userName === e[0])[0]?.postIdStr;
                  const name = pickerData?.filter(_ => _.userName === e[0])[0]?.postNameStr;
                  const currentUserId = pickerData?.filter(_ => _.userName === e[0])[0]?.userId;
                  const isMySelf = pickerData?.filter(_ => _.userName === e[0]).length;
                  setValue({
                    createBy: currentUserId ?? pickerData?.[0]?.userId,
                    postId: id ?? pickerData?.[0]?.postIdStr,
                    postName: name ?? pickerData?.[0]?.postNameStr,
                    userName: !!isMySelf ? e[0] : pickerData?.[0]?.userName,
                    orgName,
                    orgId,
                  });
                  setOpen(false);
                }
                  break;
                case 'orgType': {
                  const id = pickerData?.filter(_ => _.orgName === e[0])[0]?.orgId;
                  setValue({
                    value: e[0],
                    id,
                  });
                  setOpen(false);
                }
                  break;
                case 'status': {
                  const status = pickerData?.filter(_ => _.data === e[0])[0]?.opt;
                  setValue({ ...data, status: status ?? '' });
                  setOpen(false);
                }
                  break;
                case 'orgProfessionLevel1': {
                  const orgProfessionLevel1 = pickerData?.filter(_ => _.data === e[0])[0]?.opt;
                  setValue({
                    ...data,
                    orgProfessionLevel1,
                  });
                  setOpen(false);
                }
                  break;
                case 'orgMaGroup': {
                  const orgMaGroup = pickerData?.filter(_ => _.data === e[0])[0]?.opt;
                  setValue({
                    ...data,
                    orgMaGroup,
                  });
                  setOpen(false);
                }
                  break;
                case 'orgClassification': {
                  const orgClassification = pickerData?.filter(_ => _.data === e[0])[0]?.opt;
                  setValue({
                    ...data,
                    orgClassification,
                  });
                  setOpen(false);
                }
                  break;
                case 'firstLevelName': {
                  setStorageSync('secondLevelIds', '');
                  setFirstName(e[0]);
                  const secondLevelIdsArr: any[] = [];
                  for (let i = 0; i < typeData?.data.filter(_ => _.typeName === e[0])?.[0]?.children.length; i++) {
                    secondLevelIdsArr.push(typeData?.data?.filter(_ => _.typeName === e[0])[0].children[i]?.typeId);
                  }
                  setValue({
                    ...data,
                    secondLevelIds: secondLevelIdsArr.filter(_ => _ !== undefined).join(','),
                  });
                  setOpen(false);
                }
                  break;
                case 'secondLevelName': {
                  const secondLevelIdsData = typeData.data.filter(_ => _.typeName === firstName)[0].children;
                  const secondLevelIds = secondLevelIdsData.filter(_ => _.typeName === e[0])[0]?.typeId;
                  setStorageSync('secondLevelIds', secondLevelIds);
                  setValue({
                    ...data,
                    secondLevelIds: getStorageSync('secondLevelIds') ?? secondLevelIds,
                  });
                  setOpen(false);
                }
                  break;
                case 'inviterStatus': {
                  const inviterStatus = pickerData?.filter(_ => _.data === e[0])[0]?.opt;
                  setValue({
                    ...data,
                    inviterStatus,
                  });
                  setOpen(false);
                }
                  break;
                case 'investStatus': {
                  const investStatus = pickerData?.filter(_ => _.data === e[0])[0]?.opt;
                  setValue({
                    ...data,
                    investStatus,
                  });
                  setOpen(false);
                }
                  break;
                case 'postId': {
                  const postId = pickerData?.filter(_ => _.data === e[0])[0]?.opt;
                  setValue({
                    ...data,
                    postId,
                  });
                  setOpen(false);
                }
                  break;
                default:
                  setValue(e[0]);
                  setOpen(false);
                  break;
              }
            }}
          >
            <Picker.Toolbar catchMove>
              <Picker.Button>取消</Picker.Button>
              <Picker.Title >{`请选择${pickerTitle ?? '职称'}`}</Picker.Title>
              <Picker.Button>确认</Picker.Button>
            </Picker.Toolbar>
            <Picker.Columns style={{ height: '100%' }}>
              <Picker.Column >
                {
                  pickerData?.map(p => (
                    // eslint-disable-next-line no-nested-ternary
                    <Picker.Option>{pickType === 'createByName' ? p.userName : arr.includes(`${pickType}`) ? p.data
                      : p.postName ?? p.typeName ?? p.orgName}</Picker.Option>
                  ))
                }
              </Picker.Column>
            </Picker.Columns>
          </Picker>
        }
        {
          type === 'date'
          && <DatetimePicker
            // type='date'
            type={dateType ?? 'date'}
            min={minDate}
            max={maxDate}
            defaultValue={defaultValue}
            onConfirm={(e) => {
              ref?.current?.setValue(moment(e).format('YYYY-MM-DD'));
              if (pickType === 'startCreateTime') {
                setValue({
                  ...data,
                  startCreateTime: dateType ? moment(e).format('YYYY-MM-DD') : moment(e).format('YYYY-MM-DD'),
                });
              } else {
                setValue({
                  ...data,
                  createTime: dateType ? moment(e).format('YYYY-MM-DD') : moment(e).format('YYYY-MM-DD'),
                });
              }
              setOpen(false);
            }}
          >
            <DatetimePicker.Toolbar>
              <DatetimePicker.Button onClick={() => setOpen(false)}>取消</DatetimePicker.Button>
              <DatetimePicker.Title>选择{pickerTitle ?? '年月日'}</DatetimePicker.Title>
              <DatetimePicker.Button>确认</DatetimePicker.Button>
            </DatetimePicker.Toolbar>
          </DatetimePicker>
        }
      </Popup>
    </>
  );
};

export default PPopup;
