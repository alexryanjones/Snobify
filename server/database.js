const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(
  process.env.DB_URL,

  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(`Sorry, something went wrong! ${err}`);
    } else {
      console.log(`Database connected @ port ${process.env.DB_PORT}!`);
    }
  }
);



module.exports = mongoose;
