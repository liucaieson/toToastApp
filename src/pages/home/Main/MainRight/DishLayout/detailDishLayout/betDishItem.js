import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './index.scss';
import { dishNameMap } from '@/utils/util';


@connect(({ betShopCart }) => ({
  betShopCart,
}))
class BetDishItem extends PureComponent {
  state = {
    up: 0,
    prevDish: 0,
  };

  static getDerivedStateFromProps (props, state) {
    if (state.prevDish === 0) {
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
          status: 0,
          dishId: id,
        },
      });
    }
  };

  renderUp() {
    const { up } = this.state;
    if (up === 1) {
      return <div className={styles.up}/>
    }
    if (up === -1) {
      return <div className={styles.down}/>
    }
    return null
  }

  render() {
    const {
      betShopCart: { shopCart },
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
           className={shopCart.ids.includes(choiceId) ? `${styles.item} ${styles.active}` : styles.item}
           onClick={() => this.addShopCart(matchId, gamblingId, choiceId, dishId)}
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

export default BetDishItem;
