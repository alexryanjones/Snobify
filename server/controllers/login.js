import SpotifyWebApi from 'spotify-web-api-node'; 


function Login (req, res) {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
      clientId: '3da6dc947ad845449ce3be18572218b8',
      clientSecret: 'e56217866f9b43508b6d705be1b526eb',
      redirectUri: 'http://localhost:3000'
  })

  spotifyApi.authorizationCodeGrant(code)
  .then(response => {
    response.json({
      accessToken: response.body.access_token,
      refreshToken: response.body.refresh_token,
      expiresIn: response.body.expires_in
    })
    // spotifyApi.setAccessToken(accessToken);
    // spotifyApi.setRefreshToken(refreshToken);
  }).catch(() => res.sendStatus(400));
}