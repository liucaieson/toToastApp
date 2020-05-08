import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './index.scss';
import { calcDate2 } from '@/utils/util';
import PageLoading from '@/components/MbPageLoading';
import { Icon } from 'antd';
import CountDown from '@/components/CountDown';
import MixedDishItem from '../detailDishLayout/mixedDishItem';

@connect(({ chsDB, matchAllOdds, betShopCart, loading }) => ({
  chsDB,
  matchAllOdds,
  betShopCart,
  matchAllOddsLoading: loading.models.matchAllOdds,
}))
class ModalLayout extends PureComponent {
  state = {
    showOdds: [],
    firstLoading: true,
  };

  timer = null;
  competitionsParams = {};

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


  render() {
    const {
      chsDB: { chsDB },
      matchAllOdds: { matchAllOdds },
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
                      time='60'
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
              <div className={styles['all-odds']}>
                {
                  refreshLoading ?
                    <PageLoading/> : matchAllOdds && matchAllOdds[0] && matchAllOdds[0].odds.map((val) => (
                    <div className={styles['odds-box']} key={val.oddId}>
                      <div className={styles['odds-name']}>
                        <div className={styles.name}>{val.oddName}</div>
                      </div>
                      <div className={styles['odds-item']}>
                        <div className={styles['item-box']}>
                          {
                            val.chs.map((item) => (
                              <MixedDishItem
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
              </div>
            </div>

        }
      </div>
    );
  }
}

export default ModalLayout;
