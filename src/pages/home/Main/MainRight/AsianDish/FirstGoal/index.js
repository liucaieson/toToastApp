import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import { calcDateToMonthAndDay } from '../../../../../../utils/util';
import DishLayout from '../../DishLayout/betDishLayout';
import Accordion from '../../../../../../components/Accordion';
import AsianWrapper from '../AsianWarpper/wrapper1';

@connect(({ asianGG, chsDB }) => ({
  asianGG,
  chsDB,
}))
class FirstGoal extends PureComponent {

  render() {
    const {
      asianGG: {
        cptIds, matchListObj
      },
      chsDB: { chsDB },
    } = this.props;
    return (
      <AsianWrapper
        gg='7'
        title='最先进球/最后进球'
      >
        <Row className={styles.table}>
          <Col className={styles['big-tb']} span={3}>时间</Col>
          <Col className={styles['big-tb']} span={7}>赛事</Col>
          <Col className={styles['middle-tb']} span={7}>
            <Row className={styles['cell-th']}>
              最先进球
            </Row>
            <Row>
              <Col span={8} className={styles.cell}>主进</Col>
              <Col span={8} className={styles.cell}>客进</Col>
              <Col span={8} className={styles.cell}>无进球</Col>
            </Row>
          </Col>
          <Col className={styles['middle-tb']} span={7}>
            <Row className={styles['cell-th']}>
              最后进球
            </Row>
            <Row>
              <Col span={8} className={styles.cell}>主进</Col>
              <Col span={8} className={styles.cell}>客进</Col>
              <Col span={8} className={styles.cell}>无进球</Col>
            </Row>
          </Col>
        </Row>
        <div>
          {
            cptIds.map((val) => (
              <div key={val}>
                <Accordion
                  cptName={matchListObj[val] && matchListObj[val][0].cptName}
                >
                  <div className={styles['match-info']}>
                    {
                      (
                        matchListObj[val].map((v) => (
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
                                  v.odds &&v.odds[0] &&  v.odds[0].chs.map((item) => (
                                      <Col span={8} key={item.dishId} className={styles.item}>
                                                      <span
                                                        className={styles.odds}
                                                      >
                                                        <DishLayout
                                                          choiceId={item.choiceId}
                                                          matchId={v.matchId}
                                                          dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                                          dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                                        />
                                                       </span>
                                      </Col>
                                    ),
                                  )
                                }
                              </Col>
                              <Col span={7} className={styles['match-odds']}>
                                {
                                 v.odds &&v.odds[1] &&  v.odds[1].chs.map((item) => (
                                      <Col span={8} key={item.dishId} className={styles.item}>
                                                      <span
                                                        className={styles.odds}
                                                      >
                                                        <DishLayout
                                                          choiceId={item.choiceId}
                                                          matchId={v.matchId}
                                                          dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                                          dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                                        />
                                                       </span>
                                      </Col>
                                    ),
                                  )
                                }
                              </Col>
                            </Row>
                          </Row>
                        ))
                      )
                    }
                  </div>
                </Accordion>

              </div>
            ))
          }
        </div>
      </AsianWrapper>


    );
  }
}

export default FirstGoal;
