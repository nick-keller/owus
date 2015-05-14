var controller = require('../controller/ExpenseController');
var express = require('express');
var router = express.Router();

router.route('/')
    .post(controller.add);

router.route('/:expense_id')
    .get(controller.get)
    .put(controller.edit);

router.param('expense_id', controller.paramConverter);

module.exports = router;