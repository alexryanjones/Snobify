// import SpotifyWebApi from "spotify-web-api-node";
const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

function getLibrary(req, res) {
  try {
    let accessToken = req.body.accessToken;
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URI,
    });
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getMySavedTracks({ limit: 50 }).then(function (data) {
      const playlist = [];
      const tracks = data.body.items;
      for (let i = 0; i < tracks.length; i++) {
        playlist.push({
          id: i + 1,
          title: tracks[i].track.name,
          artist: tracks[i].track.artists[0].name,
          album: tracks[i].track.album.name,
          duration: tracks[i].track.duration_ms,
          popularity: tracks[i].track.popularity,
          artwork: tracks[i].track.album.images[2].url,
        });
      }
      res.status(200);
      res.send(playlist);
    });
  } catch (err) {
    res.status(400);
    res.send(err);
  }
}

module.exports = { getLibrary };
