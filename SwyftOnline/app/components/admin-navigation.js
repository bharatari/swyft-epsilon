import Ember from "ember";

export default Ember.Component.extend({ 
    navigation: [
        { label: 'Dashboard', route: 'admin', icon: 'fa-tachometer' },
        { label: 'Transactions', route: 'admin-transactions', icon: 'fa-credit-card' },
        { label: 'Users', route: 'admin-users', icon: 'fa-user' },
        { label: 'Globals', route: 'admin-globals', icon: 'fa-globe' },
        { label: 'Coupons', route:'admin-coupons', icon: 'fa-ticket'},
        { label: 'Tokens', route: 'admin-tokens', icon: 'fa-circle-thin' },
        { label: 'Deliveries', route: 'admin-deliveries', icon: 'fa-truck' },
        { label: 'Delivery Locations', route: 'admin-delivery-locations', icon: 'fa-map-marker' },
        { label: 'Restaurants', route: 'admin-restaurants', icon: 'fa-cutlery' },
        { label: 'Export', route: 'admin-export-picker', icon: 'fa-table' },
        { label: 'Balance', route: 'admin-balance', icon: 'fa-money' },
    ]
});