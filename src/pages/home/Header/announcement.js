import React from 'react';
import {
  Modal,
} from 'antd';
import AnnouncementContent from './announcementContent'


export default ({ announcementVisible, closeAnnouncementModal }) => (
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
      color: '#232323',
      padding: 0
    }}
  >
    <AnnouncementContent />
  </Modal>
)
