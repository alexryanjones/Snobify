import express from 'express';
import nowListening from './controllers/now-listening.js';
import sidebar from './controllers/sidebar.js';
import homescreen from './controllers/homescreen.js';
import login from './controllers/login.js';
import history from './controllers/history.js';
const router = express.Router();

router.post('/login', login.Login)
router.post('/refresh', login.Refresh);
router.post('/getHistory', history.getHistory)
router.get('/homescreen', homescreen.sayHello)
router.get('/now-listening', nowListening.getCurrentlyListening);

export default router;