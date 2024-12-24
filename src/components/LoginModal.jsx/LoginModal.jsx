import { Form, Input, Modal } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../state/settings/settings.actions';

export default function LoginModal({
  visible,
  onClose,
}) {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const onLoginSubmit = async () => {
    try {
      const values = await form.validateFields();
      const isPasswordValid = await dispatch(userLogin(values.password));

      if (isPasswordValid) {
        form.resetFields();
        onClose();
      }
      else {
        form.setFields([
          {
            name: 'password',
            errors: ['Incorrect password. Please try again.'],
          }
        ])
      }
    } catch (err) {
      // fail silently
    }
  }

  return (
    <Modal
      title="Login"
      open={visible}
      onOk={onLoginSubmit}
      onCancel={onClose}
      className="logout-modal"
    >
      <Form
        form={form}
        layout="vertical"
        name="loginForm"
      >
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password' }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
}