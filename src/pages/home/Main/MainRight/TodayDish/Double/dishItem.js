import React from 'react';
import DishLayout from '../../DishLayout/betDishLayout'
import styles from './index.scss';

export default ({ matchId, gamblingId, choiceId, dishId, dish }) => (
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
