// import SpotifyWebApi from "spotify-web-api-node";
const { default: axios } = require('axios');
const SpotifyWebApi = require('spotify-web-api-node');
const listeningHistory = require('../models/listeningHistory.js');

function getHistory(req, res) {
  try {
    let accessToken = req.body.accessToken;
    let totalTrackPopularity = 0;
    let trackCount = 0;
    let weeklyScore = 100;
    const spotifyApi = new SpotifyWebApi({
      clientId: '3da6dc947ad845449ce3be18572218b8',
      clientSecret: 'e56217866f9b43508b6d705be1b526eb',
      redirectUri: 'http://localhost:3000',
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
