// import SpotifyWebApi from "spotify-web-api-node";
const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();


function getFeaturedPlaylists(req, res) {
  let accessToken = req.body.accessToken;
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
  });
  spotifyApi.setAccessToken(accessToken);
  spotifyApi.getFeaturedPlaylists()
    .then((data) => {
      
      const featuredPlaylists = data.body.playlists.items.filter(x => x != null).map((playlist) => {
        if (playlist) {
          return {
            playlistName: playlist.name,
            playlistDescription: playlist.description.replace(/<[^>]*>/g, ''),
            playlistUri: playlist.uri,
            playlistArtwork: playlist.images[0].url,
            playlistId: playlist.id,
          };
        }
      })

      res.status(200);
      res.send(featuredPlaylists);
    })
}

module.exports = { getFeaturedPlaylists };