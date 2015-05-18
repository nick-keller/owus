var mongoose = require('mongoose');
var User = mongoose.model('User');
var Group = mongoose.model('Group');
var _ = require('lodash');

module.exports.paramConverter = function(req, res, next, id) {
    Group.findById(id)
    .populate('users', 'name facebookId profileUrl -_id')
    .exec(function(err, group){
        if(err) return next(err);

        if(!group){
            err = new Error('Group not found');
            err.status = 404;
            return next(err);
        }

        req.group = group;
        next();
    });
};

module.exports.add = function(req, res, next) {

    User.findIds(req.body.users, function(err, ids){
        if(err) return next(err);

        req.body.users = ids;

        var group = new Group(req.body);
        group.save(function(err){
            if(err) return next(err);

            res.json(group);
        });
    });
};

module.exports.get = function(req, res) {
    res.json(req.group);
};

module.exports.edit = function(req, res, next) {
    User.findIds(req.body.users, function(err, ids){
        if(err) return next(err);

        req.body.users = ids;

        Group.update({_id:req.body._id}, {$set: req.body}, function(err, group){
            if(err) return next(err);

            res.json(group);
        });
    });
};