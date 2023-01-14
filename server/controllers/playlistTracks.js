// import SpotifyWebApi from "spotify-web-api-node";
const SpotifyWebApi = require('spotify-web-api-node');

function getTracks(req, res) {
  try {
    let accessToken = req.body.accessToken;
    let playlistId = req.body.playlistId;
    const spotifyApi = new SpotifyWebApi({
      clientId: '3da6dc947ad845449ce3be18572218b8',
      clientSecret: 'e56217866f9b43508b6d705be1b526eb',
      redirectUri: 'http://localhost:3000',
    });
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getPlaylistTracks(playlistId).then((data) => {
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

module.exports = { getTracks };
