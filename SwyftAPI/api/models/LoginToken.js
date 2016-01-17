module.exports = {
  tableName: 'loginTokens',
  attributes: {
    token: {
      type: 'string'
    },
    userId: {
      type: 'string'
    },
    expires: {
      type: 'datetime'
    }
  }
}
