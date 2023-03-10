const spotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();


async function Login(req, res) {
  try {
    const code = req.body.code;
    const spotifyApi = new spotifyWebApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URI,
    });
    const data = await spotifyApi.authorizationCodeGrant(code);
    res.json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in,
    });
  } catch (err) {
    console.log(err);
      res.status(400);
      res.send({ data: null, error: err.message });
  }
}

async function Refresh(req, res) {
  try {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new spotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
    refreshToken: refreshToken,
  });
  const data = await spotifyApi.refreshAccessToken()
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
      // spotifyApi.setAccessToken(data.body)
    } catch (err) {
      res.status(400);
      res.send({ data: null, error: err.message });
    }
}

module.exports = { Login, Refresh };
