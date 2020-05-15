import React from 'react';
import { Row, Col } from 'antd';
import styles from './index.scss';
import MatchItem from './matchItem';

export default ({ matchData }) => (
  <div>
    <Row className={styles['competitions-name']}>
      <Col span={1} className={styles.arrow}/>
      <Col span={20} className={styles.name}>
        {matchData[0].cptName}
      </Col>
    </Row>
    <div className={styles['match-info']}>
      {
        matchData.map((v) => (
          <MatchItem
            time={v.time}
            matchId={v.matchId}
            soccer={v.soccer}
            period={v.period}
            isInPlay={v.goOnFlag}
            homeName={v.homeName}
            awayName={v.awayName}
            odds={v.odds}
            key={v.matchId}
          />
        ))
      }
    </div>
  </div>
)
