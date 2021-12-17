const logger = require('../lib/logger')(__filename);
const express = require('express');
const router = express.Router();
const UserController = require('../controller/user');

router.post('/getUsers',UserController.getUsers);

module.exports = router;