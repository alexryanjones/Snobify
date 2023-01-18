const axios = require('axios');
const spotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

async function getQueue(req, res) {
  try {
    const accessToken = req.body.data.accessToken;
    const url = `https://api.spotify.com/v1/me/player/queue`;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
    const response = axios.get(url, { headers })
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

    const tracks = await axios.get(`https://api.spotify.com/v1/tracks/${current.id}`, { headers })
        
    const currentTrack = {
      title: tracks.data.name,
      artist: tracks.data.artists[0].name,
      album: tracks.data.album.name,
      uri: tracks.data.uri,
      artwork: tracks.data.album.images[0].url,
      popularity: tracks.data.popularity,
    };
    
    queue.unshift(currentTrack);

    res.status(200);
    res.send(queue);
    }
  } catch (err) {
    res.status(400);
    res.send({ data: null, error: err.message });
  }
}

async function addToQueue(req, res) {
  try {
    const accessToken = req.body.data.accessToken;
    const trackUri = req.body.data.trackUri;
    const url = `https://api.spotify.com/v1/me/player/queue?uri=${trackUri}`;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.post(url, {}, { headers })
    response.sendStatus(204);

  } catch (err) {
    res.status(400);
    res.send({ data: null, error: err.message });
  }
}

async function getCurrentlyListening(req, res) {
  try {
    let accessToken = req.body.accessToken;
    const spotifyApi = new spotifyWebApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URI,
    });
    spotifyApi.setAccessToken(accessToken);

    const response = await spotifyApi.getMyCurrentPlayingTrack()

    if (Object.keys(response.body).length > 0) {
      const track = {
        title: response.body.item.name,
        artist: response.body.item.artists[0].name,
        artwork: response.body.item.album.images[0].url,
        popularity: response.body.item.popularity,
      };
      res.status(200);
      res.send(track);
    } else {
      res.status(400);
      res.send('Nothing playing');
    }
  } catch (err) {
    res.status(400);
    res.send({ data: null, error: err.message });
  }
}

module.exports = { getQueue, addToQueue, getCurrentlyListening };
