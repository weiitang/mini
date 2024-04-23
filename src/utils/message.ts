import Taro from '@tarojs/taro';

const Message = {
  info: (val: string, duration?: number, fn?: () => void) => {
    Taro.showToast({
      title: val,
      icon: 'none',
      duration: duration ?? 2000,
      success: () => setTimeout(() => fn, 2000),
    });
  },

  success: (val: string, fn?: () => void) => {
    Taro.showToast({
      title: val,
      icon: 'success',
      duration: 1000,
      success: () => setTimeout(() => {
        fn?.();
      }, 1000),
    });
  },

  error: (val: string) => {
    Taro.showToast({
      title: val,
      icon: 'error' as 'none',
      duration: 2000,
    });
  },
};

export default Message;
