module.exports.findFriends = function(user, cb) {
    this.find({
        facebookId: {
            $in: user.friends
        }
    }, 'name facebookId profileUrl -_id', cb);
};

module.exports.findIds = function(users, cb) {
    var facebookIds = [];

    users.forEach(function(user){
        facebookIds.push(user.facebookId);
    });

    this.find({
        facebookId: {
            $in: facebookIds
        }
    }, '_id', function(err, users){
        if(err) cb(err);

        var ids = [];

        users.forEach(function(user){
            ids.push(user._id);
        });

        cb(null, ids);
    });
};

module.exports.findId = function(user, cb) {
    console.log(user);
    this.findOne({
        facebookId: user.facebookId
    }, '_id', function(err, user){
        if(err) cb(err);

        cb(null, user._id);
    });
};