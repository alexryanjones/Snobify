import SpotifyWebApi from "spotify-web-api-node";

function getCurrentlyListening (req, res) {
  console.log('getting currently playing');
  let accessToken = req.body.accessToken;
  const spotifyApi = new SpotifyWebApi({
    clientId: '3da6dc947ad845449ce3be18572218b8',
    clientSecret: 'e56217866f9b43508b6d705be1b526eb',
    redirectUri: 'http://localhost:3000',
  });
    spotifyApi.setAccessToken(accessToken);

  spotifyApi.getMyCurrentPlayingTrack()
  .then((data) => {
    console.log(data);
  });
}

export default { getCurrentlyListening }