import React from "react";
import { Button, Modal, Input, Form } from "antd";

const AddPlaylist = ({ onOk, onCancel }) =>
  <Modal title="Add Playlist" visible={true} footer={null} onCancel={onCancel}>
    <Form onFinish={(values) => onOk(values.name)}>
      <Form.Item
        name={"name"}
        label={"Name"}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Add Playlist
      </Button>
      <Button type="default" onClick={onCancel}>
        Cancel
      </Button>
    </Form>
  </Modal>
;

export default AddPlaylist;
