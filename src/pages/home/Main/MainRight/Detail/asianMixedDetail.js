import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import MixedMatchAllOdds from './mixedMatchAllOdds';

@connect(({ togglePageWithGg }) => ({
  togglePageWithGg
}))
class Detail extends PureComponent {

  goBack = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'togglePageWithGg/togglePage',
      payload: '8',
    });
  };

  render() {
    const { matchId } = this.props;
    return (
      <div className={styles.detail}>
        <div className={styles.header}>
          <div className={styles.back} onClick={this.goBack}><Icon type="left-circle" /></div>
          <div className={styles.name}>早盘混合过关--比赛所有盘口</div>
        </div>
        <MixedMatchAllOdds
          matchId={matchId}
        />
      </div>

    );
  }
}

export default Detail;
