module.exports = {
  tableName: 'restaurants',
  attributes: {
    name: {
      type: 'string'
    },
    title: {
      type: 'string'
    },
    unavailable: {
      type: 'boolean',
      defaultsTo: true
    },
    aggregateStyle: {
      type: 'string',
      enum: ['full', 'simple']
    },
    notice: {
      type: 'string'
    },
    image: {
      type: 'string'
    },
    subtitle: {
      type: 'string'
    }
  }
};
