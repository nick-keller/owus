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
        required: 'Vous devez donner un nom au groupe.',
        trim: true
    },
    users: {
        type: [{
            type:Schema.Types.ObjectId,
            ref: 'User'
        }],
        required: true,
        validate: {
            validator: function(val) {
                return val.length > 1;
            },
            msg: "Un groupe de moins de deux membres n'est pas un groupe !"
        }
    }
});

//GroupSchema.statics.findDebtsOfUser = repository.findDebtsOfUser;

mongoose.model('Group', GroupSchema);