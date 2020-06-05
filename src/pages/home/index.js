import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Modal } from 'antd';
import withRouter from 'umi/withRouter';
import Main from './Main';
import Header from './Header/header2';
import styles from './index.scss';
import { getQueryString } from '../../utils/util';

@connect(({ login }) => ({
  login,
}))
class HomePage extends PureComponent {
  state = {
    isLogin: false,
  };

  timer = null;

  componentDidMount() {
    const accessCode = getQueryString('accessCode');
    const code = sessionStorage.getItem('accessCode');
  /*  // 如果url没有 而且本地也没有 则不改变登录状态
    if (!accessCode && !code) {
      return
    } */
    if (accessCode) {
      sessionStorage.setItem('accessCode', accessCode);
      Modal.success({
        title: '亚冠体育',
        content: '欢迎来到亚冠体育',
      });
      this.getUserInfo();
      this.setState({
        isLogin: true
      });
      return
    }
    if (code && code !== 'faeb2ead70b74948ae3b7c4cd73243f1') {
      Modal.success({
        title: '亚冠体育',
        content: '欢迎来到亚冠体育',
      });
      this.getUserInfo();
      this.setState({
        isLogin: true
      })
    } else {
      sessionStorage.setItem('accessCode', 'faeb2ead70b74948ae3b7c4cd73243f1');
     Modal.success({
        title: '亚冠体育',
        content: '欢迎来到亚冠体育,当前为试玩账号',
      });
      this.getUserInfo();
      this.setState({
        isLogin: true
      })
    }
  }

  getUserInfo = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'userInfo/fetch',
    });
  };

  render() {
    const { isLogin } = this.state;

    return (
      <div className={styles.container}>
        {
          isLogin ? (
            <Fragment>
              <Header/>
              <Main/>
            </Fragment>
          ) : '不存在'
        }
      </div>

    );
  }
}

export default withRouter(HomePage);
