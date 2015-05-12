module.exports.findFriends = function(user, cb) {
    this.find({
        facebookId: {
            $in: user.friends
        }
    }, 'name facebookId profileUrl -_id', cb);
};