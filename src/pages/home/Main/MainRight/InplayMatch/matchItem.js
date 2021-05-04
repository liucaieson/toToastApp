import React, { PureComponent, Fragment } from 'react';
import { Row, Col, Icon, Modal } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import IndexDishItem from './indexDishItem';
import ModalLayout from '../ModalLayout/inPlayModalLayout';
import { formatUTCToLocalWithoutYearSecond } from '@/utils/util';

@connect(({ chsDB, inPlayFavorite, inPlay, betShopCart, loading }) => ({
  chsDB,
  inPlay,
  betShopCart,
  inPlayFavorite,
  oddsLoading: loading.effects['inPlay/fetchAllMatchOdds'],
}))
class InplayMatchItem extends PureComponent {
  state = {
    prevPeriod: 0,
    isShow: false,
  };

 /* componentDidMount() {
    this.timer = window.setInterval(() => {
      const { prevPeriod } = this.state;

      let minute = prevPeriod.split(':')[0];
      let second = prevPeriod.split(':')[1];
      if (prevPeriod.split(':')[0] === 45 || prevPeriod.split(':')[0] === 90) {
        return
      }
        if (second >= 59) {
          minute = +minute + 1;
          second = 0;
        } else {
          second = +second + 1;
        }

      const newSecond = second.toString().padStart(2, '0');
      const newPeriod = `${minute}:${newSecond}`;
      this.setState({
        prevPeriod: newPeriod
      });
    }, 1000);
  } */

 /* static getDerivedStateFromProps(props, state) {
    if (state.prevPeriod === 0) {
      return {
        prevPeriod: props.period,
      };
    }
    if (props.period.split(':')[0] > state.prevPeriod.split(':')[0]) {
      return {
        prevPeriod: props.period,
      };
    }
    return null;
  }
*/
  componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  addFav = (matchId, data) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'inPlayFavorite/addFav',
      payload: {
        matchId,
        matchData: data,
      },
    });
  };

  removeFav = (matchId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'inPlayFavorite/removeFav',
      payload: {
        matchId,
      },
    });
  };

  /* 请求比赛所有玩法的赔率赔率，参数比赛id */
  openMatchAllOdds = () => {
    this.setState({
      isShow: true,
    });
  };

  closeModal = () => {
    this.setState({
      isShow: false,
    });
  };

  render() {
    const {
      time, period, soccer, homeName, awayName, odds, matchId, isInPlay, chsDB: { chsDB },
      inPlayFavorite: { favMatchIds },
    } = this.props;
    const { prevPeriod, isShow } = this.state;
    return (
      <Row className={styles['match-line-box']} key={matchId}>
        <Row className={styles['match-line']}>
          <Col span={2} className={styles['match-time']}>
            {
              /* isInPlay === 0 ?
                <div>
                  {formatUTCToLocalWithoutYearSecond(time)}
                </div>
                :
                 */
                <div>
                  <div className={styles.soccer}>
                    {soccer}
                  </div>
                  <div className={styles.period}>
                    {period}
                  </div>
                </div>
            }
          </Col>
          <Col span={6} className={styles['match-team']}>
            <div>{homeName}</div>
            <div>{awayName}</div>
            <div>和局</div>
            {
              favMatchIds.includes(matchId) ?
                <div className={styles.favorite2} onClick={() => this.removeFav(matchId)}>
                  <Icon className={styles.icon} type="star" theme="filled"/>
                </div>
                :
                <div
                  className={styles.favorite1}
                  onClick={() => this.addFav(matchId, { time, period, soccer, homeName, awayName, odds, matchId })}
                >
                  <Icon className={styles.icon} type="star"/>
                </div>
            }
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
                            <Icon type="lock"/>
                          </div>
                        </div>
                        <div className={styles['away-item']}>
                          <div className={styles.lock}>
                            <Icon type="lock"/>
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
                            <Icon type="lock"/>
                          </div>
                        </div>
                        <div className={styles['away-item']}>
                          <div className={styles.lock}>
                            <Icon type="lock"/>
                          </div>
                        </div>
                        <div className={styles['pie-item']}>
                          <div className={styles.lock}>
                            <Icon type="lock"/>
                          </div>
                        </div>
                      </Fragment> :
                      odds[2].chs.map((item) => (
                          <Fragment key={item.dishId}>
                            {
                              item.name === '1' && <div className={styles['home-item']}>
                              <IndexDishItem
                                choiceHandicap={item.choiceHandicap}
                                matchId={matchId}
                                choiceId={item.choiceId}
                                gamblingId={odds[2].gamblingId}
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
                                gamblingId={odds[2].gamblingId}
                                dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                              />
                            </div>
                            }
                            {
                              item.name === 'X' && <div className={styles['pie-item']}>
                              <IndexDishItem
                                choiceHandicap={item.choiceHandicap}
                                matchId={matchId}
                                choiceId={item.choiceId}
                                gamblingId={odds[2].gamblingId}
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
            </Row>
          </Col>
          <Col span={8} className={styles['match-odds']}>
            <Row>
              <Col span={8} className={styles['match-odds-list']}>
                {
                  odds[3] && odds[3].chs.map((item) => (
                      <Fragment key={item.dishId}>
                        {
                          item.name === '1' && <div className={styles['home-item']}>
                          <IndexDishItem
                            choiceHandicap={item.choiceHandicap}
                            matchId={matchId}
                            choiceId={item.choiceId}
                            gamblingId={odds[3].gamblingId}
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
                            gamblingId={odds[3].gamblingId}
                            dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                            dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                          />
                        </div>
                        }
                      </Fragment>
                    ),
                  )
                }
              </Col>
              <Col span={8} className={styles['match-odds-list']}>
                {
                  odds[4] && odds[4].chs.map((item) => (
                      <Fragment key={item.dishId}>
                        {
                          item.name === 'Over' && <div className={styles['home-item']}>
                          <IndexDishItem
                            choiceHandicap={item.choiceHandicap}
                            matchId={matchId}
                            choiceId={item.choiceId}
                            gamblingId={odds[4].gamblingId}
                            dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                            dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                          />
                        </div>
                        }
                        {
                          item.name === 'Under' && <div className={styles['away-item']}>
                          <IndexDishItem
                            choiceHandicap={item.choiceHandicap}
                            matchId={matchId}
                            choiceId={item.choiceId}
                            gamblingId={odds[4].gamblingId}
                            dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                            dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                          />
                        </div>
                        }
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
                            <Icon type="lock"/>
                          </div>
                        </div>
                        <div className={styles['away-item']}>
                          <div className={styles.lock}>
                            <Icon type="lock"/>
                          </div>
                        </div>
                        <div className={styles['pie-item']}>
                          <div className={styles.lock}>
                            <Icon type="lock"/>
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
          <div className={styles.btn} onClick={() => this.openMatchAllOdds(matchId)}>
            所有玩法<Icon style={{ marginLeft: '4px' }} type="double-right"/>
          </div>
        </div>
        <Modal
          title="比赛"
          visible={isShow}
          onCancel={this.closeModal}
          width={700}
          footer={null}
          maskClosable={false}
          destroyOnClose
          getContainer={() => document.getElementById('mainRightBox')}
          bodyStyle={{
            height: '622px',
            color: 'white',
            padding: '2px 4px',
          }}
        >
          {
            isShow ? <ModalLayout matchId={matchId} />
              : ''
          }
        </Modal>
      </Row>

    );
  }
}

export default InplayMatchItem;
