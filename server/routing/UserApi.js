var controller = require('../controller/UserController');
var express = require('express');
var router = express.Router();

router.route('/friends')
    .get(controller.friends);

module.exports = router;