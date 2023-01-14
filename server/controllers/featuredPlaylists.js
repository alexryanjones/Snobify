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
      
      const featuredPlaylists = data.body.playlists.items.filter(x => x != null).map((playlist) => {
        if (playlist) {
          console.log('featured', playlist);
          return {
            playlistName: playlist.name,
            playlistDescription: playlist.description.replace(/<[^>]*>/g, ''),
            playlistUri: playlist.uri,
            playlistArtwork: playlist.images[0].url,
            playlistId: playlist.id,
          };
        };
      })

      res.status(200);
      res.send(featuredPlaylists);
    })
}

module.exports = { getFeaturedPlaylists };