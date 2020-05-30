import { message } from 'antd';

export function config() {
  return {
    onError(err) {
      err.preventDefault();
      message.error({
        title: '提示',
        content: '系统出错，工程师正在修复，有疑问请联系客服'
      });
    }
  };
}
