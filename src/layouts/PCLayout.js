import React from 'react'
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

function BasicLayout(props) {
  return <ConfigProvider locale={zh_CN}>{props.children}</ConfigProvider >;
}
export default BasicLayout;
