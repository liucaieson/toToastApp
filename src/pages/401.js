import React from 'react';

export default () => {
  sessionStorage.clear();
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      color: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }}>
      <div className="no-auth-page"/>
      您的认证已过期，请从平台重新登录或者体验测试账户
    </div>);
}
