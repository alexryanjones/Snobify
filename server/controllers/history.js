import SpotifyWebApi from 'spotify-web-api-node';

function getHistory(req, res) {
  let totalTrackPopularity = 0;
  let trackCount = 0;
  let weeklyScore = 100;
  const spotifyApi = new SpotifyWebApi({
    clientId: '3da6dc947ad845449ce3be18572218b8',
    clientSecret: 'e56217866f9b43508b6d705be1b526eb',
    redirectUri: 'http://localhost:3000',
  });
  spotifyApi.setAccessToken(
    'BQA4ODADybl2XHaFV8qVUSkoaMwiLY-O5rKasmvviExRAqv-sPUZkwJ1XMG7pr7dwNmTv94yhlFIdSbOCQCLX9RTOnj-bmMPrkg-2nOwQojwFnzBzTezwu2ibTjLsY-ZPwSOfUGjSE1jXVZWreZxBbOD6waFCyJH4Joadow8M3idG42AVgbHvJWh3hUwMsqauk6XKYHD'
  );
  spotifyApi
    .getMyRecentlyPlayedTracks({limit: 50})
    .then(function (data) {
      return data.body.items.map(function (t) {
        return t.track.id;
      });
    })
    .then(function (trackIds) {
      return spotifyApi.getTracks(trackIds);
    })
    .then(function (data) {
      data.body.tracks.forEach((track) => {
        totalTrackPopularity += track.popularity;
        trackCount++;
      })
      // Add more complex score logic here
      weeklyScore -= (totalTrackPopularity / trackCount);
      res.status(200);
      res.send(`${weeklyScore}`);
    })
    .catch(function (error) {
      console.error(error);
    });
  
}

export default { getHistory };