import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import Item from './item';
import TodayWrapper from '../TodayWarpper/wrapper1';

@connect(({ asianGG}) => ({
  asianGG,
}))
class CorrectScore extends PureComponent {

  render() {
    const {
      asianGG: {
        cptIds, matchListObj,
      },
    } = this.props;
    return (
      <TodayWrapper
        gg='5'
        title='波胆'
      >
        <Row className={styles.table}>
          <Col className={styles['big-tb']} span={24}>赛事-波胆</Col>
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

export default CorrectScore;
