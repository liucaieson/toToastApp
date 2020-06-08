import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Icon, Modal, Input } from 'antd';
import BetItem from './betItem';
import styles from './index.scss';
import { dishNameMap, betTypeMap } from '@/utils/util';

const betTypeArr = [
  [
    { length: 1, betType: 1 },
  ],
  [
    { name: '单注', betType: 1, length: 2 },
    { name: '2串1', betType: 2, length: 1 },
  ],
  [
    { name: '单注', betType: 1, length: 3 },
    { name: '2串1', betType: 2, length: 3 },
    { name: '3串1', betType: 3, length: 1 },
  ],
  [
    { name: '单注', betType: 1, length: 4 },
    { name: '2串1', betType: 2, length: 6 },
    { name: '3串1', betType: 3, length: 4 },
    { name: '4串1', betType: 4, length: 1 },
  ],
  [
    { name: '单注', betType: 1, length: 5 },
    { name: '2串1', betType: 2, length: 10 },
    { name: '3串1', betType: 3, length: 10 },
    { name: '4串1', betType: 4, length: 5 },
    { name: '5串1', betType: 5, length: 1 },
  ],
  [
    { name: '单注', betType: 1, length: 6 },
    { name: '2串1', betType: 2, length: 15 },
    { name: '3串1', betType: 3, length: 20 },
    { name: '4串1', betType: 4, length: 15 },
    { name: '5串1', betType: 5, length: 6 },
    { name: '6串1', betType: 6, length: 1 },
  ],
  [
    { name: '单注', betType: 1, length: 7 },
    { name: '2串1', betType: 2, length: 21 },
    { name: '3串1', betType: 3, length: 35 },
    { name: '4串1', betType: 4, length: 35 },
    { name: '5串1', betType: 5, length: 21 },
    { name: '6串1', betType: 6, length: 7 },
    { name: '7串1', betType: 7, length: 1 },
  ],
  [
    { name: '单注', betType: 1, length: 8 },
    { name: '2串1', betType: 2, length: 28 },
    { name: '3串1', betType: 3, length: 56 },
    { name: '4串1', betType: 4, length: 70 },
    { name: '5串1', betType: 5, length: 56 },
    { name: '6串1', betType: 6, length: 28 },
    { name: '7串1', betType: 7, length: 8 },
    { name: '8串1', betType: 8, length: 1 },
  ],

];

@connect(({ betShopCart, userInfo, chsDB, loading }) => ({
  betShopCart,
  userInfo,
  chsDB,
  addLoading: loading.effects['betShopCart/addMixedShopCart'],
  postLoading: loading.effects['betShopCart/postMixedOrder'],
}))
class ShopCart extends PureComponent {
  state = {
    modal: false,
    result: [],
    amount: 0,
    betType: 1,
    orderText: '',
  };

  submitBets = () => {
    const {
      dispatch,
      betShopCart: { mixedShopCart },
      chsDB: { chsDB },
      userInfo: { balance },
    } = this.props;
    const { amount } = this.state;
    const params = [];
    const dishParams = [];
    const dishRate = [];

    if (amount >= balance.balance) {
      Modal.info({
        title: '提示',
        content: '余额不足',
      });
      return;
    }

    if (amount < 1) {
      Modal.info({
        title: '提示',
        content: '最少下注1元',
      });
      return;
    }
    for (let i = 0; i < mixedShopCart.ids.length; i += 1) {
      if (mixedShopCart.list[mixedShopCart.ids[i]].code !== '208' &&
      mixedShopCart.list[mixedShopCart.ids[i]].code !== '200') {
        Modal.info({
          title: '提示',
          content: '请删除无法下注的比赛',
        });
        return;
      }
    }

    /* 注意mixed是以比赛ID为key的 */
    mixedShopCart.ids.forEach((item) => {
      dishParams.push(chsDB[mixedShopCart.list[item].choiceId].dishId);
      dishRate.push(chsDB[mixedShopCart.list[item].choiceId].dish);
    });
    const betType = mixedShopCart.ids.length;
    // 根据混合过的ids的长度包含了混合过关的下注方法
    params.push({
      betType,
      dishValue: amount,
      dishId: dishParams.join(','),
      dishRate: dishRate.join(','),
    });

    const param = {
      sport: '1',
      result: params,
    };
    dispatch({
      type: 'betShopCart/postMixedOrder',
      payload: param,
      callback: (data) => {
        let successOrderNum = 0;
        let orderText = '';
        data.forEach((item) => {
          if (item.code === '208') {
            successOrderNum += 1;
          }
        });

        if (successOrderNum === data.length) {
          orderText = 1;
        } else {
          orderText = 2;
        }
        this.setState({
          modal: true,
          result: data,
          amount: 0,
          betType,
          orderText,
        });
        dispatch({
          type: 'userInfo/fetch',
        });
      },
    });
  };

  setAmount = (value) => {
    const { amount } = this.state;
    this.setState({
      amount: amount + value,
    });
  };

  changeAmount = (e) => {
    let { value } = e.target;
    if (value.match(/[^\d]/g)) {
      return;
    }
    value = +value;
    if (value > 100000) {
      return;
    }
    this.setState({
      amount: value,
    });
  };

  closeModal = () => {
    this.setState({
      modal: false,
    });
  };

  cancelBets = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'betShopCart/delAllMixedShopCart',
    });
  };

  delAmount = () => {
    this.setState({
      amount: 0,
    });
  };

  renderInput() {
    const delBtn = (
      <div className={styles['del-btn']} onClick={this.delAmount}>
        x
      </div>
    );
    const {
      betShopCart: { mixedShopCart },
      chsDB: { chsDB },
    } = this.props;
    const { amount } = this.state;
    let profit = 1;
    // 组合讲各种玩法组合，和对象的金额相乘加入dishArr数组中
    mixedShopCart.ids.forEach((val) => {
      profit *= chsDB[mixedShopCart.list[val].choiceId].dish;
    });
    const maxProfit = amount * profit;
    return (
      <div className={styles['order-money']}>
        <div className={styles['input-container']}>
          <Input
            className={styles.input}
            value={amount}
            onChange={e => this.changeAmount(e)}
            addonAfter={delBtn}
          />
          <p className={styles.text}>可赢金额： <span>{maxProfit.toFixed(2)}</span></p>
        </div>
        <div className={styles['select-num']}>
          <div className={styles.item} onClick={() => this.setAmount(100)}>100</div>
          <div className={styles.item} onClick={() => this.setAmount(200)}>200</div>
          <div className={styles.item} onClick={() => this.setAmount(500)}>500</div>
          <div className={styles.item} onClick={() => this.setAmount(1000)}>1000</div>
          <div className={styles.item} onClick={() => this.setAmount(2000)}>2000</div>
          <div className={styles.item} onClick={() => this.setAmount(5000)}>5000</div>
        </div>
      </div>
    );
  }

  render() {
    const {
      betShopCart: { mixedShopCart },
      addLoading,
      postLoading,
    } = this.props;
    const { modal, result, betType, orderText } = this.state;
    return (
      <div className={styles.box}>
        {
          postLoading ?
            <div className={styles['box-mask']}>
              <Icon type="loading" className={styles.loading}/>
            </div>
            : null
        }
        <div className={styles['bet-box']}>
          <ul className={styles['bet-list']}>
            {
              mixedShopCart.ids.length > 0 ?
                mixedShopCart.ids.map((val, index) => (
                  <BetItem
                    data={mixedShopCart.list[val]}
                    index={index}
                    key={val}
                  />
                ))
                :
                (<div className={styles['bet-none']}>暂无投注</div>)
            }
            {
              addLoading ?
                <div className={styles.mask}>
                  <Icon type="loading" className={styles.loading}/>
                </div> : null
            }
          </ul>
        </div>
        {
          <div className={styles['mixed-total']}>
            {
              mixedShopCart.ids.length >= 2 ?
                this.renderInput()
                :
                <div className={styles.row}>至少要选择2场比赛</div>
            }
            <div className={styles.button}>
              {mixedShopCart.ids.length >= 2 ?
                <button
                  className={styles['button-submit']}
                  onClick={this.submitBets}
                  type="button"
                >
                  确定投注
                </button> : null
              }
              <button
                className={styles['button-cancel']}
                onClick={this.cancelBets}
                type="button"
              >
                取消
              </button>
              <div className={styles.warning}>
                <Icon type="info-circle"/>
                系统将自动接收较佳收益率
              </div>
            </div>
          </div>
        }
        <Modal
          title={null}
          visible={modal}
          onCancel={this.closeModal}
          width={410}
          footer={null}
          maskClosable
          destroyOnClose
        >
          <div className={styles['result-mixed-modal']}>
            {
              orderText === 1 ?
                <div className={styles['bet-result']}>
                  <div className={styles.left} >
                    <Icon type="check-circle" className={styles.green}/>
                    {betTypeMap[betType]}
                  </div>
                  <div className={styles.center}>
                    <span>投注额：{result && result[0] && result[0].money}</span>
                  </div>
                  <div className={styles.right}>
                    <span className={styles.success}>下注成功</span>
                  </div>
                </div>
                :
                <div className={styles['bet-result']}>
                  <div className={styles.left}>
                    <Icon type="close-circle" className={styles.black} />
                    {betTypeMap[betType]}
                  </div>
                  <div className={styles.center} />
                  <div className={styles.right}>
                    <span className={styles.fail}> 下注失败</span>
                  </div>
                </div>
            }

            {
              result && result.map((val) => (
                val.code === '208' ? (
                  <div className={styles['result-item']} key={val.choiceId}>
                    <div className={styles['result-item-header']}>
                      <div className={styles.left}>
                        <div className={styles.logo}/>
                        <div className={styles.cptName}>
                          {val.cptName}
                        </div>
                      </div>
                      <div className={styles.text}>
                        {val.homeName}---{val.awayName}
                      </div>
                    </div>
                    <div className={styles['result-item-content']}>
                      <div className={styles['odds-name']}>
                        {val.oddName}
                      </div>
                      <div className={styles.handicap}>
                        {dishNameMap[val.name]}{val.choiceHandicap}@
                        <span className={styles.odds}>
                          {val.dish}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className={styles['result-item']}
                    key={val.choiceId}
                  >
                    <div className={styles['result-item-header']}>
                      <div className={styles.left}>
                        <div className={styles.logo}/>
                        <div className={styles.cptName}>
                          {val.cptName}
                        </div>
                      </div>
                      <div className={styles.text}>
                        {val.homeName}---{val.awayName}
                      </div>
                    </div>
                    <div className={styles['result-item-content']}>
                      <div className={styles['odds-name']}>
                        {val.oddName}
                      </div>
                      <div className={styles.handicap}>
                        {dishNameMap[val.name]}{val.choiceHandicap}@
                        <span className={styles.odds}>
                          {val.dish}
                        </span>
                      </div>
                      <div className={styles.loss}>{val.message}</div>
                    </div>
                  </div>
                )
              ))
            }
          </div>
        </Modal>
      </div>
    );
  }
}

export default ShopCart;
