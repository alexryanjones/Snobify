// import SpotifyWebApi from "spotify-web-api-node";
const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();


function getPlaylists(req, res) {
  try {
    let accessToken = req.body.accessToken;
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URI,
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
