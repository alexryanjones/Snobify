const listeningHistory = require('../models/listeningHistory.js');

async function analyse (req, res) {
  try {
  // Get top track
  let topTrackPromise = listeningHistory.aggregate([
    { $group: { _id: '$title', count: { $sum: 1 }, } },
    { $sort: { count: -1 } },
    { $limit: 1 },
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
    ])

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
    
    let totalTracksPromise = listeningHistory.countDocuments({})

    const values = await Promise.all([
      topTrackPromise,
      topArtistPromise,
      uniqueArtistsPromise,
      explicitPercentagePromise,
      repeatedTracksPromise,
      topYearPromise,
      totalTracksPromise,
    ]);
      const totalTracks = values[6]
      console.log(values[0][0]);
      const analysis = {
        topTrack: values[0][0],
        topArtist: values[1][0],
        uniqueArtistCount: values[2][0].count,
        uniqueArtistPercentage: Math.floor(values[2][0].count / totalTracks * 100),
        explicitPercentage: Math.round(values[3][0].percentage / totalTracks * 10000),
        repeatedTracksPercentage: Math.round(values[4][0].duplicateCount / totalTracks * 100),
        topYear: values[5][0],
      };
      console.log(analysis);
      res.status(200);
      res.send(analysis);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
}

module.exports = { analyse }