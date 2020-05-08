import React from 'react';
import {
  Modal,
} from 'antd';

import HistoryBetsContent from './historyBetsContent';

export default ({ historyBetsVisible, closeHistoryBetsModal }) => (

  <Modal
    title="历史投注"
    visible={historyBetsVisible}
    onCancel={closeHistoryBetsModal}
    width={1000}
    footer={null}
    destroyOnClose
    bodyStyle={{
      minHeight: '400px',
      overflow: 'auto',
      color: 'white',
      padding: 0,
    }}
  >
    {!historyBetsVisible || (
      <HistoryBetsContent/>
    )}
  </Modal>
)
