import React, { Component, Fragment } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import DishItem from './dishItem';
import { calcDateToMonthAndDay } from '../../../../../../utils/util';
import Accordion from '../../../../../../components/Accordion';
import DishLayout from '../../DishLayout/betDishLayout';


@connect(({  chsDB, betShopCart }) => ({
  betShopCart,
  chsDB,
}))
class TotalResultItem extends Component {
  state = {};

  render() {
    const {
      cptData, matchData,
      chsDB:{ chsDB }
    } = this.props;
    return (
      <div key={cptData} style={this.props.style} >
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
                      <Row>
                        {
                          v.odds[0].chs.map((item) => (
                              <DishItem
                                key={item.choiceId}
                                choiceId={item.choiceId}
                                matchId={v.matchId}
                                gamblingId={v.odds[0].gamblingId}
                                dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                              />
                            ),
                          )
                        }
                      </Row>
                    </Col>
                    <Col span={7} className={styles['match-odds']}>
                      <Row>
                        {
                          v.odds[1] && v.odds[1].chs.map((item) => (
                              <DishItem
                                key={item.choiceId}
                                choiceId={item.choiceId}
                                matchId={v.matchId}
                                gamblingId={v.odds[1].gamblingId}
                                dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                              />
                            ),
                          )
                        }
                      </Row>
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

export default TotalResultItem;
