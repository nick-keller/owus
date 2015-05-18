var controller = require('../controller/GroupController');
var express = require('express');
var router = express.Router();

router.route('/')
    .post(controller.add);

router.route('/:group_id')
    .get(controller.get)
    .put(controller.edit);

router.param('group_id', controller.paramConverter);

module.exports = router;