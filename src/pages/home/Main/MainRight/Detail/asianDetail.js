import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import BetMatchAllOdds from './betMatchAllOdds'

@connect(({ togglePageWithGg }) => ({
  togglePageWithGg
}))
class Detail extends PureComponent {
  goBack = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'togglePageWithGg/togglePage',
      payload: '1',
    });
  };

  render() {
    const {
      matchId
    } = this.props;
    return (
      <div className={styles.detail}>
          <div>
            <div className={styles.header}>
              <div className={styles.back} onClick={this.goBack}><Icon type="left-circle" /></div>
              <div className={styles.name}>早盘--比赛所有盘口</div>
            </div>
            <BetMatchAllOdds
              matchId={matchId}
            />
          </div>

      </div>

    );
  }
}

export default Detail;
