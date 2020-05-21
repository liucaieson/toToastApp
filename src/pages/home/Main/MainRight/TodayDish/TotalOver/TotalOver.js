import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import Item from './item';
import TodayWrapper from '../TodayWarpper/wrapper1';

@connect(({ asianGG }) => ({
  asianGG,
}))
class TotalOver extends PureComponent {
  render() {
    const {
      asianGG: {
        cptIds, matchListObj
      },
    } = this.props;
    return (
      <TodayWrapper
        gg="3"
        title="今日-全场 上半场 进球总数"
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

export default TotalOver;
