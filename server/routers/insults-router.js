const Express = require('express');
const router = Express.Router();


const insults = require('../controllers/insults');

router.post('/generate-insult', insults.generateInsult);
router.get('/load-insults', insults.loadInsults);

module.exports = router;
