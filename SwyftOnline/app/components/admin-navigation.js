/* global io */
import Ember from 'ember';
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import config from 'swyft-epsilon-online/config/environment';

export default Ember.Component.extend({
  didInitAttrs() {
    io.socket.get(
      config.routeLocation + '/api/admin/notifications/subscribe',
      { user: { token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token } }
    );
    io.socket.on('new notification', (message) => {
      if (message) {
        let notifications = this.get('notifications');
        notifications.pushObject(message); // eslint-disable-line prefer-const
        this.set('notifications', notifications);
      }
    });
    io.socket.on('connect', () => {
      io.socket.get(
        config.routeLocation + '/api/admin/notifications/subscribe',
        { user: { token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token } }
      );
    });
  },
  navigation: [
    { label: 'Dashboard', route: 'admin', icon: 'fa-tachometer' },
    { label: 'Admin CRUD', static: true },
    { label: 'Transactions', route: 'admin-transactions', icon: 'fa-credit-card' },
    { label: 'Users', route: 'admin-users', icon: 'fa-user' },
    { label: 'Globals', route: 'admin-globals', icon: 'fa-globe' },
    { label: 'Coupons', route: 'admin-coupons', icon: 'fa-ticket' },
    { label: 'Tokens', route: 'admin-tokens', icon: 'fa-circle-thin' },
    { label: 'Deliveries', route: 'admin-deliveries', icon: 'fa-truck' },
    { label: 'Delivery Locations', route: 'admin-delivery-locations', icon: 'fa-map-marker' },
    { label: 'Delivery Periods', route: 'admin-delivery-periods', icon: 'fa-truck' },
    { label: 'Delivery Groups', route: 'admin-delivery-groups', icon: 'fa-truck' },
    { label: 'Restaurants', route: 'admin-restaurants', icon: 'fa-cutlery' },
    { label: 'Menu Items', route: 'admin-menu-items', icon: 'fa-cutlery' },
    { label: 'Attached Requests', route: 'admin-attached-requests', icon: 'fa-cutlery' },
    { label: 'Orders', route: 'admin-orders', icon: 'fa-truck' },
    { label: 'Reports', static: true },
    { label: 'Export', route: 'admin-export-picker', icon: 'fa-table' },
    { label: 'Current Delivery', route: 'admin-current-delivery', icon: 'fa-table' },
    { label: 'Wizards', static: true },
    { label: 'New Swyft Debit', route: 'admin-balance', icon: 'fa-money' },
    { label: 'Delivery Offset', route: 'admin-delivery-offset', icon: 'fa-money' },
    { label: 'New One-Time-Use Token', route: 'admin-new-token', icon: 'fa-money' },
    { label: 'New Coupon', route: 'admin-new-coupon', icon: 'fa-money' },
    { label: 'Complete Delivery', route: 'admin-complete-delivery', icon: 'fa-truck' },
    { label: 'Content Management', static: true },
    { label: 'Edit News', route: 'admin-news', icon: 'fa-user' },
    { label: 'Edit FAQ', route: 'admin-faq', icon: 'fa-user' },
    { label: 'Edit Terms & Conditions', route: 'admin-terms', icon: 'fa-user' },
    { label: 'Edit Global Delivery Note', route: 'admin-global-delivery-note', icon: 'fa-user' },
    { label: 'About', static: true },
    { label: 'About', route: 'admin-about', icon: 'fa-user' },
  ],
  notifications: Ember.A(), // eslint-disable-line new-cap
});
