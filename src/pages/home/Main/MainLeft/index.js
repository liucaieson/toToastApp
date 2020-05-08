import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './index.scss';
import MenuColumn from './menuColumn';
import BetShopCart from './BetShopCart'
import MixedShopCart from './MixedShopCart'
import MyOrder from './myOrder'

@connect(({ toggleMainLeftTabs }) => ({
  toggleMainLeftTabs
}))
class MainLeft extends PureComponent {
  toggleTab = (id) => {
    const { dispatch, toggleMainLeftTabs: { mainLeftId } } = this.props;
    if (mainLeftId === id) {
      return false
    }
    dispatch({
      type: 'toggleMainLeftTabs/toggleMainLeftTabs',
      payload: id
    });
  };

  renderTab() {
    const {
      toggleMainLeftTabs: { mainLeftId },
    } = this.props;
    if (mainLeftId === 1) {
      return (
        <MenuColumn />
      );
    }
    if (mainLeftId === 2) {
      return (
        <BetShopCart />
      );
    }
    if (mainLeftId === 3) {
      return (
        <MixedShopCart />
      );
    }
    if (mainLeftId === 4) {
      return (
        <MyOrder />
      );
    }
    return ''
  }


  render() {
    const {
      toggleMainLeftTabs: { mainLeftId },
    } = this.props;
      return (
        <div className={styles['main-left-box']}>
          <div className={styles['tabs-header']}>
            <div
              className={mainLeftId === 1 ? `${styles.active} ${styles.tab}` : styles.tab}
              onClick={() => this.toggleTab(1)}
            >
              首页
            </div>
            <div
              className={mainLeftId === 2 ? `${styles.active} ${styles.tab}` : styles.tab}
              onClick={() => this.toggleTab(2)}
            >
              单注
            </div>
            <div
              className={mainLeftId === 3 ? `${styles.active} ${styles.tab}` : styles.tab}
              onClick={() => this.toggleTab(3)}
            >
              过关
            </div>
            <div
              className={mainLeftId === 4 ? `${styles.active} ${styles.tab}` : styles.tab}
              onClick={() => this.toggleTab(4)}
            >
              我的注单
            </div>
          </div>
          <div>
            {this.renderTab()}
          </div>
        </div>
      );
  }
}

export default MainLeft;
