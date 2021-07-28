import React from "react";
import { Modal } from "antd";

const DelVideo = ({ onOk, onCancel }) =>
  <Modal title="Delete Video" visible={true} onOk={onOk} onCancel={onCancel} okText="Delete Video">
    <p>Are you sure you want to delete this video?</p>
  </Modal>
;

export default DelVideo;
