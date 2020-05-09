import React from 'react';
import styles from './index.scss';
import MixedDishLayout from '../../DishLayout/mixedDishLayout';

export default ({ matchId, gamblingId, choiceId, dishId, dish }) => (
  <span className={styles.odds}>
    <MixedDishLayout
      choiceId={choiceId}
      matchId={matchId}
      gamblingId={gamblingId}
      dishId={dishId}
      dish={dish}
    />
  </span>
)
