import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Pagination, Form, Row, Col, Button, Select } from 'antd';
import styles from './header2.scss';
import {dishNameMap} from '@/utils/util';
import Loading from '../../../components/MbPageLoading';
import moment from 'moment';
const FormItem = Form.Item;

const betTypeMap = {
  '1':'单注',
  '2':'二串一',
  '3':'三串一',
  '4':'四串一',
  '5':'五串一',
  '6':'六串一',
};

@connect(({ historyBets,userInfo, loading }) => ({
  historyBets,
  userInfo,
  loading: loading.models.historyBets,
}))
@Form.create()
class HistoryBetsContent extends Component {

  defaultParams = '';

  componentDidMount() {
    const { dispatch, userInfo: {userId} } = this.props;
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
    const { dispatch, userInfo: {userId} } = this.props;
    dispatch({
      type: 'historyBets/fetch',
      payload: {
        userId,
        sport:"1",
        page,
        size: 5,
        betStatus: this.defaultParams
      }
    });
  };

  handleSearch = (e) => {
    e.preventDefault();
    const { userInfo: {userId},dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      let { betStatus } = fieldsValue;
      this.defaultParams = betStatus;
      dispatch({
        type: 'historyBets/fetch',
        payload: {
          sport: '1',
          userId,
          page:1,
          size:5,
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
              getFieldDecorator('betStatus')(
                <Select className={styles['status-result-select']}  placeholder='全部'>
                  <Select.Option value='' key='a'>
                    全部
                  </Select.Option>
                  <Select.Option value='0' key='0'>
                    未结算
                  </Select.Option>
                  <Select.Option value='1' key='1'>
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
    const { historyBets:{ data, count, current},loading } = this.props;
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
          loading?
            <Loading /> :
            data.map((val) => (
            <div key={val.betId} className={styles.historyBets}>
              <div className={styles['bet-time-line']}>
                <div className={styles.status}>{val.betStatus}</div>
                <div className={styles.text}>下注时间：</div>
                <div className={styles.time}>{val.betTime.substring(0,19)}</div>
              </div>
              <div>
                {
                  val.detailed.map((v) => (
                    <div className={styles['bet-detail-line']} key={v.matchTime}>
                      <div>{v.matchTime && v.matchTime.substring(0,19)}</div>
                      <div>{v.hostName}<br/>{v.awayName}</div>
                      <div>{v.oddName}</div>
                      <div>{dishNameMap[v.choiceContent]}{v.choiceHandicap}</div>
                      <div>{v.dishRate}</div>
                      <div>{v.resultFlag === null ? '未结算' :(v.resultFlag === '胜'? <span style={{color: '#ec0c0c'}}>{v.resultFlag}</span> : v.resultFlag)}</div>
                    </div>
                  ))
                }
              </div>
              <div className={styles['bet-money-line']}>
                <div className={styles.type}>{betTypeMap[val.betType]}</div>
                <div className={styles.price}>单注：￥{val.betPrice}</div>
                <div className={styles.money}>押注金：￥{val.betMoney}</div>
                <div className={styles.bonus}>返回金额：￥{val.bonusMoney}</div>
              </div>
            </div>
          ))
        }
        <div className={styles['pagination-box']}>
          <Pagination total={count} current={current} defaultCurrent={1} pageSize={5} onChange={this.handleTableChange} />
        </div>
      </div>
    );
  }
}

export default HistoryBetsContent;
