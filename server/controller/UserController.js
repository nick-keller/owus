var mongoose = require('mongoose');
var _ = require('lodash');
var User = mongoose.model('User');
var Expense = mongoose.model('Expense');
var Group = mongoose.model('Group');

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
    //User.findOne({facebookId:'1430395700611720.000000'}, function(err, user){
    //    req.user = user;

    User.findMaximalCliques(req.user, function(err, friends, cliques){
        if(err) return next(err);

        friends.push(req.user);

        Group
            .find({users:req.user._id})
            .populate('users', 'name facebookId profileUrl -_id')
            .exec(function(err, groups){
                if(err) return next(err);

                var cliquesAndGroups = groups.map(function(group){
                    return group.users.map(function(user){
                        return _.cloneDeep(user)._doc;
                    });
                }).concat(cliques);

                Expense.findDebtsOfUsers(friends, cliquesAndGroups, function(err, result, debts) {
                    if(err) return next(err);

                    res.json({
                        groups: result.map(function(users, i){
                            if(i < groups.length)
                                return {_id: groups[i]._id, name: groups[i].name,users:users};
                            return {name: "Groupe automatique",users:users};
                        }),
                        debts: debts
                    });
                });
            });
    });
    //});
};