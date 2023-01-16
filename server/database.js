const mongoose = require('mongoose');
const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = process.env.DB_NAME || 'snobify';


mongoose.connect(
  `mongodb://localhost:${DB_PORT}/${DB_NAME}`,
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
