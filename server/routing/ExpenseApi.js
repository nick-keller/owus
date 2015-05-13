var controller = require('../controller/ExpenseController');
var express = require('express');
var router = express.Router();

router.route('/')
    .post(controller.add);

module.exports = router;