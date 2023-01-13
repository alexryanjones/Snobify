const listeningHistory = require('../models/listeningHistory.js');

const date = Date.now() - (7*24*60*60*1000);
// const date = Date.now() - (10000);


async function clearOldTracks(req, res) {
  await listeningHistory.deleteMany({playedAt: {$lt: date}});
  res.sendStatus(200);
}

module.exports = { clearOldTracks }