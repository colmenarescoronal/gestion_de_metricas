const express = require('express');
const response = require('../../../network/response');
const router = express.Router();

const controller = require('./controller');
const auth = require('../../../auth/auth');

router.post('/', controller.login);
router.post('/registrarse', controller.registrarse);

module.exports = router;
