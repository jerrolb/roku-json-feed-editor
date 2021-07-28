import React from "react";
import { Modal } from "antd";

const Save = ({ onOk, onCancel }) =>
  <Modal title="Are you sure?" visible={true} onOk={onOk} onCancel={onCancel}>
    <p>You are about to update the feed. Press OK to continue.</p>
  </Modal>
;

export default Save;
