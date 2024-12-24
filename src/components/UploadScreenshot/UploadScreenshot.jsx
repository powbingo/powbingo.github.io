import React, { useEffect, useMemo, useState } from 'react';

import './UploadScreenshot.css';
import { useDispatch, useSelector } from 'react-redux';
import { getBoard, updateTile } from '../Board/state/boards.actions';
import { useForm } from 'antd/es/form/Form';
import { FileOutlined, UploadOutlined } from '@ant-design/icons';
import { Col, Form, notification, Row, Select } from 'antd';
import Dragger from 'antd/es/upload/Dragger';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
}

export default function UploadScreenshot({
  tile,
  onSubmit: onSubmitProp,
}) {
  const dispatch = useDispatch();
  const [form] = useForm();
  const [files, setFiles] = useState([]);

  const board = useSelector(state => state.boards.board);
  const teamId = useSelector(state => state.settings.teamId);

  useEffect(() => {
    if (!teamId) return;
    dispatch(getBoard(teamId));
  }, []);

  const tiles = useMemo(() => {
    return board?.reduce((acc, row) => {
      return [...acc, ...row];
    }, [])?.map((tile) => ({
      value: tile.id,
      label: tile.name,
    }));
  }, [board]);

  const onAddFile = ({ file, onSuccess, onError }) => {
    if (!file) {
      onError('No file found');
      return;
    };

    if (!file.type?.includes('image')) {
      onError('File must be an image');
      return;
    }

    const newFile = new File([file], file.name, { type: file.type });
    setFiles([...files, newFile]);
    onSuccess();
  };


  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      const base64Files = await Promise.all(files.map((file) => getBase64(file)));

      console.log('here', base64Files);
      const result = await dispatch(updateTile(teamId, values.tile, {
        images: base64Files,
      }));

      if (result) {
        form.resetFields();
        setFiles([]);
        notification.success({
          message: 'Screenshot uploaded successfully',
        });
        onSubmitProp?.();
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Row style={{ marginTop: tile ? 0 : 50 }}>
        <Col span={tile ? 24 : 16}>
          { teamId && (
            <>
              <div className="upload-form">
                <Form
                  form={form}
                  layout="vertical"
                  name="uploadScreenshotForm"
                  style={{ minWidth: 500 }}
                  initialValues={{
                    tile: tile?.id,
                  }}
                >
                  <Form.Item
                    label="Tile"
                    name="tile"
                    rules={[{ required: true, message: 'Please select a tile' }]}
                  >
                    <Select
                      options={tiles}
                      placeholder="Select a tile"
                      showSearch
                      optionFilterProp="label"
                      disabled={!!tile}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Upload screenshot"
                    name="screenshot"
                    rules={[{ required: true, message: 'Please upload a screenshot' }]}
                    style={{ paddingTop: 15 }}
                  >
                    <Dragger
                      name="file"
                      listType='picture'
                      className="upload-dragger"
                      customRequest={onAddFile}
                    >
                      <div className='upload-text ibm-plex-sans-medium'>
                        <FileOutlined className="upload-icon" /> Click or drag file to this area to upload
                      </div>
                    </Dragger>

                  </Form.Item>
                </Form>
                <div className="submit-button ibm-plex-sans-medium" onClick={onSubmit}>
                  <UploadOutlined className="upload-icon" /> Submit
                </div>
              </div>
            </>
          )}
          { !teamId && (
            <div className="no-team ibm-plex-sans-medium">
              Please log in to view this page.
            </div>
          )}
        </Col>
        <Col span={8} />
      </Row>
    </>
  )
}