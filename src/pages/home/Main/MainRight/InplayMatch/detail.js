import React, { PureComponent } from 'react';
import { Icon} from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import CountDown from '../../../../../components/CountDown/index';
import { calcDate2 } from '../../../../../utils/util';
import PageLoading from '../../../../../components/MbPageLoading';
import DetailDishItem from './detailDishItem';

@connect(({ inPlay, chsDB, loading }) => ({
  inPlay,
  chsDB,
  oddsLoading:loading.effects['inPlay/fetchAllMatchOdds']
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
      type: 'inPlay/fetchMatchAllOdds',
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
    const { matchId } = this.props;
    const { dispatch } = this.props;
    dispatch({
      type: 'inPlay/fetchMatchAllOdds',
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
      type: 'inPlay/fetchMatchOdds',
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

  goBack = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'togglePageWithGg/togglePage',
      payload: 'inPlay',
    });
  };

  render() {
    const {
      inPlay: {
        inPlayAllOdds,
      },
      chsDB:{chsDB}
    } = this.props;
    const { refreshLoading, showOdds, firstLoading } = this.state;
    return (
      <div className={styles.round}>
        {
          firstLoading ? <PageLoading/>  :
            <div>
            <div className={styles.header}>
              <div className={styles.back} onClick={this.goBack}><Icon type="left-circle" /></div>
              <div className={styles.name}>滚球--<span className={styles.home}>{inPlayAllOdds&& inPlayAllOdds[0] && inPlayAllOdds[0].homeName}</span>
                VS<span className={styles.away}>{inPlayAllOdds && inPlayAllOdds[0] && inPlayAllOdds[0].awayName}</span></div>
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
            </div>
            <div>
              <div className={styles['detail-box']}>
                <div className={styles['match-info']}>
                  {
                    inPlayAllOdds && inPlayAllOdds[0] ? <div>
                      <div className={styles.time}>
                        {calcDate2(inPlayAllOdds[0].time)}
                      </div>
                      <div className={styles.team}>
                        <div className={styles['home-name']}>{inPlayAllOdds[0].homeName}</div>
                        <div className={styles.vs}>{inPlayAllOdds[0].soccer}</div>
                        <div className={styles['away-name']}>{inPlayAllOdds[0].awayName}</div>
                      </div>
                      <div className={styles.inRound}>
                        <span className={styles.left}><Icon type="clock-circle" /><span className={styles.text}>滚球</span></span>
                        <span className={styles.period}>进行中-{inPlayAllOdds[0].period}'</span>
                      </div>
                    </div> : <div className={styles['match-over']}>比赛结束</div>
                  }
                </div>
                <div className={styles['all-odds']}>
                  {
                    inPlayAllOdds && inPlayAllOdds[0] && inPlayAllOdds[0].odds.map((val) => (
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
                                    <DetailDishItem
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
                          }
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>

            </div>
          </div>
        }
      </div>

    );
  }
}

export default Detail;
