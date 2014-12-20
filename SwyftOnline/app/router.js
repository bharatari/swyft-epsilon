import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
    this.route("login", { path: "/app/login" });
    this.route("restaurants", { path: "/app/restaurants"});
    this.route("menuItems", { path:"/app/menuItems/:restaurant_name"});
});

export default Router;
