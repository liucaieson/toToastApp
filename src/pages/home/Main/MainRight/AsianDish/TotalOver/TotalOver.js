import React, { PureComponent} from 'react';
import {  Row, Col } from 'antd';
import { connect } from 'dva';
import { calcDateToMonthAndDay } from '@/utils/util';
import styles from './index.scss';
import Accordion from '@/components/Accordion';
import DishLayout from '../../DishLayout/betDishLayout';
import AsianWrapper from '../AsianWarpper/wrapper1';

@connect(({ asianGG, chsDB }) => ({
  asianGG,
  chsDB,
}))
class TotalOver extends PureComponent {

  render() {
    const {
      asianGG: {
        cptIds, matchListObj,
      },

      chsDB: { chsDB },
    } = this.props;
    return (
      <AsianWrapper
        title='全场 上半场 进球总数'
        gg='3'
      >
        <Row className={styles.table}>
          <Col className={styles['big-tb']} span={2}>时间</Col>
          <Col className={styles['big-tb']} span={4}>赛事</Col>
          <Col className={styles['middle-tb']} span={10}>
            <Row className={styles['cell-th']}>
              全场进球总数
            </Row>
            <Row>
              <Col span={3} className={styles.cell}>0</Col>
              <Col span={3} className={styles.cell}>1</Col>
              <Col span={3} className={styles.cell}>2</Col>
              <Col span={3} className={styles.cell}>3</Col>
              <Col span={3} className={styles.cell}>4</Col>
              <Col span={3} className={styles.cell}>5</Col>
              <Col span={3} className={styles.cell}>6</Col>
              <Col span={3} className={styles.cell}>7+</Col>
            </Row>
          </Col>
          <Col className={styles['middle-tb']} span={8}>
            <Row className={styles['cell-th']}>
              上半场进球总数
            </Row>
            <Row>
              <Col span={4} className={styles.cell}>0</Col>
              <Col span={4} className={styles.cell}>1</Col>
              <Col span={4} className={styles.cell}>2</Col>
              <Col span={4} className={styles.cell}>3</Col>
              <Col span={4} className={styles.cell}>4</Col>
              <Col span={4} className={styles.cell}>5+</Col>
            </Row>
          </Col>
        </Row>
        <div>
          {
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
                            matchListObj[val] && matchListObj[val].map((v) => (
                              <Row className={styles['match-line-box']} key={v.matchId}>
                                <Row className={styles['match-line']}>
                                  <Col span={2} className={styles['match-time']}>
                                    {calcDateToMonthAndDay(v.time)}
                                  </Col>
                                  <Col span={4} className={styles['match-team']}>
                                    <div>{v.homeName}</div>
                                    <div>{v.awayName}</div>
                                  </Col>
                                  {/*全场投注区*/}
                                  <Col span={10} className={styles['match-odds']}>
                                    {
                                      v.odds[0].chs.map((item) => (
                                          <Col key={item.dishId} span={3} className={styles['odds-item']}>
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
                                  {/* 上半场投注区*/}
                                  <Col span={8} className={styles['match-odds']}>
                                    {
                                      v.odds[1] ? v.odds[1].chs.map((item) => (
                                          <Col key={item.dishId} span={4} className={styles['odds-item']}>
                                                      <span
                                                        className={styles.odds}>
                                                        <DishLayout
                                                          choiceId={item.choiceId}
                                                          matchId={v.matchId}
                                                          dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                                          dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                                        />
                                                      </span>
                                          </Col>
                                        ),
                                      ) : ''
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
          }
        </div>
      </AsianWrapper>

    );
  }
}

export default TotalOver;
