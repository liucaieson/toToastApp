import React from 'react';
import { Pagination } from 'antd';

import styles from './index.scss';

export default ({ total, current, pageSize, onChange }) => {
  const fn = (page) => {
    onChange(page);
  };

  return (
    <div className={styles['pagination-box']}>
      <Pagination total={total} current={current} pageSize={pageSize} onChange={fn} />
    </div>
  );
}
