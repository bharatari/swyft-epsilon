/* jslint unused: false */
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
      return value;
    }
    return params[0][params[1]];
  }
});
