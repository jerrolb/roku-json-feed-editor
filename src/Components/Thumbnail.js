import React from "react";
import { Dropdown, Menu } from "antd";

function Thumbnail({ imgSrc, theKey, i, t, cb, video }) {
  const id = video.id;
  const menuAction = (action) => {
    switch (action.key) {
    case "delete":
      cb.showDelVideo(id, t);
      break;
    case "edit":
      cb.showEdit(video);
      break;
    case "setPosition":
      cb.showSetVideoPos(t, i);
      break;
    default:
      console.debug(action.key);
      break;
    }
  };
  const menu =
      <Menu onClick={menuAction}>
        <Menu.Item key={ "edit" }>Edit Video</Menu.Item>
        <Menu.Item key={ "delete" }>Delete Video</Menu.Item>
        <Menu.Item key={"setPosition"}>Set Video Position</Menu.Item>
      </Menu>
  ;

  return (
    <div
      key={theKey + t + i}
    >
      <Dropdown arrow={true} overlay={ menu } trigger={ ["hover"]} placement={"topLeft"}>
        <img style={{ margin: 2, padding: 2 }} src={imgSrc} className="thumbnail" alt="Missing"/>
      </Dropdown>
    </div>
  );
}

export default Thumbnail;
