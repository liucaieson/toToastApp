import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './index.scss';
import { calcDate2 } from '@/utils/util';
import PageLoading from '@/components/MbPageLoading';
import { Icon } from 'antd';
import CountDown from '@/components/CountDown';
import BetDishItem from '../../DishLayout/detailDishLayout/betDishItem';
import Accordion from '@/components/Accordion';

@connect(({ chsDB, matchAllOdds, myFavGG, betShopCart, loading }) => ({
  chsDB,
  matchAllOdds,
  betShopCart,
  myFavGG,
  matchAllOddsLoading: loading.models.matchAllOdds,
}))
class ModalLayout extends PureComponent {
  state = {
    firstLoading: true,
  };

  timer = null;

  /* 存储全局的参数 */
  globalParams = {
    sport: '1',
    gg: '1',
  };

  componentDidMount() {
    const { dispatch, matchId } = this.props;
    dispatch({
      type: 'matchAllOdds/fetch',
      payload: { ...this.globalParams, match: matchId },
      callback: () => {
        this.setState({
          firstLoading: false,
        });
      },
    });
  }

  componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  /* 请求比赛所有玩法的赔率赔率 */
  fetchMatchAllOdds = () => {
    const { matchId, dispatch } = this.props;
    dispatch({
      type: 'matchAllOdds/fetch',
      payload: {
        ...this.globalParams,
        match: matchId,
      },
    });
  };

  setTimeFetchMatchList = () => {
    this.fetchMatchAllOdds();
  };

  /* 获取倒计时组件的this */
  onCountDownRef = (ref) => {
    this.countRef = ref;
  };

  refreshMatchOdds = () => {
    this.setState({
      refreshLoading: true,
    });
    const { dispatch, matchId } = this.props;
    dispatch({
      type: 'matchAllOdds/fetch',
      payload: {
        ...this.globalParams,
        match: matchId,
      },
      callback: () => {
        this.countRef.reset();
        this.setState({
          refreshLoading: false,
        });
      },
    });
  };

  addMyFav = (ggId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'myFavGG/add',
      payload: ggId,
    });
  };

  removeMyFav = (ggId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'myFavGG/del',
      payload: ggId,
    });
  };

  render() {
    const {
      chsDB: { chsDB },
      matchAllOdds: { matchAllOdds },
      myFavGG: { myFavGG },
    } = this.props;
    const { refreshLoading, firstLoading } = this.state;
    return (
      <div className={styles.modalLayout}>
        {
          firstLoading ? <PageLoading/> :
            <div className={styles['detail-box']}>
              <div className={styles.refresh}>
                {
                  refreshLoading ? <Icon className={styles.icon} type="loading"/>
                    : <Icon className={styles.icon} onClick={this.refreshMatchOdds} type="sync"/>
                }
                <span className={styles.time}>
                   <CountDown
                     onCountDownRef={this.onCountDownRef}
                     time="60"
                     onEnd={this.setTimeFetchMatchList}/>
                   s
                  </span>
              </div>
              <div className={styles['match-info']}>
                {
                  matchAllOdds[0] ?
                    <div>
                      <div className={styles.time}>
                        {calcDate2(matchAllOdds[0].time)}
                      </div>
                      <div className={styles.team}>
                        <div className={styles['home-name']}>{matchAllOdds[0].homeName}</div>
                        <div className={styles.vs}>vs</div>
                        <div className={styles['away-name']}>{matchAllOdds[0].awayName}</div>
                      </div>
                    </div> : <div className={styles['match-over']}>比赛结束</div>
                }
              </div>
              {
                refreshLoading ?
                  <PageLoading/> :
                  <div className={styles['all-odds']}>
                    <Accordion
                      cptName="我的盘口"
                      style={
                        { lineHeight: '32px', fontSize: '14px', backgroundColor: '#533E33' }
                      }
                    >
                      {
                        myFavGG.length === 0 ?
                          <div className={styles['my-tips']}>
                            点击<Icon type="star" className={styles.icon} theme="filled"/>图标添加您喜欢的玩法
                          </div>
                          :
                          matchAllOdds && matchAllOdds[0] && matchAllOdds[0].odds.map((val) => (
                            myFavGG.includes(val.oddId) &&
                            <div className={styles['odds-box']} key={val.oddId}>
                              <div className={styles['odds-name']}>
                                <div className={styles.name}>{val.oddName}</div>
                                <div className={styles.inFav}>
                                  <Icon
                                    type="star"
                                    className={styles.icon}
                                    theme="filled"
                                    onClick={() => this.removeMyFav(val.oddId)}
                                  />
                                </div>
                              </div>
                              <div className={styles['odds-item']}>
                                <div className={styles['item-box']}>
                                  {
                                    val.chs.map((item) => (
                                      <BetDishItem
                                        matchId={matchAllOdds[0].matchId}
                                        gamblingId={val.gamblingId}
                                        choiceId={item.choiceId}
                                        dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                        dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                        name={item.name}
                                        choiceHandicap={item.choiceHandicap}
                                        key={item.choiceId}
                                      />
                                    ))
                                  }
                                </div>
                              </div>
                            </div>
                          ))
                      }
                    </Accordion>
                    <Accordion
                      cptName="比赛盘口"
                      style={
                        { lineHeight: '32px', fontSize: '14px', backgroundColor: '#533E33' }
                      }
                    >
                      {
                        matchAllOdds && matchAllOdds[0] && matchAllOdds[0].odds.map((val) => (
                          !myFavGG.includes(val.oddId) &&
                          <div className={styles['odds-box']} key={val.oddId}>
                            <div className={styles['odds-name']}>
                              <div className={styles.name}>{val.oddName}</div>
                              <div className={styles.fav}>
                                <Icon
                                  type="star"
                                  className={styles.icon}
                                  theme="filled"
                                  onClick={() => this.addMyFav(val.oddId)}
                                />
                              </div>
                            </div>
                            <div className={styles['odds-item']}>
                              <div className={styles['item-box']}>
                                {
                                  val.chs.map((item) => (
                                    <BetDishItem
                                      matchId={matchAllOdds[0].matchId}
                                      gamblingId={val.gamblingId}
                                      choiceId={item.choiceId}
                                      dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                      dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                      name={item.name}
                                      choiceHandicap={item.choiceHandicap}
                                      key={item.choiceId}
                                    />
                                  ))
                                }
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </Accordion>
                  </div>
              }
            </div>
        }
      </div>
    );
  }
}

export default ModalLayout;
