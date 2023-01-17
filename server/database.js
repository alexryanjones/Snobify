const mongoose = require('mongoose');
require('dotenv').config();

const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;


mongoose.connect(
  `mongodb://localhost:${process.env.DB_PORT}/${DB_NAME}`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(`Sorry, something went wrong! ${err}`);
    } else {
      console.log(`Database connected @ port ${DB_PORT}!`);
    }
  }
);



module.exports = mongoose;
