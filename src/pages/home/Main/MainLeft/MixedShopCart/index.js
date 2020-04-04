import React, { PureComponent,Fragment } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Icon, Modal, Checkbox, Input } from 'antd';
import BetItem from './betItem'
import styles from './index.scss';
import { groupSplit } from '@/utils/util';
import { dishNameMap } from '../../../../../utils/util';


const betTypeArr = [
  [
    {length:1, betType:1, }
  ],
  [
    {name: '单注',betType: 1,length:2},
    {name: '2串1',betType: 2,length:1},
  ],
  [
    {name: '单注',betType: 1,length:3},
    {name: '2串1',betType: 2,length:3},
    {name: '3串1',betType: 3,length:1},
  ],
  [
    {name: '单注',betType: 1,length:4},
    {name: '2串1',betType: 2,length:6},
    {name: '3串1',betType: 3,length:4},
    {name: '4串1',betType: 4,length:1},
  ],
  [
    {name: '单注',betType: 1,length:5},
    {name: '2串1',betType: 2,length:10},
    {name: '3串1',betType: 3,length:10},
    {name: '4串1',betType: 4,length:5},
    {name: '5串1',betType: 5,length:1},
  ],
  [
    {name: '单注',betType: 1,length:6},
    {name: '2串1',betType: 2,length:15},
    {name: '3串1',betType: 3,length:20},
    {name: '4串1',betType: 4,length:15},
    {name: '5串1',betType: 5,length:5},
    {name: '6串1',betType: 6,length:1},
  ],

];

@connect(({ betShopCart, userInfo,chsDB, loading}) => ({
  betShopCart,
  userInfo,
  chsDB,
  addLoading:loading.effects['betShopCart/addMixedShopCart'],
  postLoading: loading.effects['betShopCart/postMixedOrder'],
}))
class ShopCart extends PureComponent {
  logTotalBetAmount = 0;
  state = {
    showSelectOption:false,
    amount1:0,
    amount2:0,
    amount3:0,
    amount4:0,
    amount5:0,
    amount6:0,
    slideIn: false,
    mixedType:[],
    modal: false,
    result: []
  };

  submitBets  = () => {
    const { dispatch, betShopCart: {mixedShopCart}, chsDB:{chsDB},  userInfo: {balance} } = this.props;
    const { amount1, amount2, amount3, amount4, amount5, amount6} = this.state;
    let params = [];
    let dishParams = [];
    let dishRate = [];
    let amountTotal = amount1 + amount2 + amount3 + amount4 + amount5 + amount6;

    if(amountTotal >= balance.balance){
      Modal.info({
        title:'提示',
        content:'余额不足'
      });
      return false;
    }
    /* 注意mix事宜比赛ID为key的 */
    if(amount1  >= 1 || amount2  >= 1 || amount3  >= 1 || amount4  >= 1 || amount5  >= 1 && amount6  >= 1 ){
      mixedShopCart.ids.map((item) => {
        dishParams.push(chsDB[mixedShopCart.list[item].choiceId].dishId)
        dishRate.push(chsDB[mixedShopCart.list[item].choiceId].dish)
      });
      betTypeArr[mixedShopCart.ids.length - 1].map((item) => {
        if(this.state['amount'+ item.betType] >= 1){
          if(item.betType === 1){
            let dishValue=[];
            for (let i = 0; i < mixedShopCart.ids.length ; i++) {
              dishValue.push(this.state.amount1)
            }
            params.push({
              betType: item.betType,
              dishValue: dishValue.join(','),
              dishId: dishParams.join(','),
              dishRate: dishRate.join(',')
            })
          }else {
            params.push({
              betType: item.betType,
              dishValue: this.state['amount' + item.betType],
              dishId: dishParams.join(','),
              dishRate: dishRate.join(',')

            })
          }
        }
      });
    }else{
      Modal.info({
        title:'提示',
        content:'至少要投一注'});
      return false;
    }
    const param = {
      sport: "1",
      result: params
    };
    dispatch({
      type: 'betShopCart/postMixedOrder',
      payload: param,
      callback: (data) => {
        this.setState({
          modal: true,
          result: data,
          amount1: 0,
          amount2: 0,
          amount3: 0,
          amount4: 0,
          amount5: 0,
          amount6: 0,
        })
      }
    });
  };

  setAmount = (e, betType) => {
    let { value } = e.target;
    if(value.match(/[^\d]/g)){
      return false
    }
    value = +value;
    if(value > 999999){
      return false
    }
    this.setState({
      [`amount${betType}`]:value
    });
  };


  renderInput(betType){
    if(betType === 1){
      return (
        <Input className={styles.input}
               value={this.state.amount1}
               onChange={e => this.setAmount(e, 1)}
        />
      )
    }
    if(betType === 2){
      return (
        <Input className={styles.input}
               value={this.state.amount2}
               onChange={e => this.setAmount(e, 2)}
        />
      )
    }
    if(betType === 3){
      return (
        <Input className={styles.input}
               value={this.state.amount3}
               onChange={e => this.setAmount(e, 3)}
        />
      )
    }
    if(betType === 4){
      return (
        <Input className={styles.input}
               value={this.state.amount4}
               onChange={e => this.setAmount(e, 4)}
        />
      )
    }
    if(betType === 5){
      return (
        <Input className={styles.input}
               value={this.state.amount5}
               onChange={e => this.setAmount(e, 5)}
        />
      )
    }
    if(betType === 6){
      return (
        <Input className={styles.input}
               value={this.state.amount6}
               onChange={e => this.setAmount(e, 6)}
        />
      )
    }
  }

  delItem = () => {
   const {betShopCart: { mixedShopCart }} = this.props;
   const length =  mixedShopCart.ids.length;
    this.setState({
      [`amount${length}`]: 0
    });
  };

  closeModal = () => {
    this.setState({
      modal: false
    })
  };

  render() {
    const  {betShopCart: { mixedShopCart },chsDB:{ chsDB }, addLoading,postLoading} = this.props;
    const { modal, result } = this.state;
    let minProfit = 0;
    let maxProfit = 0;
    let totalAmount  = 0;
    let dishArr = [];
    const { mixedType ,showSelectOption, amount1,amount2,amount3,amount4,amount5,amount6 }= this.state;
    /* 组合讲各种玩法组合，和对象的金额相乘加入dishArr数组中 */
    if(mixedShopCart.ids.length -1 >= 0){
      betTypeArr[mixedShopCart.ids.length - 1].map((val) => {
        let r = groupSplit(mixedShopCart.ids, val.betType);
        for (let i = 0; i <r.length ; i++) {
          let c1 = 1;
          let c2 = 0;
          for (let j = 0; j <r[i].length ; j++) {
            c1 *= chsDB[mixedShopCart.list[r[i][j]].choiceId].dish
          }
          c2 = c1 * this.state['amount' + val.betType];
          if(c2 !==0){
            dishArr.push(c2)
          }
        }
      });

      if(dishArr.length !== 0){
        minProfit = Math.min.apply(null, dishArr);
        maxProfit = dishArr.reduce((prev, cur) => {
          return prev + cur
        });
      }
      betTypeArr[mixedShopCart.ids.length - 1].map((item)=> {
        totalAmount += item.length * this.state['amount'+ item.betType]
      });
    }

    return (
     <div className={styles.box}>
       {
         postLoading ? <div className={styles['box-mask']}>
           <Icon type='loading' className={styles.loading}/>
         </div>: ''
       }
       <div className={styles['bet-box']}>
         <ul className={styles['bet-list']}>
           {
             mixedShopCart.ids.length > 0 ?
               mixedShopCart.ids.map( (val,index) => (
                 <BetItem data={mixedShopCart.list[val]} index={index} key={val} delItem={this.delItem}/>
               ))
               :
               (<div className={styles['bet-none']}>暂无投注</div>)
           }
           {
             addLoading ?
             <div className={styles.mask}>
               <Icon type='loading' className={styles.loading} />
             </div> : ''
           }
         </ul>
       </div>
       {
          <div className={styles['mixed-total']}>
            <div className={styles.type}>
              <div className={styles.title}>
                <div className={styles.left}>投注类型</div>
                <div className={styles.right}>单位本金</div>
              </div>{
              mixedShopCart.ids.length >= 2 ?
                  betTypeArr[mixedShopCart.ids.length - 1].map((val,index) => (
                    <div className={styles.row} key={val.betType}>
                      <div className={styles.name}>{val.name}</div>
                      <div className={styles.length}>{val.length}<span className={styles.x}>X</span></div>
                      {this.renderInput(val.betType)}
                    </div>
                  ))

                : <div className={styles.row}>至少要选择2场比赛</div>
            }
            </div>
           <div className={styles.calc}>
             <div className={styles.left}>
               <div className={styles.text}>
               总投注额:
               </div>
               <div className={styles.amount}>
                 {totalAmount}
               </div>
             </div>
             <div className={styles.right}>预计收益:

               <span className={styles.profit}>{minProfit.toFixed(2)}~{maxProfit.toFixed(2)}</span>
               </div>
           </div>
           <div className={styles.button}>
             <button className={styles['button-submit']} onClick={this.submitBets}>
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
         <div className={styles['result-mixed-modal']}>
           <div className={styles['bet-result']}>
             <div className={styles.left} >
               <Icon type="check-circle" />
             </div>
             <div className={styles.right}>
               混合过关已下注
             </div>
           </div>
           {
             result && result.map((val) => (
               val.code === '208' ? (
                 <div className={styles['result-item']} key={val.choiceId}>
                   <div className={styles['result-item-header']}>
                     <div className={styles.left}>
                       <div className={styles.title}>
                         <div className={styles.logo}/>
                       </div>
                     </div>
                     <div className={styles.text}>
                       {val.homeName}---{val.awayName}
                     </div>
                     <div className={styles.flag}>成功</div>
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
                 </div>
               ) :(
                 <div className={styles['result-item']} key={val.choiceId}>
                   <div className={styles['result-item-header']}>
                     <div className={styles.left}>
                       <div className={styles.title}>
                         <div className={styles.logo}/>
                       </div>
                     </div>
                     <div className={styles.text}>
                       {val.homeName}---{val.awayName}
                     </div>
                     <div className={styles.loss}>失败</div>
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
                       下注失败{val.message}
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
