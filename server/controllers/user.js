// import SpotifyWebApi from "spotify-web-api-node";
const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

function getUser(req, res) {
  try {
    let accessToken = req.body.accessToken;
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URI,
    });
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getMe().then((data) => {
      const user = {
        name: data.body.display_name,
        userId: data.body.id,
        image: data.body.images[0].url,
      };
      res.status(200);
      res.send(user);
    });
  } catch (err) {
    res.status(400);
    res.send(err);
  }
}

module.exports = { getUser };
