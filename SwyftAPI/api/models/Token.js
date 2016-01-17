module.exports = {
  tableName: 'tokens',
  attributes: {
    token: {
      type: 'string'
    },
    discount: {
      type: 'float'
    },
    comments: {
      type: 'string'
    },
    hasBeenUsed: {
      type: 'boolean'
    },
    usedBy: {
      type: 'string'
    },
    orderId: {
      type: 'string'
    }
  }
}
