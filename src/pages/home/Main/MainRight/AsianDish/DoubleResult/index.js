import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import { calcDateToMonthAndDay } from '@/utils/util';
import DishLayout from '../../DishLayout/betDishLayout';
import Accordion from '@/components/Accordion';
import AsianWrapper from '../AsianWarpper/wrapper2';

@connect(({ asianGG6And7, dates, chsDB, showCompetitions, competitions, loading }) => ({
  asianGG6And7,
  showCompetitions,
  competitions,
  dates,
  chsDB,
  loading: loading.effects['asianGG6And7/fetchMatchOdds'],
}))
class DoubleResult extends PureComponent {
  render() {
    const {
      asianGG6And7: {
        cptIds, matchListObj
      },
      chsDB: { chsDB },
    } = this.props;
    return (
      <AsianWrapper
        gg="6"
        title="半场/全场"
      >
        <Row className={styles.table}>
          <Col className={styles['big-tb']} span={3}>时间</Col>
          <Col className={styles['big-tb']} span={5}>赛事</Col>
          <Col className={styles['big-tb']} span={16}>
            <div className={styles.cell}>主/主</div>
            <div className={styles.cell}>主/客</div>
            <div className={styles.cell}>主/和</div>
            <div className={styles.cell}>客/主</div>
            <div className={styles.cell}>客/客</div>
            <div className={styles.cell}>客/和</div>
            <div className={styles.cell}>和/主</div>
            <div className={styles.cell}>和/客</div>
            <div className={styles.cell}>和/和</div>
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
                          <Row
                            className={styles['match-line-box']}
                            key={v.matchId}
                          >
                            <Row className={styles['match-line']}>
                              <Col
                                span={3}
                                className={styles['match-time']}
                              >
                                {calcDateToMonthAndDay(v.time)}
                              </Col>
                              <Col
                                span={5}
                                className={styles['match-team']}
                              >
                                <div>{v.homeName}</div>
                                <div>{v.awayName}</div>
                              </Col>
                              <Col span={16}>
                                {/* {
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
                                          } */}
                                <div className={styles['match-odds']}>
                                  {
                                    v.odds[0].chs.list['11'] &&
                                    <span className={styles.item}>
                                               <DishLayout
                                                 choiceId={v.odds[0].chs.list['11'].choiceId}
                                                 matchId={v.matchId}
                                                 dishId={chsDB[v.odds[0].chs.list['11'].choiceId] && chsDB[v.odds[0].chs.list['11'].choiceId].dishId}
                                                 dish={chsDB[v.odds[0].chs.list['11'].choiceId] && chsDB[v.odds[0].chs.list['11'].choiceId].dish}
                                               />
                                      </span>
                                  }
                                </div>
                                <div className={styles['match-odds']}>
                                  {
                                    v.odds[0].chs.list['12'] &&
                                    <span className={styles.item}>
                                               <DishLayout
                                                 choiceId={v.odds[0].chs.list['12'].choiceId}
                                                 matchId={v.matchId}
                                                 dishId={chsDB[v.odds[0].chs.list['12'].choiceId] && chsDB[v.odds[0].chs.list['12'].choiceId].dishId}
                                                 dish={chsDB[v.odds[0].chs.list['12'].choiceId] && chsDB[v.odds[0].chs.list['12'].choiceId].dish}
                                               />
                                      </span>
                                  }
                                </div>
                                <div className={styles['match-odds']}>
                                  {
                                    v.odds[0].chs.list['1X'] &&
                                    <span className={styles.item}>
                                               <DishLayout
                                                 choiceId={v.odds[0].chs.list['1X'].choiceId}
                                                 matchId={v.matchId}
                                                 dishId={chsDB[v.odds[0].chs.list['1X'].choiceId] && chsDB[v.odds[0].chs.list['1X'].choiceId].dishId}
                                                 dish={chsDB[v.odds[0].chs.list['1X'].choiceId] && chsDB[v.odds[0].chs.list['1X'].choiceId].dish}
                                               />
                                      </span>
                                  }

                                </div>
                                <div className={styles['match-odds']}>
                                  {
                                    v.odds[0].chs.list['21'] &&
                                    <span className={styles.item}>
                                               <DishLayout
                                                 choiceId={v.odds[0].chs.list['21'].choiceId}
                                                 matchId={v.matchId}
                                                 dishId={chsDB[v.odds[0].chs.list['21'].choiceId] && chsDB[v.odds[0].chs.list['21'].choiceId].dishId}
                                                 dish={chsDB[v.odds[0].chs.list['21'].choiceId] && chsDB[v.odds[0].chs.list['21'].choiceId].dish}
                                               />
                                      </span>
                                  }
                                </div>
                                <div className={styles['match-odds']}>
                                  {
                                    v.odds[0].chs.list['22'] &&
                                    <span className={styles.item}>
                                               <DishLayout
                                                 choiceId={v.odds[0].chs.list['22'].choiceId}
                                                 matchId={v.matchId}
                                                 dishId={chsDB[v.odds[0].chs.list['22'].choiceId] && chsDB[v.odds[0].chs.list['22'].choiceId].dishId}
                                                 dish={chsDB[v.odds[0].chs.list['22'].choiceId] && chsDB[v.odds[0].chs.list['22'].choiceId].dish}
                                               />
                                      </span>
                                  }
                                </div>
                                <div className={styles['match-odds']}>
                                  {
                                    v.odds[0].chs.list['2X'] &&
                                    <span className={styles.item}>
                                               <DishLayout
                                                 choiceId={v.odds[0].chs.list['2X'].choiceId}
                                                 matchId={v.matchId}
                                                 dishId={chsDB[v.odds[0].chs.list['2X'].choiceId] && chsDB[v.odds[0].chs.list['2X'].choiceId].dishId}
                                                 dish={chsDB[v.odds[0].chs.list['2X'].choiceId] && chsDB[v.odds[0].chs.list['2X'].choiceId].dish}
                                               />
                                            </span>
                                  }
                                </div>

                                <div className={styles['match-odds']}>
                                  {
                                    v.odds[0].chs.list.X1 &&
                                    <span className={styles.item}>
                                               <DishLayout
                                                 choiceId={v.odds[0].chs.list.X1.choiceId}
                                                 matchId={v.matchId}
                                                 dishId={chsDB[v.odds[0].chs.list.X1.choiceId] && chsDB[v.odds[0].chs.list.X1.choiceId].dishId}
                                                 dish={chsDB[v.odds[0].chs.list.X1.choiceId] && chsDB[v.odds[0].chs.list.X1.choiceId].dish}
                                               />
                                      </span>
                                  }
                                </div>
                                <div className={styles['match-odds']}>
                                  {
                                    v.odds[0].chs.list.X2 &&
                                    <span className={styles.item}>
                                               <DishLayout
                                                 choiceId={v.odds[0].chs.list.X2.choiceId}
                                                 matchId={v.matchId}
                                                 dishId={chsDB[v.odds[0].chs.list.X2.choiceId] && chsDB[v.odds[0].chs.list.X2.choiceId].dishId}
                                                 dish={chsDB[v.odds[0].chs.list.X2.choiceId] && chsDB[v.odds[0].chs.list.X2.choiceId].dish}
                                               />
                                      </span>
                                  }
                                </div>
                                <div className={styles['match-odds']}>
                                  {
                                    v.odds[0].chs.list.XX &&
                                    <span className={styles.item}>
                                               <DishLayout
                                                 choiceId={v.odds[0].chs.list.XX.choiceId}
                                                 matchId={v.matchId}
                                                 dishId={chsDB[v.odds[0].chs.list.XX.choiceId] && chsDB[v.odds[0].chs.list.XX.choiceId].dishId}
                                                 dish={chsDB[v.odds[0].chs.list.XX.choiceId] && chsDB[v.odds[0].chs.list.XX.choiceId].dish}
                                               />
                                      </span>
                                  }
                                </div>


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

export default DoubleResult;
