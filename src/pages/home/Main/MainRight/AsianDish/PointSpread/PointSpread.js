import React, { PureComponent, Fragment } from 'react';
import { Icon, Row, Col, Modal } from 'antd';
import { connect } from 'dva';
import styles from './pointSpread.scss';
import CountDown from '../../../../../../components/CountDown/index';
import CompetitionsModal from '../../competitonsModal/index';
import PageLoading from '../../../../../../components/MbPageLoading';
import { calcDateToMonthAndDay } from '../../../../../../utils/util';
import DishLayout from '../../DishLayout/betDishLayout';
import PaginationBox from '../../../../../../components/PaginationBox';
import ModalLayout from '../../DishLayout/modalLayout';

@connect(({ asianGG, dates, chsDB, showCompetitions, changeBetSectionStatus, loading }) => ({
  asianGG,
  showCompetitions,
  dates,
  chsDB,
  changeBetSectionStatus,
  loading: loading.models.asianGG,
  matchAllOddsLoading: loading.models.matchAllOdds,
}))
class Main extends PureComponent {
  state = {
    refreshLoading: false,
    isActiveDate: '',
    firstLoading: true,
    page:1,
    isShow: false,
    showOdds: []
  };

  timer = null;
  competitionsParams = {};

  /* 存储全局的参数 */
  defaultParams = {
    sport: '1',
    gg: '1',
    page:1
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

  componentWillUnmount() {
    clearInterval(this.timer);
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

  /* 全局展示显示联赛的modal  */
  showCompetitionsModal = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'showCompetitions/toggle',
      payload: true,
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
      type: 'asianGG/fetchMatchOdds',
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



  /*跳转到混合过关*/
  turnToAsianMixed = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'togglePageWithGg/togglePage',
      payload: '8',
    });
  };



  /* 跳转到单程比赛所有盘口玩法赔率页面 ，
  * pageId为标识要跳的页面为detail（比赛详情玩法）
  * id为matchId页面初始化请求
   */
  /* 请求比赛所有玩法的赔率赔率，参数比赛id */
  openMatchAllOdds = (matchId) => {
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

  /* 控制联赛显示隐藏, 包含id的隐藏 */

  toggleCpt = (id) => {
    const { showOdds } = this.state;
    const index = showOdds.indexOf(id);
    if( index > -1 ){
      showOdds.splice(index, 1);
      const arr = showOdds.concat();
      this.setState({
        showOdds: arr,
      });
    }else{
      showOdds.push(id);
      const arr = showOdds.concat();
      this.setState({
        showOdds: arr,
      });
    }
  };

  render() {
    const {
      asianGG: {
        cptIds, matchListObj, count, current
      },
      dates: { dates },
      chsDB: { chsDB },
    } = this.props;
    const { refreshLoading, isActiveDate, firstLoading, isShow, matchId, showOdds } = this.state;
    return (
      <div className={styles.pointSpread}>
        <div className={styles.header}>
          <div className={styles.name}>早盘(让球&大/小)</div>
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
            >全部
            </Col>
            {
              dates.map((val) => (
                <Col
                  className={isActiveDate === val.id ? styles.item + ' ' + styles.active : styles.item}
                  key={val.id}
                  span={3}
                  onClick={() => this.fetchMatchOddsWithDate({ date: val.id })}>
                  {val.text}
                </Col>),
              )
            }
          </Row>
          <div className={styles['match-box']}>
            <Row className={styles.table}>
              <Col className={styles['big-tb']} span={3}>时间</Col>
              <Col className={styles['big-tb']} span={5}>赛事</Col>
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
                  (<div>
                      {
                        cptIds.map((val) => (
                          <div className={styles['match-info']} key={val}>

                            <Row className={styles['competitions-name']} onClick={() => this.toggleCpt(val)} >
                              <Col span={1} className={styles.arrow}>
                                {
                                  showOdds.includes(val) ?
                                    <div className={styles.arrow} >
                                      <Icon type="down"/>
                                    </div> :
                                    <div className={styles.arrow}>
                                      <Icon type="up"/>
                                    </div>
                                }
                              </Col>
                              <Col span={20} className={styles.name}>
                                {matchListObj[val][0].cptName}
                              </Col>
                            </Row>
                            {
                              showOdds.includes(val) ? '' :
                              matchListObj && (
                                matchListObj[val].map((v) => (
                                  <Row className={styles['match-line-box']} key={v.matchId}>
                                    <Row className={styles['match-line']}>
                                      <Col span={3} className={styles['match-time']}>
                                        {calcDateToMonthAndDay(v.time)}
                                      </Col>
                                      <Col span={5} className={styles['match-team']}>
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
                                                              <DishLayout
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
                                          <Col span={8} className={styles['match-odds-list']}>
                                            {
                                              v.odds[1] && v.odds[1].chs.map((item) => (
                                                  <Fragment key={item.dishId}>
                                                    {item.name === 'Over' && <div className={styles['home-item']}>
                                                      <span className={styles.handicap}>{item.choiceHandicap}</span>
                                                      <span className={styles.odds}>
                                                              <DishLayout
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
                                          <Col span={8} className={styles['match-odds-list']}>
                                            {
                                              v.odds[2] && v.odds[2].chs.map((item) => (
                                                  <Fragment key={item.dishId}>
                                                    {item.name === '1' && <div className={styles['home-item']}>
                                                      <span className={styles.handicap}>{item.choiceHandicap}</span>
                                                      <span className={styles.odds}>
                                                              <DishLayout
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
                                                              <DishLayout
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
                                                              <DishLayout
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
                                          <Col span={8} className={styles['match-odds-list']}>
                                            {
                                              v.odds[4] && v.odds[4].chs.map((item) => (
                                                  <Fragment key={item.dishId}>
                                                    {item.name === 'Over' && <div className={styles['home-item']}>
                                                      <span className={styles.handicap}>{item.choiceHandicap}</span>
                                                      <span className={styles.odds}>
                                                              <DishLayout
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
                                          <Col span={8} className={styles['match-odds-list']}>
                                            {
                                              v.odds[5] && v.odds[5].chs.map((item) => (
                                                  <Fragment key={item.dishId}>
                                                    {item.name === '1' && <div className={styles['home-item']}>
                                                      <span className={styles.handicap}>{item.choiceHandicap}</span>
                                                      <span className={styles.odds}>
                                                              <DishLayout
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
                                                              <DishLayout
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
                                      </Col>
                                    </Row>
                                    <div className={styles['play-btn']}>
                                      {/*allMatchExpend === v.matchId ?
                                  <Fragment>
                                    <div className={styles.btn} onClick={this.collapseMatchAllOdds}>
                                      收起
                                    </div>
                                    <div className={styles['all-odds-box']}>
                                      {
                                        matchAllOddsLoading ? <PageLoading /> :
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
                                                        className={shopCart.ids.includes(chsItem.choiceId) ? `${styles.dish} ${styles.active}` : styles.dish}
                                                        onClick={() => this.addShopCart( v.matchId, oddsItem.gamblingId, chsItem.choiceId, chsItem.dishId)}
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
                                        <div className={styles.btn} onClick={() => this.openMatchAllOdds(v.matchId)}>
                                          所有玩法<Icon style={{ marginLeft: '4px' }} type="double-right"/>
                                        </div>
                                      }

                                    </div>
                                  </Row>
                                ))
                              )
                            }

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
        <Modal
          title={'比赛'}
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
            isShow ? <ModalLayout matchId={matchId}/>

              : ''
          }
        </Modal>
        <CompetitionsModal params={this.defaultParams} fn={this.fetchMatchOddsWithCompetitions}/>
      </div>

    );
  }
}

export default Main;
