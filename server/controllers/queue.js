const axios = require('axios');



function getQueue(req, res) {
  const accessToken = req.body.data.accessToken;
  const url = `https://api.spotify.com/v1/me/player/queue`;
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
  axios.get(url, {headers})
    .then((response) => {
      const queue = response.data.queue.map((track) => {
        return {
          name: track.name,
          artist: track.artists[0].name,
          uri: track.uri,
        }
      })
      const current = response.data.currently_playing;
      console.log(current);
      if (current) {
        const currentTrack = {
        name: current.name,
        artist: current.artists[0].name,
        uri: current.uri,
      }
      queue.unshift(currentTrack);
    }
      res.status(200);
      res.send(queue);
    });
}

function addToQueue(req, res) {
  const accessToken = req.body.data.accessToken;
  const trackUri = req.body.data.trackUri;
  console.log(trackUri);
  const url = `https://api.spotify.com/v1/me/player/queue`;
  console.log(url);
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
  params = { uri: `trackUri` };

  axios.get(url, { headers }).then((res) => console.log(res.data));
}

module.exports = { getQueue, addToQueue };
