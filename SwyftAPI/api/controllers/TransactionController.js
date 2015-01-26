module.exports = {
    getTransactions: function(req, res) {
        UserTransactions.find().exec(function(err, transactions) {
            TransactionService.iterateJoinUsers(transactions, function(items) {
                res.json(items);
            });
        });
    }
}