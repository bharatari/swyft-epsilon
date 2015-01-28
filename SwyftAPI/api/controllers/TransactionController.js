module.exports = {
    getTransactions: function(req, res) {
        UserTransaction.find().exec(function(err, transactions) {
            TransactionService.iterateJoinUsers(transactions, function(items) {
                res.json(items);
            });
        });
    }
}