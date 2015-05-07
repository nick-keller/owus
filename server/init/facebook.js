var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

var init = function(parameters) {
    passport.use(new FacebookStrategy({
            clientID: parameters.app_id,
            clientSecret: parameters.app_secret,
            callbackURL: "http://localhost:3000/login_check"
        },
        function(accessToken, refreshToken, profile, done) {
            User.findOne({facebookId:profile.id}, function(err, user) {
                if(err) return done(err);

                // new user => register him
                if(!user){
                    user = new User({
                        name: profile.displayName,
                        facebookId: profile.id,
                        profileUrl: profile.profileUrl,
                        accessToken: accessToken
                    });

                    user.save(function(err){
                        return done(err, user);
                    });
                }

                user.name = profile.displayName;
                user.profileUrl = profile.profileUrl;
                user.accessToken = accessToken;

                user.save(function(err){
                    return done(err, user);
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