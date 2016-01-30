/* jslint unused: false */
/* global moment */
import Ember from 'ember';

export default Ember.Helper.helper((params) => {
  if (params[0]) {
    return moment(params[0]).tz('America/New_York').format('MM/DD/YYYY hh:mm a');
  }
  return moment().format('MM/DD/YYYY');
});
