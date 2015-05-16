var mongoose = require('mongoose');
var path = require('path');
var repository = require('../repository/UserRepository');
var Schema = mongoose.Schema;

/**
 * User entity
 */
var UserSchema = new Schema({
    name: String,
    email: String,
    facebookId: Number,
    profileUrl: String,
    accessToken: String,
    friends: [Number]
});

UserSchema.statics.findFriends = repository.findFriends;
UserSchema.statics.findIds = repository.findIds;
UserSchema.statics.findId = repository.findId;
UserSchema.statics.findMaximalCliques = repository.findMaximalCliques;

mongoose.model('User', UserSchema);