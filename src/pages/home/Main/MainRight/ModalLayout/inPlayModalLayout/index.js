import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import styles from './index.scss';
import { calcDate2 } from '@/utils/util';
import PageLoading from '@/components/MbPageLoading';
import CountDown from '@/components/CountDown';
import BetDishItem from '../../DishLayout/inPlayDeatilDishLayout';

@connect(({ chsDB, inPlay, loading }) => ({
  chsDB,
  inPlay,
  inPlayAllOddsLoading: loading.models.inPlayAllOdds,
}))
class ModalLayout extends PureComponent {
  state = {
    firstLoading: true,
    prevPeriod: '0:00',
    calcPeriod: '0:00',
  };


  timer = null;

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
    const { dispatch, matchId } = this.props;
    dispatch({
      type: 'inPlay/fetchMatchAllOdds',
      payload: { ...this.globalParams, match: matchId },
      callback: () => {
        this.setState({
          firstLoading: false,
        });
      },
    });

    this.timer = setInterval(() => {
      const { prevPeriod } = this.state;
      let minute = prevPeriod.split(':')[0];
      let second = prevPeriod.split(':')[1];
      if (minute === '45') {
        this.setState({
          prevPeriod: '45:00'
        })
      } else if (minute === '90') {
        this.setState({
          prevPeriod: '90:00'
        })
      } else {
        second = +second + 1;
        if (second >= 59) {
          minute = +minute + 1;
          second = 0
        }
        const newPeriod = `${minute}:${second.toString().padStart(2, '0')}`;
        this.setState({
          prevPeriod: newPeriod
        })
      }
    }, 1000)
  }

  static getDerivedStateFromProps (props, state) {
    if (props.inPlay.inPlayAllOdds &&
      props.inPlay.inPlayAllOdds[0] &&
      props.inPlay.inPlayAllOdds[0].period !== state.calcPeriod
    ) {
      return {
        prevPeriod: props.inPlay.inPlayAllOdds[0].period,
        calcPeriod: props.inPlay.inPlayAllOdds[0].period
      }
    }
    return null
  }

  componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  /* 请求比赛所有玩法的赔率赔率 */
  fetchInPlayAllOdds = () => {
    const { matchId, dispatch } = this.props;
    dispatch({
      type: 'inPlay/fetchMatchAllOdds',
      payload: {
        ...this.globalParams,
        match: matchId,
      },
    });
  };

  setTimeFetchMatchList = () => {
    this.fetchInPlayAllOdds();
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
      type: 'inPlay/fetchMatchAllOdds',
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
      inPlay: {
        inPlayAllOdds,
      },
    } = this.props;
    const { refreshLoading, firstLoading, prevPeriod } = this.state;
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
                      time="15"
                      onEnd={this.setTimeFetchMatchList}/>
                    s
                   </span>
              </div>
              <div className={styles['match-info']}>
                {
                  inPlayAllOdds && inPlayAllOdds[0] ?
                    <div>
                      <div className={styles.time}>
                        {calcDate2(inPlayAllOdds[0].time)}
                      </div>
                      <div className={styles.team}>
                        <div className={styles['home-name']}>{inPlayAllOdds[0].homeName}</div>
                        <div className={styles.vs}>vs</div>
                        <div className={styles['away-name']}>{inPlayAllOdds[0].awayName}</div>
                      </div>
                      <div className={styles.period}>
                        <div className={styles.interval}>
                          <Icon type="clock-circle" className={styles.icon} />
                        {
                          inPlayAllOdds[0].goOnFlag === 0 ? inPlayAllOdds[0].period : prevPeriod
                        }
                        </div>
                      </div>
                    </div>
                    :
                    <div className={styles['match-over']}>比赛结束</div>
                }
              </div>
              <div className={styles['all-odds']}>
                {
                  refreshLoading ?
                    <PageLoading/> :
                    inPlayAllOdds &&
                    inPlayAllOdds[0] &&
                    inPlayAllOdds[0].odds &&
                    inPlayAllOdds[0].odds.map((val) => (
                    <div className={styles['odds-box']} key={val.oddId}>
                      <div className={styles['odds-name']}>
                        <div className={styles.name}>{val.oddName}</div>
                      </div>
                      <div className={styles['odds-item']}>
                        <div className={styles['item-box']}>
                          {
                            val.chs.map((item) => (
                              <BetDishItem
                                matchId={inPlayAllOdds[0].matchId}
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
