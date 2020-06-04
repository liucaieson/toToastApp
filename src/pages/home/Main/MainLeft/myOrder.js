import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import { connect } from 'dva';
import moment from 'moment'
import styles from './myOrder.scss';
import { dishNameMap } from '@/utils/util';

const betTypeMap = {
  1: '',
  2: '二串一',
  3: '三串一',
  4: '四串一',
  5: '五串一',
  6: '六串一',
  7: '七串一',
  8: '八串一',
};

@connect(({ historyBets, loading }) => ({
  historyBets,
  loading: loading.models.historyBets,
}))
class MyOrder extends PureComponent {
  state = {
    open1: false,
    open2: false
  };

  /* 请求投注记录 betStatus1未结算，2为未结算 */
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'historyBets/fetchUnSettlement',
      payload: {
        page: 1,
        size: 20,
        betStatus: 0,
        sport: '1',
        /* start_time: +(moment(startDate).valueOf()/1000).toFixed(0),
        end_time: +(moment(moment(endDate).format('YYYY-MM-DD 23:59:59'))/1000).toFixed(0) */
      },
    });
    dispatch({
      type: 'historyBets/fetchSettlement',
      payload: {
        page: 1,
        size: 20,
        betStatus: 1,
        sport: '1',
        /* start_time: +(moment(startDate).valueOf()/1000).toFixed(0),
        end_time: +(moment(moment(endDate).format('YYYY-MM-DD 23:59:59'))/1000).toFixed(0) */
      },
    });
  }

  toggleSettlement = () => {
    const { open2 } = this.state;
    this.setState({
      open2: !open2
    })
  };

  toggleUnSettlement = () => {
    const { open1 } = this.state;
    this.setState({
      open1: !open1
    })
  };

  render() {
    const { historyBets: { settlementData, unSettlementData } } = this.props;
    const {
      open1, open2
    } = this.state;
    return (
      <div className={styles.myOrder}>
        <div className={styles.order}>
          <div className={styles.title} onClick={this.toggleUnSettlement}>
            <div className={styles.left}>
              {
                open1 ? <Icon type="caret-up" /> :
                  <Icon type="caret-down" />
              }
            </div>
            <div className={styles.right}>
              <div className={styles.top}>未结算注单</div>
              <div className={styles.bottom}>最近20笔交易</div>
            </div>
          </div>
          {
            open1 ? <ul className={styles.list}>
              {
                unSettlementData.map((val) => (
                  <li
                    className={styles.item}
                    key={val.betId}
                    onClick={() => this.toggle(val.betId)}
                  >
                    {
                      val.detailed && val.detailed.map((item) => (
                        <div className={styles.info} key={item.betDetailId}>
                          <div className={styles.left}>
                            <div className={styles['odds-name']}>
                              <span className={styles.type}>
                                {betTypeMap[val.betType]}
                              </span>
                              {item.oddName}
                              </div>
                            <div className={styles.match}>
                              {item.cptName}
                              </div>
                            <div className={styles.match}>
                              {item.hostName}---{item.awayName}
                              </div>
                            <div
                              className={styles['dish-name']}>
                            <span className={styles.name}>
                              {dishNameMap[item.choiceContent]}
                              {item.choiceHandicap}
                            </span>
                              @
                              <span className={styles.dish}>
                              {item.dishRate}
                            </span>
                            </div>
                          </div>
                          <div className={styles.right}>
                            <div className={styles.win}>
                              {item.resultFlag === '胜' ?
                                <span className={styles.red}>{item.resultFlag}</span> :
                                <span className={styles.green}> {item.resultFlag}</span>
                              }
                            </div>
                          </div>
                        </div>
                      ))
                    }
                    <div className={styles.money}>

                      <div className={styles.left}>
                        <span className={styles.text}>本金：</span>
                        <span className={styles.num}>￥{val.betMoney}</span>
                      </div>
                      <div className={styles.left}>
                        <span className={styles.text}>状态：</span>
                        <span className={styles.time}>{val.betStatus}</span>
                      </div>
                      <div className={styles.left}>
                        <span className={styles.text}>下注时间：</span>
                        <span className={styles.time}>
                          {moment(val.betTime).local().format('YYYY-MM-DD HH:mm:ss')}
                        </span>
                      </div>
                    </div>
                  </li>
                ))
              }

            </ul> : ''
          }
        </div>
        <div className={styles.order}>
          <div
            className={styles.title}
            onClick={this.toggleSettlement}
          >
            <div className={styles.left}>
              {
                open2 ? <Icon type="caret-up" /> :
                  <Icon type="caret-down" />
              }
            </div>
            <div className={styles.right}>
              <div className={styles.top}>已结算注单</div>
              <div className={styles.bottom}>最近20笔交易</div>
            </div>
          </div>
          {
            open2 ? <ul className={styles.list}>
              {
                settlementData.map((val) => (
                  <li
                    className={styles.item}
                    key={val.betId}
                    onClick={() => this.toggle(val.betId)}
                  >
                    {
                      val.detailed && val.detailed.map((item) => (
                        <div className={styles.info} key={item.betDetailId}>
                          <div className={styles.left}>
                            <div className={styles['odds-name']}>
                              <span className={styles.type}>
                                {betTypeMap[val.betType]}
                              </span>
                              {item.oddName}
                            </div>
                            <div className={styles.match}>{item.cptName}</div>
                            <div className={styles.match}>{item.hostName}---{item.awayName}</div>
                            <div className={styles['dish-name']}>
                            <span className={styles.name}>
                              {dishNameMap[item.choiceContent]}{item.choiceHandicap}
                            </span>
                              @
                              <span className={styles.dish}>
                                {item.dishRate}
                              </span>
                            </div>
                          </div>
                          <div className={styles.right}>

                            <div className={styles.win}>
                              {item.resultFlag === '胜' ?
                                <span className={styles.red}>{item.resultFlag}</span> :
                                <span className={styles.green}> {item.resultFlag}</span>
                              }
                            </div>
                          </div>
                        </div>
                      ))
                    }
                    <div className={styles.money}>
                      <div className={styles.left}>
                        <span className={styles.text}>本金：</span>
                        <span className={styles.num}>￥{val.betMoney}</span>
                      </div>
                      <div className={styles.left}>
                        <span className={styles.text}>返还：</span>
                        <span className={styles.num}>￥{val.bonusMoney}</span>
                      </div>
                      <div className={styles.left}>
                        <span className={styles.text}>下注时间：</span>
                        <span className={styles.time}>
                          {moment(val.betTime).local().format('YYYY-MM-DD HH:mm:ss')}
                        </span>
                      </div>
                    </div>
                  </li>
                ))
              }
            </ul> : ''
          }
        </div>
      </div>
    );
  }
}

export default MyOrder;
