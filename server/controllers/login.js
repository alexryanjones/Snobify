import SpotifyWebApi from 'spotify-web-api-node'; 

function Login (req, res) {
  console.log('login hit');
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
      clientId: '3da6dc947ad845449ce3be18572218b8',
      clientSecret: 'e56217866f9b43508b6d705be1b526eb',
      redirectUri: 'http://localhost:3000'
  })
  spotifyApi.authorizationCodeGrant(code)
  .then(data => {
    res.json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in,
    });
    // console.log('SUCCESS FROM LOGINNNNNNNNNNNNNNNNNNNN', data);
  }).catch((err) => {
    // console.log('ERRRRRRR FROM LOGIN', err);
    res.sendStatus(400)
  });
}

function Refresh (req, res) {
  console.log('refresh hit');
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    clientId: '3da6dc947ad845449ce3be18572218b8',
    clientSecret: 'e56217866f9b43508b6d705be1b526eb',
    redirectUri: 'http://localhost:3000',
    refreshToken: refreshToken,
  });
  spotifyApi.refreshAccessToken()
  .then(data => {
    res.json({
      accessToken: data.body.access_token,
      expiresIn: data.body.expires_in,
    });
    // spotifyApi.setAccessToken(data.body)
  }).catch(err => console.log('ERRRRRRRRRRRRRRR from refresh', err))
}

export default { Login, Refresh }