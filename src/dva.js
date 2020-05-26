import { Modal } from 'antd';

export function config() {
  return {
    onError(err) {
      err.preventDefault();
      console.log(err.message);
      Modal.error({
        title: '提示',
        content: '系统出错，工程师在加班修复，有疑问请联系客服'
      });
    }
  };
}
