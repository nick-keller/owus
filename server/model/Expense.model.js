var mongoose = require('mongoose');
var path = require('path');
var Schema = mongoose.Schema;

/**
 * Expense entity
 */
var ExpenseSchema = new Schema({
    title: String,
    amount: Number,
    date: Date,
    payer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    recipients: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

mongoose.model('Expense', ExpenseSchema);