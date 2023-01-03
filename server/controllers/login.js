import SpotifyWebApi from 'spotify-web-api-node'; 


function Login (req, res) {
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
    console.log(data);
    // spotifyApi.setAccessToken(accessToken);
    // spotifyApi.setRefreshToken(refreshToken);
  }).catch((err) => {
    console.log(err);
    res.sendStatus(400)
  });
}

export default { Login }