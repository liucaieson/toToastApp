import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment'
import {
  Row,
  Col,
  Form,
  Button,
  Icon,
  Select
} from 'antd';
import ETable from '../../../components/Etable';
import styles from './header2.scss'

const FormItem = Form.Item;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const timeList = [{
  name:'近7天',
  value: 'all'
}];
let date = '';

for (let i = 0; i < 7; i++) {
  date = moment().subtract(i, 'day').format('YYYY-MM-DD');
  timeList.push({
    name:date,
    value: date
  }
  )
}


@connect(({ gameResult, loading }) => ({
  gameResult,
  loading: loading.models.gameResult,
}))
@Form.create()
class GameResultTable extends Component {
  state = {

  };

  /* 储存联赛null代表全部  开始 */
  competitions = null;
  start = date = moment().subtract(7, 'day').format('YYYY-MM-DD');
  end = date = moment().format('YYYY-MM-DD');
  defaultParams={
    sport: '1'
  };
  columns = [
    {
      title: '联赛',
      dataIndex: 'competitionName',
    },
    {
      title: '时间',
      dataIndex: 'matchTime',
      width: 100,
    },
    {
      title: '主客队',
      dataIndex: 'type',
      width: 250,
      render: (val,record) => (
        <div>
          <div>
            {record.hostName}
          </div>
          <div>
            {record.awayName}
          </div>
        </div>
      )
    },
    {
      title: '半场比分',
      dataIndex: 'amount',
      render: (val,record) => (
        <div>
          <span>
            {record.hostHalf}:
          </span>
          <span>
            {record.awayHalf}
          </span>
        </div>
      )
    },
    {
      title: '最后比分',
      dataIndex: 'balance',
      render: (val,record) => (
        <div>
          <span>
            {record.hostGoals}
          </span>
          :
          <span>
            {record.awayGoals}
          </span>
        </div>
      )
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'gameResult/fetchAllCompetitions',
      payload: {
        ...this.defaultParams,
      }
    });
    dispatch({
      type: 'gameResult/fetch',
      payload: {
        ...this.defaultParams,
        page:1,
        size:10,
        start:this.start,
        end:this.end
      },
    });

  }

  handleStandardTableChange = page => {
    const { dispatch } = this.props;
    const params = {
      ...this.defaultParams,
      size: page.pageSize,
      page: page.current,
      start:this.start,
      end:this.end,
      competitions: this.competitions,
    };
    dispatch({
      type: 'gameResult/fetch',
      payload: params,
      callback: response => {
        const { current, size } = response;

      },
    });
  };

  /*赛果赛事，全部联赛传null，默认查7天之内的*/
  handleSearch = (e) => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      let { competitions, time } = fieldsValue;
      /* 如果用户没有选择联赛，就给null代表全部，时间同理 */
      if(competitions === undefined){
        competitions = null
      }else{
        this.competitions = competitions
      }
      if(time === 'all' ){
        this.start = date = moment().subtract(7, 'day').format('YYYY-MM-DD');
        this.end = date = moment().format('YYYY-MM-DD');
      }else if(time === undefined) {
        this.start = date = moment().subtract(7, 'day').format('YYYY-MM-DD');
        this.end = date = moment().format('YYYY-MM-DD');
      }else{
        this.start = time;
        this.end = time
      }
      dispatch({
        type: 'gameResult/fetch',
        payload: {
          ...this.defaultParams,
          page:1,
          size:10,
          competitions: this.competitions,
          start: this.start,
          end: this.end
        },
      });
    });
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
      gameResult: {competitions}
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row className={styles.inputBox}>
          <Col md={8} sm={24}>
            <FormItem label="联赛查询">{
              getFieldDecorator('competitions')(
                <Select
                  showSearch
                  className={styles['game-result-select']}
                  placeholder='可搜索'
                  optionFilterProp="children"
                 /* filterOption={(input, option) =>
                    option.props.children.indexOf(input) >= 0
                  }*/
                >
                  <Select.Option value={null} key='a'>
                    所有联赛
                  </Select.Option>
                  {
                    competitions.map((item) => (
                      <Select.Option value={item.competitionId} key={item.competitionId}>
                        {
                          item.competitionName
                        }
                      </Select.Option>
                    ))
                  }
                </Select>
              )
            }
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem label="选择时间">
              {
                getFieldDecorator('time',{
                  initialValue: 'all'
                })(
                  <Select
                    className={styles['game-result-select']}
                  >
                    {
                      timeList.map((item) => (
                        <Select.Option value={item.value} key={item.value}>
                          {
                            item.name
                          }
                        </Select.Option>
                      ))
                    }
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
    const { gameResult: { data }, loading } = this.props;

    return (
      <Fragment>
        {this.renderSimpleForm()}
        <ETable
          dataSource={data}
          rowKey={(record, index) => index}
          columns={this.columns}
          onSelectRow={this.handleSelectRows}
          onChange={this.handleStandardTableChange}
          loading={loading && { indicator: antIcon }}
        />
      </Fragment>

    );
  }
}

export default GameResultTable;
