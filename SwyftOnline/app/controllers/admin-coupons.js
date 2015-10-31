/* jslint unused: false */
import Ember from "ember";
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import config from 'swyft-epsilon-online/config/environment';
import AdminPageMixin from 'swyft-epsilon-online/mixins/admin-page';

export default Ember.Controller.extend(AdminPageMixin, {
    modelName: 'Coupon',
    description: 'Add, update, and edit Coupons.',
    currentRoute: 'admin-coupons',
    queryParams: ['page', 'sort', 'sortType', 'filters', 'filterArray'],
    page: 1,                                  
    sort: 'createdAt',
    sortType: 'DESC',
    filterArray: [],
    filtersChanged: function() {
        this.set('filters', JSON.stringify(this.convertFilters(this.get('filterArray'))));
    }.observes('filterArray'),
    actions: {
        delete: function(id) {
            this.set('dialogTitle', 'Confirmation');
            this.set('dialogBody', "Other records may rely on this one, deleting it might cause problems. Proceed with extreme caution.");
            this.set('displayDialog', true);
            this.set('deleteId', id);
        },
        accept: function() {
            var self = this;
            if(this.get('deleteId')) {
                Ember.$.ajax({
                    url: config.routeLocation + "/api/admin/coupon/" + this.get('deleteId'),
                    type: "DELETE",
                    data: {
                        user: {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token}
                    },
                    success: function(response) {
                        self.set('displayDialog', false);
                        self.set('modalTitle', 'Coupon Deleted');
                        self.set('modalBody', 'This coupon has been successfully deleted.');
                        self.set('displayModal', true);
                    },
                    error: function(xhr, textStatus, error) {
                        self.set('displayDialog', false);
                        self.set('modalTitle', 'Error');
                        self.set('modalBody', 'Something went wrong with your request.');
                        self.set('displayModal', true);
                    }
                });
            }
        },
        cancel: function() {
            this.set('deleteId', 0);
            this.set('displayDialog', false);
        },
        goToNewCoupon: function() {
            this.transitionToRoute('admin-coupon', 0);
        },
        goToCoupon: function(id) {
            this.transitionToRoute('admin-coupon', id);
        }
    }
});