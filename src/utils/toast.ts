import Taro from '@tarojs/taro';

/**
 * 简化toast调用，同时兼容传入的title可能非文本的情况
 * @param options
 * @returns
 */
export function showToast(options: any) {
  const opts: any = {
    icon: 'none',
    duration: 2000,
  };


  if (typeof options === 'string' || typeof options === 'number') {
    Object.assign(opts, {
      title: `${options}`,
    });
  } else if (options instanceof Error) {
    Object.assign(opts, {
      title: options.message,
    });
  } else {
    // service.request返回的是{code:999, data: Error}结构，先兼容
    if (options?.code && options?.data) {
      Object.assign(opts, {
        title: options.data,
      });

    // 兼容Taro或wx返回的错误对象
    } else if (options?.errMsg) {
      Object.assign(opts, {
        title: options.errMsg,
      });
    } else {
      Object.assign(opts, options);
    }

    if (opts.title instanceof Error) {
      Object.assign(opts, {
        title: opts.title.message,
      });
    }
  }

  return Taro.showToast(opts);
}
