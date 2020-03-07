import React, { PureComponent, Fragment } from 'react';
import DishLayout from '../../DishLayout/betDishLayout/index';
import styles from './index.scss';

class DoubleResultDishItem extends PureComponent {

  render() {
    const { matchId, gamblingId, choiceId, dishId, dish } = this.props;
    return (
      <div
        className={styles.item}
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

export default DoubleResultDishItem;



