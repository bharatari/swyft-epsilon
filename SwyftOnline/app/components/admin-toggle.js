/* global $ */
import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    toggle() {
      $('#admin-menu').offcanvas('toggle');
    },
  },
});
