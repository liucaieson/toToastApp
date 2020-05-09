import React from 'react';
import styles from './index.scss';
import DishLayout from '../../DishLayout/betDishLayout';

export default ({ matchId, gamblingId, choiceId, dishId, dish }) => (
  <span className={styles.odds}>
    <DishLayout
      choiceId={choiceId}
      matchId={matchId}
      gamblingId={gamblingId}
      dishId={dishId}
      dish={dish}
    />
  </span>
)
