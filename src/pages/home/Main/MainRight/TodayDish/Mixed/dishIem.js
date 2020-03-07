import React, { PureComponent, Fragment } from 'react';
import styles from './index.scss';
import MixedDishLayout from '../../DishLayout/mixedDishLayout/index'

class MixedDishItem extends PureComponent {

  render() {
    const {choiceHandicap, matchId, gamblingId, choiceId, dishId, dish } = this.props;
    return (
       <div>
         <span className={styles.handicap}>{choiceHandicap}</span>
         <span className={styles.odds}>
           <MixedDishLayout
             choiceId={choiceId}
             matchId={matchId}
             gamblingId={gamblingId}
             dishId={dishId}
             dish={dish}
           />
         </span>
       </div>

    );
  }
}

export default MixedDishItem;
