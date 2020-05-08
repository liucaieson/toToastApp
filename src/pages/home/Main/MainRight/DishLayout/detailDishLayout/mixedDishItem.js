import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './index.scss';
import { dishNameMap } from '@/utils/util';


@connect(({ betShopCart, loading }) => ({
  betShopCart,
  addLoading: loading.effects['betShopCart/addMixedShopCart'],
}))
class MixedDishItem extends PureComponent {

  state = {
    up: 0,
    prevDish: 0,
  };

  static getDerivedStateFromProps (props, state) {
    if(state.prevDish === 0 ){
      return {
        up: 0,
        prevDish: props.dish
      }
    }
    if (props.dish > state.prevDish) {
      return {
        up: 1,
        prevDish: props.dish
      }
    }
    if (props.dish < state.prevDish) {
      return {
        up: -1,
        prevDish: props.dish
      }
    }
    return null
  }


  /* 添加投注单到购物车 */
  addMixedShopCart = (matchId , gamblingId, choiceId, id) => {
    const { dispatch, betShopCart: { mixedShopCart } , addLoading} = this.props;
    if (addLoading) {
      return;
    }
    if (mixedShopCart.list[matchId] && mixedShopCart.list[matchId].choiceId === choiceId) {
      dispatch({
        type: 'betShopCart/delMixedShopCart',
        payload: matchId
      });
    } else {
      dispatch({
        type: 'toggleMainLeftTabs/toggleMainLeftTabs',
        payload: 3
      });
      dispatch({
        type: 'betShopCart/addMixedShopCart',
        payload: {
          status: 0,
          sport: '1',
          dishId: id,
        },
      });
    }
  };

  renderUp(){
    const { up } = this.state;
    if(up === 0){
      return ''
    }
    if( up === 1){
      return <div className={styles.up}/>
    }
    if( up === -1){
      return <div className={styles.down}/>
    }
  }

  render() {
    const {
      betShopCart: { mixedShopCart },
      matchId,
      choiceId,
      gamblingId,
      dishId,
      dish,
      name,
      choiceHandicap
    } = this.props;
    return (
      <div key={choiceId}
           className={(mixedShopCart.list[matchId] && mixedShopCart.list[matchId].choiceId === choiceId)? `${styles.item} ${styles.active}` : styles.item}
           onClick={() => this.addMixedShopCart(matchId, gamblingId, choiceId, dishId)}
      >
        <div className={styles.name}>
          {dishNameMap[name]}
          <span className={styles.handicap}>
               {choiceHandicap && `(${choiceHandicap})`}
           </span>
        </div>
        <div className={styles.dish}>
          {dish}
          {this.renderUp()}
        </div>
      </div>
    );
  }
}

export default MixedDishItem;
