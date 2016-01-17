module.exports = {
  tableName: 'deliveryLocations',
  attributes: {
    name: {
      type: 'string'
    },
    group: {
      type: 'string'
    },
    latitude: {
      type: 'float'
    },
    longitude: {
      type: 'float'
    },
    disabled: {
      type: 'boolean'
    }
  }
}
