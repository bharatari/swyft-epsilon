/* jslint unused: false */
import Ember from 'ember';

export default {
  DeliveryNote() {
    this.commentedBy = null;
    this.deliveredBy = null;
    this.comments = '';
    this.isDelivered = false;
    this.deliveredAt = null;
    this.cashPayment = null;
    this.chargeLater = false;
    this.creditCardCharged = false;
    this.creditCardMessage = '';
  },
  Transaction() {
    this.userId = '';
    this.type = '';
    this.amount = 0;
    this.comments = '';
    this.orderId = '';
    this.transactionCreator = '';
    this.finalBalance = 0;
  },
  transitionToData(data, metadata) {
    const meta = metadata;
    for (let i = 0; i < meta.properties.length; i++) {
      if (meta.properties[i].editable) {
        Ember.set(data, meta.properties[i].propertyName, meta.properties[i].value);
      }
    }
    return data;
  },
  transitionToMeta(data, metadata) {
    const meta = metadata;
    for (let i = 0; i < meta.properties.length; i++) {
      meta.properties[i].value = Ember.get(data, meta.properties[i].propertyName);
    }
    return meta;
  },
  dynamicProperty(data, propertyName) {
    if (data && propertyName) {
      if (propertyName.indexOf('.') !== -1) {
        const array = propertyName.split('.');
        let value = data;
        for (let i = 0; i < array.length; i++) {
          if (value[array[i]]) {
            value = value[array[i]];
          }
        }
        return value;
      }
      return data[propertyName];
    }
  },
  valueExists(item, data) {
    if (item && data) {
      for (let i = 0; i < data.length; i++) {
        if (item === data[i]) {
          return true;
        }
      }
      return false;
    }
    return false;
  },
};
