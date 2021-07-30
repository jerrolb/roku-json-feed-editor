import React from "react";
import { Button, Dropdown, Menu } from "antd";

const Header = (props) => {
  const menuAction = (action) => {
    props.setFeedToFetch(action.key);
  };

  const generateVersions = () => {
    return props.versions.reduce((acc, version) => {
      if (version !== "placeholder") {
        let timestamp = version.replace("feed", "").replace(".json", "");
        timestamp = new Date(timestamp * 1000).toLocaleString();
        acc.push(<Menu.Item key={version}>{timestamp}</Menu.Item>);
      }
      return acc;
    }, []);
  };

  const menu =
    <Menu onClick={menuAction}>
      {generateVersions()}
    </Menu>
  ;

  return (
    <div style={{ backgroundColor: "white", position: "sticky", top: 0, left: 0, height: 60, display: "flex", justifyContent: "flex-end", alignItems: "center", borderBottom: "2px solid black" }}>
      <Button className="headerBtn" type="default" onClick={props.showRaw}>Raw</Button>
      <span className="headerBtn">&ensp;</span>

      {props.versions.length > 1 ?
        <Dropdown arrow={true} overlay={ menu } trigger={["click"]}>
          <Button className="headerBtn" type="default">Backups</Button>
        </Dropdown>
        :
        <Button className="headerBtn" type="default" disabled={true}>Version</Button>
      }

      <span className="headerBtn">&ensp;</span>
      <Button className="headerBtn" type="default" onClick={props.undo}>Undo</Button>
      <span className="headerBtn">&ensp;</span>
      <Button className="headerBtn" type="default" onClick={props.redo}>Redo</Button>
      <span className="headerBtn">&ensp;</span>
      <Button className="headerBtn" type="primary" onClick={props.showSave}>Save</Button>
      <span className="headerBtn">&ensp;</span>
    </div>
  );
};

export default Header;
