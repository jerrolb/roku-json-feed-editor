import React from "react";
import { Modal, Form, Input, DatePicker, InputNumber, Button } from "antd";

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    // span: 30,
  },
};

const validateMessages = {
  required: "${label} is required!", // eslint-disable-line no-template-curly-in-string
  types: {
    email: "${label} is not a valid email!", // eslint-disable-line no-template-curly-in-string
    number: "${label} is not a valid number!", // eslint-disable-line no-template-curly-in-string
  },
  number: {
    range: "${label} must be between ${min} and ${max}", // eslint-disable-line no-template-curly-in-string
  },
};

const AddVideo = ({ onOk, onCancel }) =>
  <Modal title="Add Video" visible={true} onCancel={onCancel} footer={null}>
    <Form {...layout} onFinish={(values) => onOk(values)} validateMessages={validateMessages} layout={"horizontal"}>
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
        name={"cover"}
        label="Cover"
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
        label="Hours"
      >
        <InputNumber/>
      </Form.Item>
      <Form.Item
        name={"mins"}
        label="Minutes"
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
          Add Video
      </Button>
      <Button type="default" onClick={onCancel}>
          Cancel
      </Button>
    </Form>
  </Modal>
;

export default AddVideo;
