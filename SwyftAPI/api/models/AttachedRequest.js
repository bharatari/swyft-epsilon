module.exports = {
  tableName: 'attachedRequests',
  attributes: {
    name: {
      type: 'string'
    },
    label: {
      type: 'string'
    },
    options: {
      type: 'array'
    },
    available: {
      type: 'string',
      enum: ['onTrue', 'onFalse']
    },
    watches: {
      type: 'string'
    },
    on: {
      type: 'string'
    },
    required: {
      type: 'boolean'
    }
  }
}
