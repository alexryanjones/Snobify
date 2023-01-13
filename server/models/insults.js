const mongoose = require('./../database.js');

const insultsSchema = mongoose.Schema({
  popularityRange: {
    type: String,
    required: true,
  },
  artistWeeklyListens: {
    type: Number,
    required: true,
  },
  keyword: {
    type: String
  },
  listeningAmount: {
    type: String,
    required: true
  },
  strength: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('insults', insultsSchema);
