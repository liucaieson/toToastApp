import React, { PureComponent, Fragment } from 'react';
import { Icon } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import moment from 'moment';


class MainLeft extends PureComponent {

  componentDidMount() {

  }


  render() {
    return (
      <div className={styles['main-live-box']}>
        直播预留区域
      </div>

    );
  }
}

export default MainLeft;
