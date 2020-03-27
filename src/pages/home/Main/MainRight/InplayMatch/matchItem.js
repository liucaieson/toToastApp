import React, { PureComponent, Fragment } from 'react';
import { Row, Col, Icon } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import IndexDishItem from './indexDishItem';

@connect(({ chsDB, inPlay, betShopCart, loading }) => ({
  chsDB,
  inPlay,
  betShopCart,
  oddsLoading: loading.effects['inPlay/fetchAllMatchOdds'],
}))
class InplayMatchItem extends PureComponent {

  state = {
    isShow: false,
    inTime: 0,
    second:0,
    prevPeriod: 0
  };

  componentDidMount(){
    this.timer = window.setInterval(() => {
      let { prevPeriod, second} = this.state;
      if(prevPeriod === 45 || prevPeriod === 90){
        second = 0
      }else {
        if (second >= 59) {
          second = 0;
          prevPeriod = prevPeriod + 1
        }else{
          second = +second + 1
        }
      }
      const newSecond = second.toString().padStart(2, '0');
      this.setState({
        prevPeriod,
        second: newSecond
      })
    }, 1000)
  }

  static getDerivedStateFromProps(props, state) {
    if (state.prevPeriod === 0) {
      return {
        prevPeriod : props.period,
      };
    }
    if (props.period > state.prevPeriod) {
      return {
        prevPeriod: props.period,
      };
    }
    return null;
  }

  componentWillUnmount(){
    window.clearInterval(this.timer)
  }



  turnToInPlayDetail = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'togglePageWithGg/turnToDetail',
      payload: {
        pageId: 'inPlayDetail',
        matchId: id,
      },
    });
  };

  render() {
    const {
      time, period, soccer, homeName, awayName, odds, matchId, chsDB: { chsDB },
    } = this.props;
    const {prevPeriod, second } = this.state;
    return (
        <Row className={styles['match-line-box']} key={matchId}>
          <Row className={styles['match-line']}>
            <Col span={2} className={styles['match-time']}>
              {
                period < 0 ?
                  <div>
                    {time.substring(4, 6)}-{time.substring(6, 8)}
                    <br/>
                    {time.substring(8, 10)}:{time.substring(10, 12)}
                  </div> :
                  <div>
                    <div className={styles.soccer}>
                      {soccer}
                    </div>
                    <div className={styles.period}>
                      {prevPeriod}:{second }
                    </div>
                  </div>
              }
            </Col>
            <Col span={6} className={styles['match-team']}>
              <div>{homeName}</div>
              <div>{awayName}</div>
              <div>和局</div>
              <div className={styles.favorite}>
                <Icon className={styles.icon} type="star"/>
                <Icon className={styles.icon} type="star" theme="filled"/>
              </div>
            </Col>
            <Col span={8} className={styles['match-odds']}>
              <Row>
                <Col span={8} className={styles['match-odds-list']}>
                  {
                    odds[0] && (
                      odds[0].chs.length === 0 ?
                        <Fragment>
                          <div className={styles['home-item']}>
                            <div className={styles.lock}>
                              <Icon type='lock'/>
                            </div>
                          </div>
                          <div className={styles['away-item']}>
                            <div className={styles.lock}>
                              <Icon type='lock'/>
                            </div>
                          </div>
                        </Fragment> :
                        odds[0].chs.map((item) => (
                            <Fragment key={item.dishId}>
                              {
                                item.name === '1' && <div className={styles['home-item']}>
                                  <IndexDishItem
                                    choiceHandicap={item.choiceHandicap}
                                    matchId={matchId}
                                    choiceId={item.choiceId}
                                    gamblingId={odds[0].gamblingId}
                                    dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                    dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                  />
                                </div>
                              }
                              {
                                item.name === '2' && <div className={styles['away-item']}>
                                  <IndexDishItem
                                    choiceHandicap={item.choiceHandicap}
                                    matchId={matchId}
                                    choiceId={item.choiceId}
                                    gamblingId={odds[0].gamblingId}
                                    dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                    dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                  />
                                </div>
                              }
                            </Fragment>
                          ),
                        )
                    )
                  }
                </Col>
                <Col span={8} className={styles['match-odds-list']}>
                  {
                    odds[1] && odds[1].chs.map((item) => (
                        <Fragment key={item.dishId}>
                          {item.name === 'Over' && <div className={styles['home-item']}>
                            <IndexDishItem
                              choiceHandicap={item.choiceHandicap}
                              matchId={matchId}
                              choiceId={item.choiceId}
                              gamblingId={odds[1].gamblingId}
                              dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                              dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                            />
                          </div>}
                          {item.name === 'Under' && <div className={styles['away-item']}>
                            <IndexDishItem
                              choiceHandicap={item.choiceHandicap}
                              matchId={matchId}
                              choiceId={item.choiceId}
                              gamblingId={odds[1].gamblingId}
                              dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                              dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                            />
                          </div>}
                        </Fragment>
                      ),
                    )
                  }
                </Col>
                <Col span={8} className={styles['match-odds-list']}>
                  {
                    odds[2] && (
                      odds[2].chs.length === 0 ? <Fragment>
                          <div className={styles['home-item']}>
                            <div className={styles.lock}>
                              <Icon type='lock'/>
                            </div>
                          </div>
                          <div className={styles['away-item']}>
                            <div className={styles.lock}>
                              <Icon type='lock'/>
                            </div>
                          </div>
                          <div className={styles['pie-item']}>
                            <div className={styles.lock}>
                              <Icon type='lock'/>
                            </div>
                          </div>
                        </Fragment> :
                        odds[2].chs.map((item) => (
                            <Fragment key={item.dishId}>
                              {item.name === '1' && <div className={styles['home-item']}>
                                <IndexDishItem
                                  choiceHandicap={item.choiceHandicap}
                                  matchId={matchId}
                                  choiceId={item.choiceId}
                                  gamblingId={odds[2].gamblingId}
                                  dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                  dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                />
                              </div>}
                              {item.name === '2' && <div className={styles['away-item']}>
                                <IndexDishItem
                                  choiceHandicap={item.choiceHandicap}
                                  matchId={matchId}
                                  choiceId={item.choiceId}
                                  gamblingId={odds[2].gamblingId}
                                  dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                  dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                />
                              </div>}
                              {item.name === 'X' && <div className={styles['pie-item']}>
                                <IndexDishItem
                                  choiceHandicap={item.choiceHandicap}
                                  matchId={matchId}
                                  choiceId={item.choiceId}
                                  gamblingId={odds[2].gamblingId}
                                  dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                  dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                />
                              </div>}
                            </Fragment>
                          ),
                        )
                    )
                  }
                </Col>
              </Row>
            </Col>
            <Col span={8} className={styles['match-odds']}>
              <Row>
                <Col span={8} className={styles['match-odds-list']}>
                  {
                    odds[3] && odds[3].chs.map((item) => (
                        <Fragment key={item.dishId}>
                          {item.name === '1' && <div className={styles['home-item']}>
                            <IndexDishItem
                              choiceHandicap={item.choiceHandicap}
                              matchId={matchId}
                              choiceId={item.choiceId}
                              gamblingId={odds[3].gamblingId}
                              dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                              dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                            />
                          </div>}
                          {item.name === '2' && <div className={styles['away-item']}>
                            <IndexDishItem
                              choiceHandicap={item.choiceHandicap}
                              matchId={matchId}
                              choiceId={item.choiceId}
                              gamblingId={odds[3].gamblingId}
                              dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                              dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                            />
                          </div>}
                        </Fragment>
                      ),
                    )
                  }
                </Col>
                <Col span={8} className={styles['match-odds-list']}>
                  {
                    odds[4] && odds[4].chs.map((item) => (
                        <Fragment key={item.dishId}>
                          {item.name === 'Over' && <div className={styles['home-item']}>
                            <IndexDishItem
                              choiceHandicap={item.choiceHandicap}
                              matchId={matchId}
                              choiceId={item.choiceId}
                              gamblingId={odds[4].gamblingId}
                              dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                              dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                            />
                          </div>}
                          {item.name === 'Under' && <div className={styles['away-item']}>
                            <IndexDishItem
                              choiceHandicap={item.choiceHandicap}
                              matchId={matchId}
                              choiceId={item.choiceId}
                              gamblingId={odds[4].gamblingId}
                              dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                              dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                            />
                          </div>}
                        </Fragment>
                      ),
                    )
                  }
                </Col>
                <Col span={8} className={styles['match-odds-list']}>
                  {
                    odds[5] && (
                      odds[5].chs.length === 0 ?
                        <Fragment>
                          <div className={styles['home-item']}>
                            <div className={styles.lock}>
                              <Icon type='lock'/>
                            </div>
                          </div>
                          <div className={styles['away-item']}>
                            <div className={styles.lock}>
                              <Icon type='lock'/>
                            </div>
                          </div>
                          <div className={styles['pie-item']}>
                            <div className={styles.lock}>
                              <Icon type='lock'/>
                            </div>
                          </div>
                        </Fragment> :
                        odds[5].chs.map((item) => (
                            <Fragment key={item.dishId}>
                              {item.name === '1' && <div className={styles['home-item']}>
                                <IndexDishItem
                                  choiceHandicap={item.choiceHandicap}
                                  matchId={matchId}
                                  choiceId={item.choiceId}
                                  gamblingId={odds[2].gamblingId}
                                  dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                  dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                />
                              </div>}
                              {item.name === '2' && <div className={styles['away-item']}>
                                <IndexDishItem
                                  choiceHandicap={item.choiceHandicap}
                                  matchId={matchId}
                                  choiceId={item.choiceId}
                                  gamblingId={odds[2].gamblingId}
                                  dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                  dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                />
                              </div>}
                              {item.name === 'X' && <div className={styles['pie-item']}>
                                <IndexDishItem
                                  choiceHandicap={item.choiceHandicap}
                                  matchId={matchId}
                                  choiceId={item.choiceId}
                                  gamblingId={odds[2].gamblingId}
                                  dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                  dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                />
                              </div>}
                            </Fragment>
                          ),
                        )

                    )
                  }
                </Col>
              </Row>
            </Col>
          </Row>
          <div className={styles['play-btn']}>
            <div className={styles.btn} onClick={() => this.turnToInPlayDetail(matchId)}>
              所有玩法<Icon style={{ marginLeft: '4px' }} type="double-right"/>
            </div>
          </div>
        </Row>

    );
  }
}

export default InplayMatchItem;
