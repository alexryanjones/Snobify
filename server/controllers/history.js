// import SpotifyWebApi from "spotify-web-api-node";
const SpotifyWebApi = require('spotify-web-api-node');
const listeningHistory = require('../models/listeningHistory.js');
require('dotenv').config();


function getHistory(req, res) {
  try {
    let accessToken = req.body.accessToken;
    let totalTrackPopularity = 0;
    let trackCount = 0;
    let weeklyScore = 100;
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URI,
    });
    spotifyApi.setAccessToken(accessToken);
    spotifyApi
      .getMyRecentlyPlayedTracks({ limit: 50 })
      .then(function (data) {
        data.body.items.forEach((item) => {
          listeningHistory.create({
            title: item.track.name,
            artist: item.track.artists[0].name,
            popularity: item.track.popularity,
            releaseDate: item.track.album.release_date,
            explicit: item.track.explicit,
          });
        });
        return data.body.items.map(function (t) {
          return t.track.id;
        });
      })
      .then(function (trackIds) {
        return spotifyApi.getTracks(trackIds);
      })
      .then(function (data) {
        data.body.tracks.forEach((track) => {
          totalTrackPopularity += track.popularity;
          trackCount++;
        });
        // Add more complex score logic here
        weeklyScore -=
          Math.round((totalTrackPopularity / trackCount) * 10) / 10;
        res.status(200);
        res.send(`${weeklyScore}`);
      })
  } catch (err) {
    console.log(err);
    res.status(400);
    res.send('You stupid cunt');
  }
}

module.exports = { getHistory };
