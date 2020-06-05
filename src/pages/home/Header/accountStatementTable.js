import React, { Component } from 'react';
import { connect } from 'dva';
import { Icon, } from 'antd';
import { formatUTCToLocal } from '@/utils/util'
import ETable from '@/components/Etable';
import styles from './header2.scss';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

@connect(({ accountStatement, loading }) => ({
  accountStatement,
  loading: loading.models.accountStatement,
}))
class AccountStatementTable extends Component {
  columns = [
    {
      title: '日期',
      dataIndex: 'date',
      render: (val) => (
        formatUTCToLocal(val)
        )
    },
    {
      title: '注单',
      dataIndex: 'title',
    },
    {
      title: '账变类型',
      dataIndex: 'type',
    },
    {
      title: '账变金额',
      dataIndex: 'money',
    },
    {
      title: '余额',
      dataIndex: 'balance',
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'accountStatement/fetch',
      payload: {
        page: 1,
        size: 10,
        sport: '1'
      }
    });
  }

  handleStandardTableChange = page => {
    const { dispatch } = this.props;
    const params = {
      size: page.pageSize,
      page: page.current,
    };
    dispatch({
      type: 'accountStatement/fetch',
      payload: {
        sport: '1',
          ...params
      },
    });
  };

  render() {
    const { accountStatement: { data }, loading } = this.props;
    return (
      <div className={styles.runningTable}>
        <ETable
          dataSource={data}
          rowKey={record => record.title}
          columns={this.columns}
          onSelectRow={this.handleSelectRows}
          onChange={this.handleStandardTableChange}
          loading={loading && { indicator: antIcon }}
        />
      </div>
    );
  }
}

export default AccountStatementTable;
