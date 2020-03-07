import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import DishItem from './dishItem';
import { calcDateToMonthAndDay } from '../../../../../../utils/util';

@connect(({ chsDB, betShopCart }) => ({
  chsDB,
  betShopCart,
}))
class DoubleResultItem extends PureComponent {

  render() {
    const {
      cptData, matchData,
      chsDB: { chsDB },
      betShopCart: { shopCart },
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
                  <Col span={7} className={styles['match-team']}>
                    <div>{v.homeName}</div>
                    <div>{v.awayName}</div>
                  </Col>
                  <Col span={7} className={styles['match-odds']}>
                    {
                      v.odds[0].chs.map( (item) => (
                          <Col span={8} key={item.dishId}  className={styles.item}>
                            {item.name === '1' &&
                              <DishItem
                                key={item.choiceId}
                                choiceId={item.choiceId}
                                matchId={v.matchId}
                                gamblingId={v.odds[0].gamblingId}
                                dishId={item.dishId}
                                dish={item.dish}
                              />
                            }
                            {item.name === 'X' &&
                            <DishItem
                              key={item.choiceId}
                              choiceId={item.choiceId}
                              matchId={v.matchId}
                              gamblingId={v.odds[0].gamblingId}
                              dishId={item.dishId}
                              dish={item.dish}
                            />
                            }
                            {item.name === '2' &&
                            <DishItem
                              key={item.choiceId}
                              choiceId={item.choiceId}
                              matchId={v.matchId}
                              gamblingId={v.odds[0].gamblingId}
                              dishId={item.dishId}
                              dish={item.dish}
                            />
                            }
                          </Col>
                        )
                      )
                    }
                  </Col>
                  <Col span={7} className={styles['match-odds']}>
                    {
                      v.odds[1].chs.map( (item) => (
                          <Col span={8} key={item.dishId}  className={styles.item}>
                            {item.name === '1' &&
                            <DishItem
                              key={item.choiceId}
                              choiceId={item.choiceId}
                              matchId={v.matchId}
                              gamblingId={v.odds[1].gamblingId}
                              dishId={item.dishId}
                              dish={item.dish}
                            />
                            }
                            {item.name === 'X' &&
                            <DishItem
                              key={item.choiceId}
                              choiceId={item.choiceId}
                              matchId={v.matchId}
                              gamblingId={v.odds[1].gamblingId}
                              dishId={item.dishId}
                              dish={item.dish}
                            />
                            }
                            {item.name === '2' &&
                            <DishItem
                              key={item.choiceId}
                              choiceId={item.choiceId}
                              matchId={v.matchId}
                              gamblingId={v.odds[1].gamblingId}
                              dishId={item.dishId}
                              dish={item.dish}
                            />
                            }
                          </Col>
                        )
                      )
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
