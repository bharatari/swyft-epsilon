import Ember from "ember";
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import config from 'swyft-epsilon-online/config/environment';
import AdminPageMixin from 'swyft-epsilon-online/mixins/admin-page';

export default Ember.Controller.extend(AdminPageMixin, {
    modelName: 'Global',
    description: 'Add, update, and edit Globals.',
    currentRoute: 'admin-globals',
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
            this.set('dialogBody', "You are attempting to permanently delete this global.");
            this.set('displayDialog', true);
            this.set('deleteId', id);
        },
        accept: function() {
            var self = this;
            if(this.get('deleteId')) {
                Ember.$.ajax({
                    url: config.routeLocation + "/api/admin/global/" + this.get('deleteId'),
                    data: {
                        user: {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token}
                    },
                    type: "DELETE",
                    success: function(response) {
                        self.set('displayDialog', false);
                        self.set('modalTitle', 'Global Deleted');
                        self.set('modalBody', 'This global has been successfully deleted.');
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
        goToNewGlobal: function() {
            this.transitionToRoute('admin-global', 0);
        },
        goToGlobal: function(id) {
            this.transitionToRoute('admin-global', id);
        }
    }
});