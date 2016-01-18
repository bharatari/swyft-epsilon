/* jslint unused: false */
import Ember from 'ember';

export default Ember.Helper.helper((params) => {
  if (params[0]) {
    return params[0].toUpperCase();
  }
});
