import React, { PureComponent, Fragment } from 'react';
import { Icon, Row, Col, Modal } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import { calcDateToMonthAndDay, dishNameMap } from '../../../../../../utils/util';
import DishItem from './dishIem'
import PageLoading from '../../../../../../components/MbPageLoading';
import MixModalLayout from '../../DishLayout/mixedModalLayout/index'

@connect(({ chsDB, matchAllOdds, betShopCart, loading }) => ({
  chsDB,
  matchAllOdds,
  betShopCart,
  matchAllOddsLoading:loading.models.matchAllOdds,
  addLoading:loading.effects['betShopCart/addMixedShopCart']
}))
class DoubleResultItem extends PureComponent {
  state = {
    isShow:false
  };


  /* 请求比赛所有玩法的赔率赔率，参数比赛id */
  fetchMatchAllOdds = (matchId) => {
    this.setState({
      isShow: true,
      matchId
    });
  };

  closeModal = () => {
    this.setState({
      isShow: false
    });
  };


  render() {
    const {
      cptData, matchData,
      chsDB:{ chsDB }
    } = this.props;
    const {isShow} = this.state;
    const {matchId} = this.state;
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
                    <Col span={2} className={styles['match-time']}>
                      {calcDateToMonthAndDay(v.time)}
                    </Col>
                    <Col span={6} className={styles['match-team']}>
                      <div>{v.homeName}</div>
                      <div>{v.awayName}</div>
                      <div>和局</div>
                    </Col>
                    <Col span={8} className={styles['match-odds']}>
                      <Row>
                        <Col span={8} className={styles['match-odds-list']}>
                          {
                            v.odds[0].chs.map((item) => (
                                <div className={styles['match-odds-item']}>
                                    <DishItem
                                      choiceHandicap={item.choiceHandicap}
                                      matchId={v.matchId}
                                      choiceId={item.choiceId}
                                      gamblingId={v.odds[0].gamblingId}
                                      dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                      dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                    />
                                  </div>
                              ),
                            )
                          }
                        </Col>
                        <Col span={8} className={styles['match-odds-list']}>
                          {
                            v.odds[1] && v.odds[1].chs.map((item) => (
                              <div className={styles['match-odds-item']}>
                                <DishItem
                                  choiceHandicap={item.choiceHandicap}
                                  matchId={v.matchId}
                                  choiceId={item.choiceId}
                                  gamblingId={v.odds[0].gamblingId}
                                  dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                  dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                />
                              </div>
                              ),
                            )
                          }
                        </Col>
                        <Col span={8} className={styles['match-odds-list']}>
                          {
                            v.odds[2] && v.odds[2].chs.map((item) => (
                              <div className={styles['match-odds-item']}>
                                <DishItem
                                  choiceHandicap={item.choiceHandicap}
                                  matchId={v.matchId}
                                  choiceId={item.choiceId}
                                  gamblingId={v.odds[0].gamblingId}
                                  dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                  dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                />
                              </div>
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
                            v.odds[3] && v.odds[3].chs.map((item) => (
                              <div className={styles['match-odds-item']}>
                                <DishItem
                                  choiceHandicap={item.choiceHandicap}
                                  matchId={v.matchId}
                                  choiceId={item.choiceId}
                                  gamblingId={v.odds[0].gamblingId}
                                  dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                  dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                />
                              </div>
                              ),
                            )
                          }
                        </Col>
                        <Col span={8} className={styles['match-odds-list']}>
                          {
                            v.odds[4] && v.odds[4].chs.map((item) => (
                              <div className={styles['match-odds-item']}>
                                <DishItem
                                  choiceHandicap={item.choiceHandicap}
                                  matchId={v.matchId}
                                  choiceId={item.choiceId}
                                  gamblingId={v.odds[0].gamblingId}
                                  dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                  dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                />
                              </div>
                              ),
                            )
                          }
                        </Col>
                        <Col span={8} className={styles['match-odds-list']}>
                          {
                            v.odds[5] && v.odds[5].chs.map((item) => (
                              <div className={styles['match-odds-item']}>
                                <DishItem
                                  choiceHandicap={item.choiceHandicap}
                                  matchId={v.matchId}
                                  choiceId={item.choiceId}
                                  gamblingId={v.odds[0].gamblingId}
                                  dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                  dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                />
                              </div>
                              ),
                            )
                          }
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <div className={styles['play-btn']}>
                    <div className={styles.btn} onClick={() => this.fetchMatchAllOdds(v.matchId)}>
                      所有玩法
                    </div>
                  </div>
                </Row>
              ))
            }
          </div>
        <Modal
          title='比赛'
          visible={isShow}
          onCancel={this.closeModal}
          width={700}
          footer={null}
          maskClosable={false}
          destroyOnClose
          getContainer={() => document.getElementById('mainRightBox')}
          bodyStyle={{
            height: '600px',
            color:'white',
            padding:'2px 4px'
          }}
        >
          {
            isShow ?
              <MixModalLayout matchId={matchId} />
              : ''
          }
        </Modal>
      </div>

    );
  }
}

export default DoubleResultItem;
