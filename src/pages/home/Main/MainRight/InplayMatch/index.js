import React, { PureComponent, Fragment } from 'react';
import { Icon, Row, Col, Modal, Checkbox } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import CountDown from '../../../../../components/CountDown/index';
import { dishNameMap } from '../../../../../utils/util';
import PageLoading from '../../../../../components/MbPageLoading';
import Item from './item'
import { AutoSizer, List } from 'react-virtualized';

@connect(({ inPlay, betShopCart, chsDB, showCompetitions, competitions, loading }) => ({
  inPlay,
  showCompetitions,
  competitions,
  betShopCart,
  chsDB,
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

  /* 展开比赛详细信息 */
  turnToMatchDetail = (match) => {
    this.setState({
      isShowMatchDetail: true,
      matchInfo: match,
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

  _rowRenderer = ({index, parent, style}) => {
    /* 这里有一个坑。要让子组件应用上style,否则会出现闪烁 */
    const {  inPlay: { cptIds,matchListObj }} = this.props;
    return (
      <Item style={style} cptData={cptIds[index]} matchData={matchListObj[cptIds[index]]} key={cptIds[index]}/>
    )
  };

  _getRowHeight = ({index}) => {
    const { inPlay: { cptIds,matchListObj }} = this.props;
    return  30 + 80 * matchListObj[cptIds[index]].length;
  };

  render() {
    const {
      inPlay: {
        cptIds
      },
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
        </div>
        <div>
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
                  cptIds.length === 0 ? <div className="match-loading">暂无滚球</div>:
                  <AutoSizer disableHeight>
                    {({width}) => (
                      <List
                        ref="List"
                        height={window.innerHeight-156}
                        style={{
                          height: "calc(100vh - 156px)",
                          lineHeight: "30px",
                          width: "828px",
                          backgroundColor: '#fff'
                        }}
                        overscanRowCount={5}
                        rowCount={cptIds.length}
                        rowHeight={this._getRowHeight}
                        rowRenderer={this._rowRenderer}
                        width={928}
                      />
                    )}</AutoSizer>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
