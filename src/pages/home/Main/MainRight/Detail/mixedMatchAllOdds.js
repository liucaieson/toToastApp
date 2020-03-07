import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import CountDown from '../../../../../components/CountDown/index';
import { dishNameMap, calcDate2 } from '../../../../../utils/util';
import PageLoading from '../../../../../components/MbPageLoading/index';
import MixedDishItem from '../DishLayout/detailDishLayout/mixedDishItem'

@connect(({  matchAllOdds, betShopCart, chsDB, loading }) => ({
  matchAllOdds,
  betShopCart,
  chsDB,
  matchAllOddsLoading:loading.models.matchAllOdds,
}))
class Detail extends PureComponent {
  state = {
    showOdds: [],
    firstLoading: true
  };

  timer = null;
  competitionsParams = {};

  /* 存储全局的参数 */
  defaultParams = {
    sport: '1',
    gg: '1',
  };
  /* 存储全局的参数 */
  globalParams = {
    ...this.defaultParams,
  };

  componentDidMount() {
    const { dispatch , matchId } = this.props;
    dispatch({
      type: 'matchAllOdds/fetch',
      payload: { ...this.globalParams,match: matchId },
      callback: () => {
        this.setState({
          firstLoading: false,
        });
      },
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }


  /* 请求比赛所有玩法的赔率赔率 */
  fetchMatchAllOdds = () => {
    const {matchId} = this.props;
    const { dispatch } = this.props;
    dispatch({
      type: 'matchAllOdds/fetch',
      payload: {
        ...this.globalParams,
        match: matchId
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
    const { dispatch , matchId } = this.props;
    dispatch({
      type: 'matchAllOdds/fetch',
      payload: {
        ...this.globalParams,
        match: matchId
      },
      callback: () => {
        this.countRef.reset();
        this.setState({
          refreshLoading: false,
        });
      },
    });
  };

  /* 控制盘口显示隐藏 */
  showArea = (id) => {
    const { showOdds } = this.state;
    showOdds.push(id);
    const arr = showOdds.concat();
    this.setState({
      showArea: arr
    })
  };

  closeArea = (id) => {
    const { showOdds } = this.state;
    const index = showOdds.indexOf(id);
    showOdds.splice(index, 1);
    const arr = showOdds.concat();
    this.setState({
      showArea: arr
    })
  };

  render() {
    const {
      matchAllOdds: {
        matchAllOdds
      }
    } = this.props;
    const { refreshLoading, showOdds, firstLoading } = this.state;
    return (
      <div>
        {
          firstLoading ? <PageLoading/>  :
              <div className={styles['detail-box']}>
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
                    s
                   </span>
                </div>
                <div className={styles['match-info']}>
                  {
                    matchAllOdds[0] ? <div>
                      <div className={styles.time}>
                        {calcDate2(matchAllOdds[0].time)}
                      </div>
                      <div className={styles.team}>
                        <div className={styles['home-name']}>{matchAllOdds[0].homeName}</div>
                        <div className={styles.vs}>vs</div>
                        <div className={styles['away-name']}>{matchAllOdds[0].awayName}</div>
                      </div>
                    </div>: <div className={styles['match-over']}>比赛结束</div>
                  }
                </div>
                <div className={styles['all-odds']}>
                  {
                    matchAllOdds[0] && matchAllOdds[0].odds.map((val) => (
                      <div className={styles['odds-box']} key={val.oddId}>
                        <div className={styles['odds-name']}>
                          <div className={styles.name}>{val.oddName}</div>
                          {
                            showOdds.includes(val.oddId) ?
                              <div className={styles.arrow} onClick={() => this.closeArea(val.oddId)}>
                                <Icon type="caret-up" />
                              </div>:
                              <div className={styles.arrow} onClick={() => this.showArea(val.oddId)}>
                                <Icon type="caret-down" />
                              </div>
                          }
                        </div>
                        <div className={styles['odds-item']}>
                          {
                            showOdds.includes(val.oddId) ? '' :
                              <div className={styles['item-box']}>
                                {
                                  val.chs.map((item) => (
                                    <MixedDishItem
                                      matchId={matchAllOdds[0].matchId}
                                      gamblingId={val.gamblingId}
                                      choiceId={item.choiceId}
                                      dishId={item.dishId}
                                      dish={item.dish}
                                      name={item.name}
                                      choiceHandicap={item.choiceHandicap}
                                      key={item.choiceId}
                                    />
                                  ))
                                }
                              </div>
                          }
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>


        }

      </div>

    );
  }
}

export default Detail;
