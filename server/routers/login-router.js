const express = require('express');
const router = express.Router();

const login = require('../controllers/login.js');

router.post('/login', login.Login)
router.post('/refresh', login.Refresh);


module.exports = router;