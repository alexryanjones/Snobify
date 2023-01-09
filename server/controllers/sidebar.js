import SpotifyWebApi from 'spotify-web-api-node';

function getHistory(req, res) {
  console.log('getting history');
  const spotifyApi = new SpotifyWebApi({
      clientId: '3da6dc947ad845449ce3be18572218b8',
      clientSecret: 'e56217866f9b43508b6d705be1b526eb',
      redirectUri: 'http://localhost:3000'
  })
  spotifyApi.setAccessToken(
    'BQDk0FslUehd14GkduV7hhVFGdc4z2Fq9SbZV3MKSepIUbdgQwHpmSZz-uu1W_A52vbMHVxcTRX0t98GshLZlzWMbAhuSdckjFlPFawKhTmCHtOE0xaDYI10zb--xj9J5tY-6ka3XoSKsXEvnDmJ5ZW9-n8QprXmrhuE4fwDmTtADVgbVPaAvSR63T1pGX6ux1Ciodth'
  );
  spotifyApi.getMyRecentlyPlayedTracks({ limit: 50 }).then(
    function (data) {
      // Output items
      console.log('Your 50 most recently played tracks are:');
      data.body.items.forEach((item) => {
        console.log(item.track.name)
        console.log(item.track.id);
      });
    },
    function (err) {
      console.log('Something went wrong!', err);
    }
  );
  res.status(200);
}

export default { getHistory };
