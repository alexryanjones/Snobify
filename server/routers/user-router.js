const express = require('express');
const router = express.Router();

const user = require('../controllers/user.js');

router.post('/user', user.getUser);

module.exports = router;
