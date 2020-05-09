import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import Item from './item';
import TodayWrapper from '../TodayWarpper/wrapper1';

@connect(({ asianGG }) => ({
  asianGG,
}))
class Mixed extends PureComponent {
  render() {
    const {
      asianGG: {
        cptIds, matchListObj,
      },
    } = this.props;
    return (
      <TodayWrapper
        gg="8"
        title="今日-混合过关"
      >
        <Row className={styles.table}>
          <Col className={styles['big-tb']} span={2}>时间</Col>
          <Col className={styles['big-tb']} span={6}>赛事</Col>
          <Col className={styles['middle-tb']} span={8}>
            <Row className={styles['cell-th']}>
              全场
            </Row>
            <Row>
              <Col span={8} className={styles.cell}>让球</Col>
              <Col span={8} className={styles.cell}>大/小</Col>
              <Col span={8} className={styles.cell}>独赢</Col>
            </Row>
          </Col>
          <Col className={styles['middle-tb']} span={8}>
            <Row className={styles['cell-th']}>
              上半场
            </Row>
            <Row>
              <Col span={8} className={styles.cell}>让球</Col>
              <Col span={8} className={styles.cell}>大/小</Col>
              <Col span={8} className={styles.cell}>独赢</Col>
            </Row>
          </Col>
        </Row>
        <div>
          {
            cptIds && cptIds.length === 0 ? <div className="no-match">暂无比赛</div> :
              cptIds.map((val) => (
                <Item cptData={val} matchData={matchListObj[val]} key={val}/>
              ))
          }
        </div>

      </TodayWrapper>
    );
  }
}

export default Mixed;
