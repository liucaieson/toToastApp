import React from 'react';
import { Table } from 'antd';
import styles from './index.less';

export default ({ dataSource = {}, rowKey, onChange, ...rest }) => {
  const handleTableChange = pagination => {
    if (onChange) {
      onChange(pagination);
    }
  };

  const { current, count, data } = dataSource;
  const paginationProps = {
    current,
    total: count,
    pageSize: 10,
  };

  return (
    <div className={styles.eTable}>
      <div className={styles.tableAlert}>
        <Table
          rowKey={rowKey || 'key'}
          dataSource={data}
          pagination={paginationProps}
          onChange={handleTableChange}
          {...rest}
        />
      </div>
    </div>
  );
}

