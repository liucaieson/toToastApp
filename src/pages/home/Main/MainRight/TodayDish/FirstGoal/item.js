import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import DishItem from './dishItem';
import { calcDateToMonthAndDay } from '../../../../../../utils/util';
import DishLayout from '../../DishLayout/betDishLayout';
import Accordion from '../../../../../../components/Accordion';

@connect(({ chsDB }) => ({
  chsDB,
}))
class DoubleResultItem extends PureComponent {

  render() {
    const {
      cptData, matchData,
      chsDB: { chsDB },
    } = this.props;
    return (
      <div key={cptData} style={this.props.style}>
        <Accordion
          cptName={matchData[0] &&  matchData[0].cptName}
        >
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
                                dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                              />
                              }
                              {item.name === 'X' &&
                              <DishItem
                                key={item.choiceId}
                                choiceId={item.choiceId}
                                matchId={v.matchId}
                                gamblingId={v.odds[0].gamblingId}
                                dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                              />
                              }
                              {item.name === '2' &&
                              <DishItem
                                key={item.choiceId}
                                choiceId={item.choiceId}
                                matchId={v.matchId}
                                gamblingId={v.odds[0].gamblingId}
                                dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
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
                                dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                              />
                              }
                              {item.name === 'X' &&
                              <DishItem
                                key={item.choiceId}
                                choiceId={item.choiceId}
                                matchId={v.matchId}
                                gamblingId={v.odds[1].gamblingId}
                                dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                              />
                              }
                              {item.name === '2' &&
                              <DishItem
                                key={item.choiceId}
                                choiceId={item.choiceId}
                                matchId={v.matchId}
                                gamblingId={v.odds[1].gamblingId}
                                dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
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
        </Accordion>

      </div>

    );
  }
}

export default DoubleResultItem;
