import React, { Component } from 'react';
import { Icon } from 'antd';
import styles from './index.scss';

export default class Accordion extends Component {
  state = {
    isShow: false
  };

  toggle = () => {
    const { isShow } = this.state;
    this.setState({
      isShow: !isShow
    })
  };

  render() {
    const { area, children } = this.props;
    const { isShow } = this.state;

    return (
      <div className={styles['area-box']} >
        <div className={styles['area-name']} onClick={this.toggle}>
          {
            isShow ?
              <div className={styles.arrow}>
                <Icon type="caret-up" />
              </div>
              :
              <div className={styles.arrow}>
                <Icon type="caret-down" />
              </div>
          }
          <div className={styles.name}>{ area }</div>
        </div>
        {isShow && children }
      </div>
    );
  }
}
