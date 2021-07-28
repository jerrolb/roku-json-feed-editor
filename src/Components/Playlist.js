import React from "react";
import Thumbnail from "./Thumbnail";
import { PlusOutlined, DeleteOutlined, OrderedListOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

const style = {
  title: {
    margin: 3,
    marginBottom: 10,
    fontSize: "larger",
    fontWeight: "bold",
  },
};

const Playlist = ({ playlist, index, cb }) => {
  const title = playlist.title;
  const list = playlist.videos.reduce((acc, video, i) => {
    acc.push(<Thumbnail imgSrc={video.thumbnail} key={video.id} theKey={video.id} i={i} t={title} cb={cb} video={video}/>);
    return acc;
  }, []);

  return (
    <div style={{ border: "2px solid black", backgroundColor: "lightblue", marginBottom: 20 }} key={title + index}>
      <p style={style.title}>
        {title + " "}
        <Tooltip title="Add a Video"><PlusOutlined onClick={() => cb.showAddVideo(title)} style={{ margin: 5 }}/></Tooltip>
        <Tooltip title="Set Playlist Position"><OrderedListOutlined onClick={() => cb.showSetPlaylistPos(title, index) } style={{ margin: 5 }}/></Tooltip>
        <Tooltip title="Delete Playlist"><DeleteOutlined onClick={() => cb.showDelPlaylist(title)} style={{ margin: 5 }}/></Tooltip>
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", margin: 20 }}>
        {list}
      </div>
    </div>
  );
};

export default Playlist;
