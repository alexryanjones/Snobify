import express from 'express';
import nowListening from './controllers/nowListening.js';
import sidebar from './controllers/sidebar.js';
import homescreen from './controllers/homescreen.js';
import login from './controllers/login.js';
import history from './controllers/history.js';
import myPlaylists from './controllers/myPlaylists.js';
import featuredPlaylists from './controllers/featuredPlaylists.js';
import user from './controllers/user.js';
import playlistTracks from './controllers/playlistTracks.js';
import myLibrary from './controllers/myLibrary.js';
const router = express.Router();

router.post('/login', login.Login)
router.post('/refresh', login.Refresh);
router.post('/getHistory', history.getHistory)
router.post('/my-playlists', myPlaylists.getPlaylists);
router.post('/featured-playlists', featuredPlaylists.getFeaturedPlaylists)
router.get('/homescreen', homescreen.sayHello)
router.post('/now-listening', nowListening.getCurrentlyListening);
router.post('/user', user.getUser);
router.post('/get-playlist', playlistTracks.getTracks)
router.post('/get-library', myLibrary.getLibrary);

export default router;