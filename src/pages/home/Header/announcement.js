import React, { Component,} from 'react';
import {
  Modal,
} from 'antd';
import { connect } from 'dva';
import AnnouncementContent from './announcementContent'


class Announcement extends Component {

  render() {
    const { announcementVisible, closeAnnouncementModal } = this.props;
    return (
      <Modal
        title="公告栏"
        visible={announcementVisible}
        onCancel={closeAnnouncementModal}
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
        <AnnouncementContent />

      </Modal>
    );
  }
}

export default Announcement;
