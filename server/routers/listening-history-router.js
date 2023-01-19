const Express = require('express');
const router = Express.Router();

const history = require('../controllers/history.js');

router.post('/get-history', history.getHistory);
router.get('/analyse-history', history.analyseHistory);
router.get('/filter-date', history.clearOldTracks);

module.exports = router;