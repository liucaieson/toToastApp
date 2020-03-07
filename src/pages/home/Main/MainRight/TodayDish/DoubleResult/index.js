import React, { PureComponent, Fragment } from 'react';
import { Icon, Row, Col } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import CountDown from '../../../../../../components/CountDown/index';
import CompetitionsModal from '../../competitonsModal/index';
import moment from 'moment';
import Item from './item';
import { AutoSizer, List } from 'react-virtualized';
import PageLoading from '../../../../../../components/MbPageLoading';


@connect(({ todayDoubleResult, betShopCart, dates, chsDB, showCompetitions, competitions, loading }) => ({
  todayDoubleResult,
  showCompetitions,
  competitions,
  betShopCart,
  dates,
  chsDB,
  loading,
  doubleResultLoading:loading.effects['todayDoubleResult/fetchMatchOdds']
}))
class DoubleResult extends PureComponent {
  state = {
    refreshLoading: false,
    firstLoading: true
  };

  timer = null;
  competitionsParams = {};

  /* 存储全局的参数 */
  globalParams = {
    sport: '1',
    gg: '6',
    date: moment().format('YYYY-MM-DD')
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'todayDoubleResult/fetchMatchOdds',
      payload: {
        ...this.globalParams
      },
      callback:() => {
        this.setState({
          firstLoading:false
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
      type: 'todayDoubleResult/fetchMatchOdds',
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
      type: 'todayDoubleResult/fetchMatchOdds',
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
    const { todayDoubleResult: { cptIds,matchListObj }} = this.props;
    return (
      <Item style={style} cptData={cptIds[index]} matchData={matchListObj[cptIds[index]]} key={cptIds[index]}/>
    )
  };

  _getRowHeight = ({index}) => {
    const { todayDoubleResult: { cptIds,matchListObj }} = this.props;
    return  34 + 56 * matchListObj[cptIds[index]].length;
  };

  render() {
    const {
      todayDoubleResult: {
        cptIds
      }
    } = this.props;
    const { refreshLoading,  firstLoading } = this.state;
    return (
      <div className={styles.doubleResult}>
        <div className={styles.header}>
          <div className={styles.name}>今日-半场/全场</div>
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
              <Col className={styles['big-tb']} span={5}>赛事</Col>
              <Col className={styles['big-tb']} span={16}>
                <div className={styles.cell}>主/主</div>
                <div className={styles.cell}>主/和</div>
                <div className={styles.cell}>主/客</div>
                <div className={styles.cell}>和/主</div>
                <div className={styles.cell}>和/和</div>
                <div className={styles.cell}>和/客</div>
                <div className={styles.cell}>客/主</div>
                <div className={styles.cell}>客/和</div>
                <div className={styles.cell}>客/客</div>
              </Col>
            </Row>
            <div className={styles.match}>
              { firstLoading ? <PageLoading/>  :
                <AutoSizer disableHeight>
                  {({width}) => (
                    <List
                      ref="List"
                      height={window.innerHeight-114}
                      style={{
                        height: "calc(100vh - 114px)",
                        lineHeight: "30px",
                        width: "828px",
                      }}
                      overscanRowCount={10}
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

export default DoubleResult;
