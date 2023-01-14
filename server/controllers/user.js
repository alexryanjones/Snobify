// import SpotifyWebApi from "spotify-web-api-node";
const SpotifyWebApi = require('spotify-web-api-node');

function getUser(req, res) {
  try {
    let accessToken = req.body.accessToken;
    const spotifyApi = new SpotifyWebApi({
      clientId: '3da6dc947ad845449ce3be18572218b8',
      clientSecret: 'e56217866f9b43508b6d705be1b526eb',
      redirectUri: 'http://localhost:3000',
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
