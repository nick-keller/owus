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

        var addDebt = function(u, amount) {
            var index =  indexOfUser(u);

            if(!~index) {
                index = debts.length;
                debts.push({user: u, amount: 0});
            }

            debts[index].amount += amount;
        };

        expenses.forEach(function(expense){
            var pricePerUser = expense.amount / expense.recipients.length;

            if(eq(expense.payer, user)) {
                expense.recipients.forEach(function(recipient){
                    if(eq(recipient, user)) return;
                    addDebt(recipient, -pricePerUser);
                });
            } else {
                addDebt(expense.payer, pricePerUser);
            }
        });

        cb(null, debts);
    });
};