module.exports = {
  tableName: 'notifications',
  attributes: {
    title: {
      type: 'string'
    },
    body: {
      type: 'string'
    },
    type: {
      type: 'string',
      enum: ['message', 'new', 'error', 'update']
    },
    icon: {
      type: 'string'
    },
    sound: {
      type: 'string'
    },
    actionId: {
      type: 'string'
    }
  }
};
