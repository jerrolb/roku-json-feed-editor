import React from "react";
import { Modal, InputNumber, Form, Button } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const SetVideoPos = ({ onOk, onCancel, max, curr }) =>
  <Modal title="Set Video Position" visible={true} footer={null} onCancel={onCancel} okText="Set Video Position">
    <Form {...layout} onFinish={(values) => onOk(values.pos)} initialValues={{ pos: curr + 1 }} validateMessages={validateMessages}>
      <Form.Item
        name={"pos"}
        label="New position"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber min={1} max={max}/>
      </Form.Item>
      <Button type="primary" htmlType="submit">
          Set position
      </Button>
      <Button type="default" onClick={onCancel}>
          Cancel
      </Button>
    </Form>
    {/* <p>Select new position</p>
    <InputNumber min={1} max={5} defaultValue={1}/> */}
  </Modal>
;

export default SetVideoPos;
