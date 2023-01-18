const Express = require('express');
const router = Express.Router();

const user = require('../controllers/user.js');

router.post('/user', user.getUser);

module.exports = router;
