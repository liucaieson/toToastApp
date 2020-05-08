import React, { PureComponent } from 'react';
import { Col } from 'antd'
import styles from './index.scss';
import DishLayout from '../../DishLayout/betDishLayout';

class TotalResultDishItem extends PureComponent {

  render() {
    const { matchId, gamblingId, choiceId, dishId, dish} = this.props;
    return (
        <Col key={choiceId} span={12} className={styles['match-odds-list']}>
          <span
            className={styles.odds}
          >
          <DishLayout
            choiceId={choiceId}
            matchId={matchId}
            gamblingId={gamblingId}
            dishId={dishId}
            dish={dish}
          />
          </span>
        </Col>
    );
  }
}

export default TotalResultDishItem;



