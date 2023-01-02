import express from 'express';
import cors from 'cors';
import router from './router.js';
const server = express();

server.use(cors());
server.use(express.json({ extended: true }));
server.use(router);

server.listen(4000, () => {
  console.log('Server is listening on port 4000!');
});