const mongoose = require('./../database.js');

const listeningHistorySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  popularity: {
    type: Number,
    required: true,
  },
  releaseDate: {
    type: String,
    required: true,
  },
  explicit: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model('listeningHistory', listeningHistorySchema);