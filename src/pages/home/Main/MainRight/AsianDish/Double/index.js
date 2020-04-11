import React, { PureComponent, Fragment } from 'react';
import {  Row, Col } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import { calcDateToMonthAndDay } from '../../../../../../utils/util';
import DishLayout from '../../DishLayout/betDishLayout';
import Accordion from '../../../../../../components/Accordion';
import AsianWrapper from '../AsianWarpper/wrapper1';

@connect(({ asianGG,chsDB}) => ({
  asianGG,
  chsDB,
}))
class Double extends PureComponent {

  render() {
    const {
      asianGG: {
        cptIds, matchListObj
      },
      chsDB: { chsDB },
    } = this.props;
    return (
      <AsianWrapper
        gg='4'
        title='1X2 双重机会'
      >
        <Row className={styles.table}>
          <Col className={styles['big-tb']} span={3}>时间</Col>
          <Col className={styles['big-tb']} span={6}>赛事</Col>
          <Col className={styles['middle-tb']} span={5}>
            <Row className={styles['cell-th']}>
              全场
            </Row>
            <Row>
              <Col span={8} className={styles.cell}>主胜(1)</Col>
              <Col span={8} className={styles.cell}>平局(1)</Col>
              <Col span={8} className={styles.cell}>客胜(1)</Col>
            </Row>
          </Col>
          <Col className={styles['middle-tb']} span={5}>
            <Row className={styles['cell-th']}>
              上半场
            </Row>
            <Row>
              <Col span={8} className={styles.cell}>主胜(1)</Col>
              <Col span={8} className={styles.cell}>平局(1)</Col>
              <Col span={8} className={styles.cell}>客胜(1)</Col>
            </Row>
          </Col>
          <Col className={styles['middle-tb']} span={5}>
            <Row className={styles['cell-th']}>
              双重机会
            </Row>
            <Row>
              <Col span={8} className={styles.cell}>1X</Col>
              <Col span={8} className={styles.cell}>12</Col>
              <Col span={8} className={styles.cell}>X2</Col>
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
                              <Col span={6} className={styles['match-team']}>
                                <div>{v.homeName}</div>
                                <div>{v.awayName}</div>
                              </Col>
                              <Col span={5} className={styles['match-odds']}>
                                {
                                  v.odds && v.odds[0] && v.odds[0].chs.map((item) => (
                                      <Fragment key={item.dishId}>
                                        {item.name === '1' && <div key={item.dishId}
                                                                   className={styles['match-odds-item']}
                                        >
                                                    <span className={styles.odds}>
                                                      <DishLayout
                                                        choiceId={item.choiceId}
                                                        matchId={v.matchId}
                                                        dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                                        dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                                      />
                                                    </span>
                                        </div>}
                                        {item.name === 'X' &&
                                        <div key={item.dishId} className={styles['match-odds-item']}>
                                                    <span className={styles.odds}>
                                                      <DishLayout
                                                        choiceId={item.choiceId}
                                                        matchId={v.matchId}
                                                        dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                                        dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                                      />
                                                    </span>
                                        </div>}
                                        {item.name === '2' &&
                                        <div key={item.dishId} className={styles['match-odds-item']}>
                                                            <span className={styles.odds}>
                                                              <DishLayout
                                                                choiceId={item.choiceId}
                                                                matchId={v.matchId}
                                                                dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                                                dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                                              />
                                                            </span>
                                        </div>}
                                      </Fragment>
                                    ),
                                  )
                                }
                              </Col>
                              <Col span={5} className={styles['match-odds']}>
                                {
                                  v.odds && v.odds[1] && v.odds[1].chs.map((item) => (
                                      <Fragment key={item.dishId}>
                                        {item.name === '1' &&
                                        <div key={item.dishId} className={styles['match-odds-item']}>
                                                           <span className={styles.odds}>
                                                              <DishLayout
                                                                choiceId={item.choiceId}
                                                                matchId={v.matchId}
                                                                dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                                                dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                                              />
                                                            </span>
                                        </div>
                                        }
                                        {item.name === 'X' &&
                                        <div key={item.dishId} className={styles['match-odds-item']}>
                                                          <span className={styles.odds}>
                                                            <DishLayout
                                                              choiceId={item.choiceId}
                                                              matchId={v.matchId}
                                                              dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                                              dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                                            />
                                                           </span>
                                        </div>
                                        }
                                        {item.name === '2' && <div key={item.dishId}
                                                                   className={styles['match-odds-item']}
                                        >
                                                          <span className={styles.odds}>
                                                            <DishLayout
                                                              choiceId={item.choiceId}
                                                              matchId={v.matchId}
                                                              dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                                              dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                                            />
                                                          </span>
                                        </div>}
                                      </Fragment>
                                    ),
                                  )
                                }
                              </Col>
                              <Col span={5} className={styles['match-odds']}>
                                {
                                  v.odds && v.odds[2] && v.odds[2].chs.map((item) => (
                                      <Fragment key={item.dishId}>
                                        {item.name === '1X' && <div key={item.dishId}
                                                                    className={styles['match-odds-item']}

                                        >
                                                          <span className={styles.odds}>
                                                            <DishLayout
                                                              choiceId={item.choiceId}
                                                              matchId={v.matchId}
                                                              dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                                              dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                                            />
                                                          </span>
                                        </div>}
                                        {item.name === '12' &&
                                        <div key={item.dishId} className={styles['match-odds-item']}>
                                                          <span className={styles.odds}>
                                                            <DishLayout
                                                              choiceId={item.choiceId}
                                                              matchId={v.matchId}
                                                              dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                                              dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                                            />
                                                          </span>
                                        </div>}
                                        {item.name === 'X2' &&
                                        <div key={item.dishId} className={styles['match-odds-item']}>
                                                          <span
                                                            className={styles.odds}>
                                                            <DishLayout
                                                              choiceId={item.choiceId}
                                                              matchId={v.matchId}
                                                              dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                                              dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                                            />
                                                          </span>
                                        </div>}
                                      </Fragment>
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

export default Double;
