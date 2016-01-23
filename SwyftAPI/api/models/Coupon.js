module.exports = {
  tableName: 'coupons',
  attributes: {
    name: {
      type: 'string'
    },
    comments: {
      type: 'string'
    },
    isActive: {
      type: 'boolean'
    },
    discount: {
      type: 'float'
    },
    code: {
      type: 'string'
    }
  }
};
