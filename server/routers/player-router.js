const Express = require('express');
const router = Express.Router();

const player = require('../controllers/player');

router.post('/now-listening', player.getCurrentlyListening);
router.post('/get-queue', player.getQueue);
router.post('/add-to-queue', player.addToQueue);

module.exports = router;
