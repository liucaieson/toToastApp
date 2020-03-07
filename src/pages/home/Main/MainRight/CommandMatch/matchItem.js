import React, { PureComponent, Fragment } from 'react';
import { Row, Col, Modal } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import { dishNameMap } from '../../../../../utils/util';
import PageLoading from '../../../../../components/MbPageLoading';
import DishItem from './dishIem';
import ModalLayout from '../DishLayout/modalLayout/index';

@connect(({ chsDB, matchAllOdds, betShopCart, loading }) => ({
  chsDB,
  matchAllOdds,
  betShopCart,
  matchAllOddsLoading: loading.models.matchAllOdds,
}))
class PointSpreadItem extends PureComponent {
  state = {
    isShow: false,
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
      data,
      chsDB: { chsDB },
    } = this.props;
    const { isShow } = this.state;
    return (
      <div key={data.matchId} style={this.props.style}>
        <div className={styles['match-info']}>
          {
            <Row className={styles['match-line-box']} key={data.matchId}>
              <Row className={styles['match-line']}>
                <Col span={2} className={styles['match-time']}>
                  {data.time.substring(4, 6)}-{data.time.substring(6, 8)}
                  <br/>
                  {data.time.substring(8, 10)}:{data.time.substring(10, 12)}
                  {data.inplayFlag === 1 && '提供滚球'}
                </Col>
                <Col span={5} className={styles['match-team']}>
                  <div>{data.homeName}</div>
                  <div>{data.awayName}</div>
                  <div>和局</div>
                </Col>
                <Col span={8} className={styles['match-odds']}>
                  <Row>
                    <Col span={8} className={styles['match-odds-list']}>
                      {
                        data.odds[0].chs.map((item) => (
                            <Fragment key={item.dishId}>
                              {item.name === '1' && <div className={styles['home-item']}>
                                <DishItem
                                  choiceHandicap={item.choiceHandicap}
                                  matchId={data.matchId}
                                  choiceId={item.choiceId}
                                  gamblingId={data.odds[0].gamblingId}
                                  dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                  dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                />
                              </div>
                              }
                              {item.name === '2' && <div className={styles['away-item']}>
                                <DishItem
                                  choiceHandicap={item.choiceHandicap}
                                  matchId={data.matchId}
                                  choiceId={item.choiceId}
                                  gamblingId={data.odds[0].gamblingId}
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
                        data.odds[1] && data.odds[1].chs.map((item) => (
                            <Fragment key={item.dishId}>
                              {item.name === 'Over' && <div className={styles['home-item']}>
                                <DishItem
                                  choiceHandicap={item.choiceHandicap}
                                  matchId={data.matchId}
                                  choiceId={item.choiceId}
                                  gamblingId={data.odds[1].gamblingId}
                                  dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                  dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                />
                              </div>
                              }
                              {item.name === 'Under' && <div className={styles['away-item']}>
                                <DishItem
                                  choiceHandicap={item.choiceHandicap}
                                  matchId={data.matchId}
                                  choiceId={item.choiceId}
                                  gamblingId={data.odds[1].gamblingId}
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
                        data.odds[2] && data.odds[2].chs.map((item) => (
                            <Fragment key={item.dishId}>
                              {item.name === '1' && <div className={styles['home-item']}>
                                <DishItem
                                  choiceHandicap={item.choiceHandicap}
                                  matchId={data.matchId}
                                  choiceId={item.choiceId}
                                  gamblingId={data.odds[2].gamblingId}
                                  dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                  dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                />
                              </div>}
                              {item.name === '2' && <div className={styles['away-item']}>
                                <DishItem
                                  choiceHandicap={item.choiceHandicap}
                                  matchId={data.matchId}
                                  choiceId={item.choiceId}
                                  gamblingId={data.odds[2].gamblingId}
                                  dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                  dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                />
                              </div>}
                              {item.name === 'X' && <div className={styles['pie-item']}>
                                <DishItem
                                  choiceHandicap={item.choiceHandicap}
                                  matchId={data.matchId}
                                  choiceId={item.choiceId}
                                  gamblingId={data.odds[2].gamblingId}
                                  dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                  dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                />
                              </div>}
                            </Fragment>
                          ),
                        )
                      }
                    </Col>
                  </Row>
                </Col>
                <Col span={8} className={styles['match-odds']}>
                  <Row>
                    <Col span={8} className={styles['match-odds-list']}>
                      {
                        data.odds[3] && data.odds[3].chs.map((item) => (
                            <Fragment key={item.dishId}>
                              {item.name === '1' && <div className={styles['home-item']}>
                                <DishItem
                                  choiceHandicap={item.choiceHandicap}
                                  matchId={data.matchId}
                                  choiceId={item.choiceId}
                                  gamblingId={data.odds[3].gamblingId}
                                  dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                  dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                />
                              </div>}
                              {item.name === '2' && <div className={styles['away-item']}>
                                <DishItem
                                  choiceHandicap={item.choiceHandicap}
                                  matchId={data.matchId}
                                  choiceId={item.choiceId}
                                  gamblingId={data.odds[3].gamblingId}
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
                        data.odds[4] && data.odds[4].chs.map((item) => (
                            <Fragment key={item.dishId}>
                              {item.name === 'Over' && <div className={styles['home-item']}>
                                <DishItem
                                  choiceHandicap={item.choiceHandicap}
                                  matchId={data.matchId}
                                  choiceId={item.choiceId}
                                  gamblingId={data.odds[4].gamblingId}
                                  dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                  dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                />
                              </div>}
                              {item.name === 'Under' && <div className={styles['away-item']}>
                                <DishItem
                                  choiceHandicap={item.choiceHandicap}
                                  matchId={data.matchId}
                                  choiceId={item.choiceId}
                                  gamblingId={data.odds[4].gamblingId}
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
                        data.odds[5] && data.odds[5].chs.map((item) => (
                            <Fragment key={item.dishId}>
                              {item.name === '1' && <div className={styles['home-item']}>
                                <DishItem
                                  choiceHandicap={item.choiceHandicap}
                                  matchId={data.matchId}
                                  choiceId={item.choiceId}
                                  gamblingId={data.odds[5].gamblingId}
                                  dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                  dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                />
                              </div>}
                              {item.name === '2' && <div className={styles['away-item']}>
                                <DishItem
                                  choiceHandicap={item.choiceHandicap}
                                  matchId={data.matchId}
                                  choiceId={item.choiceId}
                                  gamblingId={data.odds[5].gamblingId}
                                  dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                  dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                />
                              </div>}
                              {item.name === 'X' && <div className={styles['pie-item']}>
                                <DishItem
                                  choiceHandicap={item.choiceHandicap}
                                  matchId={data.matchId}
                                  choiceId={item.choiceId}
                                  gamblingId={data.odds[5].gamblingId}
                                  dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                  dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                />
                              </div>}
                            </Fragment>
                          ),
                        )
                      }
                    </Col>
                  </Row>
                </Col>
                <Col span={1} >
                </Col>
              </Row>
              <div className={styles['play-btn']}>
                <div className={styles.btn} onClick={() => this.openMatchAllOdds(data.matchId)}>
                  所有玩法
                </div>
              </div>
            </Row>
          }
        </div>
        <Modal
          title={'比赛'}
          visible={isShow}
          onCancel={this.closeModal}
          width={600}
          footer={null}
          maskClosable={false}
          destroyOnClose
          getContainer={() => document.getElementById('mainRightBox')}
          bodyStyle={{
            height: '700px',
            color: 'white',
            padding: ' 2px 4px',
          }}
        >
          {
            isShow ? <ModalLayout matchId={data.matchId}/>: ''
          }
        </Modal>
      </div>

    );
  }
}

export default PointSpreadItem;
