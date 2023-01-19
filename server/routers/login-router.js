const Express = require('express');
const router = Express.Router();

const login = require('../controllers/login.js');

router.post('/login', login.Login)
router.post('/refresh', login.Refresh);
router.get('/health-check', (req, res) => res.status(200).send('Yes paaaaaal'))


module.exports = router;