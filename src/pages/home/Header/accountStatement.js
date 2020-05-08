import React from 'react';
import {
  Modal,
} from 'antd';

import AccountStatementTable from './accountStatementTable';

export default ({ accountStatementVisible, closeAccountStatementModal }) => (

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
        color: '#232323',
        padding: 0
      }}
    >
      {!accountStatementVisible || (
        <AccountStatementTable/>
      )}
    </Modal>
)
