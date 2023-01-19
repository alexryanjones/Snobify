const Express = require('express')
const cors = require('cors')

const server = Express();
const loginRouter = require('./routers/login-router')
const playlistRouter = require('./routers/playlist-router.js');
const listeningHistoryRouter = require('./routers/listening-history-router.js');
const playerRouter = require('./routers/player-router');
const insultsRouter = require('./routers/insults-router');
const userRouter = require('./routers/user-router')


server.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT']
}));
server.use(Express.json({ extended: true }));
server.use(loginRouter);
server.use(playlistRouter);
server.use(listeningHistoryRouter);
server.use(playerRouter);
server.use(insultsRouter);
server.use(userRouter);

server.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is listening on port ${process.env.SERVER_PORT}!`);
});