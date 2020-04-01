import React, { PureComponent, Fragment } from 'react';
import { Icon, Row, Col, Modal, Checkbox } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import styles from './index.scss';
import CountDown from '../../../../../../components/CountDown/index';
import CompetitionsModal from '../../competitonsModal/index';
import Item from './item';
import PageLoading from '../../../../../../components/MbPageLoading';
import PaginationBox from '../../../../../../components/PaginationBox';

@connect(({ asianGG, showCompetitions,changeBetSectionStatus, competitions, loading }) => ({
  asianGG,
  showCompetitions,
  competitions,
  changeBetSectionStatus,
  loading:loading.models.asianGG,
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
    page:1,
    date: moment().format('YYYY-MM-DD')
  };

  componentDidMount() {
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

  /* 给请求联赛的函数
   * 回调函数为，请求联赛之后拿第一个联赛id去请求该联赛的比赛
   * 设置show的match（实际上是应该展示的联赛）
   * 保存全局参数
    * */
  fetchMatchOddsWithCompetitions = (param) => {
    if (param === undefined) {
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

  nextPage = (page) => {
    const { loading } = this.props;
    if (loading) {
      return;
    }
    this.fetchMatchOdds({ page, size: 40 }, (result) => {
      const { current } = result;
      this.globalParams = {
        ...this.globalParams,
        page: current
      };

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
      asianGG: {
        cptIds, matchListObj, count, current,
      },
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
                  <div>
                    {
                      cptIds && cptIds.length === 0 ? <div className="no-match">暂无比赛</div> :
                        cptIds.map((val) => (
                          <Item cptData={val} matchData={matchListObj[val]}/>
                        ))
                    }
                    <PaginationBox total={count} current={current} pageSize={40} onChange={this.nextPage}/>
                  </div>
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
