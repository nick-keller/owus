var mongoose = require('mongoose');
var path = require('path');
//var repository = require('../repository/ExpenseRepository');
var Schema = mongoose.Schema;

/**
 * Expense entity
 */
var GroupSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    members: {
        type: [{
            type:Schema.Types.ObjectId,
            ref: 'User'
        }],
        required: true,
        validate: {
            validator: function(val) {
                return val.length > 1;
            },
            msg: "Au moint deux membres attendu."
        }
    }
});

//GroupSchema.statics.findDebtsOfUser = repository.findDebtsOfUser;

mongoose.model('Group', GroupSchema);