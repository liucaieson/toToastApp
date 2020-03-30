import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './index.scss';
import { calcDate2, dishNameMap } from '../../../../../../utils/util';
import PageLoading from '../../../../../../components/MbPageLoading';
import { Icon } from 'antd';
import CountDown from '../../../../../../components/CountDown';
import BetDishItem from '../inPlayDeatilDishLayout';

@connect(({ chsDB,inPlay, loading }) => ({
  chsDB,
  inPlay,
  inPlayAllOddsLoading: loading.models.inPlayAllOdds,
}))
class ModalLayout extends PureComponent {
  state = {
    showOdds: [],
    firstLoading: true,
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
  }

  componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  /* 请求比赛所有玩法的赔率赔率 */
  fetchInPlayAllOdds = () => {
    const { matchId, dispatch } = this.props;
    console.log(matchId);
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
                      time='15'
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
                    </div> : <div className={styles['match-over']}>比赛结束</div>
                }
              </div>
              <div className={styles['all-odds']}>
                {
                  refreshLoading ?
                    <PageLoading/> : inPlayAllOdds && inPlayAllOdds[0] && inPlayAllOdds[0].odds && inPlayAllOdds[0].odds.map((val) => (
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
