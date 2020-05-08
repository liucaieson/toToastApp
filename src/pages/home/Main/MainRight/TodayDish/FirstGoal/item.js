import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import DishItem from './dishItem';
import { calcDateToMonthAndDay } from '@/utils/util';
import Accordion from '@/components/Accordion';

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
          cptName={matchData[0] && matchData[0].cptName}
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
                      <Col span={8} className={styles.item}>
                        {
                          v.odds[0].chs.list['1'] &&
                          <DishItem
                            key={v.odds[0].chs.list['1'].choiceId}
                            choiceId={v.odds[0].chs.list['1'].choiceId}
                            matchId={v.matchId}
                            dishId={chsDB[v.odds[0].chs.list['1'].choiceId] && chsDB[v.odds[0].chs.list['1'].choiceId].dishId}
                            dish={chsDB[v.odds[0].chs.list['1'].choiceId] && chsDB[v.odds[0].chs.list['1'].choiceId].dish}
                          />
                        }
                      </Col>
                      <Col span={8} className={styles.item}>
                        {
                          v.odds[0].chs.list['2'] &&
                          <DishItem
                            key={v.odds[0].chs.list['2'].choiceId}
                            choiceId={v.odds[0].chs.list['2'].choiceId}
                            matchId={v.matchId}
                            dishId={chsDB[v.odds[0].chs.list['2'].choiceId] && chsDB[v.odds[0].chs.list['2'].choiceId].dishId}
                            dish={chsDB[v.odds[0].chs.list['2'].choiceId] && chsDB[v.odds[0].chs.list['2'].choiceId].dish}
                          />
                        }
                      </Col>
                      <Col span={8} className={styles.item}>
                        {
                          v.odds[0].chs.list['X'] &&
                          <DishItem
                            key={v.odds[0].chs.list['X'].choiceId}
                            choiceId={v.odds[0].chs.list['X'].choiceId}
                            matchId={v.matchId}
                            dishId={chsDB[v.odds[0].chs.list['X'].choiceId] && chsDB[v.odds[0].chs.list['X'].choiceId].dishId}
                            dish={chsDB[v.odds[0].chs.list['X'].choiceId] && chsDB[v.odds[0].chs.list['X'].choiceId].dish}
                          />
                        }
                      </Col>
                    </Col>
                    <Col span={7} className={styles['match-odds']}>
                      <Col span={8} className={styles.item}>
                        {
                          v.odds[1].chs.list['1'] &&
                          <DishItem
                            key={v.odds[1].chs.list['1'].choiceId}
                            choiceId={v.odds[1].chs.list['1'].choiceId}
                            matchId={v.matchId}
                            dishId={chsDB[v.odds[1].chs.list['1'].choiceId] && chsDB[v.odds[1].chs.list['1'].choiceId].dishId}
                            dish={chsDB[v.odds[1].chs.list['1'].choiceId] && chsDB[v.odds[1].chs.list['1'].choiceId].dish}
                          />
                        }
                      </Col>
                      <Col span={8} className={styles.item}>
                        {
                          v.odds[1].chs.list['2'] &&
                          <DishItem
                            key={v.odds[1].chs.list['2'].choiceId}
                            choiceId={v.odds[1].chs.list['2'].choiceId}
                            matchId={v.matchId}
                            dishId={chsDB[v.odds[1].chs.list['2'].choiceId] && chsDB[v.odds[1].chs.list['2'].choiceId].dishId}
                            dish={chsDB[v.odds[1].chs.list['2'].choiceId] && chsDB[v.odds[1].chs.list['2'].choiceId].dish}
                          />
                        }
                      </Col>
                      <Col span={8} className={styles.item}>
                        {
                          v.odds[1].chs.list['X'] &&
                          <DishItem
                            key={v.odds[1].chs.list['X'].choiceId}
                            choiceId={v.odds[1].chs.list['X'].choiceId}
                            matchId={v.matchId}
                            dishId={chsDB[v.odds[1].chs.list['X'].choiceId] && chsDB[v.odds[1].chs.list['X'].choiceId].dishId}
                            dish={chsDB[v.odds[1].chs.list['X'].choiceId] && chsDB[v.odds[1].chs.list['X'].choiceId].dish}
                          />
                        }
                      </Col>
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
