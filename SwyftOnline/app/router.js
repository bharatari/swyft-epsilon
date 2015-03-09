import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
    this.route("learn-more", { path:"/app/learn-more" });
    this.route("login", { path: "/app/login" });
    this.route("sign-up", { path:"/app/sign-up" });
    this.route("verify", { path:"/app/verify" });
    this.route("resend-verification", { path:"/app/resend-verification" });
    this.route("forgot-password", { path:"/app/forgot-password" });
    this.route("reset-password", { path:"/app/reset-password/:token" });
    this.route("restaurants", { path: "/app/restaurants"});
    this.route("menu-items", { path:"/app/menu-items/:restaurant_name"});
    this.route("item", { path:"/app/item/:item_id"});
    this.route("checkout", { path:"/app/checkout"});
    this.route("admin", { path:"/admin"});
    this.route("admin-export-picker", { path:"/admin/export-picker"});
    this.route("admin-export", { path:"/admin/export/:delivery_id"});
    this.route("admin-unauthorized", { path:"/admin/unauthorized"});
    this.route("admin-new-delivery", { path:"/admin/new-delivery" });
    this.route("admin-complete-delivery", { path:"/admin/complete-delivery" });
    this.route("admin-users", { path:"/admin/users" });
    this.route("admin-edit-balance", { path:"/admin/balance" });
    this.route("admin-transactions", { path:"/admin/transactions" });
    this.route("admin-global-delivery-note", { path:"/admin/global-delivery-note" });
    this.route("admin-news", { path:"/admin/news" });
    this.route("admin-close-delivery", { path:"/admin/close-delivery" });
    this.route("admin-aggregate", { path:"/admin/aggregate/:delivery_id" });
    this.route("admin-master", { path:"/admin/master/:delivery_id" });
    this.route("terms", { path:"/app/terms" });
    this.route("faq", { path:"/app/faq" });
    this.route("profile", { path:"/app/profile" });
    this.route("delivery", { path:"/delivery" });
    this.route("delivery-order", { path:"/delivery/order/:order_id" });
});

export default Router;
