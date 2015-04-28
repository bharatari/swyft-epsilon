module.exports = {
    getTransactions: function(req, res) {
        UserTransaction.find().sort('createdAt').exec(function(err, transactions) {
            TransactionService.iterateJoinUsers(transactions, function(items) {
                res.json(items);
            });
        });
    }
}