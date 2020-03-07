import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Modal,
} from 'antd';

import RuleDescriptionContent from './ruleDescriptionContent';

class RuleDescription extends Component {
  state = {

  };

  render() {
    const { ruleDescriptionVisible, closeRuleDescriptionModal } = this.props;
    return (
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
          color:'white',
          padding:0,
          height:'600px'
        }}
      >
        {!ruleDescriptionVisible || (
          <RuleDescriptionContent />
        )}
      </Modal>
    )
  }
}

export default RuleDescription;
