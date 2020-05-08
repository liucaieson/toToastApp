import React from 'react';
import {
  Modal,
} from 'antd';

import RuleDescriptionContent from './ruleDescriptionContent';

export default ({ ruleDescriptionVisible, closeRuleDescriptionModal }) => (
  <Modal
    title="规则说明"
    visible={ruleDescriptionVisible}
    onCancel={closeRuleDescriptionModal}
    width={800}
    footer={null}
    destroyOnClose
    bodyStyle={{
      minHeight: '400px',
      overflow: 'auto',
      color: 'white',
      padding: 0,
      height: '600px',
    }}
  >
    {!ruleDescriptionVisible || (
      <RuleDescriptionContent/>
    )}
  </Modal>
)
