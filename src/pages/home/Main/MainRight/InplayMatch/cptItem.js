import React, { PureComponent, Fragment } from 'react';
import { Row, Col, Icon } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import IndexDishItem from './indexDishItem';
import MatchItem from './matchItem';

@connect(({ inPlay, betShopCart, loading }) => ({
  inPlay,
  betShopCart,
  oddsLoading: loading.effects['inPlay/fetchAllMatchOdds'],
}))
class InplayItem extends PureComponent {

  state = {
    isShow: false,
    time:0
  };

  static getDerivedStateFromProps (props, state) {
    if(state.prevDish === 0 ){
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
          <Col span={1} className={styles.arrow}>
          </Col>
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
             />
            ))
          }
        </div>
      </div>

    );
  }
}

export default InplayItem;
