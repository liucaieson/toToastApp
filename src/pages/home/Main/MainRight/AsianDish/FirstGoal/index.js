import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import { calcDateToMonthAndDay } from '@/utils/util';
import DishLayout from '../../DishLayout/betDishLayout';
import Accordion from '@/components/Accordion';
import AsianWrapper from '../AsianWarpper/wrapper2';

@connect(({ asianGG6And7, chsDB }) => ({
  asianGG6And7,
  chsDB,
}))
class FirstGoal extends PureComponent {
  render() {
    const {
      asianGG6And7: {
        cptIds, matchListObj
      },
      chsDB: { chsDB },
    } = this.props;
    return (
      <AsianWrapper
        gg="7"
        title="最先进球/最后进球"
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
            cptIds && cptIds.length === 0 ? <div className="no-match">暂无比赛</div> : cptIds.map((val) => (
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
                                  v.odds[0].chs.list['1'] &&
                                     <Col span={8} className={styles.item}>
                                       <span
                                         className={styles.odds}
                                       >
                                         <DishLayout
                                           choiceId={v.odds[0].chs.list['1'].choiceId}
                                           matchId={v.matchId}
                                           dishId={chsDB[v.odds[0].chs.list['1'].choiceId] &&
                                           chsDB[v.odds[0].chs.list['1'].choiceId].dishId}
                                           dish={chsDB[v.odds[0].chs.list['1'].choiceId] &&
                                           chsDB[v.odds[0].chs.list['1'].choiceId].dish}
                                         />
                                       </span>
                                     </Col>
                                }
                                {
                                  v.odds[0].chs.list['2'] &&
                                  <Col span={8} className={styles.item}>
                                       <span
                                         className={styles.odds}
                                       >
                                         <DishLayout
                                           choiceId={v.odds[0].chs.list['2'].choiceId}
                                           matchId={v.matchId}
                                           dishId={chsDB[v.odds[0].chs.list['2'].choiceId] &&
                                           chsDB[v.odds[0].chs.list['2'].choiceId].dishId}
                                           dish={chsDB[v.odds[0].chs.list['2'].choiceId] &&
                                           chsDB[v.odds[0].chs.list['2'].choiceId].dish}
                                         />
                                       </span>
                                  </Col>
                                }
                                {
                                  v.odds[0].chs.list.X &&
                                  <Col span={8} className={styles.item}>
                                       <span
                                         className={styles.odds}
                                       >
                                         <DishLayout
                                           choiceId={v.odds[0].chs.list.X.choiceId}
                                           matchId={v.matchId}
                                           dishId={chsDB[v.odds[0].chs.list.X.choiceId] &&
                                           chsDB[v.odds[0].chs.list.X.choiceId].dishId}
                                           dish={chsDB[v.odds[0].chs.list.X.choiceId] &&
                                           chsDB[v.odds[0].chs.list.X.choiceId].dish}
                                         />
                                       </span>
                                  </Col>
                                }
                              </Col>
                              {
                                v.odds[1] &&
                                <Col span={7} className={styles['match-odds']}>
                                  {
                                    v.odds[1].chs.list['1'] &&
                                    <Col span={8} className={styles.item}>
                                       <span
                                         className={styles.odds}
                                       >
                                         <DishLayout
                                           choiceId={v.odds[1].chs.list['1'].choiceId}
                                           matchId={v.matchId}
                                           dishId={chsDB[v.odds[1].chs.list['1'].choiceId] &&
                                           chsDB[v.odds[1].chs.list['1'].choiceId].dishId}
                                           dish={chsDB[v.odds[1].chs.list['1'].choiceId] &&
                                           chsDB[v.odds[1].chs.list['1'].choiceId].dish}
                                         />
                                       </span>
                                    </Col>
                                  }
                                  {
                                    v.odds[1].chs.list['2'] &&
                                    <Col span={8} className={styles.item}>
                                       <span
                                         className={styles.odds}
                                       >
                                         <DishLayout
                                           choiceId={v.odds[1].chs.list['2'].choiceId}
                                           matchId={v.matchId}
                                           dishId={chsDB[v.odds[1].chs.list['2'].choiceId] &&
                                           chsDB[v.odds[1].chs.list['2'].choiceId].dishId}
                                           dish={chsDB[v.odds[1].chs.list['2'].choiceId] &&
                                           chsDB[v.odds[1].chs.list['2'].choiceId].dish}
                                         />
                                       </span>
                                    </Col>
                                  }
                                  {
                                    v.odds[1].chs.list.X &&
                                    <Col span={8} className={styles.item}>
                                       <span
                                         className={styles.odds}
                                       >
                                         <DishLayout
                                           choiceId={v.odds[1].chs.list.X.choiceId}
                                           matchId={v.matchId}
                                           dishId={chsDB[v.odds[1].chs.list.X.choiceId] &&
                                           chsDB[v.odds[1].chs.list.X.choiceId].dishId}
                                           dish={chsDB[v.odds[1].chs.list.X.choiceId] &&
                                           chsDB[v.odds[1].chs.list.X.choiceId].dish}
                                         />
                                       </span>
                                    </Col>
                                  }
                                </Col>
                              }
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
