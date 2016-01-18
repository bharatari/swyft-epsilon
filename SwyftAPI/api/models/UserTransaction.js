module.exports = {
  tableName: 'userTransactions',
  attributes: {
    userId: {
      type: 'string'
    },
    type: {
      type: 'string',
      enum: ["deposit", "deduction"]
    },
    amount: {
      type: 'float'
    },
    comments: {
      type: 'string'
    },
    orderId: {
      type: 'string'
    },
    transactionCreator: {
      type: 'string'
    },
    finalBalance: {
      type: 'float'
    }
  }
}
