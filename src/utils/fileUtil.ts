import Taro from '@tarojs/taro';

const fsm = Taro.getFileSystemManager();
function base64src(base64data, cb) {
  const [, format, bodyData] =
    /data:image\/(\w+);base64,(.*)/.exec(base64data) || [];
  if (!format) {
    return new Error('ERROR_BASE64SRC_PARSE');
  }
  const FILE_BASE_NAME = new Date().getTime(); //自定义文件名
  const filePath = `${Taro.env.USER_DATA_PATH}/${FILE_BASE_NAME}.${format}`;
  const buffer = Taro.base64ToArrayBuffer(bodyData);
  fsm.writeFile({
    filePath,
    data: buffer,
    encoding: 'binary',
    success() {
      cb(filePath);
    },
    fail() {
      return new Error('ERROR_BASE64SRC_WRITE');
    },
  });
}

function srcbase64(url) {
  Taro.request({ url, responseType: 'arraybuffer' }).then((res) => {
    let base64 = Taro.arrayBufferToBase64(res.data);
    let userImageBase64 = 'data:image/jpg;base64,' + base64;
    return Promise.resolve(userImageBase64);
  });
}

export { base64src, srcbase64 };
