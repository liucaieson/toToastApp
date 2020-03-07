import React, { PureComponent } from 'react';
import {  Row, Col } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import DishItem from './dishItem'

@connect(({  chsDB, betShopCart }) => ({
  chsDB,
  betShopCart,
}))
class TotalOverItem extends PureComponent {

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
                    <Col span={16} className={styles['match-team']}>
                      <div>{v.homeName}-VS-{v.awayName}</div>
                    </Col>
                    <Col span={6} className={styles['match-time']}>
                                <span>
                                  {v.time.substring(0,4)}-{v.time.substring(4,6)}-{v.time.substring(6,8)}
                                  </span>
                      <span className={styles.right}>
                                  {v.time.substring(8,10)}:{v.time.substring(10,12)}
                                  </span>
                    </Col>
                  </Row>
                  <Row className={styles['match-odds']}>
                    {
                      v.odds[0].chs.map((item) => (
                        <DishItem
                          key={item.choiceId}
                          choiceId={item.choiceId}
                          matchId={v.matchId}
                          gamblingId={v.odds[0].gamblingId}
                          name={item.name}
                          dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                          dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                        />
                      ))
                    }
                  </Row>
                </Row>
              ))
            }
          </div>
      </div>


    );
  }
}

export default TotalOverItem;
