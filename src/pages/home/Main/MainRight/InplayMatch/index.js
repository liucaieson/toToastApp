import React, { PureComponent, Fragment } from 'react';
import { Icon, Row, Col, Modal, Checkbox } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import CountDown from '../../../../../components/CountDown/index';
import { dishNameMap } from '../../../../../utils/util';
import PageLoading from '../../../../../components/MbPageLoading';
import Item from './cptItem'

@connect(({ inPlay,inPlayFavorite, betShopCart, chsDB, showCompetitions, competitions, loading }) => ({
  inPlay,
  showCompetitions,
  competitions,
  betShopCart,
  chsDB,
  inPlayFavorite,
  oddsLoading:loading.effects['inPlay/fetchAllMatchOdds']
}))
class Main extends PureComponent {
  state = {
    refreshLoading: false,
    showCompetitionsList: [],
    isShowMatch: -1,
    isActiveDate: '',
    allMatchExpend: -1,
    isShowMatchDetail: false,
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
    const { dispatch } = this.props;
    dispatch({
      type: 'inPlay/fetchMatchOdds',
      payload: { ...this.globalParams },
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

  setTimeFetchMatchList = () => {
    this.fetchMatchOdds();
  };

  /* 请求比赛赔率 */
  fetchMatchOdds = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'inPlay/fetchMatchOdds',
      payload: { ...this.globalParams },
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
      sport: '1',
      gg: '1',
    };
    const { dispatch } = this.props;
    dispatch({
      type: 'inPlay/fetchMatchOdds',
      payload: params,
      callback: () => {
        this.countRef.reset();
        this.setState({
          refreshLoading: false,
        });
      },
    });
  };

  turnToFav = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'togglePageWithGg/togglePage',
      payload: 'inPlayFav',
    });
  };


  render() {
    const {
      inPlay: {
        cptIds, matchListObj
      },
      inPlayFavorite:{ favMatchIds }
    } = this.props;
    const { refreshLoading, firstLoading } = this.state;
    return (
      <div className={styles.round}>
        <div className={styles.header}>
          <div className={styles.name}>滚球(让球&大/小)</div>
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
          {
            favMatchIds.length > 0 ?
              <div className={styles.fav} onClick={this.turnToFav}>
                <Icon type='star' style={{color:'#F9C100'}} className={styles.icon} theme="filled" />
                <div className={styles['fav-num']}>{favMatchIds.length}</div>
              </div>
              :
              <div className={styles.fav}>
                <Icon type='star' className={styles.icon} theme="filled" />
              </div>
          }
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
              {
                firstLoading ? <PageLoading/> :
                  cptIds.length === 0 ? <div className="match-loading">暂无滚球</div>:
                      cptIds.map((val) => (
                        <Item cptData={val} matchData={matchListObj[val]}/>
                      ))
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
