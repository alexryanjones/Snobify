// import SpotifyWebApi from "spotify-web-api-node";
const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

function getHistory(req, res) {
  try {
    let accessToken = req.body.accessToken;
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URI,
    });
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getMyRecentlyPlayedTracks({ limit: 50 }).then(
      // function (data) {
      //   // Output items
      //   data.body.items.forEach((item) => {});
      // },
      // function (err) {
      //   console.log(err);
      // }
    );
    res.status(200);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
}

module.exports = { getHistory };
