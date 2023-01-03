import express from 'express';
import nowListening from './controllers/now-listening.js';
import sidebar from './controllers/sidebar.js';
import homescreen from './controllers/homescreen.js';
import login from './controllers/login.js';
const router = express.Router();

router.post('/login', login.Login)
router.get('/homescreen', homescreen.sayHello)
router.get('/sidebar', sidebar.search);
router.get('/now-listening', nowListening.getCurrentlyListening);
// router.post('/ENDPOINT', ENDPOINT.ENDPOINT-LOGIC);
// router.delete('/ENDPOINT/:DYNAMIC-PARAM', ENDPOINT.ENDPOINT-LOGIC)

export default router;