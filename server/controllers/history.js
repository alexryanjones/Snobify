const spotifyWebApi = require('spotify-web-api-node');
const listeningHistory = require('../models/listening-history.js');
require('dotenv').config();

// TODO: Replace create with create or update based on playedAt time
async function getHistory(req, res) {
  try {
    let accessToken = req.body.accessToken;
    let totalTrackPopularity = 0;
    let trackCount = 0;
    let weeklyScore = 100;
    const spotifyApi = new spotifyWebApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URI,
    });
    spotifyApi.setAccessToken(accessToken);
    const data = await spotifyApi.getMyRecentlyPlayedTracks({ limit: 50 })

    data.body.items.forEach((item) => {
      const formattedDate = Date.parse(item.played_at)
      listeningHistory.create({
        title: item.track.name,
        artist: item.track.artists[0].name,
        popularity: item.track.popularity,
        releaseDate: item.track.album.release_date,
        explicit: item.track.explicit,
        playedAt: formattedDate,
      });
    });

    const trackIds = data.body.items.map(function (t) {
      return t.track.id;
    });
      
    const tracks = await spotifyApi.getTracks(trackIds);

    tracks.body.tracks.forEach((track) => {
      totalTrackPopularity += track.popularity;
      trackCount++;
    });

    weeklyScore -= Math.round((totalTrackPopularity / trackCount) * 10) / 10;
    let weightedScore = weeklyScore;
    if (weeklyScore < 40) {
      weightedScore = Math.round((weeklyScore - (40 - weeklyScore) / 2) * 10) / 10;
    } else if (weeklyScore > 55) {
      weightedScore = Math.round((weeklyScore + (weeklyScore - 55) / 2) * 10) / 10;
    }

    res.status(200);
    res.send(`${weightedScore}`);
      
  } catch (err) {
    console.log(err);
    res.status(400);
    res.send({ data: null, error: err.message });
  }
}

async function clearOldTracks(req, res) {
  let date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  date = date.getTime();
  try {
    await listeningHistory.deleteMany({ playedAt: { $lt: date } });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.send({ data: null, error: err.message });

  }
}

async function analyseHistory(req, res) {
  try {
    // Get top track
    let topTrackPromise = listeningHistory.aggregate([
      { $group: { _id: '$title', count: { $sum: 1 }, artist: { $first: "$artist" } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
      { $project: { _id: 0, title: "$_id", artist: "$artist", count: "$count" } }
    ]);

    // Get top artist
    let topArtistPromise = listeningHistory.aggregate([
      { $group: { _id: '$artist', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    //  Get unique artists
    let uniqueArtistsPromise = listeningHistory.aggregate([
      { $group: { _id: '$artist' } },
      { $group: { _id: null, count: { $sum: 1 } } },
    ]);

    // Get repeated tracks
    let repeatedTracksPromise = listeningHistory.aggregate([
      { $group: { _id: '$title', count: { $sum: 1 } } },
      { $match: { count: { $gt: 1 } } },
      { $count: 'duplicateCount' },
    ]);

    // Get explicit tracks
    let explicitPercentagePromise = listeningHistory.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          trueValues: { $sum: { $cond: ['$explicit', 1, 0] } },
        },
      },
      {
        $project: {
          _id: 0,
          percentage: { $divide: ['$trueValues', '$total'] },
        },
      },
    ]);

    // Get top year
    let topYearPromise = listeningHistory.aggregate([
      {
        $group: {
          _id: { $substr: ['$releaseDate', 0, 4] },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    let totalTracksPromise = listeningHistory.countDocuments({});

    const values = await Promise.all([
      topTrackPromise,
      topArtistPromise,
      uniqueArtistsPromise,
      explicitPercentagePromise,
      repeatedTracksPromise,
      topYearPromise,
      totalTracksPromise,
    ]);
    
    const totalTracks = values[6];
    const analysis = {
      topTrack: values[0][0],
      topArtist: values[1][0],
      uniqueArtistCount: values[2][0].count,
      uniqueArtistPercentage: Math.floor(
        (values[2][0].count / totalTracks) * 100
      ),
      explicitPercentage: Math.round(
        (values[3][0].percentage / totalTracks) * 10000
      ),
      repeatedTracksPercentage: Math.round(
        (values[4][0].duplicateCount / totalTracks) * 100
      ),
      topYear: values[5][0],
    };
    res.status(200);
    res.send(analysis);
  } catch (err) {
    res.status(400);
    res.send({ data: null, error: err.message });
  }
}

module.exports = { getHistory, analyseHistory, clearOldTracks };

