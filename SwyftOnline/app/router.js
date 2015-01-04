import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
    this.route("login", { path: "/app/login" });
    this.route("sign-up", { path:"/app/sign-up" });
    this.route("verify-user", { path:"/app/verify-user" });
    this.route("restaurants", { path: "/app/restaurants"});
    this.route("menu-items", { path:"/app/menu-items/:restaurant_name"});
    this.route("item", { path:"/app/item/:item_id"});
    this.route("checkout", { path:"/app/checkout"});
    this.route("admin", { path:"/admin"});
    this.route("admin-export-picker", { path:"/admin/export-picker"});
    this.route("admin-export", { path:"/admin/export/:delivery_id"});
    this.route("admin-unauthorized", { path:"/admin/unauthorized"});
    this.route("admin-new-delivery", { path:"/admin/new-delivery" });
});

export default Router;
