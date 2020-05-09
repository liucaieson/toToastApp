import React from 'react';
import { Col } from 'antd';
import styles from './index.scss';
import DishLayout from '../../DishLayout/betDishLayout';

export default ({ matchId, gamblingId, choiceId, dishId, dish }) => (
  <Col
    key={choiceId}
    span={12}
    className={styles['match-odds-list']}
  >
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
