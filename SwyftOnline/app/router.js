import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
    this.route("login", { path: "/app/login" });
    this.route("restaurants", { path: "/app/restaurants"});
    this.route("menu-items", { path:"/app/menu-items/:restaurant_name"});
    this.route("item", { path:"/app/item/:item_id"});
});

export default Router;
