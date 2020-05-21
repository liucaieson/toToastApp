/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Icon } from 'antd';

export default ({ bg, loadingIconSize, loadingFontSize, color }) => (
  <div
    style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: bg,
      zIndex: 998,
    }}
  >
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100px',
        height: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          color,
        }}
      >
        <Icon style={{ fontSize: loadingIconSize }} type="loading" size="large"/>
        <span style={{ marginTop: 8, fontSize: loadingFontSize }}>加载中...</span>
      </div>
    </div>
  </div>
)
