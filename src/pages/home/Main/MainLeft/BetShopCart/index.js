import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Icon, Modal } from 'antd';
import BetItem from './betItem';
import styles from './index.scss';
import { dishNameMap } from '@/utils/util';

@connect(({ betShopCart, userInfo, chsDB, loading }) => ({
  betShopCart,
  userInfo,
  chsDB,
  postLoading: loading.effects['betShopCart/postBetOrder'],
  addLoading: loading.effects['betShopCart/addBetShopCart']
}))
class ShopCart extends PureComponent {
  /**
   * 弹出显示的状态，下注完毕的返回值，说明下注成功了几注的文字
   * @type {{modal: boolean, result: Array, orderText: string}}
   */
  state = {
    modal: false,
    result: [],
    orderText: ''
  };

  submitBets = () => {
    const {
      dispatch,
      betShopCart: { shopCart },
      chsDB: { chsDB },
      userInfo: { balance }
    } = this.props;
    let amount = 0;
    let params = {};
    if (shopCart.ids.length <= 0) { return }
    for (let i = 0; i < shopCart.ids.length; i += 1) {
      if (shopCart.list[shopCart.ids[i]].amount < 1) {
        Modal.info({
          title: '提示',
          content: '购物车有未投注项' });
        return
      }
    }
    for (let i = 0; i < shopCart.ids.length; i += 1) {
      amount += shopCart.list[shopCart.ids[i]].amount
    }
    if (amount > +balance.balance) {
      Modal.info({
        title: '提示',
        content: '余额不足' });
      return
    }
    const paramsValue = [];
    const paramsDishId = [];
    const paramsDish = [];
    /* 这里传递的id为盘口id，后端返回盘口id，用来做查询购物车 */
    shopCart.ids.forEach((val) => {
      paramsDishId.push(chsDB[val].dishId);
      paramsDish.push(chsDB[val].dish);
      paramsValue.push(shopCart.list[val].amount)
    });
    params = {
      sport: '1',
      result: [{
        betType: '1',
        dishValue: paramsValue.join(','),
        dishId: paramsDishId.join(','),
        dishRate: paramsDish.join((','))
       }
      ]
    };

    dispatch({
      type: 'betShopCart/postBetOrder',
      payload: params,
      callback: (data) => {
        let successOrderNum = 0;
        let orderText = '';
        data.forEach((item) => {
          if (item.code === '208') {
             successOrderNum += 1
          }
        });

        if (successOrderNum === data.length) {
          orderText = '下注成功'
        } else {
          orderText = `成功${successOrderNum}注，失败${data.length - successOrderNum}注`
        }

        this.setState({
          modal: true,
          result: data,
          orderText
        })
      }
    });
  };

  closeModal = () => {
    this.setState({
      modal: false
    })
  };

  render() {
    const { betShopCart: { shopCart }, chsDB: { chsDB }, postLoading, addLoading } = this.props;
    const { modal, result, orderText } = this.state;
    let totalBetAmount = 0;
    let totalWinAmount = 0;

    shopCart.ids.forEach((val) => {
      totalBetAmount += (shopCart.list[val].amount === undefined ? 0 : shopCart.list[val].amount);
      totalWinAmount += chsDB[val].dish * shopCart.list[val].amount
    });
    return (
     <div className={styles.box}>
       {
         postLoading ? <div className={styles['box-mask']}>
           <Icon type="loading" className={styles.loading}/>
         </div> : ''
       }
       <div className={styles['bet-box']}>
         <ul className={styles['bet-list']}>
           {
             shopCart.ids.length > 0 ?
               shopCart.ids.map((val, index) => (
                 <BetItem data={shopCart.list[val]} index={index} key={val}/>
               ))
               :
               (addLoading || <div className={styles['bet-none']}>暂无投注</div>)
           }
         </ul>
       </div>
       {
          <div className={styles['bet-total']}>
           <div className={styles.calc}>
             <div className={styles.left}>总投注额:{Number(totalBetAmount)}</div>
             <div className={styles.right}>
               总收益额:
               <span className={styles.profit}>{totalWinAmount.toFixed(2)}</span>
             </div>
           </div>
           <div className={styles.button}>
             <button
               className={styles['button-submit']}
               onClick={this.submitBets}
               type="button"
             >
               确定投注
             </button>
             <div className={styles.warning}>
               <Icon type="info-circle" />  系统将自动接收较佳收益率
             </div>
           </div>
         </div>
       }
       <Modal
         title={null}
         visible={modal}
         onCancel={this.closeModal}
         width={400}
         footer={null}
         maskClosable
       >
         <div className={styles['result-modal']}>
           <div className={styles['bet-result']}>
             <div className={styles.left} >
               <Icon type="check-circle" />
             </div>
             <div className={styles.right}>
               {orderText}
             </div>
           </div>
           {
             result && result.map((val) => (
               val.code === '208' ? (
                 <div
                   className={styles['result-item']}
                   key={val.choiceId}
                 >
                   <div className={styles['result-item-header']}>
                     <div className={styles.left}>
                       <div className={styles.title}>
                         <div className={styles.logo}/>
                       </div>
                     </div>
                     <div className={styles.text}>
                       {val.homeName}---{val.awayName}
                     </div>
                     <div
                       className={styles.flag}
                     >
                       {val.typeFlag === 2 ? '待确认' : '下注成功'}
                     </div>
                   </div>
                   <div className={styles['result-item-content']}>
                     <div className={styles['odds-name']}>
                       {val.oddName}
                     </div>
                     <div className={styles.handicap}>
                       {dishNameMap[val.name]}{val.choiceHandicap}
                     </div>
                     <div className={styles.odds}>
                       {val.dish}
                     </div>
                   </div>
                   <div className={styles['result-item-winInfo']}>
                     <div className={styles.left}>
                       投注总金额
                     </div>
                     <div className={styles.right}>
                       ￥ {val.money}
                     </div>
                   </div>
                   {
                     val.typeFlag === 2 && <div className={styles.spec}>
                       注：滚球请到历史投注中查看下注是否成功
                     </div>
                   }
                 </div>
               ) :
                 (
                 <div
                   className={styles['result-item']}
                   key={val.choiceId}
                 >
                   <div className={styles['result-item-header']}>
                     <div className={styles.left}>
                       <div className={styles.title}>
                         <div className={styles.logo}/>
                       </div>
                     </div>
                     <div className={styles.text}>
                       {val.homeName}---{val.awayName}
                     </div>
                     <div className={styles.loss}>下注失败</div>
                   </div>
                   <div className={styles['result-item-content']}>
                     <div className={styles['odds-name']}>
                       {val.oddName}
                     </div>
                     <div className={styles.handicap}>
                       {dishNameMap[val.name]}{val.choiceHandicap}
                     </div>
                     <div className={styles.odds}>
                       {val.dish}
                     </div>
                   </div>
                   <div className={styles['result-item-winInfo']}>
                     <div className={styles.left}>
                       {val.message}
                     </div>
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
