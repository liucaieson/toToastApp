import React, { PureComponent, Fragment } from 'react';
import { Icon, Row, Col, Modal } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import CountDown from '../../../../../../components/CountDown/index';
import CompetitionsModal from '../../competitonsModal/index';
import { calcDateToMonthAndDay, dishNameMap } from '../../../../../../utils/util';
import PageLoading from '../../../../../../components/MbPageLoading';
import MixedDishLayout from '../../DishLayout/mixedDishLayout';
import DishLayout from '../../DishLayout/betDishLayout';
import PaginationBox from '../../../../../../components/PaginationBox';
import MixModalLayout from '../../DishLayout/mixedModalLayout';

@connect(({ asianGG,  betShopCart, dates, chsDB, showCompetitions, competitions, loading }) => ({
  asianGG,
  showCompetitions,
  competitions,
  dates,
  chsDB,
  loading: loading.effects['asianGG/fetchMatchOdds'],
  addLoading: loading.effects['betShopCart/addMixedShopCart'],
}))
class Mixed extends PureComponent {
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
  globalParams = {
    sport: '1',
    gg: '8',
    page:1
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

  /* 跳转到单程比赛所有盘口玩法赔率页面 ，
  * pageId为标识要跳的页面为mixDetail（混合过关比赛详情玩法）
  * id为matchId页面初始化请求
   */
  turnToDetail = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'togglePageWithGg/turnToDetail',
      payload: {
        pageId: 'mixedDetail',
        matchId: id,
      },
    });
  };

  /* 请求比赛所有玩法的赔率赔率，参数比赛id */
  /* 请求比赛所有玩法的赔率赔率，参数比赛id */
  fetchMatchAllOdds = (matchId) => {
    this.setState({
      isShow: true,
      matchId
    });
  };

  closeModal = () => {
    this.setState({
      isShow: false
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
    const { isShow, refreshLoading, isActiveDate, matchId, firstLoading } = this.state;
    return (
      <div className={styles.mixed}>
        <div className={styles.header}>
          <div className={styles.name}>混合过关</div>
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
              <Col className={styles['big-tb']} span={2}>时间</Col>
              <Col className={styles['big-tb']} span={6}>赛事</Col>
              <Col className={styles['middle-tb']} span={8}>
                <Row className={styles['cell-th']}>
                  全场
                </Row>
                <Row>
                  <Col span={8} className={styles.cell}>让球</Col>
                  <Col span={8} className={styles.cell}>大/小</Col>
                  <Col span={8} className={styles.cell}>独赢</Col>
                </Row>
              </Col>
              <Col className={styles['middle-tb']} span={8}>
                <Row className={styles['cell-th']}>
                  上半场
                </Row>
                <Row>
                  <Col span={8} className={styles.cell}>让球</Col>
                  <Col span={8} className={styles.cell}>大/小</Col>
                  <Col span={8} className={styles.cell}>独赢</Col>
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
                                        <Col span={2} className={styles['match-time']}>
                                          {calcDateToMonthAndDay(v.time)}
                                        </Col>
                                        <Col span={6} className={styles['match-team']}>
                                          <div>{v.homeName}</div>
                                          <div>{v.awayName}</div>
                                          <div>和局</div>
                                        </Col>
                                        {/*全场投注区*/}
                                        <Col span={8} className={styles['match-odds']}>
                                          <Row>
                                            <Col span={8} className={styles['match-odds-list']}>
                                              {
                                                v.odds[0].chs.map((item) => (
                                                    <Fragment key={item.dishId}>
                                                      {item.name === '1' && <div className={styles['home-item']}>
                                                        <span className={styles.handicap}>{item.choiceHandicap}</span>
                                                        <span className={styles.odds}>
                                                              <MixedDishLayout
                                                                choiceId={item.choiceId}
                                                                matchId={v.matchId}
                                                                dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                                                dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                                              />
                                                           </span>
                                                      </div>}
                                                      {item.name === '2' && <div className={styles['away-item']}>
                                                        <span className={styles.handicap}>{item.choiceHandicap}</span>
                                                        <span className={styles.odds}>
                                                               <MixedDishLayout
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
                                            <Col span={8} className={styles['match-odds-list']}>
                                              {
                                                v.odds[1] && v.odds[1].chs.map((item) => (
                                                    <Fragment key={item.dishId}>
                                                      {item.name === 'Over' && <div className={styles['home-item']}>
                                                        <span className={styles.handicap}>{item.choiceHandicap}</span>
                                                        <span className={styles.odds}>
                                                              <MixedDishLayout
                                                                choiceId={item.choiceId}
                                                                matchId={v.matchId}
                                                                dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                                                dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                                              />
                                                            </span>
                                                      </div>}
                                                      {item.name === 'Under' && <div className={styles['away-item']}>
                                                        <span className={styles.handicap}>{item.choiceHandicap}</span>
                                                        <span className={styles.odds}>
                                                               <MixedDishLayout
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
                                            <Col span={8} className={styles['match-odds-list']}>
                                              {
                                                v.odds[2] && v.odds[2].chs.map((item) => (
                                                    <Fragment key={item.dishId}>
                                                      {item.name === '1' && <div className={styles['home-item']}>
                                                        <span className={styles.handicap}>{item.choiceHandicap}</span>
                                                        <span className={styles.odds}>
                                                               <MixedDishLayout
                                                                 choiceId={item.choiceId}
                                                                 matchId={v.matchId}
                                                                 dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                                                 dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                                               />
                                                            </span>
                                                      </div>}
                                                      {item.name === '2' && <div className={styles['away-item']}>
                                                        <span className={styles.handicap}>{item.choiceHandicap}</span>
                                                        <span className={styles.odds}>
                                                               <MixedDishLayout
                                                                 choiceId={item.choiceId}
                                                                 matchId={v.matchId}
                                                                 dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                                                 dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                                               />
                                                            </span>
                                                      </div>}
                                                      {item.name === 'X' && <div className={styles['pie-item']}>
                                                        <span className={styles.handicap}>{item.choiceHandicap}</span>
                                                        <span className={styles.odds}>
                                                              <MixedDishLayout
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
                                        </Col>
                                        {/* 上半场投注区*/}
                                        <Col span={8} className={styles['match-odds']}>
                                          <Row>
                                            <Col span={8} className={styles['match-odds-list']}>
                                              {
                                                v.odds[3] && v.odds[3].chs.map((item) => (
                                                    <Fragment key={item.dishId}>
                                                      {item.name === '1' && <div className={styles['home-item']}>
                                                        <span className={styles.handicap}>{item.choiceHandicap}</span>
                                                        <span className={styles.odds}>
                                                               <MixedDishLayout
                                                                 choiceId={item.choiceId}
                                                                 matchId={v.matchId}
                                                                 dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                                                 dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                                               />
                                                              </span>
                                                      </div>}
                                                      {item.name === '2' && <div className={styles['away-item']}>
                                                        <span className={styles.handicap}>{item.choiceHandicap}</span>
                                                        <span className={styles.odds}>
                                                               <MixedDishLayout
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
                                            <Col span={8} className={styles['match-odds-list']}>
                                              {
                                                v.odds[4] && v.odds[4].chs.map((item) => (
                                                    <Fragment key={item.dishId}>
                                                      {item.name === 'Over' && <div className={styles['home-item']}>
                                                        <span className={styles.handicap}>{item.choiceHandicap}</span>
                                                        <span className={styles.odds}>
                                                               <MixedDishLayout
                                                                 choiceId={item.choiceId}
                                                                 matchId={v.matchId}
                                                                 dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                                                 dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                                               />
                                                            </span>
                                                      </div>}
                                                      {item.name === 'Under' && <div className={styles['away-item']}>
                                                        <span className={styles.handicap}>{item.choiceHandicap}</span>
                                                        <span className={styles.odds}>
                                                               <MixedDishLayout
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
                                            <Col span={8} className={styles['match-odds-list']}>
                                              {
                                                v.odds[5] && v.odds[5].chs.map((item) => (
                                                    <Fragment key={item.dishId}>
                                                      {item.name === '1' && <div className={styles['home-item']}>
                                                        <span className={styles.handicap}>{item.choiceHandicap}</span>
                                                        <span className={styles.odds}>
                                                               <MixedDishLayout
                                                                 choiceId={item.choiceId}
                                                                 matchId={v.matchId}
                                                                 dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                                                 dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                                               />
                                                            </span>
                                                      </div>}
                                                      {item.name === '2' && <div className={styles['away-item']}>
                                                        <span className={styles.handicap}>{item.choiceHandicap}</span>
                                                        <span className={styles.odds}>
                                                               <MixedDishLayout
                                                                 choiceId={item.choiceId}
                                                                 matchId={v.matchId}
                                                                 dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                                                 dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                                               />
                                                            </span>
                                                      </div>}
                                                      {item.name === 'X' && <div className={styles['pie-item']}>
                                                        <span className={styles.handicap}>{item.choiceHandicap}</span>
                                                        <span className={styles.odds}>
                                                               <MixedDishLayout
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
                                        </Col>
                                      </Row>
                                      <div className={styles['play-btn']}>
                                        {
                                          /*  allMatchExpend === v.matchId ?
                                              <Fragment>
                                                <div className={styles.btn} onClick={this.collapseMatchAllOdds}>
                                                  收起
                                                </div>
                                                <div className={styles['all-odds-box']}>
                                                  {
                                                    matchAllOddsLoading ? <div className={styles.loading}>loading...</div> :
                                                    matchAllOdds[0] && matchAllOdds[0].odds.map( (oddsItem) => (
                                                      <div className={styles['single-odds']} key={oddsItem.gamblingId}>
                                                        <div className={styles.oddsName}>
                                                          { oddsItem.oddName }
                                                        </div>
                                                        <div className={styles.oddsDish}>
                                                          {
                                                            oddsItem.chs.map((chsItem) => (
                                                              <div key={chsItem.choiceId} className={styles['dish-box']}>
                                                                <div className={styles.dishName}>{dishNameMap[chsItem.name]}<span className={styles.choicehandicap}>{chsItem.choiceHandicap && `(${chsItem.choiceHandicap})`}</span></div>
                                                                <div
                                                                  className={(mixedShopCart.list[chsItem.matchId] && mixedShopCart.list[chsItem.matchId].choiceId === chsItem.choiceId)  ? `${styles.dish} ${styles.active}` : styles.dish}
                                                                  onClick={() => this.addMixedShopCart( v.matchId, oddsItem.gamblingId, chsItem.choiceId, chsItem.dishId)}
                                                                >{chsItem.dish}</div>
                                                              </div>
                                                            ))
                                                          }
                                                        </div>
                                                      </div>
                                                    ))
                                                  }
                                                </div>
                                              </Fragment>
                                              :*/
                                          <div className={styles.btn} onClick={() => this.fetchMatchAllOdds(v.matchId)}>
                                            所有玩法<Icon style={{ marginLeft: '4px' }} type="double-right"/>
                                          </div>
                                        }

                                      </div>
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
                  )}
            </div>
          </div>
        </div>
        <Modal
          title='比赛'
          visible={isShow}
          onCancel={this.closeModal}
          width={700}
          footer={null}
          maskClosable={false}
          destroyOnClose
          getContainer={() => document.getElementById('mainRightBox')}
          bodyStyle={{
            height: '600px',
            color:'white',
            padding:'2px 4px'
          }}
        >
          {
            isShow ?
              <MixModalLayout matchId={matchId} />
              : ''
          }
        </Modal>
        <CompetitionsModal params={this.globalParams} fn={this.fetchMatchOddsWithCompetitions}/>
      </div>
    );
  }
}

export default Mixed;
