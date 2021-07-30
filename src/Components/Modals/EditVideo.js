import React from "react";
import { Modal, Form, Input, InputNumber, Button, DatePicker } from "antd";

const layout = {
  labelCol: {
    span: 6,
  },
};

const validateMessages = {
  required: "${label} is required!",
};

const EditVideo = ({ onCancel, onOk, initialValues = {}}) =>
  <Modal title="Edit Video" visible={true} footer={null} onCancel={onCancel} okText="Save">
    <Form {...layout} onFinish={(values) => onOk(values)} validateMessages={validateMessages} initialValues={initialValues}>
      <Form.Item
        name={"title"}
        label="Title"
        rules={[
          {
            required: true,
            max: 50
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"description"}
        label="Description"
        rules={[
          {
            required: true,
            max: 200,
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        name={"releaseDate"}
        label="Release Date"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker/>
      </Form.Item>
      <Form.Item
        name={"thumbnail"}
        label="Thumbnail"
        rules={[
          {
            required: true,
            pattern: ".*https",
            message: "Must use https:// in url"
          },
        ]}
      >
        <Input placeholder="https://i.vimeocdn.com/video/956860457.jpg"/>
      </Form.Item>
      <Form.Item
        name={"background"}
        label="Background"
        rules={[
          {
            pattern: ".*https",
            message: "Must use https:// in url"
          },
        ]}
      >
        <Input placeholder="https://nolachurch.com/stream/backgrounds/bg.png"/>
      </Form.Item>
      <Form.Item
        name={"url"}
        label="Video link"
        rules={[
          {
            required: true,
            pattern: ".*https",
            message: "Must use https:// in url"
          },
        ]}
      >
        <Input.TextArea placeholder="https://player.vimeo.com/external/459995615.m3u8?s=f297dd991e728ff03e6c4119f9f0d10f23307d26"/>
      </Form.Item>
      <Form.Item
        name={"hours"}
        label={"Hours"}
      >
        <InputNumber/>
      </Form.Item>
      <Form.Item
        name={"mins"}
        label={"Minutes"}
      >
        <InputNumber/>
      </Form.Item>
      <Form.Item
        name={"secs"}
        label="Seconds"
      >
        <InputNumber/>
      </Form.Item>
      <Button type="primary" htmlType="submit">
          Edit
      </Button>
      <Button type="default" onClick={onCancel}>
          Cancel
      </Button>
    </Form>
  </Modal>
;

export default EditVideo;
