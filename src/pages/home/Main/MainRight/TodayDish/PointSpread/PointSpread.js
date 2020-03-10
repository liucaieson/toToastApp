import React, { PureComponent, Fragment } from 'react';
import { Icon, Row, Col, Modal, Checkbox } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import styles from './index.scss';
import CountDown from '../../../../../../components/CountDown/index';
import CompetitionsModal from '../../competitonsModal/index';
import Item from './item';
import PageLoading from '../../../../../../components/MbPageLoading';

@connect(({ todayPointSpread, showCompetitions,changeBetSectionStatus, competitions, loading }) => ({
  todayPointSpread,
  showCompetitions,
  competitions,
  changeBetSectionStatus,
  pointSpreadLoading:loading.models.todayPointSpread,
}))
class TodayPointSpread extends PureComponent {
  state = {
    refreshLoading: false,
    firstLoading: true
  };

  timer = null;
  competitionsParams = {};

  /* 存储全局的参数 */
  globalParams = {
    sport: '1',
    gg: '1',
    date: moment().format('YYYY-MM-DD')
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'todayPointSpread/fetchMatchOdds',
      payload: {
        ...this.globalParams
      },
      callback: () => {
        this.setState({
          firstLoading: false
        })
      }
    });
  }

/*
  componentWillReceiveProps() { //Really important !!
    this.cache.clearAll(); //Clear the cache if row heights are recompute to be sure there are no "blank spaces" (some row are erased)
    this.virtualizedList && this.virtualizedList.recomputeRowHeights(); //We need to recompute the heights
  }
*/

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  setTimeFetchMatchList = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'competitions/fetch',
      payload: {
        ...this.globalParams
      },
    });
    this.fetchMatchOdds()
  };

  /* 请求比赛赔率 */
  fetchMatchOdds = (param) => {
    let params = {
      ...this.globalParams
    };
    if (param) {
      params = {
        ...params,
        ...param,
      };
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'todayPointSpread/fetchMatchOdds',
      payload: params,
    });
  };

  /* 展开比赛详细信息 */
  turnToMatchDetail = (match) => {
    this.setState({
      isShowMatchDetail: true,
      matchInfo: match
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

  /* 获取倒计时组件的this */
  onCountDownRef = (ref) => {
    this.countRef = ref;
  };

  refreshMatchOdds = () => {
    this.setState({
      refreshLoading: true,
    });
    let params = {
      ...this.globalParams
    };
    const {dispatch} = this.props;
    dispatch({
      type: 'competitions/fetch',
      payload: {
        ...this.globalParams
      },
    });
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

  fetchMatchOddsWithCompetitions = (param) => {
    const { dispatch } = this.props;
    if(param.competitions.length === 0){return}
    dispatch({
      type: 'competitions/toggle',
      payload: param.competitions,
      callback: () => {
        const ids = [];
        param.competitions.map((val) => {
          ids.push(val.competitionId)
        });
        const str = ids.join(',');
        this.fetchMatchOdds({competitions: str});
        /* 刷新倒计时的时间 */
        this.countRef.reset();
        this.globalParams = {
          ...this.globalParams,
          competitions: str
        }
      },
    });
  };

  turnToTodayMixed = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'togglePageWithGg/togglePage',
      payload: 't8'
    });
  };

  render() {
    const {
      todayPointSpread: {
        cptIds, matchListObj
      }
    } = this.props;
    const {  refreshLoading, firstLoading } = this.state;
    return (
      <div className={styles.pointSpread}>
        <div className={styles.header}>
          <div className={styles.name}>今日早盘(让球&大/小)</div>
          <div className={styles.refresh}>
            {
              refreshLoading ? <Icon className={styles.icon} type="loading"/>
                : <Icon className={styles.icon} onClick={this.refreshMatchOdds} type="sync" />
            }
            <span className={styles.time}>
              <CountDown
                onCountDownRef={this.onCountDownRef}
                time='60'
                onEnd={this.setTimeFetchMatchList} />
              s
            </span>
          </div>
          <div className={styles['competitions-select']} onClick={this.showCompetitionsModal}>选择联赛</div>
          <div className={styles.mixed} onClick={this.turnToTodayMixed}>混合过关</div>
        </div>
        <div>
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
              {firstLoading ? <PageLoading/>  :
                (
                  cptIds && cptIds.length === 0 ? <div className="no-match">暂无比赛</div> :
                    cptIds.map((val) => (
                      <Item  cptData={val} matchData={matchListObj[val]}/>
                    ))
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

export default TodayPointSpread;
