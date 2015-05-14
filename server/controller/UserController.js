var mongoose = require('mongoose');
var User = mongoose.model('User');
var Expense = mongoose.model('Expense');

module.exports.friends = function(req, res) {
    User.findFriends(req.user, function(err, friends){
        res.json(friends);
    });
};

module.exports.debts = function(req, res) {
    Expense.findDebtsOfUser(req.user, function(err, expenses){
        res.json(expenses);
    });
};

module.exports.expenses = function(req, res) {
    Expense.findWithUser(req.user, function(err, expenses){
        res.json(expenses);
    });
};