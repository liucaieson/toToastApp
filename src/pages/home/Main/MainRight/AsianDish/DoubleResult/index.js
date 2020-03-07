import React, { PureComponent, Fragment } from 'react';
import { Icon, Row, Col } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import CountDown from '../../../../../../components/CountDown/index';
import CompetitionsModal from '../../competitonsModal/index';
import moment from 'moment';
import PageLoading from '../../../../../../components/MbPageLoading';
import { calcDateToMonthAndDay } from '../../../../../../utils/util';
import DishLayout from '../../DishLayout/betDishLayout';

@connect(({ doubleResult, betShopCart, dates, chsDB, showCompetitions, competitions, loading }) => ({
  doubleResult,
  showCompetitions,
  competitions,
  betShopCart,
  dates,
  chsDB,
  loading,
  doubleResultLoading: loading.effects['doubleResult/fetchMatchOdds'],
}))
class DoubleResult extends PureComponent {
  state = {
    refreshLoading: false,
    showCompetitionsList: [],
    isShowMatch: -1,
    isActiveDate: '',
    firstLoading: true,
  };

  timer = null;
  competitionsParams = {};

  defaultParams = {
    sport: '1',
    gg: '6',
  };
  /* 存储全局的参数 */
  globalParams = {
    ...this.defaultParams,
  };

  componentDidMount() {
    this.fetchDates();
    this.fetchCompetitions();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  setTimeFetchMatchList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'competitions/fetch',
      payload: {
        ...this.globalParams,
      },
    });
    this.fetchMatchOdds(this.globalParams);
  };

  addShopCart = (matchId, gamblingId, choiceId, id) => {
    const { dispatch, betShopCart: { shopCart } } = this.props;
    if (shopCart.ids.includes(choiceId)) {
      return false;
    } else {
      dispatch({
        type: 'changeBetSectionStatus/changeStatus',
        payload: [true, 'bets'],
      });
      dispatch({
        type: 'betShopCart/addBetShopCart',
        payload: {
          sport: '1',
          choiceId,
          status: 0,
          dishId: id,
        },
      });
    }
  };

  /* 请求比赛赔率 */
  fetchMatchOdds = (param) => {
    let params = {
      ...this.globalParams,
    };
    if (param) {
      params = {
        ...params,
        ...param,
      };
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'doubleResult/fetchMatchOdds',
      payload: params,
    });
  };

  /* 请求时间接口 */
  fetchDates = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dates/fetch',
      payload: {
        ...this.defaultParams,
      },
    });
  };

  /* 请求联赛 */
  fetchCompetitions = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'competitions/fetch',
      payload: {
        ...this.globalParams,
      },
      /* 请求完毕联赛接口，请求第一个联赛的比赛赔率 */
      callback: (data) => {
        let id = data[0].competitionId;
        this.fetchMatchOdds({ competitions: id });
        this.setState({
          isShowMatch: id,
          firstLoading: false,
        });
        this.globalParams = {
          ...this.globalParams,
          competitions: id,
        };
      },
    });
  };

  /* isShowMatch里面没有这个val，说明该联赛需要显示，数组里有联赛id就隐藏,请求该联赛数据 */
  toggleMatchExpend = (val) => {
    const { isShowMatch } = this.state;
    const { dispatch } = this.props;

    if (isShowMatch === val) {
      this.setState({
        isShowMatch: -1,
      });
    } else {
      this.setState({
        isShowMatch: val,
      });
      let params = {
        ...this.globalParams,
        competitions: val,
      };
      dispatch({
        type: 'doubleResult/fetchMatchOdds',
        payload: params,
        callback: () => {
          this.globalParams = {
            ...this.globalParams,
            competitions: val,
          };
        },
      });
    }
  };

  /* 全局展示显示联赛的modal  */
  showCompetitionsModal = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'showCompetitions/toggle',
      payload: true,
    });
  };

  /* 获取倒计时组件的this */
  onCountDownRef = (ref) => {
    this.countRef = ref;
  };

  refreshMatchOdds = () => {
    this.setState({
      refreshLoading: true,
    });
    let params = {
      ...this.globalParams,
    };
    const { dispatch } = this.props;
    dispatch({
      type: 'competitions/fetch',
      payload: {
        ...this.globalParams,
      },
    });
    dispatch({
      type: 'doubleResult/fetchMatchOdds',
      payload: params,
      callback: () => {
        this.countRef.reset();
        this.setState({
          refreshLoading: false,
        });
      },
    });
  };

  /* 点击日期的请求 */
  fetchMatchOddsWithDate = (date) => {
    const { dispatch } = this.props;
    this.setState({
      isActiveDate: date.date,
      firstLoading: true,
    });
    dispatch({
      type: 'competitions/fetch',
      payload: {
        ...this.globalParams,
        ...date,
      },
      /* 请求完毕联赛接口，请求第一个联赛的比赛赔率 */
      callback: (data) => {
        if (data.length === 0) {
          this.setState({
            firstLoading: false,
          });
          return;
        }
        let id = data[0].competitionId;
        this.fetchMatchOdds({ competitions: id, date: date.date });
        this.countRef.reset();
        this.setState({
          isShowMatch: id,
          firstLoading: false,
        });
        this.globalParams = {
          ...this.globalParams,
          competitions: id,
          ...date,
        };
      },
    });
  };

  fetchMatchOddsWithCompetitions = (param) => {
    const { dispatch } = this.props;
    if (param.competitions.length === 0) {
      return;
    }
    dispatch({
      type: 'competitions/toggle',
      payload: param.competitions,
      callback: () => {
        let id = param.competitions[0].competitionId;
        this.fetchMatchOdds({ competitions: id });
        this.setState({
          isShowMatch: id,
        });
        /* 刷新倒计时的时间 */
        this.countRef.reset();
        this.globalParams = {
          ...this.globalParams,
          competitions: id,
        };
      },
    });
  };

  turnToAsianMixed = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'togglePageWithGg/togglePage',
      payload: '8',
    });
  };

  render() {
    const {
      doubleResult: {
        competitionsMatchList,
      },
      dates: { dates },
      betShopCart: { shopCart },
      competitions: { competitions },
      chsDB:{chsDB},
      doubleResultLoading,
    } = this.props;
    const { isShowMatch, refreshLoading, isActiveDate, firstLoading } = this.state;
    return (
      <div className={styles.doubleResult}>
        <div className={styles.header}>
          <div className={styles.name}>半场/全场</div>
          <div className={styles.refresh}>
            {
              refreshLoading ? <Icon className={styles.icon} type="loading"/>
                : <Icon className={styles.icon} onClick={this.refreshMatchOdds} type="sync"/>
            }
            <span className={styles.time}>
              <CountDown
                onCountDownRef={this.onCountDownRef}
                time='60'
                onEnd={this.setTimeFetchMatchList}/>
              s</span>
          </div>
          <div className={styles['competitions-select']} onClick={this.showCompetitionsModal}>选择联赛</div>
          <div className={styles.mixed} onClick={this.turnToAsianMixed}>混合过关</div>
        </div>
        <div>
          <Row className={styles['date-select']}>
            <Col
              className={isActiveDate === '' ? styles.item + ' ' + styles.active : styles.item} span={3} offset={1}
              onClick={() => this.fetchMatchOddsWithDate({ date: '' })}
            >全部</Col>
            {
              dates.map((val) => (
                <Col
                  className={isActiveDate === val.id ? styles.item + ' ' + styles.active : styles.item}
                  key={val.id}
                  span={3}
                  onClick={() => this.fetchMatchOddsWithDate({ date: val.id })}>
                  {val.text}</Col>),
              )
            }
          </Row>
          <div className={styles['match-box']}>
            <Row className={styles.table}>
              <Col className={styles['big-tb']} span={3}>时间</Col>
              <Col className={styles['big-tb']} span={5}>赛事</Col>
              <Col className={styles['big-tb']} span={16}>
                <div className={styles.cell}>主/主</div>
                <div className={styles.cell}>主/客</div>
                <div className={styles.cell}>主/和</div>
                <div className={styles.cell}>客/主</div>
                <div className={styles.cell}>客/客</div>
                <div className={styles.cell}>客/和</div>
                <div className={styles.cell}>和/主</div>
                <div className={styles.cell}>和/客</div>
                <div className={styles.cell}>和/和</div>
              </Col>
            </Row>
            <div className={styles.match}>
              {
                firstLoading ? <PageLoading/> :
                  (
                    competitions.length === 0 ? <div className="no-match">暂无比赛</div> :
                      competitions.map((val) => (
                        <div key={val.competitionId}>
                          <Row className={styles['competitions-name']}>
                            <Col span={3} className={styles.arrow}
                                 onClick={() => this.toggleMatchExpend(val.competitionId)}>
                              {
                                isShowMatch === val.competitionId ?
                                  <Icon type="caret-up"/> :
                                  <Icon type="caret-down"/>
                              }
                            </Col>
                            <Col span={20} className={styles.name}>
                              {val.competitionName}
                            </Col>
                          </Row>
                          <div className={styles['match-info']}>
                            {isShowMatch === val.competitionId ?
                              (
                                doubleResultLoading ? <PageLoading/> :
                                  competitionsMatchList &&
                                  competitionsMatchList.map((v) => (
                                    <Row className={styles['match-line-box']} key={v.matchId}>
                                      <Row className={styles['match-line']}>
                                        <Col span={3} className={styles['match-time']}>
                                          {calcDateToMonthAndDay(v.time)}
                                        </Col>
                                        <Col span={5} className={styles['match-team']}>
                                          <div>{v.homeName}</div>
                                          <div>{v.awayName}</div>
                                        </Col>
                                        <Col span={16}>
                                          {
                                            v.odds[0].chs.map((item) => (
                                              <div className={styles['match-odds']}>
                                                  <span className={styles.item}>
                                                    <DishLayout
                                                      choiceId={item.choiceId}
                                                      matchId={v.matchId}
                                                      dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                                      dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                                    />
                                                  </span>
                                              </div>
                                            ))
                                          }
                                         {/* <div className={styles['match-odds']}>
                                            {
                                              v.odds[0].chs.list['11'] &&
                                              <span className={styles.item}>
                                               <DishLayout
                                                 choiceId={v.odds[0].chs.list['11'].choiceId}
                                                 matchId={v.matchId}
                                                 dishId={chsDB[v.odds[0].chs.list['11'].choiceId] && chsDB[v.odds[0].chs.list['11'].choiceId].dishId}
                                                 dish={chsDB[v.odds[0].chs.list['11'].choiceId] && chsDB[chsDB[v.odds[0].chs.list['11'].choiceId]].dish}
                                               />
                                      </span>
                                            }

                                          </div>
                                          <div className={styles['match-odds']}>
                                            {
                                              v.odds[0].chs.list['1X'] &&
                                              <span
                                                className={shopCart.ids.includes(v.odds[0].chs.list['1X'].choiceId) ? `${styles.item} ${styles.active}` : styles.item}
                                                onClick={() => this.addShopCart(v.matchId, v.odds[0].gamblingId, v.odds[0].chs.list['1X'].choiceId, v.odds[0].chs.list['1X'].dishId)}
                                              >
                                          {v.odds[0].chs.list['1X'].dish}
                                      </span>
                                            }

                                          </div>
                                          <div className={styles['match-odds']}>
                                            {
                                              v.odds[0].chs.list['12'] &&
                                              <span
                                                className={shopCart.ids.includes(v.odds[0].chs.list['12'].choiceId) ? `${styles.item} ${styles.active}` : styles.item}
                                                onClick={() => this.addShopCart(v.matchId, v.odds[0].gamblingId, v.odds[0].chs.list['12'].choiceId, v.odds[0].chs.list['12'].dishId)}
                                              >
                                      {v.odds[0].chs.list['12'].dish}</span>
                                            }
                                          </div>
                                          <div className={styles['match-odds']}>
                                            {
                                              v.odds[0].chs.list['X1'] &&
                                              <span
                                                className={shopCart.ids.includes(v.odds[0].chs.list['X1'].choiceId) ? `${styles.item} ${styles.active}` : styles.item}
                                                onClick={() => this.addShopCart(v.matchId, v.odds[0].gamblingId, v.odds[0].chs.list['X1'].choiceId, v.odds[0].chs.list['X1'].dishId)}
                                              >
                                        {v.odds[0].chs.list['X1'].dish}
                                        </span>
                                            }
                                          </div>
                                          <div className={styles['match-odds']}>
                                            {
                                              v.odds[0].chs.list['XX'] &&
                                              <span
                                                className={shopCart.ids.includes(v.odds[0].chs.list['XX'].choiceId) ? `${styles.item} ${styles.active}` : styles.item}
                                                onClick={() => this.addShopCart(v.matchId, v.odds[0].gamblingId, v.odds[0].chs.list['XX'].choiceId, v.odds[0].chs.list['XX'].dishId)}
                                              >
                                        {v.odds[0].chs.list['XX'].dish}
                                        </span>
                                            }
                                          </div>
                                          <div className={styles['match-odds']}>
                                            {
                                              v.odds[0].chs.list['X2'] &&
                                              <span
                                                className={shopCart.ids.includes(v.odds[0].chs.list['X2'].choiceId) ? `${styles.item} ${styles.active}` : styles.item}
                                                onClick={() => this.addShopCart(v.matchId, v.odds[0].gamblingId, v.odds[0].chs.list['X2'].choiceId, v.odds[0].chs.list['X2'].dishId)}
                                              >
                                          {v.odds[0].chs.list['X2'].dish}
                                        </span>
                                            }
                                          </div>
                                          <div className={styles['match-odds']}>
                                            {
                                              v.odds[0].chs.list['21'] &&
                                              <span
                                                className={shopCart.ids.includes(v.odds[0].chs.list['21'].choiceId) ? `${styles.item} ${styles.active}` : styles.item}
                                                onClick={() => this.addShopCart(v.matchId, v.odds[0].gamblingId, v.odds[0].chs.list['21'].choiceId, v.odds[0].chs.list['21'].dishId)}
                                              >
                                        {v.odds[0].chs.list['21'].dish}
                                        </span>
                                            }
                                          </div>
                                          <div className={styles['match-odds']}>
                                            {
                                              v.odds[0].chs.list['2X'] &&
                                              <span
                                                className={shopCart.ids.includes(v.odds[0].chs.list['2X'].choiceId) ? `${styles.item} ${styles.active}` : styles.item}
                                                onClick={() => this.addShopCart(v.matchId, v.odds[0].gamblingId, v.odds[0].chs.list['2X'].choiceId, v.odds[0].chs.list['2X'].dishId)}
                                              >
                                        {v.odds[0].chs.list['2X'].dish}
                                      </span>
                                            }
                                          </div>
                                          <div className={styles['match-odds']}>
                                            {
                                              v.odds[0].chs.list['22'] &&
                                              <span
                                                className={shopCart.ids.includes(v.odds[0].chs.list['22'].choiceId) ? `${styles.item} ${styles.active}` : styles.item}
                                                onClick={() => this.addShopCart(v.matchId, v.odds[0].gamblingId, v.odds[0].chs.list['22'].choiceId, v.odds[0].chs.list['22'].dishId)}
                                              >
                                      {v.odds[0].chs.list['22'].dish}</span>
                                            }
                                          </div>*/}
                                        </Col>
                                      </Row>
                                    </Row>
                                  ))
                              )
                              : ''
                            }
                          </div>
                        </div>
                      ))
                  )}
            </div>
          </div>
        </div>
        <CompetitionsModal params={this.globalParams} fn={this.fetchMatchOddsWithCompetitions}/>
      </div>

    );
  }
}

export default DoubleResult;
