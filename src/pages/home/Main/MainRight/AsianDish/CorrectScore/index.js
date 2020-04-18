import React, { PureComponent } from 'react';
import {  Row, Col } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import CorrectScoreDishLayout from '../../DishLayout/correntScoreDishLayout';
import PaginationBox from '../../../../../../components/PaginationBox';
import Accordion from '../../../../../../components/Accordion';
import AsianWrapper from '../AsianWarpper/wrapper1';

@connect(({ asianGG, chsDB}) => ({
  asianGG,
  chsDB,
}))
class CorrectScore extends PureComponent {

  render() {
    const {
      asianGG: {
        cptIds, matchListObj
      },
      chsDB: { chsDB },
    } = this.props;
    return (

      <AsianWrapper
        gg='5'
        title='波胆'
      >
        <Row className={styles.table}>
          <Col className={styles['big-tb']} span={24}>赛事</Col>
        </Row>
        <div>
          {
            cptIds && cptIds.length === 0 ? <div className="no-match">暂无比赛</div> :  cptIds.map((val) => (
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
                              <Col span={16} className={styles['match-team']}>
                                <div>{v.homeName}-VS-{v.awayName}</div>

                              </Col>
                              <Col span={6} className={styles['match-time']}>
                                      <span>
                                        {v.time.substring(0, 4)}-{v.time.substring(4, 6)}-{v.time.substring(6, 8)}
                                      </span>
                                <span className={styles.right}>
                                        {v.time.substring(8, 10)}:{v.time.substring(10, 12)}
                                      </span>
                              </Col>
                            </Row>
                            <Row className={styles['match-odds']}>
                              {
                                v.odds[0].chs.map((item) => (
                                  <div className={styles['match-odds-item']} key={item.choiceId}>
                                    <div className={styles.name}>{item.name}</div>
                                    <div className={styles.odds}>
                                      <CorrectScoreDishLayout
                                        choiceId={item.choiceId}
                                        matchId={v.matchId}
                                        gamblingId={v.odds[0].gamblingId}
                                        dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                        dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                      />
                                    </div>
                                  </div>
                                ))
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

export default CorrectScore;
