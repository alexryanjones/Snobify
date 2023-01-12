// import SpotifyWebApi from "spotify-web-api-node";
const SpotifyWebApi = require('spotify-web-api-node');

function getLibrary(req, res) {
  let accessToken = req.body.accessToken;
  const spotifyApi = new SpotifyWebApi({
    clientId: '3da6dc947ad845449ce3be18572218b8',
    clientSecret: 'e56217866f9b43508b6d705be1b526eb',
    redirectUri: 'http://localhost:3000',
  });
  spotifyApi.setAccessToken(accessToken);
  spotifyApi.getMySavedTracks({ limit: 50 }).then(function (data) {
    const playlist = [];
    // console.log(data.body.items[0].track);
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
    // console.log(playlist);
    res.status(200);
    res.send(playlist);
  });
}

module.exports = { getLibrary };
