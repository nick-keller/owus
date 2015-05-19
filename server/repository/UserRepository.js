var mongoose = require('mongoose');
var _ = require('lodash');

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
            ids.push(mongoose.Types.ObjectId(user._id));
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

        cb(null, mongoose.Types.ObjectId(user._id));
    });
};

module.exports.findMaximalCliques = function(user, cb) {
    this.find({
        facebookId: {
            $in: user.friends
        }
    }, 'name facebookId profileUrl friends _id', function(err, friends){
        if(err)
            return cb(err);
        var cliques = [[_.cloneDeep(user)._doc]];
        console.log(cliques);

        function isUserInClique(u, clique) {
            for(var i=0; i<cliques[clique].length; ++i)
                if(cliques[clique][i].facebookId == u.facebookId)
                    return true;
            return false;
        }

        function areFriends(u1, u2) {
            return !!~u1.friends.indexOf(u2.facebookId) || !!~u2.friends.indexOf(u1.facebookId);
        }

        function isFriendWithEveryOneInClique(u,clique) {
            for(var i=0; i<cliques[clique].length; ++i)
                if(!areFriends(cliques[clique][i], u))
                    return false;
            return true;
        }

        for(var i=0; i<friends.length; ++i) {
            var friend = friends[i];
            var atLeastInOneClique = false;

            for(var clique=0; clique<cliques.length; ++clique) {
                var isInClique = isUserInClique(friend, clique);
                atLeastInOneClique = atLeastInOneClique || isInClique;

                if(isInClique)
                    continue;

                if(!isFriendWithEveryOneInClique(friend, clique))
                    continue;

                cliques[clique].push(_.cloneDeep(friend)._doc);
                atLeastInOneClique = true;
            }

            if(!atLeastInOneClique) {
                cliques.push([_.cloneDeep(user)._doc, _.cloneDeep(friend)._doc]);
                i = -1;
            }
        }

        cb(err, friends, cliques);
    });
};