import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import styles from './index.scss';
import { dishNameMap } from '@/utils/util';

@connect(({ matchDB, oddsDB, chsDB, betShopCart }) => ({
  matchDB,
  oddsDB,
  chsDB,
  betShopCart,
}))
class BetItem extends PureComponent {
  constructor(props) {
    super(props);
    this.selectRef = React.createRef()
  }

  delMixedShopCartItem = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'betShopCart/delMixedShopCart',
      payload: id
    });
  };

  render() {
    const {
      data,
      chsDB: { chsDB },
    } = this.props;
    return (
      <li className={styles['mixed-item']} key={data.matchId} >
        <div className={styles['item-header']}>
          <div className={styles.title}>
            <Icon
              className={styles.del}
              onClick={() => this.delMixedShopCartItem(data.matchId)}
              type="close"
            />
            <div className={styles['dish-name']}>
              {data.typeFlag === 2 ? '滚球' : '' }{data.oddName}
            </div>
            <div className={styles.cpt}>
              {data.cptName}
            </div>
            <div className={styles['team-name']}>
              <span className={styles.team}>
                {data.homeName}
              </span>
              <span className={styles.vs}>
                  vs
              </span>
              <span className={styles.team}>
                {data.awayName}
              </span>
            </div>
          </div>
          <div className={styles['dish-odds']}>
            <span className={styles.name}>
              {dishNameMap[data.name]}
            </span>
            <span className={styles.handicap}>
              {data.choiceHandicap}
            </span>
            @
            <span className={styles.odds}>
              {chsDB[data.choiceId].dish}
            </span>
          </div>
        </div>
      </li>
    );
  }
}

export default BetItem;
