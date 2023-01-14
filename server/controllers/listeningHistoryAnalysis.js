const listeningHistory = require('../models/listeningHistory.js');

async function analyse (req, res) {
  try {
    // Get top track
    let topTrackPromise = await listeningHistory.aggregate([
      { $group: { _id: '$title', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    // Get top artist
    let topArtistPromise = await listeningHistory.aggregate([
      { $group: { _id: '$artist', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    //  Get unique artists
    let uniqueArtistsPromise = await listeningHistory.aggregate([
      { $group: { _id: '$artist' } },
      { $group: { _id: null, count: { $sum: 1 } } },
    ]);

    // Get repeated tracks
    let repeatedTracksPromise = await listeningHistory.aggregate([
      { $group: { _id: '$title', count: { $sum: 1 } } },
      { $match: { count: { $gt: 1 } } },
      { $count: 'duplicateCount' },
    ]);

    // Get explicit tracks
    let explicitPercentagePromise = await listeningHistory.aggregate([
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
    let topYearPromise = await listeningHistory.aggregate([
      {
        $group: {
          _id: { $substr: ['$releaseDate', 0, 4] },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    Promise.all([
      topTrackPromise,
      topArtistPromise,
      uniqueArtistsPromise,
      explicitPercentagePromise,
      repeatedTracksPromise,
      topYearPromise,
    ]).then((values) => {
      const analysis = {
        topTrack: values[0][0],
        topArtist: values[1][0],
        uniqueArtists: values[2][0],
        explicitPercentage: values[3][0],
        repeatedTracks: values[4][0],
        topYearPromise: values[5][0],
      };
      res.status(200);
      res.send(analysis);
    });
  } catch (err) {
    res.status(400);
    res.send(err);
  }

}

module.exports = { analyse }