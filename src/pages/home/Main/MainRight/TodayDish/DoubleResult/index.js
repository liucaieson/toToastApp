import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import Item from './item';
import TodayWrapper from '../TodayWarpper/wrapper2';


@connect(({ asianTodayGG6And7 }) => ({
  asianTodayGG6And7,
}))
class DoubleResult extends PureComponent {
  render() {
    const {
      asianTodayGG6And7: {
        cptIds, matchListObj,
      },
    } = this.props;
    return (
      <TodayWrapper
        gg="6"
        title="今日-半场/全场"
      >
        <Row className={styles.table}>
          <Col className={styles['big-tb']} span={3}>时间</Col>
          <Col className={styles['big-tb']} span={5}>赛事</Col>
          <Col className={styles['big-tb']} span={16}>
            <div className={styles.cell}>主/主</div>
            <div className={styles.cell}>主/和</div>
            <div className={styles.cell}>主/客</div>
            <div className={styles.cell}>和/主</div>
            <div className={styles.cell}>和/和</div>
            <div className={styles.cell}>和/客</div>
            <div className={styles.cell}>客/主</div>
            <div className={styles.cell}>客/和</div>
            <div className={styles.cell}>客/客</div>
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

export default DoubleResult;
