import React, { PureComponent, Fragment } from 'react';
import { Icon, Row, Col, Modal } from 'antd';
import { connect } from 'dva';
import styles from './wrapper1.scss';
import CountDown from '../../../../../../components/CountDown/index';
import CompetitionsModal from '../../competitonsModal/index';
import ModalLayout from '../../ModalLayout/modalLayout';
import PaginationBox from '../../../../../../components/PaginationBox';
import PageLoading from '../../../../../../components/MbPageLoading';

@connect(({ asianGG6And7, dates, chsDB, showCompetitions,  loading }) => ({
  asianGG6And7,
  showCompetitions,
  dates,
  chsDB,
  loading: loading.models.asianGG6And7,
  matchAllOddsLoading: loading.models.matchAllOdds,
}))
class Main extends PureComponent {

  state = {
    refreshLoading: false,
    isActiveDate: '',
    firstLoading: true,
    page:1,
    isShow: false,
  };

  timer = null;
  competitionsParams = {};

  /* 存储全局的参数 */
  defaultParams = {
    sport: '1',
    page:1
  };
  /* 存储全局的参数 */
  globalParams = {
    ...this.defaultParams,
  };

  componentDidMount() {
    const { gg } = this.props;
    this.fetchDates();
    this.fetchMatchOdds({gg}, () => {
      this.setState({
        firstLoading: false,
      });
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  setTimeFetchMatchList = () => {
    const {gg} = this.props;
    this.fetchMatchOdds({gg});
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
      type: 'asianGG6And7/fetchMatchOdds',
      payload: params,
      callback: fn,
    });
  };

  /* 请求时间接口 */
  fetchDates = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dates/fetch',
      payload: {
        ...this.globalParams,
      },
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
    const {gg} = this.props;
    this.setState({
      refreshLoading: true,
    });
    let params = {
      gg,
      ...this.globalParams,
    };
    const { dispatch } = this.props;
    dispatch({
      type: 'asianGG6And7/fetchMatchOdds',
      payload: params,
      callback: () => {
        this.countRef.reset();
        this.setState({
          refreshLoading: false,
        });
      },
    });
  };

  /* 点击日期的请求 */
  fetchMatchOddsWithDate = (date) => {
    const {gg} = this.props;
    this.setState({
      isActiveDate: date.date,
      firstLoading: true,
    });
    this.fetchMatchOdds({ ...this.globalParams,gg, page:1, date: date.date }, () => {
      this.countRef.reset();
      this.setState({
        firstLoading: false,
      });
      this.globalParams = {
        ...this.globalParams,
        ...date,
        page:1
      };
    });
  };

  /* 给请求联赛的函数
   * 回调函数为，请求联赛之后拿第一个联赛id去请求该联赛的比赛
   * 设置show的match（实际上是应该展示的联赛）
   * 保存全局参数
    * */
  fetchMatchOddsWithCompetitions = (param) => {
    const {gg} = this.props;
    if (param === undefined) {
      return;
    }
    this.setState({
      firstLoading: true,
    });
    this.fetchMatchOdds({ competitions: param,gg }, () => {
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
    const {gg} = this.props;
    const {loading} = this.props;
    if(loading){
      return
    }
    this.fetchMatchOdds({page,size:40, gg}, (result) => {
      const { current } = result;
      this.globalParams = {
        ...this.globalParams,
        page: current
      };
    });
  };



  /*跳转到混合过关*/
  turnToAsianMixed = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'togglePageWithGg/togglePage',
      payload: '8',
    });
  };



  /* 跳转到单程比赛所有盘口玩法赔率页面 ，
  * pageId为标识要跳的页面为detail（比赛详情玩法）
  * id为matchId页面初始化请求
   */
  /* 请求比赛所有玩法的赔率赔率，参数比赛id */
  openMatchAllOdds = (matchId) => {
    this.setState({
      isShow: true,
      matchId
    });
  };

  closeModal = () => {
    this.setState({
      isShow: false
    });
  };


  render() {
    const {
      dates: { dates },
      title,
      gg,
      asianGG6And7: {
        count, current
      },
    } = this.props;
    const { refreshLoading, isActiveDate, isShow, matchId, firstLoading } = this.state;
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
                time='60'
                onEnd={this.setTimeFetchMatchList}/>
              s</span>
          </div>
          <div className={styles['competitions-select']} onClick={this.showCompetitionsModal}>选择联赛</div>
          <div className={styles.mixed} onClick={this.turnToAsianMixed}>混合过关</div>
        </div>
        <div className={styles.main}>
          <Row className={styles['date-select']}>
            <Col
              className={isActiveDate === '' ? styles.item + ' ' + styles.active : styles.item} span={3} offset={1}
              onClick={() => this.fetchMatchOddsWithDate({ date: '' })}
            >全部
            </Col>
            {
              dates.map((val) => (
                <Col
                  className={isActiveDate === val.id ? styles.item + ' ' + styles.active : styles.item}
                  key={val.id}
                  span={3}
                  onClick={() => this.fetchMatchOddsWithDate({ date: val.id })}>
                  {val.text}
                </Col>),
              )
            }
          </Row>
          {
            <div className={styles['match-box']}>
              {this.props.children[0]}
              <div className={styles.match}>
                {
                  firstLoading ? <PageLoading/> :
                    <Fragment>
                      {this.props.children[1]}
                      <PaginationBox total={count} current={current} pageSize={40} onChange={this.nextPage}/>
                    </Fragment>
                }
              </div>
            </div>
          }

        </div>
        <Modal
          title={'比赛'}
          visible={isShow}
          onCancel={this.closeModal}
          width={700}
          footer={null}
          maskClosable={false}
          destroyOnClose
          getContainer={() => document.getElementById('mainRightBox')}
          bodyStyle={{
            height: '600px',
            color:'white',
            padding:'2px 4px'
          }}
        >
          {
            isShow ? <ModalLayout matchId={matchId}/>

              : ''
          }
        </Modal>
        <CompetitionsModal params={{...this.defaultParams, gg}} fn={this.fetchMatchOddsWithCompetitions}/>
      </div>

    );
  }
}

export default Main;