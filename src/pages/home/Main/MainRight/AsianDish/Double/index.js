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

@connect(({ asianGG, dates, chsDB, betShopCart, showCompetitions, competitions, loading }) => ({
  asianGG,
  showCompetitions,
  competitions,
  chsDB,
  betShopCart,
  dates,
  loading: loading.effects['asianGG/fetchMatchOdds'],
}))
class Double extends PureComponent {
  state = {
    refreshLoading: false,
    showCompetitionsList: [],
    isShowMatch: -1,
    isActiveDate: '',
    firstLoading: true,
  };

  timer = null;
  competitionsParams = {};
  /* 存储全局的参数 */
  defaultParams = {
    sport: '1',
    gg: '4',
    page:1
  };

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
    if (param === undefined) {
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

  /* 获取倒计时组件的this */
  onCountDownRef = (ref) => {
    this.countRef = ref;
  };

  /* 全局展示显示联赛的modal  */
  showCompetitionsModal = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'showCompetitions/toggle',
      payload: true,
    });
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
      asianGG: {
        cptIds, matchListObj, count, current,
      },
      dates: { dates },
      chsDB: { chsDB },
    } = this.props;
    const {  refreshLoading, isActiveDate, firstLoading } = this.state;
    return (
      <div className={styles.totalResult}>
        <div className={styles.header}>
          <div className={styles.name}>1 x 2 双重机会</div>
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
              <Col className={styles['big-tb']} span={6}>赛事</Col>
              <Col className={styles['middle-tb']} span={5}>
                <Row className={styles['cell-th']}>
                  全场
                </Row>
                <Row>
                  <Col span={8} className={styles.cell}>主胜(1)</Col>
                  <Col span={8} className={styles.cell}>平局(1)</Col>
                  <Col span={8} className={styles.cell}>客胜(1)</Col>
                </Row>
              </Col>
              <Col className={styles['middle-tb']} span={5}>
                <Row className={styles['cell-th']}>
                  上半场
                </Row>
                <Row>
                  <Col span={8} className={styles.cell}>主胜(1)</Col>
                  <Col span={8} className={styles.cell}>平局(1)</Col>
                  <Col span={8} className={styles.cell}>客胜(1)</Col>
                </Row>
              </Col>
              <Col className={styles['middle-tb']} span={5}>
                <Row className={styles['cell-th']}>
                  双重机会
                </Row>
                <Row>
                  <Col span={8} className={styles.cell}>1X</Col>
                  <Col span={8} className={styles.cell}>12</Col>
                  <Col span={8} className={styles.cell}>X2</Col>
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
                                        <Col span={6} className={styles['match-team']}>
                                          <div>{v.homeName}</div>
                                          <div>{v.awayName}</div>
                                        </Col>
                                        <Col span={5} className={styles['match-odds']}>
                                          {
                                            v.odds && v.odds[0].chs.map((item) => (
                                                <Fragment key={item.dishId}>
                                                  {item.name === '1' && <div key={item.dishId}
                                                                             className={styles['match-odds-item']}
                                                  >
                                                    <span className={styles.odds}>
                                                      <DishLayout
                                                        choiceId={item.choiceId}
                                                        matchId={v.matchId}
                                                        dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                                        dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                                      />
                                                    </span>
                                                  </div>}
                                                  {item.name === 'X' &&
                                                  <div key={item.dishId} className={styles['match-odds-item']}>
                                                    <span className={styles.odds}>
                                                      <DishLayout
                                                        choiceId={item.choiceId}
                                                        matchId={v.matchId}
                                                        dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                                        dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                                      />
                                                    </span>
                                                  </div>}
                                                  {item.name === '2' &&
                                                  <div key={item.dishId} className={styles['match-odds-item']}>
                                                            <span className={styles.odds}>
                                                              <DishLayout
                                                                choiceId={item.choiceId}
                                                                matchId={v.matchId}
                                                                dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                                                dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                                              />
                                                            </span>
                                                  </div>}
                                                </Fragment>
                                              ),
                                            )
                                          }
                                        </Col>
                                        <Col span={5} className={styles['match-odds']}>
                                          {
                                            v.odds && v.odds[1].chs.map((item) => (
                                                <Fragment key={item.dishId}>
                                                  {item.name === '1' &&
                                                  <div key={item.dishId} className={styles['match-odds-item']}>
                                                           <span className={styles.odds}>
                                                              <DishLayout
                                                                choiceId={item.choiceId}
                                                                matchId={v.matchId}
                                                                dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                                                dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                                              />
                                                            </span>
                                                  </div>
                                                  }
                                                  {item.name === 'X' &&
                                                  <div key={item.dishId} className={styles['match-odds-item']}>
                                                          <span className={styles.odds}>
                                                            <DishLayout
                                                              choiceId={item.choiceId}
                                                              matchId={v.matchId}
                                                              dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                                              dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                                            />
                                                           </span>
                                                  </div>
                                                  }
                                                  {item.name === '2' && <div key={item.dishId}
                                                                             className={styles['match-odds-item']}
                                                  >
                                                          <span className={styles.odds}>
                                                            <DishLayout
                                                              choiceId={item.choiceId}
                                                              matchId={v.matchId}
                                                              dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                                              dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                                            />
                                                          </span>
                                                  </div>}
                                                </Fragment>
                                              ),
                                            )
                                          }
                                        </Col>
                                        <Col span={5} className={styles['match-odds']}>
                                          {
                                            v.odds && v.odds[2].chs.map((item) => (
                                                <Fragment key={item.dishId}>
                                                  {item.name === '1X' && <div key={item.dishId}
                                                                              className={styles['match-odds-item']}

                                                  >
                                                          <span className={styles.odds}>
                                                            <DishLayout
                                                              choiceId={item.choiceId}
                                                              matchId={v.matchId}
                                                              dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                                              dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                                            />
                                                          </span>
                                                  </div>}
                                                  {item.name === '12' &&
                                                  <div key={item.dishId} className={styles['match-odds-item']}>
                                                          <span className={styles.odds}>
                                                            <DishLayout
                                                              choiceId={item.choiceId}
                                                              matchId={v.matchId}
                                                              dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                                              dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                                            />
                                                          </span>
                                                  </div>}
                                                  {item.name === 'X2' &&
                                                  <div key={item.dishId} className={styles['match-odds-item']}>
                                                          <span
                                                            className={styles.odds}>
                                                            <DishLayout
                                                              choiceId={item.choiceId}
                                                              matchId={v.matchId}
                                                              dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                                              dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                                            />
                                                          </span>
                                                  </div>}
                                                </Fragment>
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

export default Double;
