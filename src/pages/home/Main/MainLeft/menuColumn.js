import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './menuColumn.scss';

@connect(({ gamePlay, userInfo, togglePageWithGg, loading }) => ({
  togglePageWithGg,
  userInfo,
  gamePlay,
  balanceLoading: loading.models.userInfo
}))
class MenuColumn extends PureComponent {
  /**
   * @type {{GGMenu: string}}
   * 展示的玩法页签
   */
  state = {
    GGMenu: 'asian',
  };

  componentDidMount() {
    this.getAsianDish();
    this.getTodayDish();
    this.fetchArea();
  }

  fetchArea = () => {
    const params = {
      sport: '1',
      gg: '1'
    };
    const { dispatch } = this.props;
    dispatch({
      type: 'area/fetch',
      payload: params,
    });
  };

  getAsianDish = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'gamePlay/fetchAsianDish',
    });
  };

  getTodayDish = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'gamePlay/fetchTodayDish',
    });
  };

  getMatchOdds = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'togglePageWithGg/togglePage',
      payload: id
    });
  };

  getInPlayMatchOdds = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'togglePageWithGg/togglePage',
      payload: id
    });
  };

  inPlayToggle = () => {
    const { isRoundDishExpend } = this.state;
    this.setState({
      isRoundDishExpend: !isRoundDishExpend
    })
  };

  toggleGGMenu = (tab) => {
    this.setState({
      GGMenu: tab
    });
    if (tab === 'mixed') {
      this.getMatchOdds('8')
    }
    if (tab === 'asian') {
      this.getMatchOdds('1')
    }
    if (tab === 'today') {
      this.getMatchOdds('t1')
    }
  };

  renderGGMenu = () => {
    const {
      gamePlay: { todayDish, asianDish },
      togglePageWithGg: { pageId },
    } = this.props;
    const { GGMenu } = this.state;
    switch (GGMenu) {
      case 'mixed':
        return (
          <ul className={styles['dish-list']}>
            <li
              className={pageId === '8' ? `${styles.item} ${styles.active}` : styles.item}
              key="command"
              onClick={() => this.getMatchOdds('8')}
            >
              <span className={styles.left}>
                混合过关
              </span>
              <span className={styles.right}>
                {asianDish && asianDish[7].matchCount}
              </span>
            </li>
          </ul>
        );
      case 'asian':
        return (
          <ul className={styles['dish-list']}>
            {
              asianDish && asianDish.map((val) => (
                <li
                  className={pageId === val.ggId ? `${styles.item} ${styles.active}` : styles.item}
                  key={val.ggId}
                  onClick={() => this.getMatchOdds(val.ggId)}
                >
                  <span className={styles.left}>
                    {val.ggName}
                  </span>
                  <span className={styles.right}>
                    {val.matchCount}
                  </span>
                </li>
              ))
            }
          </ul>
        );
      case 'today':
        return (
          <ul className={styles['dish-list']}>
            {
              todayDish && todayDish.map((val) => (
                <li
                  className={pageId === (`t${val.ggId}`) ? `${styles.item} ${styles.active}` : styles.item}
                  key={val.ggId}
                  onClick={() => this.getMatchOdds(`t${val.ggId}`)}
                >
                  <span className={styles.left}>
                    {val.ggName}
                  </span>
                  <span className={styles.right}>
                    {val.matchCount}
                  </span>
                </li>
              ))
            }
          </ul>
        );
      default:
        return ''
    }
  };


  render() {
    const {
      togglePageWithGg: { pageId },
    } = this.props;
    const {
      GGMenu,
    } = this.state;
    return (
      <div className={styles.menuColumn}>
        <div className={styles['gg-box']}>
          <div className={styles.left}>滚球</div>
          <div className={styles.right} onClick={this.inPlayToggle} />
        </div>
        <ul className={styles['inPlay-list']}>
           <li
             className={pageId === 'inPlay' ? `${styles.item} ${styles.active}` : styles.item}
             key="inPlay"
             onClick={() => this.getInPlayMatchOdds('inPlay')}
           >
             <span className={styles.left}>
               足球
             </span>
             <span className={styles.right} />
          </li>
        </ul>
        <div className={styles['gg-box']}>
          <div className={styles.left}>菜单</div>
        </div>
            <div>
              <div className={styles['gg-tab']}>
                <div
                  className={ GGMenu === 'asian' ? `${styles.item} ${styles.active}` : styles.item}
                  onClick={() => this.toggleGGMenu('asian')}
                >
                  早盘
                </div>
                <div
                  className={ GGMenu === 'today' ? `${styles.item} ${styles.active}` : styles.item}
                  onClick={() => this.toggleGGMenu('today')}
                >
                  今日
                </div>
                <div
                  className={ GGMenu === 'mixed' ? `${styles.item} ${styles.active}` : styles.item}
                  onClick={() => this.toggleGGMenu('mixed')}
                >
                  混合过关
                </div>
              </div>
              { this.renderGGMenu() }
            </div>
      </div>

    );
  }
}

export default MenuColumn;
