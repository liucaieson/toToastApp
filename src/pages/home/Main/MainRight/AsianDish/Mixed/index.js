import React, { PureComponent, Fragment } from 'react';
import { Icon, Row, Col } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import CountDown from '../../../../../../components/CountDown/index';
import CompetitionsModal from '../../competitonsModal/index';
import { calcDateToMonthAndDay, dishNameMap } from '../../../../../../utils/util';
import PageLoading from '../../../../../../components/MbPageLoading';
import MixedDishLayout from '../../DishLayout/mixedDishLayout';
import DishLayout from '../../DishLayout/betDishLayout';

@connect(({ mixed, matchAllOdds, betShopCart, dates, chsDB, showCompetitions, competitions, loading }) => ({
  mixed,
  showCompetitions,
  competitions,
  matchAllOdds,
  betShopCart,
  dates,
  chsDB,
  mixedLoading: loading.models.mixed,
  matchAllOddsLoading: loading.models.matchAllOdds,
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

  addMixedShopCart = (matchId, gamblingId, choiceId, id) => {
    const { dispatch, betShopCart: { mixedShopCart }, addLoading } = this.props;
    if (addLoading) {
      return;
    }
    if (mixedShopCart.list[matchId] && mixedShopCart.list[matchId].choiceId === choiceId) {
      return false;
    } else {
      dispatch({
        type: 'changeBetSectionStatus/changeStatus',
        payload: [true, 'mixed'],
      });
      dispatch({
        type: 'betShopCart/addMixedShopCart',
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
      type: 'mixed/fetchMatchOdds',
      payload: params,
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
        type: 'mixed/fetchMatchOdds',
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
    dispatch({
      type: 'competitions/fetch',
      payload: {
        ...this.globalParams,
      },
    });
  };

  /* 获取倒计时组件的this */
  onCountDownRef = (ref) => {
    this.countRef = ref;
  };

  /* 刷新比赛赔率，实际重新请求比赛 */
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
      type: 'mixed/fetchMatchOdds',
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

  /* 请求比赛，携带联赛*/
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


  render() {
    const {
      mixed: {
        competitionsMatchList,
      },
      dates: { dates },
      chsDB: { chsDB },
      betShopCart: { mixedShopCart },
      competitions: { competitions },
      matchAllOdds: { matchAllOdds },
      mixedLoading,
      matchAllOddsLoading,
    } = this.props;
    const { isShowMatch, refreshLoading, isActiveDate, allMatchExpend, firstLoading } = this.state;
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
                                mixedLoading ? <PageLoading/> :
                                  competitionsMatchList &&
                                  (
                                    competitionsMatchList.length === 0 ? <div className="no-match">暂无比赛</div> :
                                      competitionsMatchList.map((v) => (
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
                                              <div className={styles.btn} onClick={() => this.turnToDetail(v.matchId)}>
                                                所有玩法<Icon style={{ marginLeft: '4px' }} type="double-right"/>
                                              </div>
                                            }

                                          </div>
                                        </Row>
                                      ))
                                  )
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

export default Mixed;
