import React, { PureComponent } from 'react';
import { Pagination } from 'antd';

import styles from './index.scss';

class CommandMatch extends PureComponent {

  fn = (page) => {
    const { onChange } = this.props;
    onChange(page)
  };

  render() {
    const { total, current, pageSize } = this.props;
    return (
      <div className={styles['pagination-box']}>
        <Pagination total={total} current={current} pageSize={pageSize} onChange={this.fn} />
      </div>
    );
  }
}

export default CommandMatch;
