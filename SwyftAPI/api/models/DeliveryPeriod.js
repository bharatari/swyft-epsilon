module.exports = {
  tableName: 'deliveryPeriods',
  attributes: {
    deliveryDay: {
      type: 'string'
    },
    deliveryHour: {
      type: 'float'
    },
    deliveryMinute: {
      type: 'float'
    },
    deliverySecond: {
      type: 'float'
    },
    cutoffDay: {
      type: 'string'
    },
    cutoffHour: {
      type: 'float'
    },
    cutoffMinute: {
      type: 'float'
    },
    cutoffSecond: {
      type: 'float'
    },
    arrivalDay: {
      type: 'string'
    },
    arrivalHour: {
      type: 'float'
    },
    arrivalMinute: {
      type: 'float'
    },
    arrivalSecond: {
      type: 'float'
    },
    openDay: {
      type: 'string'
    },
    openHour: {
      type: 'float'
    },
    openMinute: {
      type: 'float'
    },
    openSecond: {
      type: 'float'
    },
    restaurants: {
      type: 'string'
    },
    deliverers: {
      type: 'string'
    },
    enabled: {
      type: 'boolean',
      defaultsTo: true
    }
  }
}
