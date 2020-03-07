import React, { PureComponent } from 'react';
import { Table } from 'antd';
import styles from './index.less';

class ETable extends PureComponent {

  handleTableChange = pagination => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(pagination);
    }
  };

  render() {
    const { dataSource = {}, rowKey, ...rest } = this.props;
    const {  current, count, data  } = dataSource;
    const paginationProps = {
      current: current,
      total: count,
      pageSize:10
    };

    return (
      <div className={styles.eTable}>
        <div className={styles.tableAlert}>
          <Table
            rowKey={rowKey || 'key'}
            dataSource={data}
            pagination={paginationProps}
            onChange={this.handleTableChange}
            {...rest}
          />
        </div>
      </div>
    );
  }
}

export default ETable;
