import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import Item from './item';
import TodayWrapper from '../TodayWarpper/wrapper2';

@connect(({ asianGG6And7 }) => ({
  asianGG6And7,
}))
class FirstGoal extends PureComponent {

  render() {
    const {
      asianGG6And7: {
        cptIds, matchListObj
      },
    } = this.props;
    return (
      <TodayWrapper
        gg='7'
        title='今日-最先进球/最后进球'
      >
        <Row className={styles.table}>
          <Col className={styles['big-tb']} span={3}>时间</Col>
          <Col className={styles['big-tb']} span={7}>赛事</Col>
          <Col className={styles['middle-tb']} span={7}>
            <Row className={styles['cell-th']}>
              最先进球
            </Row>
            <Row>
              <Col span={8} className={styles.cell}>主进</Col>
              <Col span={8} className={styles.cell}>客进</Col>
              <Col span={8} className={styles.cell}>无进球</Col>
            </Row>
          </Col>
          <Col className={styles['middle-tb']} span={7}>
            <Row className={styles['cell-th']}>
              最后进球
            </Row>
            <Row>
              <Col span={8} className={styles.cell}>主进</Col>
              <Col span={8} className={styles.cell}>客进</Col>
              <Col span={8} className={styles.cell}>无进球</Col>
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

export default FirstGoal;
