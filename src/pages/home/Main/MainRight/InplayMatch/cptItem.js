import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import MatchItem from './matchItem';

@connect(({ inPlay, betShopCart, loading }) => ({
  inPlay,
  betShopCart,
  oddsLoading: loading.effects['inPlay/fetchAllMatchOdds'],
}))
class InplayItem extends PureComponent {

  static getDerivedStateFromProps (props, state) {
    if (state.prevDish === 0) {
      return {
        prevDish: props.dish
      }
    }
    if (props.dish > state.prevDish) {
      return {
        up: 1,
        prevDish: props.dish
      }
    }
    if (props.dish < state.prevDish) {
      return {
        up: -1,
        prevDish: props.dish
      }
    }
    return null
  }

  render() {
    const {
      cptData, matchData
    } = this.props;
    return (
      <div key={cptData} style={this.props.style}>
        <Row className={styles['competitions-name']}>
          <Col span={1} className={styles.arrow} />
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
                homeName={v.homeName}
                awayName={v.awayName}
                odds={v.odds}
                key={v.matchId}
             />
            ))
          }
        </div>
      </div>
    );
  }
}

export default InplayItem;
