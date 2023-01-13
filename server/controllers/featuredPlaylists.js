// import SpotifyWebApi from "spotify-web-api-node";
const SpotifyWebApi = require('spotify-web-api-node');

function getFeaturedPlaylists(req, res) {
  let accessToken = req.body.accessToken;
  const spotifyApi = new SpotifyWebApi({
    clientId: '3da6dc947ad845449ce3be18572218b8',
    clientSecret: 'e56217866f9b43508b6d705be1b526eb',
    redirectUri: 'http://localhost:3000',
  });
    spotifyApi.setAccessToken(accessToken);
  spotifyApi.getFeaturedPlaylists()
    .then((data) => {
      console.log('playlists', data.body);
      const featuredPlaylists = data.body.playlists.items.map((playlist) => {
        if (playlist) {
          return {
          name: playlist.name,
          description: playlist.description.replace(/<[^>]*>/g, ''),
          uri: playlist.uri,
          playlistArtwork: playlist.images[0].url,
        }
      };
      })

      res.status(200);
      res.send(featuredPlaylists);
    })
}

module.exports = { getFeaturedPlaylists };