import React, { Component} from 'react';
import {
  Modal,
} from 'antd';

import AccountStatementTable from './accountStatementTable'

class AccountStatement extends Component {
  render() {
    const { accountStatementVisible, closeAccountStatementModal } = this.props;
    return (
      <Modal
        title="账变记录"
        visible={accountStatementVisible}
        onCancel={closeAccountStatementModal}
        width={1000}
        footer={null}
        destroyOnClose
        bodyStyle={{
          minHeight: '400px',
          overflow: 'hidden',
          color:'#232323',
          padding:0
        }}
      >
        {!accountStatementVisible || (
          <AccountStatementTable />
        )}
      </Modal>

    );
  }
}

export default AccountStatement;
