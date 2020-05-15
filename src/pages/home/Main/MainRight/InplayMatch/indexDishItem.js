import React from 'react';
import styles from './index.scss';
import InpalyDishLayout from '../DishLayout/inplayDishLayout';

export default ({ matchId, choiceId, gamblingId, dishId, dish, choiceHandicap }) => (
      <div>
        <span className={styles.handicap}>{choiceHandicap}</span>
        <span className={styles.odds}>
          <InpalyDishLayout
            choiceId={choiceId}
            matchId={matchId}
            gamblingId={gamblingId}
            dishId={dishId}
            dish={dish}
          />
       </span>
      </div>
    )
