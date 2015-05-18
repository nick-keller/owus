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

module.exports.transfer = function(req, res, next) {
    User.findMaximalCliques(req.user, function(err, friends, cliques){
        if(err) return next(err);

        friends.push(req.user);

        Expense.findDebtsOfUsers(friends, cliques, function(err, cliques, debts) {
            if(err) return next(err);

            res.json({
                groups: cliques.map(function(users){return {name: "Groupe automatique",users:users};}),
                debts: debts
            });
        });
    });
};