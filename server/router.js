import express from 'express';
import nowListening from './controllers/nowListening.js';
import sidebar from './controllers/sidebar.js';
import homescreen from './controllers/homescreen.js';
import login from './controllers/login.js';
import history from './controllers/history.js';
import playlists from './controllers/playlists.js';
import featuredPlaylists from './controllers/featuredPlaylists.js';
const router = express.Router();

router.post('/login', login.Login)
router.post('/refresh', login.Refresh);
router.post('/getHistory', history.getHistory)
router.post('/playlists', playlists.getPlaylists)
router.post('/featured-playlists', featuredPlaylists.getFeaturedPlaylists)
router.get('/homescreen', homescreen.sayHello)
router.post('/now-listening', nowListening.getCurrentlyListening);

export default router;