var mongoose = require('mongoose');
var User = mongoose.model('User');
var Expense = mongoose.model('Expense');

module.exports.add = function(req, res) {
    req.body.date = new Date();

    User.findId(req.body.payer, function(err, id){
        req.body.payer = id;

        User.findIds(req.body.recipients, function(err, ids){
            req.body.recipients = ids;

            var expense = new Expense(req.body);
            expense.save(function(err){
                res.json(expense);
            });
        });
    });
};