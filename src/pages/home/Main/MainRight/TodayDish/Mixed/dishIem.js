import React, { PureComponent, Fragment } from 'react';
import styles from './index.scss';
import MixedDishLayout from '../../DishLayout/mixedDishLayout/index'

class MixedDishItem extends PureComponent {

  render() {
    const { matchId, gamblingId, choiceId, dishId, dish } = this.props;
    return (

         <span className={styles.odds}>
           <MixedDishLayout
             choiceId={choiceId}
             matchId={matchId}
             gamblingId={gamblingId}
             dishId={dishId}
             dish={dish}
           />
         </span>


    );
  }
}

export default MixedDishItem;
