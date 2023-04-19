import Taro from '@tarojs/taro';
import { host } from './env';

export const request = (url, data = {}, header = {}, type = 'POST') => {
  let opt: any = {
    method: type,
    header: {
      'Content-Type': 'application/json',
      ...header,
    },
  };
  if (type === 'POST') {
    opt.header['Content-Type'] = 'application/json';
    opt.data = JSON.stringify(data);
  } else {
    for (let [key, value] of Object.entries(data))
      if (value) {
        url += `&${key}=${value}`; // 若value没有值，则不添加该字段
      }
  }

  url = /http/.test(url) ? url : host + url;

  return Taro.request({
    url: encodeURI(url),
    ...opt,
  }).then((res) => {
    if (res?.statusCode === 200) {
      return Promise.resolve(res.data);
    }
  });
};
