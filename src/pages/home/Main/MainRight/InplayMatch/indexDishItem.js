import React, { PureComponent } from 'react';
import styles from './index.scss';
import InpalyDishLayout from '../DishLayout/inplayDishLayout';

class IndexDishItem extends PureComponent {
  render() {
    const {
      matchId,
      choiceId,
      gamblingId,
      dishId,
      dish,
      choiceHandicap
    } = this.props;
    return (
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
    );
  }
}

export default IndexDishItem;
