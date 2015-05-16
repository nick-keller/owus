var controller = require('../controller/UserController');
var express = require('express');
var router = express.Router();

router.route('/friends')
    .get(controller.friends);

router.route('/debts')
    .get(controller.debts);

router.route('/expenses')
    .get(controller.expenses);

router.route('/transfer')
    .get(controller.transfer);

module.exports = router;