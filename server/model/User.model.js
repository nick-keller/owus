var mongoose = require('mongoose');
var path = require('path');
var Schema = mongoose.Schema;

/**
 * User entity
 */
var UserSchema = new Schema({
    name: String,
    email: String,
    facebookId: Number,
    profileUrl: String,
    accessToken: String
});

mongoose.model('User', UserSchema);