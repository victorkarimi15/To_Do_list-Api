const express = require('express');
const {handleAuth} = require('../controller/authController.js')

const router = express.Router();

router.post('/', handleAuth);

module.exports = router;