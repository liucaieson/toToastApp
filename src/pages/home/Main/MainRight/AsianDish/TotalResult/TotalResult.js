import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import { calcDateToMonthAndDay } from '@/utils/util';
import DishLayout from '../../DishLayout/betDishLayout';
import Accordion from '@/components/Accordion';
import AsianWrapper from '../AsianWarpper/wrapper1';

@connect(({ asianGG, chsDB, }) => ({
  asianGG,
  chsDB,
}))
class TotalResult extends PureComponent {

  render() {
    const {
      asianGG: {
        cptIds, matchListObj
      },
      chsDB: {chsDB},
    } = this.props;
    return (
        <AsianWrapper
          title='全场 上半场 单/双'
          gg='2'
        >
            <Row className={styles.table}>
              <Col className={styles['big-tb']} span={3}>时间</Col>
              <Col className={styles['big-tb']} span={7}>赛事</Col>
              <Col className={styles['middle-tb']} span={7}>
                <Row className={styles['cell-th']}>
                  全场
                </Row>
                <Row>
                  <Col span={12} className={styles.cell}>单</Col>
                  <Col span={12} className={styles.cell}>双</Col>
                </Row>
              </Col>
              <Col className={styles['middle-tb']} span={7}>
                <Row className={styles['cell-th']}>
                  上半场
                </Row>
                <Row>
                  <Col span={12} className={styles.cell}>单</Col>
                  <Col span={12} className={styles.cell}>双</Col>
                </Row>
              </Col>
            </Row>
            <div>
              {
                /*firstLoading ? <PageLoading/> :*/
                  (
                    <div>
                    {
                      cptIds && cptIds.length === 0 ? <div className="no-match">暂无比赛</div> : cptIds.map((val) => (
                        <div key={val}>
                          <Accordion
                            cptName={matchListObj[val] &&  matchListObj[val][0].cptName}
                          >
                            <div className={styles['match-info']}>
                              {
                                matchListObj[val] &&
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
                                      {/*全场投注区*/}
                                      <Col span={7} className={styles['match-odds']}>
                                        <Row>
                                          {
                                            v.odds[0].chs.map((item) => (
                                                <Col key={item.dishId}
                                                     span={12}
                                                     className={styles['match-odds-list']}
                                                >
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

                                        </Row>
                                      </Col>
                                      {/* 上半场投注区*/}
                                      <Col span={7} className={styles['match-odds']}>
                                        <Row>
                                          {
                                            v.odds[1] && v.odds[1].chs.map((item) => (
                                                <Col
                                                  key={item.dishId}
                                                  span={12}
                                                  className={styles['match-odds-list']}
                                                >
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
                                        </Row>
                                      </Col>
                                    </Row>
                                  </Row>
                                ))
                              }
                            </div>
                          </Accordion>
                        </div>
                      ))
                    }
                    </div>
                  )
              }
            </div>
        </AsianWrapper>


    );
  }
}

export default TotalResult;
