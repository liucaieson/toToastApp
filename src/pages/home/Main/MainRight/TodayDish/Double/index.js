import React, { PureComponent, Fragment } from 'react';
import { Icon, Row, Col } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import CountDown from '../../../../../../components/CountDown/index';
import CompetitionsModal from '../../competitonsModal/index';
import moment from 'moment';
import { AutoSizer, List } from 'react-virtualized';
import Item from './item';
import PageLoading from '../../../../../../components/MbPageLoading';

@connect(({ todayDouble, dates, showCompetitions, competitions, loading }) => ({
  todayDouble,
  showCompetitions,
  competitions,
  dates,
  loading,
  doubleLoading:loading.effects['todayDouble/fetchMatchOdds']
}))
class Double extends PureComponent {
  state = {
    refreshLoading: false,
    showCompetitionsList: [],
    firstLoading: true
  };

  timer = null;
  competitionsParams = {};
  /* 存储全局的参数 */
  defaultParams = {
    sport: '1',
    gg: '4',
    date: moment().format('YYYY-MM-DD')
  };

  globalParams = {
    ...this.defaultParams
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'todayDouble/fetchMatchOdds',
      payload: {
        ...this.globalParams
      },
      callback:() => {
        this.setState({
          firstLoading: false
        })
      }
    });
  }

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
    this.fetchMatchOdds(this.globalParams)
  };

  /* 请求比赛赔率 */
  fetchMatchOdds = (param) => {
    let params = {
      ...this.defaultParams
    };
    if (param) {
      params = {
        ...params,
        ...param,
      };
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'todayDouble/fetchMatchOdds',
      payload: params,
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
      type: 'todayDouble/fetchMatchOdds',
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

  _rowRenderer = ({index, parent, style}) => {
    /* 这里有一个坑。要让子组件应用上style,否则会出现闪烁 */
    const { todayDouble: { cptIds,matchListObj }} = this.props;
    return (
      <Item style={style} cptData={cptIds[index]} matchData={matchListObj[cptIds[index]]} key={cptIds[index]}/>
    )
  };

  _getRowHeight = ({index}) => {
    const {
      todayDouble: { cptIds,matchListObj }} = this.props;
    return  30 + 50 * matchListObj[cptIds[index]].length;
  };


  render() {
    const {
      todayDouble: {
        cptIds
      },
    } = this.props;
    const { refreshLoading,firstLoading } = this.state;
    return (
      <div className={styles.totalResult}>
        <div className={styles.header}>
          <div className={styles.name}>今日-1 x 2 双重机会</div>
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
              s</span>
          </div>
          <div className={styles['competitions-select']} onClick={this.showCompetitionsModal}>选择联赛</div>
          <div className={styles.mixed} onClick={this.turnToTodayMixed}>混合过关</div>
        </div>
        <div>
          <div className={styles['match-box']}>
            <Row className={styles.table}>
              <Col className={styles['big-tb']} span={3}>时间</Col>
              <Col className={styles['big-tb']} span={6}>赛事</Col>
              <Col className={styles['middle-tb']} span={5}>
                <Row className={styles['cell-th']}>
                  全场
                </Row>
                <Row>
                  <Col span={8} className={styles.cell}>主胜(1)</Col>
                  <Col span={8} className={styles.cell}>平局(1)</Col>
                  <Col span={8} className={styles.cell}>客胜(1)</Col>
                </Row>
              </Col>
              <Col className={styles['middle-tb']} span={5}>
                <Row className={styles['cell-th']}>
                  上半场
                </Row>
                <Row>
                  <Col span={8} className={styles.cell}>主胜(1)</Col>
                  <Col span={8} className={styles.cell}>平局(1)</Col>
                  <Col span={8} className={styles.cell}>客胜(1)</Col>
                </Row>
              </Col>
              <Col className={styles['middle-tb']} span={5}>
                <Row className={styles['cell-th']}>
                  双重机会
                </Row>
                <Row>
                  <Col span={8} className={styles.cell}>1x</Col>
                  <Col span={8} className={styles.cell}>12</Col>
                  <Col span={8} className={styles.cell}>x2</Col>
                </Row>
              </Col>
            </Row>
            <div className={styles.match}>
              { firstLoading ? <PageLoading/>  :
                <AutoSizer disableHeight>
                  {({width}) => (
                    <List
                      ref="List"
                      height={window.innerHeight-144}
                      style={{
                        height: "calc(100vh - 144px)",
                        lineHeight: "30px",
                        width: "828px",
                      }}
                      overscanRowCount={10}
                      rowCount={cptIds.length}
                      rowHeight={
                        this._getRowHeight
                      }
                      rowRenderer={this._rowRenderer}
                      width={928}
                    />
                  )}
                </AutoSizer>
              }
            </div>
          </div>
        </div>
        <CompetitionsModal params={this.globalParams} fn={this.fetchMatchOddsWithCompetitions} />
      </div>

    );
  }
}

export default Double;
