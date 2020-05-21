import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import styles from './wrapper1.scss';
import CountDown from '@/components/CountDown/index';
import CompetitionsModal from '../../competitonsModal/index';
import PaginationBox from '@/components/PaginationBox';
import PageLoading from '@/components/MbPageLoading';

@connect(({ asianGG, dates, chsDB, showCompetitions, loading }) => ({
  asianGG,
  showCompetitions,
  dates,
  chsDB,
  loading: loading.models.asianGG,
  matchAllOddsLoading: loading.models.matchAllOdds,
}))
class Main extends PureComponent {
  state = {
    refreshLoading: false,
    firstLoading: true,
  };

  timer = null;

  /* 存储全局的参数 */
  defaultParams = {
    sport: '1',
    date: moment().format('YYYY-MM-DD'),
    page: 1
  };

  /* 存储全局的参数 */
  globalParams = {
    ...this.defaultParams,
  };

  componentDidMount() {
    const { gg } = this.props;
    this.fetchMatchOdds({ gg }, () => {
      this.setState({
        firstLoading: false,
      });
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  setTimeFetchMatchList = () => {
    const { gg } = this.props;
    this.fetchMatchOdds({ gg });
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

  /* 全局展示显示联赛的modal  */
  showCompetitionsModal = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'showCompetitions/toggle',
      payload: true,
    });
  };

  /* 刷新比赛数据 */
  refreshMatchOdds = () => {
    const { gg } = this.props;
    this.setState({
      refreshLoading: true,
    });
    const params = {
      gg,
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
    const { gg } = this.props;
    if (param === undefined) {
      return;
    }
    this.setState({
      firstLoading: true,
    });
    this.fetchMatchOdds({ competitions: param, gg }, () => {
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

  /* 获取倒计时组件的this */
  onCountDownRef = (ref) => {
    this.countRef = ref;
  };

  nextPage = (page) => {
    const { gg } = this.props;
    const { loading } = this.props;
    if (loading) {
      return
    }
    this.fetchMatchOdds({ page, size: 40, gg }, (result) => {
      const { current } = result;
      this.globalParams = {
        ...this.globalParams,
        page: current
      };
    });
  };

  /* 跳转到混合过关 */
  turnToAsianMixed = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'togglePageWithGg/togglePage',
      payload: '8',
    });
  };

  /**
   * 返回match容器顶部
   */
  gotoTop = () => {
    const container = document.getElementById('matchContainer');
    if (container) {
      container.scrollIntoView()
    }
  };

  render() {
    const {
      title,
      gg,
      asianGG: {
        count, current
      },
    } = this.props;
    const { refreshLoading, firstLoading } = this.state;
    return (
      <div className={styles['main-box']}>
        <div className={styles.header}>
          <div className={styles.name}>{title}</div>
          <div className={styles.refresh}>
            {
              refreshLoading ? <Icon className={styles.icon} type="loading"/>
                : <Icon className={styles.icon} onClick={this.refreshMatchOdds} type="sync"/>
            }
            <span className={styles.time}>
              <CountDown
                onCountDownRef={this.onCountDownRef}
                time="60"
                onEnd={this.setTimeFetchMatchList}/>
              s</span>
          </div>
          <div className={styles['competitions-select']} onClick={this.showCompetitionsModal}>选择联赛</div>
          {
            gg === '8' ? '' : <div className={styles.mixed} onClick={this.turnToAsianMixed}>混合过关</div>
          }
        </div>
        <div className={styles.main}>
          {
            <div className={styles['match-box']}>
              {this.props.children[0]}
              <div className={styles.match}>
                {
                  firstLoading ? <PageLoading/> :
                    <div className={styles.container} id="matchContainer">
                      {this.props.children[1]}
                      <PaginationBox
                        total={count}
                        current={current}
                        pageSize={40}
                        onChange={this.nextPage}
                      />
                    </div>
                }
              </div>
              <div
                className={styles['to-top']}
                onClick={this.gotoTop}
              />
            </div>
          }
        </div>
        <CompetitionsModal
          params={{ ...this.defaultParams, gg }}
          fn={this.fetchMatchOddsWithCompetitions}
        />
      </div>

    );
  }
}

export default Main;
