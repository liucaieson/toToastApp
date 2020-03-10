import React, { PureComponent, Fragment } from 'react';
import { Icon, Row, Col } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import CountDown from '../../../../../../components/CountDown/index';
import CompetitionsModal from '../../competitonsModal/index';
import PageLoading from '../../../../../../components/MbPageLoading';
import { calcDateToMonthAndDay } from '../../../../../../utils/util';
import DishLayout from '../../DishLayout/betDishLayout';
import PaginationBox from '../../../../../../components/PaginationBox';

@connect(({ asianGG, dates, chsDB, showCompetitions, competitions, loading }) => ({
  asianGG,
  showCompetitions,
  competitions,
  dates,
  chsDB,
  loading: loading.effects['asianGG/fetchMatchOdds'],
}))
class FirstGoal extends PureComponent {
  state = {
    refreshLoading: false,
    showCompetitionsList: [],
    isActiveDate: '',
    firstLoading: true,
  };

  timer = null;
  competitionsParams = {};

  defaultParams = {
    sport: '1',
    gg: '7',
  };
  /* 存储全局的参数 */
  globalParams = {
    ...this.defaultParams,
  };

  componentDidMount() {
    this.fetchDates();
    this.fetchMatchOdds({}, () => {
      this.setState({
        firstLoading: false,
      });
    });
  }

  setTimeFetchMatchList = () => {
    this.fetchMatchOdds(this.globalParams);
  };

  /* 请求比赛赔率 */
  fetchMatchOdds = (param, fn) => {
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
      type: 'asianGG/fetchMatchOdds',
      payload: params,
      callback: fn,
    });
  };

  /* 请求时间接口 */
  fetchDates = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dates/fetch',
      payload: {
        ...this.globalParams,
      },
    });
  };

  /* 刷新比赛数据 */
  refreshMatchOdds = () => {
    this.setState({
      refreshLoading: true,
    });
    let params = {
      ...this.globalParams,
    };
    const { dispatch } = this.props;
    dispatch({
      type: 'pointSpread/fetchMatchOdds',
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
    this.setState({
      isActiveDate: date.date,
      firstLoading: true,
    });
    this.fetchMatchOdds({ ...this.globalParams, date: date.date }, () => {
      this.countRef.reset();
      this.setState({
        firstLoading: false,
      });
      this.globalParams = {
        ...this.globalParams,
        ...date,
      };
    });

  };

  /* 给请求联赛的函数
   * 回调函数为，请求联赛之后拿第一个联赛id去请求该联赛的比赛
   * 设置show的match（实际上是应该展示的联赛）
   * 保存全局参数
    * */
  fetchMatchOddsWithCompetitions = (param) => {
    if (param.competitions === undefined) {
      return;
    }
    this.setState({
      firstLoading: true,
    });
    this.fetchMatchOdds({ competitions: param }, () => {
      /* 刷新倒计时的时间 */
      this.countRef.reset();
      this.globalParams = {
        ...this.globalParams,
        competitions: param,
      };
      this.setState({
        firstLoading: false,
      });
    });
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

  nextPage = (page) => {
    const { loading } = this.props;
    if (loading) {
      return;
    }
    this.fetchMatchOdds({ page, size: 40 });
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
      asianGG: {
        cptIds, matchListObj, count, current,
      },
      dates: { dates },
      chsDB: { chsDB },
      competitions: { competitions },
      firstGoalLoading,
    } = this.props;
    const { isShowMatch, refreshLoading, isActiveDate, firstLoading } = this.state;
    return (
      <div className={styles.firstGoal}>
        <div className={styles.header}>
          <div className={styles.name}>最先进球/最后进球</div>
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
              <Col className={styles['big-tb']} span={7}>赛事</Col>
              <Col className={styles['middle-tb']} span={7}>
                <Row className={styles['cell-th']}>
                  最先进球
                </Row>
                <Row>
                  <Col span={8} className={styles.cell}>主进</Col>
                  <Col span={8} className={styles.cell}>客进</Col>
                  <Col span={8} className={styles.cell}>无进球</Col>
                </Row>
              </Col>
              <Col className={styles['middle-tb']} span={7}>
                <Row className={styles['cell-th']}>
                  最后进球
                </Row>
                <Row>
                  <Col span={8} className={styles.cell}>主进</Col>
                  <Col span={8} className={styles.cell}>客进</Col>
                  <Col span={8} className={styles.cell}>无进球</Col>
                </Row>
              </Col>
            </Row>
            <div className={styles.match}>
              {
                firstLoading ? <PageLoading/> :
                  (
                    <div>
                      {
                        cptIds.map((val) => (
                          <div key={val}>
                            <Row className={styles['competitions-name']}>
                              <Col span={1} className={styles.arrow}>
                              </Col>
                              <Col span={20} className={styles.name}>
                                {matchListObj[val][0].cptName}
                              </Col>
                            </Row>
                            <div className={styles['match-info']}>
                              {
                                (
                                  matchListObj[val].map((v) => (
                                    <Row className={styles['match-line-box']} key={v.matchId}>
                                      <Row className={styles['match-line']}>
                                        <Col span={3} className={styles['match-time']}>
                                          {calcDateToMonthAndDay(v.time)}
                                        </Col>
                                        <Col span={7} className={styles['match-team']}>
                                          <div>{v.homeName}</div>
                                          <div>{v.awayName}</div>
                                        </Col>
                                        <Col span={7} className={styles['match-odds']}>
                                          {
                                            v.odds[0].chs.map((item) => (
                                                <Col span={8} key={item.dishId} className={styles.item}>
                                                      <span
                                                        className={styles.odds}
                                                      >
                                                        <DishLayout
                                                          choiceId={item.choiceId}
                                                          matchId={v.matchId}
                                                          dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                                          dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                                        />
                                                       </span>
                                                </Col>
                                              ),
                                            )
                                          }
                                        </Col>
                                        <Col span={7} className={styles['match-odds']}>
                                          {
                                            v.odds[1].chs.map((item) => (
                                                <Col span={8} key={item.dishId} className={styles.item}>
                                                      <span
                                                        className={styles.odds}
                                                      >
                                                        <DishLayout
                                                          choiceId={item.choiceId}
                                                          matchId={v.matchId}
                                                          dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                                          dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                                        />
                                                       </span>
                                                </Col>
                                              ),
                                            )
                                          }
                                        </Col>
                                      </Row>
                                    </Row>
                                  ))
                                )
                              }
                            </div>
                          </div>
                        ))
                      }
                      <PaginationBox total={count} current={current} pageSize={40} onChange={this.nextPage}/>
                    </div>
                  )
              }
            </div>
          </div>
        </div>
        <CompetitionsModal params={this.globalParams} fn={this.fetchMatchOddsWithCompetitions}/>
      </div>

    );
  }
}

export default FirstGoal;
