import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import DishItem from './dishItem';
import { calcDateToMonthAndDay } from '../../../../../../utils/util';
import DishLayout from '../../DishLayout/betDishLayout';

@connect(({ chsDB, betShopCart }) => ({
  chsDB,
  betShopCart,
}))
class DoubleResultItem extends PureComponent {

  render() {
    const {
      cptData, matchData,
      chsDB: { chsDB },
    } = this.props;
    return (
      <div key={cptData} style={this.props.style}>
        <Row className={styles['competitions-name']}>
          <Col span={1} className={styles.arrow}>
          </Col>
          <Col span={20} className={styles.name}>
            {matchData[0].cptName}
          </Col>
        </Row>
        <div className={styles['match-info']}>
          {
            matchData.map((v) => (
              <Row className={styles['match-line-box']} key={v.matchId}>
                <Row className={styles['match-line']}>
                  <Col span={3} className={styles['match-time']}>
                    {calcDateToMonthAndDay(v.time)}
                  </Col>
                  <Col span={5} className={styles['match-team']}>
                    <div>{v.homeName}</div>
                    <div>{v.awayName}</div>
                  </Col>
                  <Col span={16}>
                    {
                      v.odds[0].chs.map((item) => (
                        <div className={styles['match-odds']} key={item.choiceId}>
                          <span className={styles.item}>
                            <DishLayout
                              choiceId={item.choiceId}
                              matchId={v.matchId}
                              dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                              dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                            />
                          </span>
                        </div>
                      ))
                    }
                  </Col>
                </Row>
              </Row>
            ))


          }
        </div>
      </div>

    );
  }
}

export default DoubleResultItem;
