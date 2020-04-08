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
import PaginationBox from '../../../../../../components/PaginationBox';
import CorrectScoreDishLayout from '../../DishLayout/correntScoreDishLayout';
import Accordion from '../../../../../../components/Accordion';

@connect(({asianGG6And7, dates, chsDB, showCompetitions, competitions, loading }) => ({
  asianGG6And7,
  showCompetitions,
  competitions,
  dates,
  chsDB,
  loading: loading.effects['asianGG6And7/fetchMatchOdds'],
}))
class DoubleResult extends PureComponent {
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
    gg: '6',
    page: 1
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
      type: 'asianGG6And7/fetchMatchOdds',
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
    this.fetchMatchOdds({ ...this.globalParams,page:1, date: date.date }, () => {
      this.countRef.reset();
      this.setState({
        firstLoading: false,
      });
      this.globalParams = {
        ...this.globalParams,
        ...date,
        page:1
      };
    });
  };

  /* 给请求联赛的函数
   * 回调函数为，请求联赛之后拿第一个联赛id去请求该联赛的比赛
   * 设置show的match（实际上是应该展示的联赛）
   * 保存全局参数
    * */
  fetchMatchOddsWithCompetitions = (param) => {
    if (param=== undefined) {
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
    const {loading} = this.props;
    if(loading){
      return
    }
    this.fetchMatchOdds({page,size:40}, (result) => {
      const { current } = result;
      this.globalParams = {
        ...this.globalParams,
        page: current
      };
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
      asianGG6And7: {
        cptIds, matchListObj, count, current,
      },
      dates: { dates },
      chsDB:{chsDB},
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
                    <div>
                      {
                        cptIds.map((val) => (
                          <div key={val}>
                            <Accordion
                              cptName={matchListObj[val] &&  matchListObj[val][0].cptName}
                            >
                              <div className={styles['match-info']}>
                                {
                                  (
                                    matchListObj[val].map((v) => (
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
                                            {/* {
                                            v.odds[0].chs.map((item) => (
                                              <div className={styles['match-odds']} key={item.choiceId}>
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
                                          }*/}
                                            <div className={styles['match-odds']}>
                                              {
                                                v.odds[0].chs.list['11'] &&
                                                <span className={styles.item}>
                                               <DishLayout
                                                 choiceId={v.odds[0].chs.list['11'].choiceId}
                                                 matchId={v.matchId}
                                                 dishId={chsDB[v.odds[0].chs.list['11'].choiceId] && chsDB[v.odds[0].chs.list['11'].choiceId].dishId}
                                                 dish={chsDB[v.odds[0].chs.list['11'].choiceId] && chsDB[v.odds[0].chs.list['11'].choiceId].dish}
                                               />
                                      </span>
                                              }
                                            </div>
                                            <div className={styles['match-odds']}>
                                              {
                                                v.odds[0].chs.list['12'] &&
                                                <span className={styles.item}>
                                               <DishLayout
                                                 choiceId={v.odds[0].chs.list['12'].choiceId}
                                                 matchId={v.matchId}
                                                 dishId={chsDB[v.odds[0].chs.list['12'].choiceId] && chsDB[v.odds[0].chs.list['12'].choiceId].dishId}
                                                 dish={chsDB[v.odds[0].chs.list['12'].choiceId] && chsDB[v.odds[0].chs.list['12'].choiceId].dish}
                                               />
                                      </span>
                                              }
                                            </div>
                                            <div className={styles['match-odds']}>
                                              {
                                                v.odds[0].chs.list['1X'] &&
                                                <span className={styles.item}>
                                               <DishLayout
                                                 choiceId={v.odds[0].chs.list['1X'].choiceId}
                                                 matchId={v.matchId}
                                                 dishId={chsDB[v.odds[0].chs.list['1X'].choiceId] && chsDB[v.odds[0].chs.list['1X'].choiceId].dishId}
                                                 dish={chsDB[v.odds[0].chs.list['1X'].choiceId] && chsDB[v.odds[0].chs.list['1X'].choiceId].dish}
                                               />
                                      </span>
                                              }

                                            </div>
                                            <div className={styles['match-odds']}>
                                              {
                                                v.odds[0].chs.list['21'] &&
                                                <span className={styles.item}>
                                               <DishLayout
                                                 choiceId={v.odds[0].chs.list['21'].choiceId}
                                                 matchId={v.matchId}
                                                 dishId={chsDB[v.odds[0].chs.list['21'].choiceId] && chsDB[v.odds[0].chs.list['21'].choiceId].dishId}
                                                 dish={chsDB[v.odds[0].chs.list['21'].choiceId] && chsDB[v.odds[0].chs.list['21'].choiceId].dish}
                                               />
                                      </span>
                                              }
                                            </div>
                                            <div className={styles['match-odds']}>
                                              {
                                                v.odds[0].chs.list['22'] &&
                                                <span className={styles.item}>
                                               <DishLayout
                                                 choiceId={v.odds[0].chs.list['22'].choiceId}
                                                 matchId={v.matchId}
                                                 dishId={chsDB[v.odds[0].chs.list['22'].choiceId] && chsDB[v.odds[0].chs.list['22'].choiceId].dishId}
                                                 dish={chsDB[v.odds[0].chs.list['22'].choiceId] && chsDB[v.odds[0].chs.list['22'].choiceId].dish}
                                               />
                                      </span>
                                              }
                                            </div>
                                            <div className={styles['match-odds']}>
                                              {
                                                v.odds[0].chs.list['2X'] &&
                                                <span className={styles.item}>
                                               <DishLayout
                                                 choiceId={v.odds[0].chs.list['2X'].choiceId}
                                                 matchId={v.matchId}
                                                 dishId={chsDB[v.odds[0].chs.list['2X'].choiceId] && chsDB[v.odds[0].chs.list['2X'].choiceId].dishId}
                                                 dish={chsDB[v.odds[0].chs.list['2X'].choiceId] && chsDB[v.odds[0].chs.list['2X'].choiceId].dish}
                                               />
                                            </span>
                                              }
                                            </div>

                                            <div className={styles['match-odds']}>
                                              {
                                                v.odds[0].chs.list['X1'] &&
                                                <span className={styles.item}>
                                               <DishLayout
                                                 choiceId={v.odds[0].chs.list['X1'].choiceId}
                                                 matchId={v.matchId}
                                                 dishId={chsDB[v.odds[0].chs.list['X1'].choiceId] && chsDB[v.odds[0].chs.list['X1'].choiceId].dishId}
                                                 dish={chsDB[v.odds[0].chs.list['X1'].choiceId] && chsDB[v.odds[0].chs.list['X1'].choiceId].dish}
                                               />
                                      </span>
                                              }
                                            </div>
                                            <div className={styles['match-odds']}>
                                              {
                                                v.odds[0].chs.list['X2'] &&
                                                <span className={styles.item}>
                                               <DishLayout
                                                 choiceId={v.odds[0].chs.list['X2'].choiceId}
                                                 matchId={v.matchId}
                                                 dishId={chsDB[v.odds[0].chs.list['X2'].choiceId] && chsDB[v.odds[0].chs.list['X2'].choiceId].dishId}
                                                 dish={chsDB[v.odds[0].chs.list['X2'].choiceId] && chsDB[v.odds[0].chs.list['X2'].choiceId].dish}
                                               />
                                      </span>
                                              }
                                            </div>
                                            <div className={styles['match-odds']}>
                                              {
                                                v.odds[0].chs.list['XX'] &&
                                                <span className={styles.item}>
                                               <DishLayout
                                                 choiceId={v.odds[0].chs.list['XX'].choiceId}
                                                 matchId={v.matchId}
                                                 dishId={chsDB[v.odds[0].chs.list['XX'].choiceId] && chsDB[v.odds[0].chs.list['XX'].choiceId].dishId}
                                                 dish={chsDB[v.odds[0].chs.list['XX'].choiceId] && chsDB[v.odds[0].chs.list['XX'].choiceId].dish}
                                               />
                                      </span>
                                              }
                                            </div>




                                          </Col>
                                        </Row>
                                      </Row>
                                    ))
                                  )

                                }
                              </div>
                            </Accordion>

                          </div>
                        ))
                      }
                      <PaginationBox total={count} current={current} pageSize={40} onChange={this.nextPage}/>
                    </div>
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
