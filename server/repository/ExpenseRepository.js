module.exports.findWithUser = function(user, cb) {
    this.find({ $or: [
            {payer: user._id},
            {recipients: user._id}
        ]})
        .populate('payer recipients', 'name facebookId profileUrl -_id')
        .exec(cb);
};

module.exports.findDebtsOfUser = function(user, cb) {
    var eq = function(u1, u2) {
        return u1.facebookId === u2.facebookId;
    };

    this
    .find({ $or: [
        {payer: user._id},
        {recipients: user._id}
    ]})
    .populate('payer recipients', 'name facebookId profileUrl -_id')
    .exec(function(err, expenses){
        if(err)
            return cb(err);

        var debts = [];

        var indexOfUser = function(u) {
            for(var i=0; i<debts.length; ++i) {
                if(eq(debts[i].user, u))
                    return i;
            }
            return -1;
        };

        var addDebt = function(u, amount, expense) {
            var index =  indexOfUser(u);
            amount = Math.round(amount * 100) /100;

            if(!~index) {
                index = debts.length;
                debts.push({
                    user: u,
                    amount: 0,
                    expenses: []
                });
            }

            debts[index].amount += amount;
            debts[index].expenses.push(expense);

            if(debts[index].amount == 0)
                debts[index].expenses = [];
        };

        expenses.forEach(function(expense){
            var pricePerUser = expense.amount / expense.recipients.length;

            if(eq(expense.payer, user)) {
                expense.recipients.forEach(function(recipient){
                    if(eq(recipient, user)) return;
                    addDebt(recipient, -pricePerUser, expense);
                });
            } else {
                addDebt(expense.payer, pricePerUser, expense);
            }
        });

        cb(null, debts);
    });
};

module.exports.findDebtsOfUsers = function(users, cliques, cb) {
    var eq = function(u1, u2) {
        return u1.facebookId === u2.facebookId;
    };

    var inUsers = function(u) {
        for(var i=0; i<users.length; ++i) {
            if(eq(users[i], u))
                return true;
        }
        return false;
    };

    var ids = [];
    users.forEach(function(user){ids.push(user._id)});

    this
        .find({ $or: [
            {payer: {$in: ids}},
            {recipients: {$in: ids}}
        ]})
        .populate('payer recipients', 'name facebookId profileUrl -_id')
        .exec(function(err, expenses){
            if(err)
                return cb(err);

            var debts = {};
            users.forEach(function(user){
                debts[user.facebookId] = [];
            });

            var indexOfUser = function(u, debtsOfUser) {
                for(var i=0; i<debtsOfUser.length; ++i) {
                    if(eq(debtsOfUser[i].user, u))
                        return i;
                }
                return -1;
            };

            var addDebt = function(recipient, payer, amount) {
                if(!inUsers(recipient) || !inUsers(payer)) return;
                if(eq(recipient, payer)) return;

                var payerIndexInRecipientDebts =  indexOfUser(payer, debts[recipient.facebookId]);
                var recipientIndexInPayerDebts =  indexOfUser(recipient, debts[payer.facebookId]);
                amount = Math.round(amount * 100) /100;

                if(!~payerIndexInRecipientDebts) {
                    payerIndexInRecipientDebts = debts[recipient.facebookId].length;
                    recipientIndexInPayerDebts = debts[payer.facebookId].length;
                    debts[recipient.facebookId].push({
                        user: payer,
                        amount: 0
                    });
                    debts[payer.facebookId].push({
                        user: recipient,
                        amount: 0
                    });
                }

                debts[recipient.facebookId][payerIndexInRecipientDebts].amount += amount;
                debts[payer.facebookId][recipientIndexInPayerDebts].amount -= amount;
            };

            expenses.forEach(function(expense){
                var pricePerUser = expense.amount / expense.recipients.length;

                expense.recipients.forEach(function(recipient) {
                    addDebt(recipient, expense.payer, pricePerUser);
                });
            });

            cliques.forEach(function(clique) {
                var isUserInClique = function(u) {
                    for(var i=0; i<clique.length; ++i) {
                        if(eq(clique[i], u))
                            return true;
                    }
                    return false;
                };

                console.log(clique.length);

                clique.forEach(function(user) {
                    console.log(user.name);
                    user.debt = 0;

                    if(debts[user.facebookId] !== undefined) {
                        debts[user.facebookId].forEach(function(debt) {
                            if(isUserInClique(debt.user))
                                user.debt += debt.amount;
                        });
                    }
                });
            });

            cb(null, cliques);
        });
};