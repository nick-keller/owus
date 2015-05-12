var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.friends = function(req, res) {
    User.findFriends(req.user, function(err, friends){
        res.json(friends);
    });
};