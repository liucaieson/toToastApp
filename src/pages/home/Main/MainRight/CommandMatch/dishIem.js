import React from 'react';
import styles from './index.scss';
import DishLayout from '../DishLayout/betDishLayout';

export default ({ choiceHandicap, matchId, gamblingId, choiceId, dishId, dish }) => (
  <div>
    <span className={styles.handicap}>{choiceHandicap}</span>
    <span className={styles.odds}>
      <DishLayout
        choiceId={choiceId}
        matchId={matchId}
        gamblingId={gamblingId}
        dishId={dishId}
        dish={dish}
      />
    </span>
  </div>
)
