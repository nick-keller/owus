var mongoose = require('mongoose');
var path = require('path');
var repository = require('../repository/ExpenseRepository');
var Schema = mongoose.Schema;

/**
 * Expense entity
 */
var ExpenseSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        trim: true,
        validate: {
            validator: function(val) {
                return val > 0;
            },
            msg: "Le montant doit être suppérieur à zéro."
        }
    },
    date: Date,
    payer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipients: {
        type: [{
            type:Schema.Types.ObjectId,
            ref: 'User'
        }],
        required: true,
        validate: {
            validator: function(val) {
                return val.length > 0;
            },
            msg: "Au moint un bénéficiaire attendu."
        }
    }
});

ExpenseSchema.statics.findDebtsOfUser = repository.findDebtsOfUser;
ExpenseSchema.statics.findDebtsOfUsers = repository.findDebtsOfUsers;
ExpenseSchema.statics.findWithUser = repository.findWithUser;

mongoose.model('Expense', ExpenseSchema);