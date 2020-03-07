import React, { Component,} from 'react';
import {
  Modal,
} from 'antd';

import GameResultTable from './gameResultTable'

class GameResult extends Component {
  render() {
    const { gameResultVisible, closeGameResultModal } = this.props;
    return (
      <Modal
        title="比赛结果"
        visible={gameResultVisible}
        onCancel={closeGameResultModal}
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
        {!gameResultVisible || (
          <GameResultTable />
        )}
      </Modal>

    );
  }
}

export default GameResult;
