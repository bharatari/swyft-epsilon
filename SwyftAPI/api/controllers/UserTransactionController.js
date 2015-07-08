module.exports = {
    find: function(req, res) {
        TransactionService.getTransactions(req.query, function(result) {
            res.json(result);
        });
    },
    /*
    getTransaction: function(req, res) {
        UserTransaction.findOne({ id: req.params.id }).exec(function(err, transaction) {
            if(!transaction && req.query.admin) {
                res.json(new ModelService.Transaction());
            }
            else if(!transaction) {
                res.badRequest();
            }
            else {
                res.json(transaction);
            }
        });
    },
    newTransaction: function(req, res) {
        req.body.transactionCreator = req.user.id;
        UserTransaction.create(req.body).exec(function(err, transaction) {
            res.ok();
        });
    },
    updateTransaction: function(req, res) {
        UserTransaction.update({ id: req.params.id }, req.body).exec(function(err, transaction) {
            res.ok();
        });
    },
    deleteTransaction: function(req, res) {
        UserTransaction.destroy({ id: req.params.id }).exec(function(err) {
            res.ok();
        });
    },
    */
    getTransactionMetadata: function(req, res) {
        MetaService.getTransactionMetadata(req.query.limit, function(result) {
            res.json(result);
        });
    },
    getTransactionModel: function(req, res) {
        res.json(new ModelService.Transaction());
    }
}