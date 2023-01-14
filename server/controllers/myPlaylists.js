// import SpotifyWebApi from "spotify-web-api-node";
const SpotifyWebApi = require('spotify-web-api-node');

function getPlaylists(req, res) {
  try {
    let accessToken = req.body.accessToken;
    const spotifyApi = new SpotifyWebApi({
      clientId: '3da6dc947ad845449ce3be18572218b8',
      clientSecret: 'e56217866f9b43508b6d705be1b526eb',
      redirectUri: 'http://localhost:3000',
    });
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getUserPlaylists('2177zxcr2gynkbeuca7vsrusi').then((data) => {
      let playlists = data.body.items.map((playlist) => {
        return {
          playlistName: playlist.name,
          playlistDescription: playlist.description.replace(/<[^>]*>/g, ''),
          playlistUri: playlist.uri,
          playlistArtwork: playlist.images[0].url,
          playlistId: playlist.id,
        };
      });
      res.status(200);
      res.send(playlists);
    });
  } catch (err) {
    res.status(400);
    res.send(err);
  }
}

module.exports = { getPlaylists };
