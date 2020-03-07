import React, { PureComponent, Fragment } from 'react';
import { Col } from 'antd'
import { connect } from 'dva';
import styles from './index.scss';
import DishLayout from '../../DishLayout/betDishLayout/index';

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



