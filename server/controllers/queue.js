const axios = require('axios');



function getQueue(req, res) {
  try {
    const accessToken = req.body.data.accessToken;
    const url = `https://api.spotify.com/v1/me/player/queue`;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
    axios.get(url, { headers }).then((response) => {
      const queue = response.data.queue.map((track) => {
        return {
          title: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
          popularity: track.popularity,
          artwork: track.album.images[0].url,
        };
      });
      const current = response.data.currently_playing;
      if (current) {
        axios
          .get(`https://api.spotify.com/v1/tracks/${current.id}`, { headers })
          .then((response) => {
            const currentTrack = {
              title: response.data.name,
              artist: response.data.artists[0].name,
              album: response.data.album.name,
              uri: response.data.uri,
              artwork: response.data.album.images[0].url,
              popularity: response.data.popularity,
            };
            queue.unshift(currentTrack);
          });
      }
      res.status(200);
      res.send(queue);
    });
  } catch (err) {
    res.status(400);
    res.send(err);
  }
}

function addToQueue(req, res) {
  try {
    console.log(req.body.data);
    const accessToken = req.body.data.accessToken;
    const trackUri = req.body.data.trackUri;
    const url = `https://api.spotify.com/v1/me/player/queue?uri=${trackUri}`;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    axios
      .post(url, {}, { headers })
      .then((res) => {
        res.sendStatus(204);
      })
  } catch (err) {
    res.status(400);
    res.send(err);
  }
}

module.exports = { getQueue, addToQueue };
