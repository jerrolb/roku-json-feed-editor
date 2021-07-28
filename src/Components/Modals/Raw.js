import React from "react";
import { Modal, Tabs } from "antd";

const Raw = ({ onCancel, feed, idToBg }) =>
  <Modal width={"80%"} title="Raw Data" visible={true} onCancel={onCancel} footer={null}>
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="Feed" key="1">
        <pre>{JSON.stringify(feed, null, 4)}</pre>
      </Tabs.TabPane>
      <Tabs.TabPane tab="ID to BG" key="2">
        <pre>{JSON.stringify(idToBg, null, 4)}</pre>
      </Tabs.TabPane>
    </Tabs>
  </Modal>
;

export default Raw;
