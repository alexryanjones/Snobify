import SpotifyWebApi from 'spotify-web-api-node';

function getTracks(req, res) {
  let accessToken = req.body.accessToken;
  let playlistId = req.body.playlistId;
  const spotifyApi = new SpotifyWebApi({
    clientId: '3da6dc947ad845449ce3be18572218b8',
    clientSecret: 'e56217866f9b43508b6d705be1b526eb',
    redirectUri: 'http://localhost:3000',
  });
  spotifyApi.setAccessToken(accessToken);
  spotifyApi.getPlaylistTracks(playlistId).then(
    function (data) {
      console.log('playlist tracks', data.body.items[0].track);
      res.status(200);
      // res.send(playlists);
      })
}

export default { getTracks };
