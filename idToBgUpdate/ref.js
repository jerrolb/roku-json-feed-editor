const fetch = require("node-fetch");
const fs = require("fs");

fetch("https://www.nolachurch.com/stream/feed.json")
  .then((res) => res.json())
  .then((res) => {
    // console.log("xx");
    doit(res);
  })
  .catch((err) => {
    console.log(err);
  });

const map = {};
const doit = (feed) => {
  fetch("https://www.nolachurch.com/stream/id_to_bg.json")
    .then((res) => res.json())
    .then((res) => {

      feed.shortFormVideos.forEach((video, index) => {
        // const releaseDate = video.releaseDate.replace(/-/g, "");
        // const oldId = video.id;
        // const newId = releaseDate;
        // video.id = newId;

        // feed.playlists.forEach((playlist) => {
        //   if (playlist.itemIds.includes(oldId)) {
        //     const indOf = playlist.itemIds.indexOf(oldId);
        //     playlist.itemIds[indOf] = newId;
        //   }
        // });

        // map[newId] = `https://nolachurch.com/stream/appletv/backgrounds/${oldId}.jpg`;

        feed.shortFormVideos[index].background = res[video.id];
      });
      // console.log(JSON.stringify(feed, null, 4));

      fs.writeFile("feed.json", JSON.stringify(feed, null, 4), (err) => {
        console.log(err || "no error");
      });

      // feed.shortFormVideos.forEach((video, index) => {
      //   console.log(video.background || "FOO", index);
      // });
    });

  // console.log('xx', JSON.stringify(map));
};
