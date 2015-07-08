import Ember from "ember";

export default Ember.Component.extend({ 
    navigation: [
        { label: 'Dashboard', route: 'admin', icon: 'fa-tachometer' },
        { label: 'Transactions', route: 'admin-transactions', icon: 'fa-credit-card' },
        { label: 'Users', route: 'admin-users', icon: 'fa-user' },
        { label: 'Globals', route: 'admin-globals', icon: 'fa-globe' },
        { label: 'Export', route: 'admin-export-picker', icon: 'fa-truck' },
        { label: 'Balance', route: 'admin-balance', icon: 'fa-money' }
    ]
});