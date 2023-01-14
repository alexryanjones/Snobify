// import SpotifyWebApi from "spotify-web-api-node";
const SpotifyWebApi = require('spotify-web-api-node');

function getCurrentlyListening(req, res) {
  try {
    let accessToken = req.body.accessToken;
    const spotifyApi = new SpotifyWebApi({
      clientId: '3da6dc947ad845449ce3be18572218b8',
      clientSecret: 'e56217866f9b43508b6d705be1b526eb',
      redirectUri: 'http://localhost:3000',
    });
    spotifyApi.setAccessToken(accessToken);

    spotifyApi.getMyCurrentPlayingTrack().then((data) => {
      if (Object.keys(data.body).length > 0) {
        const track = {
          title: data.body.item.name,
          artist: data.body.item.artists[0].name,
          artwork: data.body.item.album.images[0].url,
          popularity: data.body.item.popularity,
        };
        res.status(200);
        res.send(track);
      } else {
        res.status(400);
        res.send('Nothing playing');
      }
    });
  } catch (err) {
    res.status(400);
    res.send(err);
  }
}

module.exports = { getCurrentlyListening };
