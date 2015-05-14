var mongoose = require('mongoose');
var User = mongoose.model('User');
var Expense = mongoose.model('Expense');
var _ = require('lodash');

module.exports.paramConverter = function(req, res, next, id) {
    Expense.findById(id)
    .populate('payer recipients', 'name facebookId profileUrl -_id')
    .exec(function(err, expense){
        if(err) return next(err);

        if(!expense){
            err = new Error('Expense not found');
            err.status = 404;
            return next(err);
        }

        req.expense = expense;
        next();
    });
};

module.exports.add = function(req, res, next) {
    req.body.date = new Date();

    User.findId(req.body.payer, function(err, id){
        if(err) return next(err);

        req.body.payer = id;

        User.findIds(req.body.recipients, function(err, ids){
            if(err) return next(err);

            req.body.recipients = ids;

            var expense = new Expense(req.body);
            expense.save(function(err){
                if(err) return next(err);

                res.json(expense);
            });
        });
    });
};

module.exports.get = function(req, res) {
    res.json(req.expense);
};

module.exports.edit = function(req, res, next) {
    User.findId(req.body.payer, function(err, id){
        if(err) return next(err);

        req.body.payer = id;

        User.findIds(req.body.recipients, function(err, ids){
            if(err) return next(err);

            req.body.recipients = ids;

            var expense = new Expense(req.body);

            Expense.update({_id:req.body._id}, {$set: req.body}, function(err, expense){
                if(err) return next(err);

                res.json(expense);
            });
        });
    });
};