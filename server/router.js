const express = require('express');
const nowListening = require('./controllers/nowListening.js');
const sidebar = require('./controllers/sidebar.js');
const homescreen = require('./controllers/homescreen.js');
const login = require('./controllers/login.js');
const history = require('./controllers/history.js');
const myPlaylists = require('./controllers/myPlaylists.js');
const featuredPlaylists = require('./controllers/featuredPlaylists.js');
const user = require('./controllers/user.js');
const playlistTracks = require('./controllers/playlistTracks.js');
const myLibrary = require('./controllers/myLibrary.js');
const filterDatabase = require('./controllers/filterDatabase');
const insultGenerator = require('./controllers/insultGenerator')
const queue = require('./controllers/queue')
const insults = require('./controllers/populateInsults');
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
router.get('/filter-date', filterDatabase.clearOldTracks)
router.post('/generate-insult', insultGenerator.generateInsult)
router.post('/get-queue', queue.getQueue)
router.post('/add-to-queue', queue.addToQueue);
router.get('/load-insults', insults.loadInsults);

module.exports = router;