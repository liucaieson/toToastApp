import React, { PureComponent } from 'react';
import { Icon, Row, Col } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import CountDown from '../../../../../../components/CountDown/index';
import CompetitionsModal from '../../competitonsModal/index';
import moment from 'moment';
import { dishNameMap } from '../../../../../../utils/util';
import { AutoSizer, List } from 'react-virtualized';
import Item from './item';
import PageLoading from '../../../../../../components/MbPageLoading';

@connect(({ todayMixed, showCompetitions, competitions, loading }) => ({
  todayMixed,
  showCompetitions,
  competitions,
  mixedLoading:loading.models.todayMixed,
  matchAllOddsLoading:loading.models.matchAllOdds,
}))
class Mixed extends PureComponent {
  state = {
    refreshLoading: false,
    firstLoading: true
  };

  timer = null;
  competitionsParams = {};

  /* 存储全局的参数 */
  globalParams = {
    sport: '1',
    gg: '8',
    date: moment().format('YYYY-MM-DD')
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'todayMixed/fetchMatchOdds',
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
      type: 'todayMixed/fetchMatchOdds',
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

  /* 刷新比赛赔率，实际重新请求比赛 */
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
      type: 'todayMixed/fetchMatchOdds',
      payload: params,
      callback: () => {
        this.countRef.reset();
        this.setState({
          refreshLoading: false,
        });
      },
    });
  };

  /* 请求比赛，携带联赛*/
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

  _rowRenderer = ({index, parent, style}) => {
    /* 这里有一个坑。要让子组件应用上style,否则会出现闪烁 */
    const {  todayMixed: { cptIds,matchListObj }} = this.props;
    return (
      <Item style={style} cptData={cptIds[index]} matchData={matchListObj[cptIds[index]]} key={cptIds[index]}/>
    )
  };

  _getRowHeight = ({index}) => {
    const { todayMixed: { cptIds,matchListObj }} = this.props;
    return  30 + 80 * matchListObj[cptIds[index]].length;
  };


  render() {
    const {
      todayMixed: {
        cptIds
      }
    } = this.props;
    const { refreshLoading, firstLoading } = this.state;
    return (
      <div className={styles.mixed}>
        <div className={styles.header}>
          <div className={styles.name}>今日-混合过关</div>
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
                firstLoading ? <PageLoading/>  :
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
                        overscanRowCount={5}
                        rowCount={cptIds.length}
                        rowHeight={
                          this._getRowHeight
                        }
                        rowRenderer={this._rowRenderer}
                        width={828}
                      />
                    )}
                  </AutoSizer>
              }
            </div>
          </div>
        </div>
        <CompetitionsModal params={this.globalParams} fn={this.fetchMatchOddsWithCompetitions}/>
      </div>
    );
  }
}

export default Mixed;
