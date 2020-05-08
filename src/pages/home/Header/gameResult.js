import React from 'react';
import {
  Modal,
} from 'antd';

import GameResultTable from './gameResultTable'

export default ({ gameResultVisible, closeGameResultModal }) => (
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
          color: '#232323',
          padding: 0
        }}
      >
        {!gameResultVisible || (
          <GameResultTable />
        )}
      </Modal>
    );
