const express = require('express');
const router = express.Router();


const insults = require('../controllers/insults');

router.post('/generate-insult', insults.generateInsult);
router.get('/load-insults', insults.loadInsults);

module.exports = router;
