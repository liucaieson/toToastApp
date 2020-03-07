import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Modal,
} from 'antd';

import HistoryBetsContent from './historyBetsContent';

class HistoryBets extends Component {
  state = {

  };

  render() {
    const { historyBetsVisible, closeHistoryBetsModal } = this.props;
    return (
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
          color:'white',
          padding:0,
        }}
      >
        {!historyBetsVisible || (
          <HistoryBetsContent />
        )}
      </Modal>
    )
  }
}

export default HistoryBets;
