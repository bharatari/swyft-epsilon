module.exports = {
  tableName: 'forgotPasswordTokens',
  attributes: {
    userId: {
      type: 'string'
    },
    token: {
      type: 'string'
    },
    expiryDate: {
      type: 'datetime'
    },
    username: {
      type: 'string'
    }
  }
};
