import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import DishItem from './dishItem';
import { calcDateToMonthAndDay } from '../../../../../../utils/util';

@connect(({ chsDB, betShopCart }) => ({
  chsDB,
  betShopCart,
}))
class DoubleResultItem extends PureComponent {

  turnToMatchDetail = () => {

  };


  render() {
    const {
      cptData, matchData,
      chsDB: { chsDB },
      betShopCart: { shopCart },
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
                  <Col span={5} className={styles['match-team']}>
                    <div>{v.homeName}</div>
                    <div>{v.awayName}</div>
                  </Col>
                  <Col span={16}>
                    <div className={styles['match-odds']}>
                      {
                        v.odds[0].chs.list['11'] &&
                        <DishItem
                          key={v.odds[0].chs.list['11'].choiceId}
                          choiceId={v.odds[0].chs.list['11'].choiceId}
                          matchId={v.matchId}
                          gamblingId={v.odds[0].gamblingId}
                          dishId={v.odds[0].chs.list['11'].dishId}
                          dish={v.odds[0].chs.list['11'].dish}
                        />
                      }

                    </div>
                    <div className={styles['match-odds']}>
                      {
                        v.odds[0].chs.list['1X'] &&
                        <DishItem
                          key={v.odds[0].chs.list['1X'].choiceId}
                          choiceId={v.odds[0].chs.list['1X'].choiceId}
                          matchId={v.matchId}
                          gamblingId={v.odds[0].gamblingId}
                          dishId={v.odds[0].chs.list['1X'].dishId}
                          dish={v.odds[0].chs.list['1X'].dish}
                        />
                      }

                    </div>
                    <div className={styles['match-odds']}>
                      {
                        v.odds[0].chs.list['12'] &&
                        <DishItem
                          key={v.odds[0].chs.list['12'].choiceId}
                          choiceId={v.odds[0].chs.list['12'].choiceId}
                          matchId={v.matchId}
                          gamblingId={v.odds[0].gamblingId}
                          dishId={v.odds[0].chs.list['12'].dishId}
                          dish={v.odds[0].chs.list['12'].dish}
                        />
                      }
                    </div>
                    <div className={styles['match-odds']}>
                      {
                        v.odds[0].chs.list['X1'] &&
                        <DishItem
                          key={v.odds[0].chs.list['X1'].choiceId}
                          choiceId={v.odds[0].chs.list['X1'].choiceId}
                          matchId={v.matchId}
                          gamblingId={v.odds[0].gamblingId}
                          dishId={v.odds[0].chs.list['X1'].dishId}
                          dish={v.odds[0].chs.list['X1'].dish}
                        />
                      }
                    </div>
                    <div className={styles['match-odds']}>
                      {
                        v.odds[0].chs.list['XX'] &&
                        <DishItem
                          key={v.odds[0].chs.list['XX'].choiceId}
                          choiceId={v.odds[0].chs.list['XX'].choiceId}
                          matchId={v.matchId}
                          gamblingId={v.odds[0].gamblingId}
                          dishId={v.odds[0].chs.list['XX'].dishId}
                          dish={v.odds[0].chs.list['XX'].dish}
                        />
                      }
                    </div>
                    <div className={styles['match-odds']}>
                      {
                        v.odds[0].chs.list['X2'] &&
                        <DishItem
                          key={v.odds[0].chs.list['X2'].choiceId}
                          choiceId={v.odds[0].chs.list['X2'].choiceId}
                          matchId={v.matchId}
                          gamblingId={v.odds[0].gamblingId}
                          dishId={v.odds[0].chs.list['X2'].dishId}
                          dish={v.odds[0].chs.list['X2'].dish}
                        />
                      }
                    </div>
                    <div className={styles['match-odds']}>
                      {
                        v.odds[0].chs.list['21'] &&
                        <DishItem
                          key={v.odds[0].chs.list['21'].choiceId}
                          choiceId={v.odds[0].chs.list['21'].choiceId}
                          matchId={v.matchId}
                          gamblingId={v.odds[0].gamblingId}
                          dishId={v.odds[0].chs.list['21'].dishId}
                          dish={v.odds[0].chs.list['21'].dish}
                        />
                      }
                    </div>
                    <div className={styles['match-odds']}>
                      {
                        v.odds[0].chs.list['2X'] &&
                        <DishItem
                          key={v.odds[0].chs.list['2X'].choiceId}
                          choiceId={v.odds[0].chs.list['2X'].choiceId}
                          matchId={v.matchId}
                          gamblingId={v.odds[0].gamblingId}
                          dishId={v.odds[0].chs.list['2X'].dishId}
                          dish={v.odds[0].chs.list['2X'].dish}
                        />
                      }
                    </div>
                    <div className={styles['match-odds']}>
                      {
                        v.odds[0].chs.list['22'] &&
                        <DishItem
                          key={v.odds[0].chs.list['22'].choiceId}
                          choiceId={v.odds[0].chs.list['22'].choiceId}
                          matchId={v.matchId}
                          gamblingId={v.odds[0].gamblingId}
                          dishId={v.odds[0].chs.list['22'].dishId}
                          dish={v.odds[0].chs.list['22'].dish}
                        />
                      }
                    </div>
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

export default DoubleResultItem;
