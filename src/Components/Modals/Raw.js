import React from "react";
import { Modal } from "antd";

const Raw = ({ onCancel, feed }) =>
  <Modal width={"80%"} title="Raw Feed" visible={true} onCancel={onCancel} footer={null}>
    <pre>{JSON.stringify(feed, null, 4)}</pre>
  </Modal>
;

export default Raw;
