const mongoose = require('mongoose');
require('dotenv').config();

const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;
const MONGO_USERNAME = "doadmin";
const MONGO_PASSWORD = '';
const MONGO_HOSTNAME = "mongodb+srv://snobify-mongo-db-de3f4640.mongo.ondigitalocean.com"
const MONGO_DB = 'snobify';
const MONGO_PORT = 27017;

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;


mongoose.connect(
  // `mongodb://localhost:${process.env.DB_PORT}/${DB_NAME}`,
  url,

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
