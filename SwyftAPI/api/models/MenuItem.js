module.exports = {
  tableName: 'menuItems',
  attributes: {
    name: {
      type: 'string'
    },
    baseprice: {
      type: 'float'
    },
    category: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    itemOptions: {
      type: 'array'
    },
    extras: {
      type: 'array'
    },
    attachedRequests: {
      type: 'string'
    },
    unavailable: {
      type: 'boolean'
    },
    restaurant: {
      type: 'string'
    },
    adminComments: {
      type: 'string'
    },
    note: {
      type: 'string'
    },
    seasonal: {
      type: 'boolean'
    },
    temporary: {
      type: 'boolean'
    }
  },
};
