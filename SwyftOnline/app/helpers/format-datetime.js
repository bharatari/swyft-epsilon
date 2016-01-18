/* jslint unused: false */
/* global moment */
import Ember from 'ember';

export default Ember.Helper.helper((params) => {
  if (params[0] && params[1]) {
    if (params[1].indexOf('.') !== -1) {
      const array = params[1].split('.');
      let value = params[0];
      for (let i = 0; i < array.length; i++) {
        if (value[array[i]]) {
          value = value[array[i]];
        } else {
          return '';
        }
      }
      return moment(value).tz('America/New_York').format('MM-DD-YYYY hh:mm a Z');
    }
    return moment(params[0][params[1]]).tz('America/New_York').format('MM-DD-YYYY hh:mm a Z');
  }
});
