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
        required: 'Vous devez donner un nom à cette dépense.',
        trim: true
    },
    amount: {
        type: Number,
        required: 'Vous devez indiquer un montant voyons !',
        trim: true,
        validate: {
            validator: function(val) {
                return val > 0;
            },
            msg: "Le montant est forcément suppérieur à zéro."
        }
    },
    date: Date,
    payer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: 'Vous devez indiquer qui a payé.'
    },
    recipients: {
        type: [{
            type:Schema.Types.ObjectId,
            ref: 'User'
        }],
        required: 'Vous devez indiquer qui est concerné par cette dépense.',
        validate: {
            validator: function(val) {
                return val.length > 0;
            },
            msg: "Il doit y avoir au moins une personne concerné voyons !"
        }
    }
});

ExpenseSchema.statics.findDebtsOfUser = repository.findDebtsOfUser;
ExpenseSchema.statics.findDebtsOfUsers = repository.findDebtsOfUsers;
ExpenseSchema.statics.findWithUser = repository.findWithUser;

mongoose.model('Expense', ExpenseSchema);