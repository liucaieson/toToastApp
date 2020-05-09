import React from 'react';
import styles from './index.scss';
import CorrectScoreDishLayout from '../../DishLayout/correntScoreDishLayout';

export default ({ matchId, gamblingId, choiceId, dishId, dish, name }) => (
  <div className={styles['match-odds-item']} key={choiceId}>
    <div className={styles.name}>{name}</div>
    <div className={styles.odds}>
      <CorrectScoreDishLayout
        choiceId={choiceId}
        matchId={matchId}
        gamblingId={gamblingId}
        dishId={dishId}
        dish={dish}
      />
    </div>
  </div>

)
