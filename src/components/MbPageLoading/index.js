import React from 'react';
import { Icon } from 'antd';

const PageLoading = ({height, top, color}) => (
  <div
    style={{
      width: '100%',
      height: height || '200px',
      paddingTop:  top || '80px',
      background:'#fff',
      color: color || '#232323'
    }}
  >
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Icon style={{fontSize: '30px'}} type="loading" />
    </div>
  </div>
);
export default PageLoading;

