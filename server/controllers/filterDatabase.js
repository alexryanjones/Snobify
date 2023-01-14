const listeningHistory = require('../models/listeningHistory.js');

const date = Date.now() - (7*24*60*60*1000);
// const date = Date.now() - (10000);


async function clearOldTracks(req, res) {
  try {
    await listeningHistory.deleteMany({ playedAt: { $lt: date } });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

module.exports = { clearOldTracks }