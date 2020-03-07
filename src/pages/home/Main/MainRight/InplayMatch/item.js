import React, { PureComponent, Fragment } from 'react';
import { Row, Col, Icon } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import IndexDishItem from './indexDishItem';
import DishItem from '../CommandMatch/dishIem';

@connect(({ chsDB, inPlay, betShopCart, loading }) => ({
  chsDB,
  inPlay,
  betShopCart,
  oddsLoading: loading.effects['inPlay/fetchAllMatchOdds'],
}))
class InplayItem extends PureComponent {
  state = {
    isShow: false,
  };

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
      cptData, matchData,chsDB:{chsDB}
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
              <Row className={styles['match-line-box']} key={v.matchId}>
                <Row className={styles['match-line']}>
                  <Col span={3} className={styles['match-time']}>
                    {
                      v.period < 0 ?
                        <div>
                         {v.time.substring(4, 6)}-{v.time.substring(6, 8)}
                          <br/>
                          {v.time.substring(8, 10)}:{v.time.substring(10, 12)}
                        </div> :
                        <div>
                          <div className={styles.soccer}>
                            {v.soccer}
                          </div>
                          <div className={styles.period}>
                            进行:{v.period}'
                          </div>
                        </div>
                    }
                  </Col>
                  <Col span={5} className={styles['match-team']}>
                    <div>{v.homeName}</div>
                    <div>{v.awayName}</div>
                    <div>和局</div>
                  </Col>
                  <Col span={8} className={styles['match-odds']}>
                    <Row>
                      <Col span={8} className={styles['match-odds-list']}>
                        {
                          v.odds[0] && (
                            v.odds[0].chs.length === 0 ?
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
                              v.odds[0].chs.map((item) => (
                                  <Fragment key={item.dishId}>
                                    {item.name === '1' && <div className={styles['home-item']}>
                                      <IndexDishItem
                                        choiceHandicap={item.choiceHandicap}
                                        matchId={v.matchId}
                                        choiceId={item.choiceId}
                                        gamblingId={v.odds[0].gamblingId}
                                        dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                        dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                      />
                                    </div>
                                    }
                                    {
                                      item.name === '2' && <div className={styles['away-item']}>
                                      <IndexDishItem
                                        choiceHandicap={item.choiceHandicap}
                                        matchId={v.matchId}
                                        choiceId={item.choiceId}
                                        gamblingId={v.odds[0].gamblingId}
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
                          v.odds[1] && v.odds[1].chs.map((item) => (
                              <Fragment key={item.dishId}>
                                {item.name === 'Over' && <div className={styles['home-item']}>
                                  <IndexDishItem
                                    choiceHandicap={item.choiceHandicap}
                                    matchId={v.matchId}
                                    choiceId={item.choiceId}
                                    gamblingId={v.odds[1].gamblingId}
                                    dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                    dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                  />
                                </div>}
                                {item.name === 'Under' && <div className={styles['away-item']}>
                                  <IndexDishItem
                                    choiceHandicap={item.choiceHandicap}
                                    matchId={v.matchId}
                                    choiceId={item.choiceId}
                                    gamblingId={v.odds[1].gamblingId}
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
                          v.odds[2] && (
                            v.odds[2].chs.length === 0 ? <Fragment>
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
                              v.odds[2].chs.map((item) => (
                                  <Fragment key={item.dishId}>
                                    {item.name === '1' && <div className={styles['home-item']}>
                                      <IndexDishItem
                                        choiceHandicap={item.choiceHandicap}
                                        matchId={v.matchId}
                                        choiceId={item.choiceId}
                                        gamblingId={v.odds[2].gamblingId}
                                        dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                        dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                      />
                                    </div>}
                                    {item.name === '2' && <div className={styles['away-item']}>
                                      <IndexDishItem
                                        choiceHandicap={item.choiceHandicap}
                                        matchId={v.matchId}
                                        choiceId={item.choiceId}
                                        gamblingId={v.odds[2].gamblingId}
                                        dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                        dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                      />
                                    </div>}
                                    {item.name === 'X' && <div className={styles['pie-item']}>
                                      <IndexDishItem
                                        choiceHandicap={item.choiceHandicap}
                                        matchId={v.matchId}
                                        choiceId={item.choiceId}
                                        gamblingId={v.odds[2].gamblingId}
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
                          v.odds[3] && v.odds[3].chs.map((item) => (
                              <Fragment key={item.dishId}>
                                {item.name === '1' && <div className={styles['home-item']}>
                                  <IndexDishItem
                                    choiceHandicap={item.choiceHandicap}
                                    matchId={v.matchId}
                                    choiceId={item.choiceId}
                                    gamblingId={v.odds[3].gamblingId}
                                    dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                    dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                  />
                                </div>}
                                {item.name === '2' && <div className={styles['away-item']}>
                                  <IndexDishItem
                                    choiceHandicap={item.choiceHandicap}
                                    matchId={v.matchId}
                                    choiceId={item.choiceId}
                                    gamblingId={v.odds[3].gamblingId}
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
                          v.odds[4] && v.odds[4].chs.map((item) => (
                              <Fragment key={item.dishId}>
                                {item.name === 'Over' && <div className={styles['home-item']}>
                                  <IndexDishItem
                                    choiceHandicap={item.choiceHandicap}
                                    matchId={v.matchId}
                                    choiceId={item.choiceId}
                                    gamblingId={v.odds[4].gamblingId}
                                    dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                    dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                  />
                                </div>}
                                {item.name === 'Under' && <div className={styles['away-item']}>
                                  <IndexDishItem
                                    choiceHandicap={item.choiceHandicap}
                                    matchId={v.matchId}
                                    choiceId={item.choiceId}
                                    gamblingId={v.odds[4].gamblingId}
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
                          v.odds[5] && (
                            v.odds[5].chs.length === 0 ?
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
                              v.odds[5].chs.map((item) => (
                                  <Fragment key={item.dishId}>
                                    {item.name === '1' && <div className={styles['home-item']}>
                                      <IndexDishItem
                                        choiceHandicap={item.choiceHandicap}
                                        matchId={v.matchId}
                                        choiceId={item.choiceId}
                                        gamblingId={v.odds[2].gamblingId}
                                        dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                        dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                      />
                                    </div>}
                                    {item.name === '2' && <div className={styles['away-item']}>
                                      <IndexDishItem
                                        choiceHandicap={item.choiceHandicap}
                                        matchId={v.matchId}
                                        choiceId={item.choiceId}
                                        gamblingId={v.odds[2].gamblingId}
                                        dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                        dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                      />
                                    </div>}
                                    {item.name === 'X' && <div className={styles['pie-item']}>
                                      <IndexDishItem
                                        choiceHandicap={item.choiceHandicap}
                                        matchId={v.matchId}
                                        choiceId={item.choiceId}
                                        gamblingId={v.odds[2].gamblingId}
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
                  <div className={styles.btn} onClick={() => this.turnToInPlayDetail(v.matchId)}>
                    所有玩法<Icon style={{ marginLeft: '4px' }} type="double-right"/>
                  </div>
                </div>
              </Row>
            ))
          }
        </div>

        {/* <Modal
          title={ inPlayAllOdds[0] && `${  inPlayAllOdds[0].homeName}----${ inPlayAllOdds[0].awayName}`}
          visible={isShow}
          onCancel={this.closeModal}
          width={1000}
          footer={null}
          maskClosable={false}
          destroyOnClose
          bodyStyle={{
            height: '600px',
            background: '#5aa991',
            overflowY: 'scroll',
            color:'white',
            padding:0
          }}
        >
          {
            isShow ? ( oddsLoading ? <PageLoading /> :
                inPlayAllOdds[0] && inPlayAllOdds[0].odds.map((oddsItem) => (
                  <div className={styles['single-odds']} key={oddsItem.gamblingId}>
                    <div className={styles.oddsName}>
                      {oddsItem.oddName}
                    </div>
                    <div className={styles.oddsDish}>
                      {
                        oddsItem.chs.map((chsItem) => (
                          <div key={chsItem.choiceId} className={styles['dish-box']}>
                            <div className={styles.dishName}>{dishNameMap[chsItem.name]}<span
                              className={styles.choicehandicap}>{chsItem.choiceHandicap && `(${chsItem.choiceHandicap})`}</span>
                            </div>
                            <div
                              className={shopCart.ids.includes(chsItem.choiceId)  ? `${styles.dish} ${styles.active}` : styles.dish}
                              onClick={() => this.addShopCart(inPlayAllOdds[0].matchId, oddsItem.gamblingId, chsItem.choiceId, chsItem.dishId)}
                            >{chsItem.dish}</div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                ))
            ): ''
          }
        </Modal>*/}
      </div>

    );
  }
}

export default InplayItem;
