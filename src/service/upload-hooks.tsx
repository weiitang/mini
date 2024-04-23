/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/no-misused-promises */
import config from '@/config/config';
import Taro, { getStorageSync } from '@tarojs/taro';
import { showToast } from '@/utils/toast';
import { getSignaturesData } from '@/utils/signatures';
import { preview } from './loginApi';
import { service } from './index';

export function getCaption(obj) {
  const index = obj?.lastIndexOf('wx/');
  const res = obj?.substring(index, obj.length);
  return res;
}

export const uploadFileApi = async (key: string, filePath: string, name?: string, type?: string) => {
  const baseUrl = getStorageSync('engName') !== '' ? config.REACT_APP_EC_INTERIOR_BASEAPI : config.REACT_APP_EC_BASEAPI;
  const result = new Promise((resolve, reject) => {
    Taro.showLoading({ title: '上传中...' });
    const signaturesData = getSignaturesData(key, service.secretKey, 'POST') || {};
    Taro.uploadFile({
      url: `${baseUrl}/file/upload/v1?key=${key}`,
      header: {
        wxappkey: getStorageSync('token') ?? '',
        authorization: getStorageSync('token'),
        uid: getStorageSync('uid'),
        username: encodeURI(getStorageSync('userNameZh')),
        ...signaturesData,
      },
      filePath,
      name: 'file',
      // formData: {
      //   public: 'true',
      // },
      success: async (res) => {
        const data = JSON.parse(res?.data);
        if (data?.code === 1011) {
          Taro.hideLoading();
          showToast('单个文件大小不能超过10M');
          return;
        }

        const url = data?.data.url || '';
        const fileName = data?.data.fileName; // 编码后的文件名，原来是中文，这里就不是了
        const newKey = url.substring(url.indexOf('/', url.indexOf('/') + 3))?.slice(1);
        const newName = newKey?.slice(21);
        preview(newKey).then((res) => {
          const filePath = `${Taro.env.USER_DATA_PATH}/${newName}`;
          const fs = Taro.getFileSystemManager(); // 获取全局唯一的文件管理器
          fs.writeFile({
            // 写文件
            filePath,
            data: res,
            encoding: 'binary',
            success() {
              Taro.hideLoading();
              showToast('上传成功');
              const r = {
                name, // 原始文件名
                fileName, // 上传后系统生成的文件名
                type: type || 'image',
                path: getCaption(url),
                url: filePath,
                id: data.id, // data.id不存在的啊？？
              };
              resolve(r);
            },
            fail() {
              Taro.hideLoading();
            },
          });
        }, (e) => {
          Taro.hideLoading();
          showToast(e);
        });
      },
      fail: (error) => {
        Taro.hideLoading();
        showToast('上传失败, 请重试~');
        reject(error);
      },
    });
  });
  return result;
};

/**
 *
 * @param quality 传入图片压缩质量   默认为原图的70%
 * @param count   最多上传数量
 */
export const uploadImage = (
  key: string,
  quality?: number,
  sourceType?: (keyof Taro.chooseImage.sourceType)[],
  count?: number
): any => {
  let uploadList: Array<string> = [];
  return new Promise((resolve, reject) => {
    Taro.chooseImage({
      count: count || 2, // 可选图片数量, 这里限制为1张
      sizeType: ['original', 'compressed'],
      sourceType: sourceType || ['album', 'camera'],
      async success(res) {
        let flag = false;
        for (let i = 0; i < res.tempFiles.length; i++) {
          const element = res.tempFiles[i];
          const itemSize = element.size / 1024 / 1024;
          if (itemSize > 10) {
            flag = true;
          } else if (itemSize < 10 && itemSize > 3) {
            uploadList = (await handleCompressImage(
              res.tempFilePaths,
              quality
            )) as string[];
          } else {
            uploadList = res.tempFilePaths;
          }
        }
        if (flag) {
          showToast('图片限制10M大小');
          return;
        }

        const result = await uploadFileApi(key, uploadList[0]);
        resolve(result);
      },
      fail(err) {
        if (err.errMsg === 'chooseImage:fail cancel') {
          showToast('已取消');
          return;
        }
        showToast('图片上传失败, 请重试');
        reject(err);
        return;
      },
    });
  });
};

// 单独处理压缩，taro上传图片压缩的功能不是很理想
export const handleCompressImage = (
  tempFilePaths: string[],
  quality?: number
) => {
  const tempFilePathsList: string[] = [];
  return new Promise((resolve, reject) => {
    for (let i = 0; i < tempFilePaths.length; i++) {
      const element = tempFilePaths[i];
      Taro.compressImage({
        src: element, // 图片路径
        quality: quality || 70, // 压缩质量
        success: (temp_item) => {
          tempFilePathsList.push(temp_item.tempFilePath);
          resolve(tempFilePathsList);
        },
        fail: (err) => {
          reject(err);
        },
      });
    }
  });
};
// 上传文件
export const uploadFile = (count?: number) => new Promise((resolve, reject) => {
  Taro.chooseMessageFile({
    count: count || 1,
    type: 'file',
    success: (res) => {
      res.tempFiles.map(async (item) => {
        const itemSize = item.size / 1024 / 1024;
        if (itemSize > 10) {
          showToast('文件限制10M大小');
        } else {
          const result = await uploadFileApi(item.path, item.name, item.type);
          resolve(result);
        }
      });
    },
    fail: (error) => {
      if (error.errMsg === 'chooseMessageFile:fail cancel') {
        showToast('已取消');
        return;
      }
      showToast('图片上传失败, 请重试');
      reject(error);
    },
  });
});
