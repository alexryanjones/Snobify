const Express = require('express');
const router = Express.Router();

const playlists = require('../controllers/playlists.js');

router.post('/my-playlists', playlists.getMyPlaylists);
router.post('/featured-playlists', playlists.getFeaturedPlaylists);
router.post('/get-playlist', playlists.getPlaylistTracks);
router.post('/get-library', playlists.getMyLibrary);

module.exports = router;