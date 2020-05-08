import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './index.scss';


@connect(({  betShopCart}) => ({
  betShopCart,
}))
class InpalyDishLayout extends PureComponent {

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
  addShopCart = (matchId, gamblingId, choiceId, id) => {
    const { dispatch, betShopCart: { shopCart } } = this.props;
    if (shopCart.ids.includes(choiceId)) {
      dispatch({
        type: 'betShopCart/delBetShopCart',
        payload: choiceId,
      });
    } else {
      dispatch({
        type: 'toggleMainLeftTabs/toggleMainLeftTabs',
        payload: 2
      });
      dispatch({
        type: 'betShopCart/addBetShopCart',
        payload: {
          sport: '1',
          choiceId,
          status: 1,
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
    const { matchId, gamblingId, choiceId, dishId, dish, betShopCart: {shopCart} } = this.props;
    return (
      <span
        className={shopCart.ids.includes(choiceId) ? `${styles.dish} ${styles.active}` : styles.dish}
        onClick={() => this.addShopCart(matchId, gamblingId, choiceId, dishId)}
      >
        {dish}
        {this.renderUp()}
     </span>
    );
  }
}

export default InpalyDishLayout;



