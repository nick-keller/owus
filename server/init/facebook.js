var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var FB = require('fb');

var init = function(parameters) {
    passport.use(new FacebookStrategy({
            clientID: parameters.app_id,
            clientSecret: parameters.app_secret,
            callbackURL: "http://" + parameters.callback + "/login_check"
        },
        function(accessToken, refreshToken, profile, done) {
            User.findOne({facebookId:profile.id}, function(err, user) {
                if(err) return done(err);

                if(!user) user = new User({facebookId: profile.id});

                user.name = profile.displayName;
                user.accessToken = accessToken;

                FB.setAccessToken(accessToken);

                FB.api(profile.id, {fields:['picture', 'friends']}, function(response){
                    var friends = [];

                    response.friends.data.forEach(function(f){
                        friends.push(f.id);
                    });

                    user.profileUrl = response.picture.data.url;
                    user.friends = friends;

                    user.save(function(err){
                        return done(err, user);
                    });
                });
            });
        }
    ));

    passport.serializeUser(function(user, done) {
        user.save(function(err){
            if(err) return done(err);
            return done(null, user._id);
        });
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};

module.exports = init;