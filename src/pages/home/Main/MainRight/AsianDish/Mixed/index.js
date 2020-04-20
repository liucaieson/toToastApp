import React, { PureComponent} from 'react';
import { Icon, Row, Col, Modal } from 'antd';
import { connect } from 'dva';
import styles from './index.scss';
import { calcDateToMonthAndDay } from '../../../../../../utils/util';
import MixedDishLayout from '../../DishLayout/mixedDishLayout';
import MixModalLayout from '../../DishLayout/mixedModalLayout';
import Accordion from '../../../../../../components/Accordion';
import AsianWrapper from '../AsianWarpper/wrapper1';

@connect(({ asianGG, chsDB}) => ({
  asianGG,
  chsDB,
}))
class Mixed extends PureComponent {

  state = {
    isShow: false,
    matchId:0
  };


  /* 请求比赛所有玩法的赔率赔率，参数比赛id */
  openMatchAllOdds = (matchId) => {
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
      asianGG: {
        cptIds, matchListObj
      },
      chsDB: { chsDB },
    } = this.props;
    const { isShow, matchId } = this.state;
    return (
      <AsianWrapper
        gg='8'
        title='混合过关'
      >
        <Row className={styles.table}>
          <Col className={styles['big-tb']} span={2}>时间</Col>
          <Col className={styles['big-tb']} span={6}>赛事</Col>
          <Col className={styles['middle-tb']} span={8}>
            <Row className={styles['cell-th']}>
              全场
            </Row>
            <Row>
              <Col span={8} className={styles.cell}>让球</Col>
              <Col span={8} className={styles.cell}>大/小</Col>
              <Col span={8} className={styles.cell}>独赢</Col>
            </Row>
          </Col>
          <Col className={styles['middle-tb']} span={8}>
            <Row className={styles['cell-th']}>
              上半场
            </Row>
            <Row>
              <Col span={8} className={styles.cell}>让球</Col>
              <Col span={8} className={styles.cell}>大/小</Col>
              <Col span={8} className={styles.cell}>独赢</Col>
            </Row>
          </Col>
        </Row>
        <div>
          {
            cptIds && cptIds.length === 0 ? <div className="no-match">暂无比赛</div> : cptIds.map((val) => (
              <div key={val}>
                <Accordion
                  cptName={matchListObj[val] && matchListObj[val][0].cptName}
                >
                  <div className={styles['match-info']}>
                    {
                      matchListObj[val].map((v) => (
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
                            {/*全场投注区*/}
                            <Col span={8} className={styles['match-odds']}>
                              <Row>
                                <Col span={8} className={styles['match-odds-list']}>
                                  {
                                    v.odds[0].chs.map((item) => (
                                        <div className={styles['match-odds-item']} key={item.choiceId}>
                                          <span className={styles.handicap}>{item.choiceHandicap}</span>
                                          <span className={styles.odds}>
                                                              <MixedDishLayout
                                                                choiceId={item.choiceId}
                                                                matchId={v.matchId}
                                                                dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                                                dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                                              />
                                                           </span>
                                        </div>
                                      ),
                                    )
                                  }
                                </Col>
                                <Col span={8} className={styles['match-odds-list']}>
                                  {
                                    v.odds[1] && v.odds[1].chs.map((item, index) => (
                                        <div className={styles['match-odds-item']} key={item.choiceId}>
                                              <span
                                                className={styles.handicap}>{index === 0 ? '大' : '小'}{item.choiceHandicap}</span>
                                          <span className={styles.odds}>
                                                              <MixedDishLayout
                                                                choiceId={item.choiceId}
                                                                matchId={v.matchId}
                                                                dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                                                dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                                              />
                                                           </span>
                                        </div>
                                      ),
                                    )
                                  }
                                </Col>
                                <Col span={8} className={styles['match-odds-list']}>
                                  {
                                    v.odds[2] && v.odds[2].chs.map((item) => (
                                        <div className={styles['match-odds-item']} key={item.choiceId}>
                                          <span className={styles.handicap}>{item.choiceHandicap}</span>
                                          <span className={styles.odds}>
                                                              <MixedDishLayout
                                                                choiceId={item.choiceId}
                                                                matchId={v.matchId}
                                                                dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                                                dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                                              />
                                                           </span>
                                        </div>
                                      ),
                                    )
                                  }
                                </Col>
                              </Row>
                            </Col>
                            {/* 上半场投注区*/}
                            <Col span={8} className={styles['match-odds']}>
                              <Row>
                                <Col span={8} className={styles['match-odds-list']}>
                                  {
                                    v.odds[3] && v.odds[3].chs.map((item) => (
                                        <div className={styles['match-odds-item']} key={item.choiceId}>
                                          <span className={styles.handicap}>{item.choiceHandicap}</span>
                                          <span className={styles.odds}>
                                                              <MixedDishLayout
                                                                choiceId={item.choiceId}
                                                                matchId={v.matchId}
                                                                dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                                                dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                                              />
                                                           </span>
                                        </div>
                                      ),
                                    )
                                  }
                                </Col>
                                <Col span={8} className={styles['match-odds-list']}>
                                  {
                                    v.odds[4] && v.odds[4].chs.map((item, index) => (
                                        <div className={styles['match-odds-item']} key={item.choiceId}>
                                              <span
                                                className={styles.handicap}>{index === 0 ? '大' : '小'}{item.choiceHandicap}</span>
                                          <span className={styles.odds}>
                                                              <MixedDishLayout
                                                                choiceId={item.choiceId}
                                                                matchId={v.matchId}
                                                                dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                                                dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                                              />
                                                           </span>
                                        </div>
                                      ),
                                    )
                                  }
                                </Col>
                                <Col span={8} className={styles['match-odds-list']}>
                                  {
                                    v.odds[5] && v.odds[5].chs.map((item) => (
                                        <div className={styles['match-odds-item']} key={item.choiceId}>
                                          <span className={styles.handicap}>{item.choiceHandicap}</span>
                                          <span className={styles.odds}>
                                                              <MixedDishLayout
                                                                choiceId={item.choiceId}
                                                                matchId={v.matchId}
                                                                dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                                                dish={chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                                              />
                                                           </span>
                                        </div>
                                      ),
                                    )
                                  }
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                          <div className={styles['play-btn']}>
                            {
                              /*  allMatchExpend === v.matchId ?
                                  <Fragment>
                                    <div className={styles.btn} onClick={this.collapseMatchAllOdds}>
                                      收起
                                    </div>
                                    <div className={styles['all-odds-box']}>
                                      {
                                        matchAllOddsLoading ? <div className={styles.loading}>loading...</div> :
                                        matchAllOdds[0] && matchAllOdds[0].odds.map( (oddsItem) => (
                                          <div className={styles['single-odds']} key={oddsItem.gamblingId}>
                                            <div className={styles.oddsName}>
                                              { oddsItem.oddName }
                                            </div>
                                            <div className={styles.oddsDish}>
                                              {
                                                oddsItem.chs.map((chsItem) => (
                                                  <div key={chsItem.choiceId} className={styles['dish-box']}>
                                                    <div className={styles.dishName}>{dishNameMap[chsItem.name]}<span className={styles.choicehandicap}>{chsItem.choiceHandicap && `(${chsItem.choiceHandicap})`}</span></div>
                                                    <div
                                                      className={(mixedShopCart.list[chsItem.matchId] && mixedShopCart.list[chsItem.matchId].choiceId === chsItem.choiceId)  ? `${styles.dish} ${styles.active}` : styles.dish}
                                                      onClick={() => this.addMixedShopCart( v.matchId, oddsItem.gamblingId, chsItem.choiceId, chsItem.dishId)}
                                                    >{chsItem.dish}</div>
                                                  </div>
                                                ))
                                              }
                                            </div>
                                          </div>
                                        ))
                                      }
                                    </div>
                                  </Fragment>
                                  :*/
                              <div className={styles.btn} onClick={() => this.openMatchAllOdds(v.matchId)}>
                                所有玩法<span style={{ marginLeft: '4px' }} >{v.amount}</span>
                              </div>
                            }

                          </div>
                        </Row>
                      ))

                    }
                  </div>
                </Accordion>
              </div>
            ))
          }
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
              color: 'white',
              padding: '2px 4px',
            }}
          >
            {
              isShow ?
                <MixModalLayout matchId={matchId}/>
                : ''
            }
          </Modal>

        </div>
      </AsianWrapper>
    );
  }
}

export default Mixed;
