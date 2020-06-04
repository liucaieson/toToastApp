import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';
import styles from './header2.scss';
import AccountStatement from './accountStatement';
import GameResult from './gameResult';
import RuleDescription from './ruleDescription';
import Announcement from './announcement';
import HistoryBets from './historyBets';

@connect(({ userInfo, loading }) => ({
  userInfo,
  balanceLoading: loading.models.userInfo
}))
class TopHeader extends PureComponent {
  state = {
    accountStatementVisible: false,
    ruleDescriptionVisible: false,
    gameResultVisible: false,
    announcementVisible: false,
    historyBetsVisible: false,
    userBoardVisible: false,
    balanceVisible: true
  };

  componentDidMount() {

  }

  getUserInfo = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'userInfo/fetch',
    });
  };

  showAccountStatementModal = () => {
    this.setState({
      accountStatementVisible: true,
    });
  };

  closeAccountStatementModal = () => {
    this.setState({
      accountStatementVisible: false,
    });
  };

  showAnnouncementModal = () => {
    this.setState({
      announcementVisible: true,
    });
  };

  closeAnnouncementModal = () => {
    this.setState({
      announcementVisible: false,
    });
  };

  showGameResultModal = () => {
    this.setState({
      gameResultVisible: true,
    });
  };

  closeGameResultModal = () => {
    this.setState({
      gameResultVisible: false,
    });
  };

  showRuleDescriptionModal = () => {
    this.setState({
      ruleDescriptionVisible: true,
    });
  };

  closeRuleDescriptionModal = () => {
    this.setState({
      ruleDescriptionVisible: false,
    });
  };

  showHistoryBetsModal = () => {
    this.setState({
      historyBetsVisible: true,
    });
  };

  closeHistoryBetsModal = () => {
    this.setState({
      historyBetsVisible: false,
    });
  };

  toggleUserBoard = () => {
    const { userBoardVisible } = this.state;
    this.setState({
      userBoardVisible: !userBoardVisible
    });
  };

  toggleShowBalance = () => {
    const { balanceVisible } = this.state;
    this.setState({
      balanceVisible: !balanceVisible
    });
  };

  loginOut = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/logout',
    });
  };

  render() {
    const {
      accountStatementVisible,
      gameResultVisible,
      ruleDescriptionVisible,
      announcementVisible,
      historyBetsVisible,
      userBoardVisible,
      balanceVisible
    } = this.state;

    const { balanceLoading } = this.props;

    const { userInfo: { userName, balance } } = this.props;
    return (
      <header className={styles.header}>
        <div className={styles['user-box']}>
          <div className={styles['user-icon']} onClick={this.toggleUserBoard} />
              <QueueAnim
                type="bottom"
                duration={200}
              >
                {
                  userBoardVisible ?
                  <ul key="a" className={styles['select-list']}>
                    <div onClick={this.toggleShowBalance} className={styles.item}>{balanceVisible ? '隐藏余额' : '显示余额'}</div>
                    <div onClick={this.loginOut} className={styles.item}>退出登录</div>
                  </ul>
                  : null
                }
              </QueueAnim>
          <div className={styles.user}>
            <div className={styles.name}>{userName}</div>
            <div className={styles.balance}>
              {balanceVisible ? balance : '***'}
              {
                balanceLoading ?
                  <Icon type="loading" className={styles['icon-load']} /> :
                  <Icon className={styles['icon-load']} type="sync" onClick={this.getUserInfo}/>
              }
            </div>
          </div>
        </div>
        <div className={styles['nav-item-box']}>
          <a className={styles['nav-item']} onClick={this.showAccountStatementModal}>
            <span className={styles.runningAccount}>账变记录</span>
          </a>
          <a className={styles['nav-item']} onClick={this.showHistoryBetsModal}>
            <span className={styles['history-bets']}>历史投注</span>
          </a>
          <a className={styles['nav-item']} onClick={this.showAnnouncementModal}>
            <span className={styles.game}>公告栏</span>
          </a>
          <a className={styles['nav-item']} onClick={this.showGameResultModal}>
            <span className={styles['game-result']}>赛果</span>
          </a>
          <a className={styles['nav-item']} onClick={this.showRuleDescriptionModal}>
            <span className={styles.rule}>规则说明</span>
          </a>
        </div>
        <AccountStatement
          accountStatementVisible={accountStatementVisible}
          closeAccountStatementModal={this.closeAccountStatementModal}
        />
        <GameResult
          gameResultVisible={gameResultVisible}
          closeGameResultModal={this.closeGameResultModal}
        />
        <Announcement
          announcementVisible={announcementVisible}
          closeAnnouncementModal={this.closeAnnouncementModal}
        />
        <RuleDescription
          ruleDescriptionVisible={ruleDescriptionVisible}
          closeRuleDescriptionModal={this.closeRuleDescriptionModal}
        />
        <HistoryBets
          historyBetsVisible={historyBetsVisible}
          closeHistoryBetsModal={this.closeHistoryBetsModal}
        />
      </header>
    );
  }
}

export default TopHeader;
