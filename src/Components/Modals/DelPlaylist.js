import React from "react";
import { Modal } from "antd";

const DelPlaylist = ({ onOk, onCancel, playlistToDel }) =>
  <Modal title="Delete Playlist" visible={true} onOk={onOk} onCancel={onCancel} okText={`Delete ${ playlistToDel }`}>
    <p>{`Are you sure you want to delete the playlist ${ playlistToDel }?`}</p>
  </Modal>
;

export default DelPlaylist;
