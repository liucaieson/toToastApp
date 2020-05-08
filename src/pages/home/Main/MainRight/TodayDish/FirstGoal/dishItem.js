import React, { PureComponent } from 'react';
import styles from './index.scss';
import DishLayout from '../../DishLayout/betDishLayout';

class FirstGoalDishItem extends PureComponent {

  render() {
    const { matchId, gamblingId, choiceId, dishId, dish } = this.props;
    return (
      <span className={styles.odds}>
         <DishLayout
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

export default FirstGoalDishItem;



