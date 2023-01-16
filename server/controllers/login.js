// import SpotifyWebApi from "spotify-web-api-node";
const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();


function Login(req, res) {
  const code = req.body.code;
  // const spotifyApi = new SpotifyWebApi({
  //   clientId: '3da6dc947ad845449ce3be18572218b8',
  //   clientSecret: 'e56217866f9b43508b6d705be1b526eb',
  //   redirectUri: 'http://localhost:3000',
  // });
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
});
  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      res.status(400);
      res.send(err)
    });
}

function Refresh(req, res) {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    clientId: '3da6dc947ad845449ce3be18572218b8',
    clientSecret: 'e56217866f9b43508b6d705be1b526eb',
    redirectUri: 'http://localhost:3000',
    refreshToken: refreshToken,
  });
  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
      // spotifyApi.setAccessToken(data.body)
    })
    .catch((err) => console.log(err));
}

module.exports = { Login, Refresh };
