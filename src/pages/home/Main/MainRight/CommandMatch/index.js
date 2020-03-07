import React, { PureComponent } from 'react';
import { Icon, Row, Col, Modal } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import CountDown from '../../../../../components/CountDown/index';
import CompetitionsModal from '../competitonsModal/index.js';
import { AutoSizer, List } from 'react-virtualized';
import Item from './matchItem.js';
import PageLoading from '../../../../../components/MbPageLoading';

@connect(({ commandMatch, showCompetitions, changeBetSectionStatus, competitions }) => ({
  commandMatch,
  showCompetitions,
  competitions,
  changeBetSectionStatus,
}))
class CommandMatch extends PureComponent {
  state = {
    refreshLoading: false,
    showCompetitionsList: [],
    isShowMatch: -1,
    isActiveDate: '',
    isShowMatchDetail: false,
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
    this.scrollWrapper = React.createRef();
    const { dispatch } = this.props;
    dispatch({
      type: 'commandMatch/fetchMatchOdds',
      payload: {
        ...this.globalParams,
      },
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
    this.fetchMatchOdds(this.globalParams);
  };


  /* 请求比赛赔率 */
  fetchMatchOdds = (param) => {
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
      type: 'commandMatch/fetchMatchOdds',
      payload: params,
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
      ...this.globalParams,
    };
    const { dispatch } = this.props;
    dispatch({
      type: 'commandMatch/fetchMatchOdds',
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
    if (param.competitions.length === 0) {
      return;
    }
    this.setState({
      firstLoading: true,
    }, () =>  {
        const ids = [];
        param.competitions.map((val) => {
          ids.push(val.competitionId);
        });
        const str = ids.join(',');
        this.fetchMatchOdds({ competitions: str });
        /* 刷新倒计时的时间 */
        this.countRef.reset();
        this.globalParams = {
          ...this.globalParams,
          competitions: str,
        };
        this.setState({
          firstLoading: false,
        });
      }
      );
  };

  _rowRenderer = ({ index, parent, style }) => {
    /* 这里有一个坑。要让子组件应用上style,否则会出现闪烁 */
    const { commandMatch: { matchList } } = this.props;
    return (
      <Item style={style} data={matchList[index]} key={matchList[index].matchId}/>
    );
  };

  /*<Item style={style} data={matchList[index]} key={matchList[index].matchId}/>*/


  render() {
    const {
      commandMatch: {
        matchList,
      },
    } = this.props;
    const { refreshLoading, isShowMatchDetail, matchInfo, firstLoading } = this.state;
    return (
      <div className={styles.pointSpread}>
        <div className={styles.header}>
          <div className={styles.name}>首页</div>
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
          <div className={styles['competitions-select']} onClick={this.showCompetitionsModal}>选择联赛</div>
        </div>
        <div>
          <div className={styles['match-box']}>
            <Row className={styles.table}>
              <Col className={styles['big-tb']} span={2}>时间</Col>
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
              <Col className={styles.item} span={1}/>
            </Row>
            <div className={styles.match} id='commandMatch'>

              {firstLoading ? <PageLoading/> :
                (
                 matchList && matchList.length === 0 ? <div className="no-match">暂无比赛</div> :
                    <AutoSizer disableHeight>
                      {({ width }) => (
                        <List
                          ref="List"
                          height={window.innerHeight - 144}
                          style={{
                            height: 'calc(100vh - 144px)',
                            lineHeight: '30px',
                            width: '828px',
                            backgroundColor: '#fff'
                          }}
                          className='command-item'
                          overscanRowCount={5}
                          rowCount={matchList.length}
                          rowHeight={80}
                          rowRenderer={this._rowRenderer}
                          width={928}
                        />
                      )}
                    </AutoSizer>
                )
              }
            </div>
          </div>
        </div>
        <CompetitionsModal params={this.globalParams} fn={this.fetchMatchOddsWithCompetitions} />
      </div>

    );
  }
}

export default CommandMatch;
