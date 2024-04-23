
import { globalData } from '@/utils/mp';
import { isHaveToken } from '@/utils/methods';
import { getStorageSync } from '@tarojs/taro';


let callbacks: any = [];
let status = 0; // 0:pending; 1:loading; 2:success

// success: true登录成功;false登录失败
export function onAppReady(callback: (success: boolean) => void) {
  if (status === 0) {
    callbacks.push(callback);

    status = 1; // 标记为处理中
    doLogin().then(
      () => {
        // TODO 临时写法，有engName则为内部用户，否则外部
        const isInnerUser = !!getStorageSync('engName');
        globalData.set('is_inner_user', isInnerUser);
        globalData.set('logined', true);

        callbacks.forEach((v) => {
          if (typeof v === 'function') {
            v(true);
          }
        });
        callbacks = [];

        status = 2;
      },
      () => {
        globalData.set('is_inner_user', false);
        globalData.set('logined', false);

        callbacks.forEach((v) => {
          if (typeof v === 'function') {
            v(false);
          }
        });
        callbacks = [];

        status = 0;
      }
    );
  } else if (status === 1) {
    callbacks.push(callback);
  } else {
    if (typeof callback === 'function') {
      callback(true);
    }
  }
}


// export function isAppReady() {
//   const logined = globalData.get('logined');
//   const hasCurPromise = !!globalData.get('cur_is_ready_promise'); // 是否已初始化promise
//   const curIsReadyFinished = globalData.get('cur_is_ready_finished'); // 是否已完成登录，成功或失败都算
//   // 首次或者拒绝过，或未ready，或未登录，或登录态过期，则生成一个新promise
//   if (
//     !hasCurPromise
//     || (!logined && curIsReadyFinished)
//   ) {
//     genIsReadyPromise();
//   }

//   if (logined) {
//     return Promise.resolve();
//   }

//   return globalData.get('cur_is_ready_promise');
// }

// export function genIsReadyPromise() {
//   globalData.set('cur_is_ready_finished', false);

//   const curIsReadyPromise = new Promise<void>((resolve, reject) => {
//     let logined = false;
//     let isInnerUser = false;

//     const afterLogin = () => {
//       globalData.set('logined', logined);
//       globalData.set('is_inner_user', isInnerUser);
//       globalData.set('cur_is_ready_finished', true);

//       if (logined) {
//         resolve();
//       } else {
//         // 避免复用
//         globalData.set('cur_is_ready_promise', null);
//         reject();
//       }
//     };

//     doLogin().then(
//       () => {
//         logined = true;
//         // TODO 临时写法，有engName则为内部用户，否则外部
//         isInnerUser = !!getStorageSync('engName');
//         afterLogin();
//       },
//       () => {
//         logined = false;
//         afterLogin();
//       }
//     );
//   });

//   globalData.set('cur_is_ready_promise', curIsReadyPromise);
// }

export function doLogin() {
  // TODO 更合理的是根据本地缓存的凭证checkLogin
  return new Promise<void>((resolve, reject) => {
    isHaveToken(resolve, resolve, reject);
  });
}

export default {
  onAppReady,
};
