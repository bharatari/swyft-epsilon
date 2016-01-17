module.exports = {
  tableName: 'orders',
  attributes: {
    type: {
      type: 'string',
      enum: ["scheduled", "asap"]
    },
    items: {
      type: 'array'
    },
    userId: {
      type: 'string'
    },
    contactPhone: {
      type: 'string'
    },
    userComments: {
      type: 'string'
    },
    adminComments: {
      type: 'string'
    },
    totalAmount: {
      type: 'float'
    },
    actualAmount: {
      type: 'float'
    },
    paymentType: {
      type: 'string',
      enum: ["creditcard", "swyftdebit", "cash", "cash+swyftdebit"]
    },
    deliveryTime: {
      type: 'datetime'
    },
    deliveryId: {
      type: 'string'
    },
    deliveryLocation: {
      type: 'string'
    },
    couponId: {
      type: 'string'
    },
    tokenId: {
      type: 'string'
    },
    deliveryNote: {
      type: 'json'
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false
    }
  },
}
