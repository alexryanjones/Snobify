import SpotifyWebApi from 'spotify-web-api-node';

function getHistory(req, res) {
  console.log('getting history');
  let accessToken = req.body.accessToken;
  const spotifyApi = new SpotifyWebApi({
      clientId: '3da6dc947ad845449ce3be18572218b8',
      clientSecret: 'e56217866f9b43508b6d705be1b526eb',
      redirectUri: 'http://localhost:3000'
  })
  spotifyApi.setAccessToken(accessToken);
  spotifyApi.getMyRecentlyPlayedTracks({ limit: 50 }).then(
    function (data) {
      // Output items
      console.log('Your 50 most recently played tracks are:');
      data.body.items.forEach((item) => {

      });
    },
    function (err) {
      console.log('Something went wrong!', err);
    }
  );
  res.status(200);
}

export default { getHistory };
