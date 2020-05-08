import React, { PureComponent } from 'react';
import DishLayout from '../../DishLayout/betDishLayout'
import styles from './index.scss';

class DoubleDishItem extends PureComponent {

  render() {
    const { matchId, gamblingId, choiceId, dishId, dish } = this.props;
    return (
        <div
          className={styles.odds}
        >
         <DishLayout
           choiceId={choiceId}
           matchId={matchId}
           gamblingId={gamblingId}
           dishId={dishId}
           dish={dish}
         />
        </div>
    );
  }
}

export default DoubleDishItem;



