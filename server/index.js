// import express from 'express';
const express = require('express')
// import cors from 'cors';
const cors = require('cors')
// import router from './router.js';
const router = require('./router.js')

const app = express();
const server = express();

server.use(cors());
// server.use(bodyParser.json());
server.use(express.json({ extended: true }));
server.use(router);

server.listen(4000, () => {
  console.log('Server is listening on port 4000!');
});