import React, { useEffect, useState } from "react";
import Playlist from "./Components/Playlist";
import Header from "./Components/Header";
import { PlusOutlined } from "@ant-design/icons";
import { EditVideo, Save, DelPlaylist, AddPlaylist, AddVideo, DelVideo, SetVideoPos, SetPlaylistPos, Raw, Login } from "./Components/Modals";
import { Tooltip, message } from "antd";
import "./App.css";
import "antd/dist/antd.css";
import moment from "moment";
import { cloneDeep } from "lodash";
import Cookies from "universal-cookie";

function App() {
  const cookies = new Cookies();
  const getCookie = () => {
    return cookies.get("session");
  };
  const setCookie = () => {
    cookies.set("session", true, {
      expires: new Date(new Date().getTime() + 1800000)
    });
  };

  const [feed, setFeed] = useState({});
  const [feedToFetch, setFeedToFetch] = useState("feed.json");
  const [playlistss, setPlaylists] = useState([]);
  const [isSaveVisible, setIsSaveVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [isDelPlaylistVisible, setIsDelPlaylistVisible] = useState(false);
  const [isAddPlaylistVisible, setIsAddPlaylistVisible] = useState(false);
  const [isAddVideoVisible, setIsAddVideoVisible] = useState(false);
  const [isDelVideoVisible, setIsDelVideoVisible] = useState(false);
  const [isSetPlaylistPosVisible, setIsSetPlaylistPosVisible] = useState(false);
  const [isSetVideoPosVisible, setIsSetVideoPosVisible] = useState(false);
  const [isRawVisible, setIsRawVisible] = useState(false);
  const [playlistToDel, setPlaylistToDel] = useState("");
  const [videoToDel, setVideoToDel] = useState("");
  const [currVideo, setCurrVideo] = useState({});
  const [activity, setActivity] = useState([]);
  const [versions, setVersions] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [isUndoing, setIsUndoing] = useState(false);
  const [isRedoing, setIsRedoing] = useState(false);
  const [playlistPos, setPlaylistPos] = useState({});
  const [videoPos, setVideoPos] = useState({});
  const [loggedIn, setLoggedIn] = useState(getCookie());
  const [loginFailed, setLoginFailed] = useState(false);

  const saveSuccess = () => {
    message.success("Feed successfully updated");
  };
  const saveFailure = () => {
    message.error("Update Failed!");
  };
  const undoSuccess = () => {
    message.success("Undo successful");
  };
  const undoFailure = () => {
    message.warning("Nothing to Undo");
  };
  const redoSuccess = () => {
    message.success("Redo successful");
  };
  const redoFailure = () => {
    message.warning("Nothing to Redo");
  };

  const objToUriEncoded = (obj) => {
    let result = JSON.stringify(obj);
    return encodeURIComponent(result);
  };

  const showSave = () => { setIsSaveVisible(true); };
  const saveOk = () => {
    const formData = new FormData();
    const feedToSave = feed;
    feedToSave.lastUpdated = feedToSave.lastUpdated.replace(/^.{10}/g, new Date().toISOString().substr(0, 10));
    formData.append("feed", objToUriEncoded(feed));
    formData.append("token", "rxiWSWuP1pRlaG7OGOJBlR6IsojGPejO5ERM2h1xsIHjuoYuNqh3Lpx1cSfrDoxA");

    fetch("https://nolachurch.com/stream/write.php", {
      method: "POST",
      body: formData
    })
      .then((res) => {
        if (res.status === 200) {
          setIsSaveVisible(false);
          setVersions([]);
          saveSuccess();
        } else {
          saveFailure();
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };
  const saveCancel = () => { setIsSaveVisible(false); };

  const relDateToId = (relDate) => {
    return relDate.format("YYYYMMDD");
  };
  const getDateAdded = (relDate) => {
    const prefix = relDate.format("YYYY-MM-DD");
    const suffix = "T14:40:57+07:00";
    return `${ prefix }${ suffix }`;
  };
  const getRelDateString = (relDate) => {
    return relDate.format("YYYY-MM-DD");
  };

  const getVideoObj = (values) => {
    const hoursInSecs = values.hours >= 0 ? values.hours * 60 * 60 : 0;
    const minsInSecs = values.mins >= 0 ? values.mins * 60 : 0;
    const secs = values.secs >= 0 ? values.secs : 0;
    const duration = hoursInSecs + minsInSecs + secs;
    const id = relDateToId(values.releaseDate);
    const dateAdded = getDateAdded(values.releaseDate);
    const relDateString = getRelDateString(values.releaseDate);

    return {
      "id": id,
      "title": values.title,
      "releaseDate": relDateString,
      "thumbnail": values.thumbnail,
      "background": values.background,
      "shortDescription": values.description,
      "content": {
        "dateAdded": dateAdded,
        "duration": duration,
        "videos": [
          {
            "url": values.url,
            "quality": "FHD",
            "videoType": "HLS"
          }
        ]
      }
    };
  };

  const updateFeed = (newFeed) => {
    setFeed(cloneDeep(newFeed));
  };

  const moveElement = (arr, oldIndex, newIndex) => {
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    return arr;
  };

  const getTime = (duration) => {
    const secsInHours = 3600;
    const secsInMins = 60;
    const hours = Math.floor(duration / secsInHours);
    let mins;
    let secs;

    duration -= hours * secsInHours;
    mins = Math.floor(duration / secsInMins);
    duration -= mins * secsInMins;
    secs = duration;

    return {
      hours: hours,
      mins: mins,
      secs: secs,
    };
  };

  const showEdit = (video) => {
    const time = getTime(video.duration);
    video.releaseDate = moment(video.releaseDate);
    video.hours = time.hours;
    video.mins = time.mins;
    video.secs = time.secs;

    setCurrVideo(video);
    setIsEditVisible(true);
  };
  const editOk = (values) => {
    const tmpFeed = feed;
    const shortFormVideos = feed.shortFormVideos;
    const id = relDateToId(values.releaseDate);

    for (let i = 0; i < shortFormVideos.length; ++i) {
      if (shortFormVideos[i].id === id) {
        shortFormVideos[i] = getVideoObj(values);
        break;
      }
    }

    tmpFeed.shortFormVideos = shortFormVideos;
    updateFeed(tmpFeed);
    setIsEditVisible(false);
  };
  const editCancel = () => {
    setIsEditVisible(false);
  };

  const showDelPlaylist = (title) => {
    setPlaylistToDel(title);
    setIsDelPlaylistVisible(true);
  };
  const delPlaylistOk = () => {
    const tmpFeed = feed;
    const cat = feed.categories;
    const pl = feed.playlists;
    for (let i = 0; i < cat.length; ++i) {
      if (cat[i].name === playlistToDel) {
        cat.splice(i, 1);
        break;
      }
    }

    for (let j = 0; j < pl.length; ++j) {
      if (pl[j].name === playlistToDel) {
        pl.splice(j, 1);
      }
    }

    tmpFeed.categories = cat;
    tmpFeed.playlists = pl;
    updateFeed(tmpFeed);
    setIsDelPlaylistVisible(false);
  };
  const delPlaylistCancel = () => { setIsDelPlaylistVisible(false); };

  const showAddPlaylist = () => { setIsAddPlaylistVisible(true); };
  const addPlaylistOk = (playlist) => {
    const tmpFeed = feed;
    tmpFeed.categories.unshift({
      name: playlist,
      playlistName: playlist,
      order: "manual",
    });
    tmpFeed.playlists.push({
      name: playlist,
      itemIds: [],
    });
    updateFeed(tmpFeed);
    setIsAddPlaylistVisible(false);
  };
  const addPlaylistCancel = () => { setIsAddPlaylistVisible(false); };

  const showAddVideo = (title) => {
    setPlaylistToDel(title);
    setIsAddVideoVisible(true);
  };
  const addVideoOk = (values) => {
    const tmpFeed = feed;
    const playlists = feed.playlists;
    const id = relDateToId(values.releaseDate);

    tmpFeed.shortFormVideos.push(getVideoObj(values));

    for (let i = 0; i < playlists.length; ++i) {
      if (playlists[i].name === playlistToDel) {
        playlists[i].itemIds.unshift(id);
        break;
      }
    }

    tmpFeed.playlists = playlists;

    updateFeed(tmpFeed);
    setIsAddVideoVisible(false);
  };
  const addVideoCancel = () => { setIsAddVideoVisible(false); };

  const showDelVideo = (id, t) => {
    setVideoToDel(id);
    setPlaylistToDel(t);
    setIsDelVideoVisible(true);
  };
  const delVideoOk = () => {
    const tmpFeed = feed;
    const playlists = tmpFeed.playlists;

    for (let i = 0; i < playlists.length; ++i) {
      if (playlists[i].name === playlistToDel) {
        for (let j = 0; j < playlists[i].itemIds.length; ++j) {
          if (playlists[i].itemIds[j] === videoToDel) {
            playlists[i].itemIds.splice(j, 1);
            break;
          }
        }
      }
    }

    tmpFeed.playlists = playlists;
    updateFeed(tmpFeed);
    setIsDelVideoVisible(false);
  };
  const delVideoCancel = () => {
    setIsDelVideoVisible(false);
  };

  const showSetVideoPos = (title, index) => {
    let length;

    for (let i = 0; i < feed.playlists.length; ++i) {
      if (feed.playlists[i].name === title) {
        length = feed.playlists[i].itemIds.length;
      }
    }

    setVideoPos({
      title: title,
      index: index,
      max: length,
    });

    setIsSetVideoPosVisible(true);
  };
  const setVideoPosOk = (newIndex) => {
    const tmpFeed = feed;
    const playlists = tmpFeed.playlists;
    const oldIndex = videoPos.index;

    if (oldIndex === newIndex - 1) {
      return;
    }

    for (let i = 0; i < playlists.length; ++i) {
      if (playlists[i].name === videoPos.title) {
        playlists[i].itemIds = moveElement(playlists[i].itemIds, oldIndex, newIndex - 1);
        break;
      }
    }

    tmpFeed.playlists = playlists;
    updateFeed(tmpFeed);
    setIsSetVideoPosVisible(false);
  };
  const setVideoPosCancel = () => {
    setIsSetVideoPosVisible(false);
  };

  const showSetPlaylistPos = (title, index) => {
    setPlaylistPos({
      title: title,
      index: index,
      max: feed.categories.length
    });
    setIsSetPlaylistPosVisible(true);
  };
  const setPlaylistPosOk = (newIndex) => {
    const tmpFeed = cloneDeep(feed);
    const categories = tmpFeed.categories;
    const oldIndex = playlistPos.index;

    if (oldIndex === newIndex - 1) {
      return;
    }

    tmpFeed.categories = moveElement(categories, oldIndex, newIndex - 1);
    updateFeed(tmpFeed);
    setIsSetPlaylistPosVisible(false);
  };
  const setPlaylistPosCancel = () => {
    setIsSetPlaylistPosVisible(false);
  };

  const undo = () => {
    const tmpActivity = activity;
    let mostRecent;

    if (tmpActivity.length > 1) {
      const redo = tmpActivity.pop();
      setIsUndoing(true);

      const rdstack = redoStack;
      rdstack.push(cloneDeep(redo));
      setRedoStack(cloneDeep(rdstack));

      setActivity(cloneDeep(tmpActivity));
      mostRecent = tmpActivity.slice(-1)[0];
      updateFeed(mostRecent);
      undoSuccess();
    } else {
      undoFailure();
    }
  };
  const redo = () => {
    const stack = redoStack;
    const newFeed = stack.pop();

    if (newFeed) {
      setIsRedoing(true);
      setRedoStack(cloneDeep(stack));
      updateFeed(newFeed);
      redoSuccess();
    } else {
      redoFailure();
    }
  };

  const showRaw = () => {
    setIsRawVisible(true);
  };
  const rawCancel = () => {
    setIsRawVisible(false);
  };

  const fetchVersions = () => {
    fetch("https://nolachurch.com/stream/getDir.php?token=rxiWSWuP1pRlaG7OGOJBlR6IsojGPejO5ERM2h1xsIHjuoYuNqh3Lpx1cSfrDoxA")
      .then((res) => res.json())
      .then((res) => {
        res = res.filter((item) => {
          return item.includes("feed") && item.length > 9;
        });
        res.push("placeholder");
        setVersions(res);
      });
  };

  const options = {
    cache: "no-cache",
  };

  const loginSuccess = () => {
    setCookie();
    setLoggedIn(true);
  };

  useEffect(() => {
    const addActivity = () => {
      const tmpActivity = activity;
      tmpActivity.push(feed);
      setActivity(cloneDeep(tmpActivity));
    };
    const populate = () => {
      const videoLength = feed.shortFormVideos.length;
      const playlists = [];
      let itemIds = [];
      let playlist;
      let video;

      if (isUndoing) {
        setIsUndoing(false);
      } else if (isRedoing) {
        setIsRedoing(false);
        addActivity();
      } else {
        setRedoStack([]);
        addActivity();
      }

      feed.categories.forEach((category, index) => {
        playlist = playlists[index] = {};
        playlist.title = category.name;
        playlist.videos = [];

        for (let i = 0; i < feed.playlists.length; ++i) {
          const feedPlaylist = feed.playlists[i];
          if (feedPlaylist.name === category.playlistName) {
            itemIds = feedPlaylist.itemIds;
            break;
          }
        }

        itemIds.forEach((id) => {
          for (let i = 0; i < videoLength; ++i) {
            video = feed.shortFormVideos[i];
            if (id === video.id) {
              playlist.videos.push({
                id: video.id,
                playlistTitle: category.name,
                title: video.title,
                description: video.shortDescription,
                thumbnail: video.thumbnail,
                background: video.background,
                url: video.content.videos[0].url,
                releaseDate: video.releaseDate,
                duration: video.content.duration,
              });
              break;
            }
          }
        });
      });

      const visualPlaylists = playlists.reduce((acc, pl, index) => {
        acc.push(
          <Playlist
            playlist={pl}
            key={pl + index}
            index={index}
            cb={{
              showEdit,
              showSave,
              showAddPlaylist,
              showDelPlaylist,
              showDelVideo,
              showAddVideo,
              showSetVideoPos,
              showSetPlaylistPos,
            }}
          />
        );
        return acc;
      }, []);

      setPlaylists(visualPlaylists);
    };

    if (!versions.length) {
      window.addEventListener("beforeunload", (e) => {
        e.preventDefault();
        e.returnValue = true;
      });
      fetchVersions();
    } else if (Object.keys(feed).length) {
      populate();
    } else {
      fetch(`https://nolachurch.com/stream/${ feedToFetch }`, options)
        .then((res) => res.json())
        .then((feed) => {
          updateFeed(feed);
          populate();
        })
        .catch(() => {});
    }
  }, [feed, versions]);

  return (
    <div className="App" style={{ backgroundColor: "#e8f4f8" }}
    >
      {loggedIn &&
        <>
          <Header showSave={showSave} undo={undo} redo={redo} showRaw={showRaw} setFeedToFetch={(newFeed) => { setFeedToFetch(newFeed); updateFeed({}); message.success("Successfully updated version"); } } versions={versions} />
          <p style={{ paddingTop: 25, fontSize: 50, justifyContent: "space-evenly", display: "flex" }}>
            <Tooltip title="Add a Playlist" placement="right"><PlusOutlined onClick={showAddPlaylist} /></Tooltip>
          </p>
          <div style={{ marginLeft: 75, marginRight: 75 }}>
            { playlistss }
          </div>
        </>
      }
      {!loggedIn &&
        <Login
          loginSuccess={loginSuccess}
          loginFailed={loginFailed}
          setLoginFailed={setLoginFailed}
        />
      }
      {isEditVisible && <EditVideo
        onOk={editOk}
        onCancel={editCancel}
        initialValues={currVideo}
      />
      }
      {isAddVideoVisible && <AddVideo
        onOk={addVideoOk}
        onCancel={addVideoCancel}
      />
      }
      {isDelVideoVisible && <DelVideo
        onOk={delVideoOk}
        onCancel={delVideoCancel}
        videoToDel={videoToDel}
      />
      }
      {isAddPlaylistVisible && <AddPlaylist
        onOk={(playlist) => { addPlaylistOk(playlist);}}
        onCancel={addPlaylistCancel}
      />
      }
      {isDelPlaylistVisible && <DelPlaylist
        onOk={delPlaylistOk}
        onCancel={delPlaylistCancel}
        playlistToDel={playlistToDel}
      />
      }
      { isSaveVisible && <Save
        onOk={saveOk}
        onCancel={saveCancel}
      />
      }
      { isSetPlaylistPosVisible && <SetPlaylistPos
        onOk={setPlaylistPosOk}
        onCancel={setPlaylistPosCancel}
        max={playlistPos.max}
        curr={playlistPos.index}
      />
      }
      { isSetVideoPosVisible && <SetVideoPos
        onOk={setVideoPosOk}
        onCancel={setVideoPosCancel}
        max={videoPos.max}
        curr={videoPos.index}
      />
      }
      { isRawVisible && <Raw
        onCancel={rawCancel}
        feed={feed}
      />
      }
    </div>
  );
}

export default App;
