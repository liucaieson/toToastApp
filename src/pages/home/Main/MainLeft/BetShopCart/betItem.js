import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Icon, Input } from 'antd';
import { dishNameMap } from '@/utils/util';
import PageLoading from '@/components/MbPageLoading';
import styles from './index.scss';

@connect(({ chsDB, betShopCart }) => ({
  chsDB,
  betShopCart,
}))
class BetItem extends PureComponent {
  /**
   * @type {{slideIn: boolean, showSelectOption: boolean, amount: string}}
   * showSelectOption 是否显示选择金额的下拉菜单
   * amount 选择的金额
   */
  state = {
    showSelectOption: false,
    amount: '0',
  };

  constructor(props) {
    super(props);
    this.selectRef = React.createRef();
  }

  delShopCartItem = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'betShopCart/delBetShopCart',
      payload: id,
    });
  };

  setAmount = (e, id) => {
    const { dispatch } = this.props;
    let { value } = e.target;
    if (value.match(/[^\d]/g)) {
      return
    }
    value = +value;
    if (value > 9999999) {
      return
    }
    this.setState({
      amount: value,
    });
    dispatch({
      type: 'betShopCart/addShopCartItemAmount',
      payload: { id, amount: value },
    });
  };

  /**
   * 从下拉框中选择金额
   * @param amount 金额
   * @param id 当前选择栏的id
   */
  setAmountFromSelect = (amount, id) => {
    let betAmount = amount;
    if (amount === undefined) {
      betAmount = 2000;
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'betShopCart/addShopCartItemAmount',
      payload: { id, betAmount },
    });
    this.setState({
      amount: betAmount,
      showSelectOption: false,
    });
  };


  selectAmount = () => {
    const { showSelectOption } = this.state;
    this.setState({
      showSelectOption: !showSelectOption,
    });
  };

  renderTemplate() {
    const { showSelectOption } = this.state;
    const { data, chsDB: { chsDB } } = this.props;
    if (data.code === '200') {
      return (
        <Fragment>
          <div className={styles['bet-item-header']}>
            <Icon
              className={styles.del}
              onClick={() => this.delShopCartItem(data.choiceId)}
              type="close-circle"
            />
            <div className={styles.title}>
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
          </div>
          <div className={styles['bet-item-content']}>
            <div className={styles.winInfo}>
              <div
                className={styles['bet-select']}
                ref={this.selectRef}
              >
                <Input
                  className={styles['bet-select-input']}
                  value={this.state.amount}
                  onChange={e => this.setAmount(e, data.choiceId)}
                />
                <div
                  className={styles['bet-select-arrow']}
                  onClick={this.selectAmount}
                >
                  <Icon
                    className={showSelectOption ? `${styles.icon} ${styles.active}` : styles.icon}
                    type="down"
                  />
                </div>
                {
                  showSelectOption ? (
                    <ul className={styles['option-box']}>
                      <li
                        onClick={() => this.setAmountFromSelect(100, data.choiceId)}
                        className={styles.option}
                      >
                        100
                      </li>
                      <li
                        onClick={() => this.setAmountFromSelect(500, data.choiceId)}
                        className={styles.option}
                      >
                        500
                      </li>
                      <li
                        onClick={() => this.setAmountFromSelect(1000, data.choiceId)}
                        className={styles.option}
                      >
                        1000
                      </li>
                      <li
                        onClick={() => this.setAmountFromSelect(2000, data.choiceId)}
                        className={styles.option}
                      >
                        2000
                      </li>
                      <li
                        onClick={() => this.setAmountFromSelect(5000, data.choiceId)}
                        className={styles.option}
                      >
                        5000
                      </li>
                    </ul>
                  ) : ''
                }
              </div>
              <span className={styles.equal}>
                =
              </span>
              <span className={styles.money}>
                ￥{(chsDB[data.choiceId].dish * this.state.amount).toFixed(2)}
              </span>
            </div>
          </div>
        </Fragment>
      );
    }
    /* 2110 代表赔率改变。3004代表投注暂时失败 */
    if (data.code === '2110' || data.code === '3004') {
      return (
        <Fragment>
          <div className={styles['no-bet']}>
            <div className={styles.left}>
              <span className={styles.text}>
                注意：
              </span>
              <span className={styles.result}>
                {data.message}
                </span>
            </div>
            <div className={styles.right}>
              <div
                className={styles.del}
                onClick={() => this.delShopCartItem(data.choiceId)}
              >
                X
              </div>
            </div>
          </div>
          <div className={styles['bet-item-header']}>
            <Icon
              className={styles.del} onClick={() => this.delShopCartItem(data.choiceId)}
              type="close-circle"
            />
            <div className={styles.title}>
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
          </div>
          <div className={styles['bet-item-content']}>
            <div className={styles.winInfo}>
              <div
                className={styles['bet-select']}
                ref={this.selectRef}
              >
                <Input
                  className={styles['bet-select-input']}
                  value={this.state.amount}
                  onChange={e => this.setAmount(e, data.choiceId)}
                />
                <div
                  className={styles['bet-select-arrow']}
                  onClick={this.selectAmount}
                >
                  <Icon
                    className={showSelectOption ? `${styles.icon} ${styles.active}` : styles.icon}
                    type="down"
                  />
                </div>
                {
                  showSelectOption ? (
                    <ul className={styles['option-box']}>
                      <li
                        onClick={() => this.setAmountFromSelect(100, data.choiceId)}
                        className={styles.option}
                      >
                        100
                      </li>
                      <li
                        onClick={() => this.setAmountFromSelect(500, data.choiceId)}
                        className={styles.option}
                      >
                        500
                      </li>
                      <li
                        onClick={() => this.setAmountFromSelect(1000, data.choiceId)}
                        className={styles.option}
                      >
                        1000
                      </li>
                      <li
                        onClick={() => this.setAmountFromSelect(2000, data.choiceId)}
                        className={styles.option}
                      >
                        2000
                      </li>
                      <li
                        onClick={() => this.setAmountFromSelect(5000, data.choiceId)}
                        className={styles.option}
                      >
                        5000
                      </li>
                    </ul>
                  ) : ''
                }
              </div>
              <span className={styles.equal}>
                =
              </span>
              <span className={styles.money}>
                ￥{(chsDB[data.choiceId].dish * this.state.amount).toFixed(2)}
                </span>
            </div>
          </div>
        </Fragment>

      );
    }
    /* 3001代表盘口关闭， 2111代表比赛结束 */
    if (data.code === '3001' || data.code === '2111') {
      return (
        <Fragment>
          <div className={styles['no-bet']}>
            <div className={styles.left}>
              <span className={styles.text}>
                该投注项当前不可投注：
              </span>
              <span className={styles.result}>
                {data.message}
              </span>
            </div>
            <div className={styles.right}>
              <div
                className={styles.del}
                onClick={() => this.delShopCartItem(data.choiceId)}
              >
                X
              </div>
            </div>
          </div>
          <div className={styles['bet-item-header']}>
            <div className={styles.title}>
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
          </div>
        </Fragment>
      );
    }
    return false
  }

  render() {
    const {
      data,
    } = this.props;
    return (
      <li className={styles['bet-item']} key={data.choiceId}>
        {
          data.matchId ?
            this.renderTemplate()
            :
            <PageLoading height="110px" top="30px" color="#232323"/>
        }
      </li>
    );
  }
}

export default BetItem;
