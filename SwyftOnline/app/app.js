/* global $ */
/* global moment */
import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';
import constants from 'swyft-epsilon-online/utils/constants-utils';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver,
  ready: function() {
    moment.tz.add(constants.timeZones.zones);
    $.ajaxSetup({ cache: false, crossDomain: true,
    xhrFields: {
        withCredentials: true
    }});
    Ember.$.ajaxSetup({ cache: false, crossDomain: true,
    xhrFields: {
        withCredentials: true
    }});
  }
});

loadInitializers(App, config.modulePrefix);

export default App;
