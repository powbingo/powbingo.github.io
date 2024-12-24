import React from 'react';
import { Modal, Upload } from 'antd';
import UploadScreenshot from './UploadScreenshot';

export default function UploadScreenshotModal({
  visible,
  onClose,
  tile,
}) {
  return (
    <Modal
      title="Upload Screenshot"
      open={visible}
      onCancel={onClose}
      className="logout-modal"
      footer={null}
    >
      <UploadScreenshot tile={tile} onSubmit={() => onClose()} />
    </Modal>
  );
}