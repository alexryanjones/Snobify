// import SpotifyWebApi from "spotify-web-api-node";
const SpotifyWebApi = require('spotify-web-api-node');

function getHistory(req, res) {
  try {
    let accessToken = req.body.accessToken;
    const spotifyApi = new SpotifyWebApi({
      clientId: '3da6dc947ad845449ce3be18572218b8',
      clientSecret: 'e56217866f9b43508b6d705be1b526eb',
      redirectUri: 'http://localhost:3000',
    });
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getMyRecentlyPlayedTracks({ limit: 50 }).then(
      function (data) {
        // Output items
        data.body.items.forEach((item) => {});
      },
      function (err) {
        console.log(err);
      }
    );
    res.status(200);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
}

module.exports = { getHistory };
