import React, { Component } from 'react';
import { connect } from 'dva';
import { Pagination, Form, Row, Col, Button, Select } from 'antd';
import styles from './header2.scss';
import { dishNameMap, formatUTCToLocal, betTypeMap, betStatusMap, betResultMap } from '@/utils/util';
import Loading from '@/components/MbPageLoading';

const FormItem = Form.Item;

@connect(({ historyBets, userInfo, loading }) => ({
  historyBets,
  userInfo,
  loading: loading.models.historyBets,
}))
@Form.create()
class HistoryBetsContent extends Component {
  defaultParams = '';

  componentDidMount() {
    const { dispatch, userInfo: { userId } } = this.props;
    dispatch({
      type: 'historyBets/fetch',
      payload: {
        sport: '1',
        userId,
        page: 1,
        size: 5,
        betStatus: this.defaultParams
      }
    });
  }

  handleTableChange = (page) => {
    const { dispatch, userInfo: { userId } } = this.props;
    dispatch({
      type: 'historyBets/fetch',
      payload: {
        userId,
        sport: '1',
        page,
        size: 5,
        betStatus: this.defaultParams
      }
    });
  };

  handleSearch = (e) => {
    e.preventDefault();
    const { userInfo: { userId }, dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const { betStatus } = fieldsValue;
      this.defaultParams = betStatus;
      dispatch({
        type: 'historyBets/fetch',
        payload: {
          sport: '1',
          userId,
          page: 1,
          size: 5,
          betStatus
        },
      });
    });
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row className={styles.inputBox}>
          <Col md={8} sm={24}>
            <FormItem label="状态查询">{
              getFieldDecorator('betStatus', {
                initialValue: ''
              })(
                <Select className={styles['status-result-select']}>
                  <Select.Option value="" key="a">
                    全部
                  </Select.Option>
                  <Select.Option value="0" key="0">
                    未结算
                  </Select.Option>
                  <Select.Option value="1" key="1">
                    已结算
                  </Select.Option>
                </Select>
              )
            }
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <Button className={styles.searchButton} type="primary" htmlType="submit">
              查询
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { historyBets: { data, count, current }, loading } = this.props;
    return (
      <div>
        {this.renderSimpleForm()}
        <div className={styles['table-header']}>
          <div className={styles.item}>比赛时间</div>
          <div className={styles.item}>主客队</div>
          <div className={styles.item}>下注盘口</div>
          <div className={styles.item}>下注项</div>
          <div className={styles.item}>结算赔率</div>
          <div className={styles.item}>结算结果</div>
        </div>
        {
          loading ?
            <Loading /> :
            data.map((val) => (
            <div key={val.betId} className={styles.historyBets}>
              <div className={styles['bet-time-line']}>
                <div className={styles.status}>{ betStatusMap[val.betStatus] }</div>
                <div className={styles.time}>{ formatUTCToLocal(val.betTime)}</div>
                <div className={styles.text1}>订单号：</div>
                <div className={styles.time}>{val.betId}</div>
              </div>
             <div>
                {
                  val.bizBetDetailVOList.map((v) => (
                    <div className={styles['bet-detail-line']} key={v.matchTime}>
                      <div>{ formatUTCToLocal(v.matchTime)}</div>
                      <div>{v.hostTeam}<br/>{v.awayTeam}</div>
                      <div>{v.typeName}</div>
                      <div>{dishNameMap[v.choiceContent]}{v.choiceHandicap}</div>
                      <div>{v.dishRate}</div>
                      <div>{v.resultFlag === 1 ? <span style={{ color: '#ec0c0c' }}>{betResultMap[v.resultFlag]}</span> : betResultMap[v.resultFlag]}</div>
                    </div>
                  ))
                }
              </div>
              <div className={styles['bet-money-line']}>
                <div className={styles.type}>{betTypeMap[val.betType]}</div>
                <div className={styles.money}>押注金：￥{val.betMoney}</div>
                <div className={styles.bonus}>{val.betStatus !== 0 ? `返奖金额：￥${val.bonusMoney}` : null}</div>
              </div>
            </div>
          ))
        }
        <div className={styles['pagination-box']}>
          <Pagination
            total={count}
            current={current}
            defaultCurrent={1}
            pageSize={5}
            onChange={this.handleTableChange}
          />
        </div>
      </div>
    );
  }
}

export default HistoryBetsContent;
