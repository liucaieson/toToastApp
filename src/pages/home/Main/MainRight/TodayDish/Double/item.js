import React, { PureComponent, Fragment } from 'react';
import { Icon, Row, Col } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import DishItem from './dishItem'
import { calcDateToMonthAndDay } from '../../../../../../utils/util';

@connect(({ chsDB }) => ({
  chsDB,
}))
class Double extends PureComponent {

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
                  <Col span={6} className={styles['match-team']}>
                    <div>{v.homeName}</div>
                    <div>{v.awayName}</div>
                  </Col>
                  <Col span={5} className={styles['match-odds']}>
                      {
                        v.odds && v.odds[0].chs.map((item) => (
                            <Fragment key={item.dishId}>
                              {item.name === '1' && <div key={item.dishId}
                                                         className={styles['match-odds-item']}
                              >
                                <DishItem
                                  key={item.choiceId}
                                  choiceId={item.choiceId}
                                  matchId={v.matchId}
                                  gamblingId={v.odds[0].gamblingId}
                                  dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                  dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                />
                              </div>}
                              {item.name === 'X' && <div key={item.dishId}
                                                         className={styles['match-odds-item']}
                              >
                                <DishItem
                                  key={item.choiceId}
                                  choiceId={item.choiceId}
                                  matchId={v.matchId}
                                  gamblingId={v.odds[0].gamblingId}
                                  dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                  dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                />
                              </div>}
                              {item.name === '2' && <div key={item.dishId}
                                                         className={styles['match-odds-item']}
                              >
                                <DishItem
                                  key={item.choiceId}
                                  choiceId={item.choiceId}
                                  matchId={v.matchId}
                                  gamblingId={v.odds[0].gamblingId}
                                  dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                  dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                />
                              </div>}
                            </Fragment>
                          ),
                        )
                      }
                  </Col>
                  <Col span={5} className={styles['match-odds']}>

                      {
                        v.odds && v.odds[1].chs.map((item) => (
                            <Fragment key={item.dishId}>
                              {item.name === '1' && <div key={item.dishId}
                                                         className={styles['match-odds-item']}
                              >
                                <DishItem
                                  key={item.choiceId}
                                  choiceId={item.choiceId}
                                  matchId={v.matchId}
                                  gamblingId={v.odds[1].gamblingId}
                                  dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                  dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                />
                              </div>}
                              {item.name === 'X' && <div key={item.dishId}
                                                         className={styles['match-odds-item']}
                              >
                                <DishItem
                                  key={item.choiceId}
                                  choiceId={item.choiceId}
                                  matchId={v.matchId}
                                  gamblingId={v.odds[1].gamblingId}
                                  dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                  dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                />
                              </div>}
                              {item.name === '2' && <div key={item.dishId}
                                                         className={styles['match-odds-item']}
                              >
                                <DishItem
                                  key={item.choiceId}
                                  choiceId={item.choiceId}
                                  matchId={v.matchId}
                                  gamblingId={v.odds[1].gamblingId}
                                  dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                  dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                />
                              </div>}
                            </Fragment>
                          ),
                        )
                      }
                  </Col>
                  <Col span={5} className={styles['match-odds']}>
                      {
                        v.odds && v.odds[2].chs.map((item) => (
                            <Fragment key={item.dishId}>
                              {item.name === '1X' && <div key={item.dishId}
                                                          className={styles['match-odds-item']}
                              >
                                <DishItem
                                  key={item.choiceId}
                                  choiceId={item.choiceId}
                                  matchId={v.matchId}
                                  gamblingId={v.odds[2].gamblingId}
                                  dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                  dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                />
                              </div>}
                              {item.name === '12' && <div key={item.dishId}
                                                          className={styles['match-odds-item']}

                              >
                                <DishItem
                                  key={item.choiceId}
                                  choiceId={item.choiceId}
                                  matchId={v.matchId}
                                  gamblingId={v.odds[2].gamblingId}
                                  dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                  dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                />
                              </div>}
                              {item.name === 'X2' && <div key={item.dishId}
                                                          className={styles['match-odds-item']}
                              >
                                <DishItem
                                  key={item.choiceId}
                                  choiceId={item.choiceId}
                                  matchId={v.matchId}
                                  gamblingId={v.odds[2].gamblingId}
                                  dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                  dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                />
                              </div>}
                            </Fragment>
                          ),
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

export default Double;
